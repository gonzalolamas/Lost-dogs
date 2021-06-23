//const { response } = require('express');
const userSchema = require("../models/userSchema");
const User = require("../models/userSchema");

module.exports = {
  async getUsers(req, res) {
    const users = await userSchema.find();
    console.log(`success page, ${users.name}`);
    res.send(users);
  },
  //Encerrando aca adentro las funciones ya las estoy exportando todas juntas, es preferencia mia hacerlo asi
  async getUser(req, res) {
    //Nos devuelve un usuario, en caso de no encontrarlo devuelve 404
    const {
      params: { username },
    } = req;
    const user = await User.findOne({ name: username });
    if (user) return res.status(200).json({ user });
    else return res.status(404).json({ error: "Not found/No encontrado" });
  },
  /* async getAll(req,res){
    const User = await req.body;
    console.log(`sucess page, ${User.name}`);
    res.send(User.name);
  }, */

  async postUser(req, res) {
    //Agrega un usuario si se pasan nombre, apellido y email en el body de la request
    const { name, lastname, email } = req.body;
    if (name && lastname && email) {
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        const newUser = new userSchema(req.body);
        newUser.save(newUser);
        return res.status(201).json({ user: req.body });
      } else {
        return res
          .status(400)
          .json({ error: "Email already used/Email ya usado" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Not enough properties/Faltan propiedades" });
    }
  },

  async putUser(req, res) {
    //Actualiza los datos de un usuario pasandole el nombre o email como parametro
    const { nameoremail } = req.params;
    const { name, lastname, email } = req.body;
    const update = {};
    if (name) update.name = name;
    if (lastname) update.lastname = lastname;
    if (email) update.email = email;

    const updateUser = await User.updateOne(
      {
        $or: [{ "name": nameoremail }, { "email": nameoremail }],
      },
      update
    );

    if (updateUser.n) {
      //n == numero de documentos modificados
      return res.status(200).json({ ok: true });
    } else {
      return res
        .status(404)
        .json({ error: "User not found/Usuario no encontrado" });
    }
  },

  async deleteUser(req, res) {
    //Elimina un usuario pasandole por querys nombre y email
    const { name, email } = req.body;
    if (!name || !email)
      return res
        .status(400)
        .json({ error: "Not enough parameters/Faltan parametros" });

    User.deleteOne(
      {
        $and: [{ name }, { email }],
      },
      (err) => {
        //Aunque no haya un documento que borrar nunca trae errores
        //Esta query siempre devuelve status 200 como si hubiera borrado
        if (err) {
          return res
            .status(404)
            .json({ error: "User not found/Usuario no encontrado" });
        } else {
          return res.status(200).json({ ok: true });
        }
      }
    );
  },
};