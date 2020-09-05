const express = require("express");

const routes = express.Router();

//#region Controllers
const CitysController = require("./controllers/CitysController");
const UsersController = require("./controllers/UsersController");
const NeighborhoodsController = require("./controllers/NeighborhoodsController");
const PeopleAddressController = require("./controllers/PeopleAddressController");
const DriversController = require("./controllers/DriversController");
const PersonController = require("./controllers/PersonController");
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
const ClientsController = require("./controllers/ClientsController");
//#endregion

//#region Validators
const { verifySession } = require("./validators/headers");

const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

const {
  validatorPersonCreate,
  validatorPersonShow,
} = require("./validators/routesPerson");

const { validatorAddressCreate } = require("./validators/routesPeopleAddress");

const { validatorTypePeopleCreate } = require("./validators/routesTypePeople");

const { validatorUsersCreate } = require("./validators/routesUsers");

const { validatorDriversCreate } = require("./validators/routesDrivers");

const { validatorVehiclesCreate } = require("./validators/routesVehicles");

const { validatorClientsCreate } = require("./validators/routesClients");
//#endregion

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//#region Routes Acess
routes.get("/acess/session", validatorSession, SessionsController.show);

routes.post("/acess/login", validatorLogin, SessionsController.store);

routes.get("/acess/logout", validatorLogout, SessionsController.destroy);
//#endregion

//#region Routes Person/People
routes.get("/people", verifySession, PersonController.index);

routes.post(
  "/person/create",
  validatorPersonCreate,
  verifySession,
  PersonController.store
);

routes.get(
  "/person/:idPerson",
  validatorPersonShow,
  verifySession,
  PersonController.show
);

routes.put("/person/update", verifySession, PersonController.update);
//#endregion

//#region People Address
routes.post(
  "/address/create",
  validatorAddressCreate,
  verifySession,
  PeopleAddressController.store
);
//#endregion

//#region Type People
routes.post(
  "/typepeople/create",
  validatorTypePeopleCreate,
  verifySession,
  TypePeopleController.store
);
//#endregion

//#region Users
routes.get("/users", verifySession, UsersController.index);

routes.post(
  "/users/create",
  validatorUsersCreate,
  verifySession,
  UsersController.store
);
//#endregion

//#region Drivers
routes.post(
  "/drivers/create",
  validatorDriversCreate,
  verifySession,
  DriversController.store
);
//#endregion

//#region Vehicles
routes.get("/vehicles", verifySession, VehiclesController.index);

routes.post(
  "/vehicles/create",
  validatorVehiclesCreate,
  verifySession,
  VehiclesController.store
);
//#endregion

//#region Clients
routes.post(
  "/clients/create",
  validatorClientsCreate,
  verifySession,
  ClientsController.store
);
//#endregion

routes.get("/citys", CitysController.index);
routes.get("/neighborhoods", NeighborhoodsController.index);
routes.get("/serviceOrders", ServiceOrdersController.index);
// routes.get("/sessions", SessionsController.index);
routes.get("/states", StatesController.index);
routes.get("/status", StatusController.index);
routes.get("/travelFee", TravelFeeController.index);
routes.get("/types", TypesController.index);
routes.get("/vehicleBrands", VehicleBrandsController.index);
routes.get("/vehicleModels", VehicleModelsController.index);

module.exports = routes;
