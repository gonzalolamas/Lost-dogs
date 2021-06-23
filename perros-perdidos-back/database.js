require("dotenv").config();
const mongoose = require("mongoose");

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.3owam.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true, //Primero le pasamos la URI con las credenciales de acceso en DB_URL
    useUnifiedTopology: true, //Segundo le pasamos un objeto con opciones de config, las que use yo son las basicas a usar para no tener problemas de conexion
  },
  () => {
    console.log("MongoDB conectado"); //insertar datos a mongo
  }
);