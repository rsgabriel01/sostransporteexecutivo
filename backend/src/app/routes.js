const express = require("express");

const { validatorTest } = require("./validators/routeTest");

const routes = express.Router();

const TestController = require("./controllers/TestController");
const PessoasController = require("./controllers/PessoasController");
const Usuarios_empresaController = require("./controllers/Usuarios_empresaController");
const Tipos_usuariosController = require("./controllers/Tipos_usuariosController");
const SessoesController = require("./controllers/SessoesController");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

routes.post("/test", validatorTest, TestController.index);

//Acessos ----------------------------------------------

routes.post("/acesso/login", SessoesController.store);

routes.get("/acesso/sessao", SessoesController.show);

// routes.post("/acesso/sessoes", InterventionController.store);

//Pessoas --------------------------------------------

routes.get("/pessoas", PessoasController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

//Usuarios Empresa --------------------------------------------

routes.get("/usuarios", Usuarios_empresaController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

//Tipos Usuarios --------------------------------------------

routes.get("/tiposUsuarios", Tipos_usuariosController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

module.exports = routes;
