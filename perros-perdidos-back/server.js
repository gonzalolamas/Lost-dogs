require("dotenv").config();
const express = require("express");
// Initializations

const app = express();
require("./database");
const cors = require("cors");
const routes = require("./api/routes/routes");

// Settings configurar modulos

const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

// routes
app.use("/", routes);

// server

try {
  app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`);
  });
} catch (error) {
  console.log(`Error en puerto ${PORT}`, error);
}

