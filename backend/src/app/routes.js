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
const NeighborhoodsLikeNameController = require("./controllers/NeighborhoodsLikeNameController");

const TravelFeeController = require("./controllers/TravelFeeController");

const StatusController = require("./controllers/StatusController");

const ServiceOrdersController = require("./controllers/ServiceOrdersController");

const VehicleBrandsController = require("./controllers/VehicleBrandsController");

const VehicleModelsController = require("./controllers/VehicleModelsController");

const VehiclesController = require("./controllers/VehiclesController");
// #endregion

// #region Validators
// #region Person
const {
  validatorPersonCreate,
  validatorPersonShow,
  validatorPersonUpdate,
} = require("./validators/routesPerson");

const {
  validatorPersonIndexLikeName,
} = require("./validators/routesPersonLikeName");
// #endregion

// #region Client
const { validatorClientCreate } = require("./validators/routesClient");

const {
  validatorClientIndexLikeNameFantasy,
} = require("./validators/routesClientLikeNameFantasy");
// #endregion

// #region Driver
const { validatorDriversCreate } = require("./validators/routesDrivers");
// #endregion

// #region Types
// #endregion

// #region TypePeople

// #endregion

// #region PeopleAddress
const { validatorTypePeopleCreate } = require("./validators/routesTypePeople");

const { validatorAddressCreate } = require("./validators/routesPeopleAddress");
// #endregion

// #region Users
const {
  validatorUsersCreate,
  validatorUsersUpdate,
} = require("./validators/routesUsers");
// #endregion

// #region Sessions
const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");
// #endregion

// #region States
// #endregion

// #region Citys
// #endregion

// #region Neighborhood
// #endregion

// #region TravelFee
// #endregion

// #region Status
// #endregion

// #region ServiceOrders
// #endregion

// #region VehicleBrands
// #endregion

// #region VehicleModels
// #endregion

// #region Vehicle
const { validatorVehiclesCreate } = require("./validators/routesVehicles");
// #endregion

// #endregion

// #region Middlewares
const { verifySession } = require("./middlewares/sessions");
const { permissionAdminAttendance } = require("./middlewares/permissions");
// #endregion

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//#region Routes

// #region Acess
routes.get("/acess/session", validatorSession, SessionsController.show);

routes.post("/acess/login", validatorLogin, SessionsController.store);

routes.get("/acess/logout", validatorLogout, SessionsController.destroy);
// #endregion

// #region Person
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

routes.post(
  "/clients/active",
  validatorClientCreate,
  verifySession,
  permissionAdminAttendance,
  clientController.store
);

routes.get(
  "/client/",
  validatorClientIndexLikeNameFantasy,
  verifySession,
  permissionAdminAttendance,
  clientLikeNameFantasyController.indexLikeNameFantsy
);

// #endregion

// #region Driver
routes.post(
  "/drivers/create",
  validatorDriversCreate,
  verifySession,
  permissionAdminAttendance,
  DriversController.store
);
// #endregion

// #region Types
// #endregion

// #region TypePeople
routes.post(
  "/typepeople/create",
  validatorTypePeopleCreate,
  verifySession,
  permissionAdminAttendance,
  TypePeopleController.store
);
// #endregion

// #region PeopleAddress
routes.post(
  "/address/create",
  validatorAddressCreate,
  verifySession,
  permissionAdminAttendance,
  PeopleAddressController.store
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

// #region Sessions
// #endregion

// #region States
// #endregion

// #region Citys
// #endregion

// #region Neighborhood
routes.get("/neighborhoods", NeighborhoodsController.index);
routes.get(
  "/neighborhoods/like/",
  NeighborhoodsLikeNameController.indexLikeName
);
// #endregion

// #region TravelFee
routes.get("/travelFee", TravelFeeController.index);
// #endregion

// #region Status
// #endregion

// #region ServiceOrders
routes.get("/serviceOrders", ServiceOrdersController.index);
// #endregion

// #region VehicleBrands
// #endregion

// #region VehicleModels
// #endregion

// #region Vehicle
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

//#endregion Routes

// #region Clients

// #endregion

module.exports = routes;
