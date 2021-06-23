const routes = require("express").Router();
// Controlador usuarios
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/userController");
// Controlador perros
const {
  getUserPets,
  getPerros,
  getPerro,
  postPerro,
  putPerro,
  deletePerro,
} = require("../controllers/perroController");
// Controlador reencuentros
const {
  getPerrosEncontrados,
  getReencuentro,
  postReencuentro,
  putReencuentro,
  deleteReencuentro,
} = require("../controllers/reencuentroController");

//Rutas para el usuario
routes.get("/api/users", getUsers); //llamando a todos los usuarios
routes.get("/api/user/:username", getUser); 
routes.post("/api/create-user", postUser);
routes.put("/api/update-user/:nameoremail", putUser);
routes.delete("/api/delete-user", deleteUser);

//Rutas para perro
routes.get("/api/user/posts/:firebase_id", getUserPets); // solicito publicaciones del usuario logueado

routes.get("/perros", getPerros);
routes.get("/perro/:dogname", getPerro);
routes.post("/create-perro", postPerro);
routes.put("/api/update-perro/:_id", putPerro);
routes.delete("/delete-perro/:_id", deletePerro);

//Rutas para el reencuentro
routes.get("/perros-encontrados", getPerrosEncontrados);
routes.get("/reencuentro/:meeting", getReencuentro);
routes.post("/create-reencuentro", postReencuentro);
routes.put("/update-reencuentro/:titleordescription", putReencuentro);
routes.delete("/delete-reencuentro", deleteReencuentro);

module.exports = routes;

