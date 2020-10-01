const express = require("express");

const routes = express.Router();

// #region Controllers
const PersonController = require("./controllers/PersonController");
const PersonLikeNameController = require("./controllers/PersonLikeNameController");

const clientController = require("./controllers/clientController");

const clientLikeNameFantasyController = require("./controllers/clientLikeNameFantasyController");

const DriversController = require("./controllers/DriversController");

const TypesController = require("./controllers/TypesController");

const TypePeopleController = require("./controllers/TypePeopleController");

const PeopleAddressController = require("./controllers/PeopleAddressController");

const UsersController = require("./controllers/UsersController");

const SessionsController = require("./controllers/SessionsController");

const StatesController = require("./controllers/StatesController");

const CitysController = require("./controllers/CitysController");

const NeighborhoodsController = require("./controllers/NeighborhoodsController");

const TravelFeeController = require("./controllers/TravelFeeController");

const StatusController = require("./controllers/StatusController");

const ServiceOrdersController = require("./controllers/ServiceOrdersController");

const VehicleBrandsController = require("./controllers/VehicleBrandsController");

const VehicleModelsController = require("./controllers/VehicleModelsController");

const VehiclesController = require("./controllers/VehiclesController");
// #endregion

// #region Validators
const {
  validatorPersonCreate,
  validatorPersonShow,
  validatorPersonUpdate,
} = require("./validators/routesPerson");

const {
  validatorPersonIndexLikeName,
} = require("./validators/routesPersonLikeName");

const { validatorClientCreate } = require("./validators/routesClient");

const {
  validatorClientIndexLikeNameFantasy,
} = require("./validators/routesClientLikeNameFantasy");

const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

const { validatorAddressCreate } = require("./validators/routesPeopleAddress");

const { validatorTypePeopleCreate } = require("./validators/routesTypePeople");

const {
  validatorUsersCreate,
  validatorUsersUpdate,
} = require("./validators/routesUsers");

const { validatorDriversCreate } = require("./validators/routesDrivers");

const { validatorVehiclesCreate } = require("./validators/routesVehicles");
// #endregion

// #region Middlewares
const { verifySession } = require("./middlewares/sessions");
const { permissionAdminAttendance } = require("./middlewares/permissions");
// #endregion

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

// #region Routes Acess
routes.get("/acess/session", validatorSession, SessionsController.show);

routes.post("/acess/login", validatorLogin, SessionsController.store);

routes.get("/acess/logout", validatorLogout, SessionsController.destroy);
// #endregion

// #region Routes Person
routes.post(
  "/person/create",
  validatorPersonCreate,
  verifySession,
  permissionAdminAttendance,
  PersonController.store
);

routes.get(
  "/person/:idPerson",
  validatorPersonShow,
  verifySession,
  permissionAdminAttendance,
  PersonController.show
);

routes.put(
  "/person/update",
  validatorPersonUpdate,
  verifySession,
  permissionAdminAttendance,
  PersonController.update
);
// #endregion

// #region Person like name
routes.get(
  "/person/",
  validatorPersonIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  PersonLikeNameController.indexLikeName
);

routes.get(
  "/person/active/",
  validatorPersonIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  PersonLikeNameController.indexActiveLikeName
);
// #endregion

// #region Client
routes.post(
  "/client/create",
  validatorClientCreate,
  verifySession,
  permissionAdminAttendance,
  clientController.store
);
// #endregion

routes.get(
  "/client/",
  validatorClientIndexLikeNameFantasy,
  verifySession,
  permissionAdminAttendance,
  clientLikeNameFantasyController.indexLikeNameFantsy
);
// #region People Address
routes.post(
  "/address/create",
  validatorAddressCreate,
  verifySession,
  permissionAdminAttendance,
  PeopleAddressController.store
);
// #endregion

// #region Type People
routes.post(
  "/typepeople/create",
  validatorTypePeopleCreate,
  verifySession,
  permissionAdminAttendance,
  TypePeopleController.store
);
// #endregion

// #region Users
routes.get(
  "/users",
  verifySession,
  permissionAdminAttendance,
  UsersController.index
);

routes.post(
  "/user/create",
  validatorUsersCreate,
  /*verifySession,
  permissionAdminAttendance,*/
  UsersController.store
);

routes.put(
  "/user/update",
  validatorUsersUpdate,
  verifySession,
  permissionAdminAttendance,
  UsersController.update
);

// #endregion

// #region Drivers
routes.post(
  "/drivers/create",
  validatorDriversCreate,
  verifySession,
  permissionAdminAttendance,
  DriversController.store
);
// #endregion

// #region Vehicles
routes.get(
  "/vehicles",
  verifySession,
  permissionAdminAttendance,
  VehiclesController.index
);

routes.post(
  "/vehicles/create",
  validatorVehiclesCreate,
  verifySession,
  permissionAdminAttendance,
  VehiclesController.store
);
// #endregion

// #region Clients
routes.post(
  "/clients/active",
  validatorClientCreate,
  verifySession,
  permissionAdminAttendance,
  clientController.store
);
// #endregion

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
