const express = require("express");

const { validatorTest } = require("./validators/routeTest");

const routes = express.Router();

const TestController = require("./controllers/TestController");
const PessoaController = require("./controllers/PessoaController");
// const Usuario_empresaController = require("./controllers/Usuario_empresaController");
// const Tipo_usuarioController = require("./controllers/Tipo_usuarioController");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

routes.post("/test", validatorTest, TestController.index);

//Pessoas --------------------------------------------

routes.get("/pessoas", PessoaController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

module.exports = routes;
