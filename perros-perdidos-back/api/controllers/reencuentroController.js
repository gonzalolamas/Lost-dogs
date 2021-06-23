const reencuentroSchema = require("../models/reencuentroSchema");
const Reencuentro = require("../models/reencuentroSchema");

module.exports = {
  async getPerrosEncontrados(req, res) {
    const reencuentros = await reencuentroSchema.find();
    console.log(`request exitoso reencuentros`);
    res.send(reencuentros);
  },
  //Encerrando aca adentro las funciones ya las estoy exportando todas juntas, es preferencia mia hacerlo asi
  async getReencuentro(req, res) {
    //Nos devuelve un usuario, en caso de no encontrarlo devuelve 404
    const {
      params: { meeting },
    } = req;
    const reencuentro = await Reencuentro.findOne({ title: meeting });
    if (reencuentro) return res.status(200).json({ reencuentro });
    else return res.status(404).json({ error: "Not found/No encontrado" });
  },

  async postReencuentro(req, res) {
    //Agrega un usuario si se pasan nombre, apellido y email en el body de la request
    const { title, description, img } = req.body;
    if (title && description && img) {
      const checkMeeting = await Reencuentro.findOne({ title });
      if (!checkMeeting) {
        const newMeeting = new reencuentroSchema(req.body);
        newMeeting.save(newMeeting);
        return res.status(201).json({ reencuentro: req.body });
      } else {
        return res
          .status(400)
          .json({ error: "Title already used/Titulo ya definidio o en uso" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Not enough properties/Faltan propiedades" });
    }
  },

  async putReencuentro(req, res) {
    //Actualiza los datos de un usuario pasandole el nombre o email como parametro
    const { titleordescription } = req.params;
    const { title, description, img } = req.body;
    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (img) update.img = img;

    const updateReencuentro = await Reencuentro.updateOne(
      {
        $or: [
          { title: titleordescription },
          { description: titleordescription },
        ],
      },
      update
    );

    if (updateReencuentro.n) {
      //n == numero de documentos modificados
      return res.status(200).json({ ok: true });
    } else {
      return res
        .status(404)
        .json({ error: "Extravio not found/Extravio no encontrado" });
    }
  },

  async deleteReencuentro(req, res) {
    //Elimina un usuario pasandole por querys nombre y email
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ error: "Not enough parameters/Faltan parametros" });

    Reencuentro.deleteOne(
      {
        $and: [{ title }, { description }],
      },
      (err) => {
        //Aunque no haya un documento que borrar nunca trae errores
        //Esta query siempre devuelve status 200 como si hubiera borrado
        if (err) {
          return res
            .status(404)
            .json({ error: "Extravio not found/Extravio no encontrado" });
        } else {
          return res.status(200).json({ ok: true });
        }
      }
    );
  },
};
