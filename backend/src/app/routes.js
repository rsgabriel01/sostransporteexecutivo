const express = require("express");

const routes = express.Router();

// #region Controllers
const CitysController = require("./controllers/CitysController");
const UsersController = require("./controllers/UsersController");
const NeighborhoodsController = require("./controllers/NeighborhoodsController");
const PeopleAddressController = require("./controllers/PeopleAddressController");
const DriversController = require("./controllers/DriversController");
const PersonLikeNameController = require("./controllers/PersonLikeNameController");
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
const clientController = require("./controllers/clientController");
// #endregion

// #region Validators
const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

const {
  validatorPersonCreate,
  validatorPersonShow,
  validatorPersonUpdate,
} = require("./validators/routesPerson");

const {
  validatorPersonIndexLikeName,
} = require("./validators/routesPersonLikeName");

const { validatorAddressCreate } = require("./validators/routesPeopleAddress");

const { validatorTypePeopleCreate } = require("./validators/routesTypePeople");

const {
  validatorUsersCreate,
  validatorUsersUpdate,
} = require("./validators/routesUsers");

const { validatorDriversCreate } = require("./validators/routesDrivers");

const { validatorVehiclesCreate } = require("./validators/routesVehicles");

const { validatorClientCreate } = require("./validators/routesClient");
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

// #region Client
routes.post(
  "/client/create",
  validatorClientCreate,
  verifySession,
  permissionAdminAttendance,
  clientController.store
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
