const perroSchema = require("../models/perroSchema");
const Perro = require("../models/perroSchema");

module.exports = {
  async getUserPets(req, res) {
    const { firebase_id } = req.params;
    let pets = await perroSchema.find({ firebase_id });
    if (Object.keys(pets).length === 0)
      return res
        .status(404)
        .json({ error: "Not found, doesn't exist a pet which has that owner" });
    res.status(200).json({ pets });
  },

  async getPerros(req, res) {
    const perros = await perroSchema.find();
    console.log(`request perros buscados`);
    res.send(perros);
  },
  //Encerrando aca adentro las funciones ya las estoy exportando todas juntas, es preferencia mia hacerlo asi
  async getPerro(req, res) {
    //Nos devuelve un usuario, en caso de no encontrarlo devuelve 404
    const {
      params: { dogname },
    } = req;
    const perro = await Perro.findOne({ name: dogname });
    if (perro) return res.status(200).json({ perro });
    else return res.status(404).json({ error: "Not found/No encontrado" });
  },

  async postPerro(req, res) {
    //Agrega un usuario si se pasan nombre, apellido y email en el body de la request
    const { name, description, owner, cel, animalPic, firebase_id } = req.body;
    if (name && description && owner && cel && animalPic && firebase_id) {
      const checkPerro = await Perro.findOne({ owner });
      if (!checkPerro) {
        const newPerro = new perroSchema(req.body);
        newPerro.save(newPerro);
        return res.status(201).json({ Perro: req.body });
      } else {
        return res
          .status(400)
          .json({ error: "Name already created/Nombre ya creado" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Not enough properties/Faltan propiedades" });
    }
  },

  async putPerro(req, res) {
    //Actualiza los datos de un usuario pasandole el nombre o email como parametroz
    const { nameorowner } = req.params;
    const { name, owner, description } = req.body;
    const update = {};
    if (name) update.name = name;
    if (owner) update.owner = owner;
    if (description) update.description = description;

    const updatePerro = await Perro.updateOne(
      {
        $or: [{ name: nameorowner }, { owner: nameorowner }],
      },
      update
    );

    if (updatePerro.n) {
      //n == numero de documentos modificados
      return res.status(200).json({ ok: true });
    } else {
      return res
        .status(404)
        .json({ error: "Mascot not found/Mascota no encontrada" });
    }
  },

  async deletePerro(req, res) {
    //Elimina un usuario pasandole por querys nombre y email
    const {
      params: { _id },
    } = req;
    if (!_id)
      return res
        .status(400)
        .json({ error: "Not enough parameters/Faltan parametros" });

    Perro.deleteOne(
      {
        $and: [{ _id }],
      },
      (err) => {
        //Aunque no haya un documento que borrar nunca trae errores
        //Esta query siempre devuelve status 200 como si hubiera borrado
        if (err) {
          return res
            .status(404)
            .json({ error: "Mascot not found/Mascota no encontrado" });
        } else {
          return res.status(200).json({ ok: true });
        }
      }
    );
  },
};
