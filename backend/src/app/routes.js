const express = require("express");

const routes = express.Router();

const CitysController = require("./controllers/CitysController");
const UsersController = require("./controllers/UsersController");
const NeighborhoodsController = require("./controllers/NeighborhoodsController");
const PeopleAddressController = require("./controllers/PeopleAddressController");
const PeopleController = require("./controllers/PeopleController");
const ServiceOrdersController = require("./controllers/ServiceOrdersController");
const SessionsController = require("./controllers/SessionsController");
const StatesController = require("./controllers/StatesController");
const StatusController = require("./controllers/StatusController");
const TravelFeeController = require("./controllers/TravelFeeController");
const TypePeopleController = require("./controllers/TypePeopleController");
const TypesController = require("./controllers/TypesController");
const VehicleBrandsController = require("./controllers/VehicleBrandsController");
const VehicleModelsController = require("./controllers/VehicleModelsController");
const VehiclesController = require("./controllers/VehiclesController");

// const Usuarios_empresaController = require("./controllers/Usuarios_empresaController");
// const Tipos_usuariosController = require("./controllers/Tipos_usuariosController");
// const SessoesController = require("./controllers/SessoesController");

const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//Acess ----------------------------------------------

routes.get("/acess/session", validatorSession, SessionsController.show);

routes.post("/acess/login", validatorLogin, SessionsController.store);

// routes.get("/acess/logout", validatorLogout, SessoesController.destroy);

//Pessoas --------------------------------------------

routes.get("/citys", CitysController.index);
routes.get("/users", UsersController.index);
routes.get("/neighborhoods", NeighborhoodsController.index);
routes.get("/peopleAdress", PeopleAddressController.index);
routes.get("/people", PeopleController.index);
routes.get("/serviceOrders", ServiceOrdersController.index);
// routes.get("/sessions", SessionsController.index);
routes.get("/states", StatesController.index);
routes.get("/status", StatusController.index);
routes.get("/travelFee", TravelFeeController.index);
routes.get("/typePeople", TypePeopleController.index);
routes.get("/types", TypesController.index);
routes.get("/vehicleBrands", VehicleBrandsController.index);
routes.get("/vehicleModels", VehicleModelsController.index);
routes.get("/vehicles", VehiclesController.index);

module.exports = routes;
