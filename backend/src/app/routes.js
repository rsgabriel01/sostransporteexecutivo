const express = require("express");

const routes = express.Router();

const PessoasController = require("./controllers/PessoasController");
const Usuarios_empresaController = require("./controllers/Usuarios_empresaController");
const Tipos_usuariosController = require("./controllers/Tipos_usuariosController");
const SessoesController = require("./controllers/SessoesController");

const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//Acess ----------------------------------------------

routes.get("/acess/session", validatorSession, SessoesController.show);

routes.post("/acess/login", validatorLogin, SessoesController.store);

routes.get("/acess/logout", validatorLogout, SessoesController.destroy);

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
