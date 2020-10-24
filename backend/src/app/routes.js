const express = require("express");

const routes = express.Router();

// #region Controllers
const PersonController = require("./controllers/PersonController");
const PeopleLikeNameController = require("./controllers/PeopleLikeNameController");

const clientController = require("./controllers/ClientController");
const clientLikeNameFantasyController = require("./controllers/ClientLikeNameFantasyController");

const DriverController = require("./controllers/DriverController");
const DriversLikeNameController = require("./controllers/DriversLikeNameController");

const TypePeopleController = require("./controllers/TypePeopleController");

const PeopleAddressController = require("./controllers/PeopleAddressController");

const UsersController = require("./controllers/UsersController");

const SessionsController = require("./controllers/SessionsController");

const NeighborhoodsController = require("./controllers/NeighborhoodsController");
const NeighborhoodsLikeNameController = require("./controllers/NeighborhoodsLikeNameController");

const TravelFeeController = require("./controllers/TravelFeeController");

const ServiceOrdersController = require("./controllers/ServiceOrdersController");
const ServiceOrdersIndexController = require("./controllers/ServiceOrdersIndexController");
const ServiceOrdersUpdatesController = require("./controllers/ServiceOrdersUpdatesController");

const VehicleModelsLikeDescriptionController = require("./controllers/VehicleModelsLikeDescriptionController");

const VehicleController = require("./controllers/VehicleController");
const VehiclesLikeModelController = require("./controllers/VehiclesLikeModelController");

const ReportsServiceOrdersController = require("./controllers/ReportsServiceOrdersController");
// #endregion

// #region Validators

// #region Person
const {
  validatorPersonCreate,
  validatorPersonShow,
  validatorPersonUpdate,
  validatorPersonIndexLikeName,
} = require("./validators/routesPersonPeople");
// #endregion

// #region Client
const {
  validatorClientCreate,
  validatorClientsIndexLikeNameFantasy,
} = require("./validators/routesClient");

// #endregion

// #region Driver
const {
  validatorDriverCreate,
  validatorDriverUpdate,
  validatorDriversIndexLikeName,
} = require("./validators/routesDrivers");
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

// #region Neighborhood
const {
  validatorNeighborhoodIndexLikeName,
} = require("./validators/routesNeighborhood");
// #endregion

// #region Vehicle Models
const {
  validatorOsCreate,
  validatorOsShow,
  validatorOsIndexLikeClientSituationDate,
  validatorOsUpdateSituation1,
  validatorOsUpdateSituation2,
  validatorOsUpdateSituation3,
  validatorOsUpdateSituation7and8,
} = require("./validators/routesServiceOrders");
// #endregion

// #region Vehicle
const {
  validatorVehicleCreate,
  validatorVehicleShow,
  validatorVehiclesLikeModel,
  validatorVehicleUpdate,
} = require("./validators/routesVehicles");
// #endregion

// #region Vehicle Models
const {
  validatorVehicleModelsLikeDescription,
} = require("./validators/routesVehicleModels");
// #endregion

// #endregion Validator

// #region Middlewares
const { verifySession } = require("./middlewares/sessions");
const { permissionAdminAttendance } = require("./middlewares/permissions");
// #endregion Middlewares

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//#region Routes

// #region Acess
routes.get("/acess/session", validatorSession, SessionsController.show);

routes.post("/acess/login", validatorLogin, SessionsController.store);

routes.get("/acess/logout", validatorLogout, SessionsController.destroy);
// #endregion

// #region Person/People
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
  "/people/",
  validatorPersonIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  PeopleLikeNameController.indexLikeName
);

routes.get(
  "/people/active/",
  validatorPersonIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  PeopleLikeNameController.indexActiveLikeName
);

routes.get(
  "/people/active/nondriver/",
  validatorPersonIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  PeopleLikeNameController.indexActiveNoDriverLikeName
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

routes.put(
  "/client/update",
  // validatorClientCreate,
  verifySession,
  permissionAdminAttendance,
  clientController.update
);

routes.get(
  "/client/:idClient",
  verifySession,
  permissionAdminAttendance,
  clientController.show
);

routes.get(
  "/clients/",
  validatorClientsIndexLikeNameFantasy,
  verifySession,
  permissionAdminAttendance,
  clientLikeNameFantasyController.indexLikeNameFantsy
);

routes.get(
  "/clients/active/",
  validatorClientsIndexLikeNameFantasy,
  verifySession,
  permissionAdminAttendance,
  clientLikeNameFantasyController.indexActiveLikeNameFantasy
);
// #endregion

// #region Driver
routes.post(
  "/driver/create",
  validatorDriverCreate,
  verifySession,
  permissionAdminAttendance,
  DriverController.store
);

routes.put(
  "/driver/update",
  validatorDriverUpdate,
  verifySession,
  permissionAdminAttendance,
  DriverController.update
);

routes.get(
  "/driver/:idDriver",
  verifySession,
  permissionAdminAttendance,
  DriverController.show
);

routes.get(
  "/drivers/",
  validatorDriversIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  DriversLikeNameController.indexLikeName
);

routes.get(
  "/drivers/active/",
  validatorDriversIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  DriversLikeNameController.indexActiveLikeName
);

routes.get(
  "/drivers/active/vehicle/no/",
  validatorDriversIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  DriversLikeNameController.indexActiveVehicleNoLikeName
);
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

// #region Neighborhood
routes.get("/neighborhoods", NeighborhoodsController.index);

routes.get(
  "/neighborhoods/like/",
  validatorNeighborhoodIndexLikeName,
  verifySession,
  permissionAdminAttendance,
  NeighborhoodsLikeNameController.indexLikeName
);
// #endregion

// #region TravelFee
routes.get("/travelFee", TravelFeeController.index);
// #endregion

// #region ServiceOrders
routes.get("/serviceOrders", ServiceOrdersController.index);

routes.get(
  "/serviceOrder/:idServiceOrder",
  // validatorOsShow,
  // verifySession,
  // permissionAdminAttendance,
  ServiceOrdersController.show
);

routes.get(
  "/serviceOrders/like/",
  validatorOsIndexLikeClientSituationDate,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexLikeClientSituationDate
);

routes.post(
  "/serviceOrders",
  validatorOsCreate,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersController.store
);

routes.put(
  "/serviceOrder/update/situation1",
  validatorOsUpdateSituation1,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersUpdatesController.updateSituation1
);

routes.put(
  "/serviceOrder/update/situation2",
  validatorOsUpdateSituation2,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersUpdatesController.updateSituation2
);

routes.put(
  "/serviceOrder/update/situation3",
  validatorOsUpdateSituation3,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersUpdatesController.updateSituation3
);

routes.put(
  "/serviceOrder/update/situation7and8",
  validatorOsUpdateSituation7and8,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersUpdatesController.updateSituation7and8
);

// #endregion

// #region Vehicle
routes.get(
  "/vehicle",
  verifySession,
  permissionAdminAttendance,
  VehicleController.index
);

routes.post(
  "/vehicle/create",
  validatorVehicleCreate,
  verifySession,
  permissionAdminAttendance,
  VehicleController.store
);

routes.get(
  "/vehicle/:idVehicle",
  validatorVehicleShow,
  verifySession,
  permissionAdminAttendance,
  VehicleController.show
);

routes.put(
  "/vehicle/update",
  validatorVehicleUpdate,
  verifySession,
  permissionAdminAttendance,
  VehicleController.update
);

routes.get(
  "/vehicles/",
  validatorVehiclesLikeModel,
  verifySession,
  permissionAdminAttendance,
  VehiclesLikeModelController.indexLikeModel
);

routes.get(
  "/vehicles/active/",
  validatorVehiclesLikeModel,
  verifySession,
  permissionAdminAttendance,
  VehiclesLikeModelController.indexActiveLikeModel
);
// #endregion

// #region Vehicle Models
routes.get(
  "/vehicleModels/",
  validatorVehicleModelsLikeDescription,
  verifySession,
  permissionAdminAttendance,
  VehicleModelsLikeDescriptionController.indexLikeDescription
);
//#endregion Vehicle Models

// #region Reports
routes.get(
  "/reports/serviceOrders/completed/",
  // validatorOsIndexLikeClientSituationDate,
  verifySession,
  permissionAdminAttendance,
  ReportsServiceOrdersController.indexCompletedWithIdClientAndPeriod
);
// #endregion Reports
//#endregion Routes

module.exports = routes;
