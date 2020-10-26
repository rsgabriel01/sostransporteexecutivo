const express = require("express");

const routes = express.Router();

// #region Controllers
const PersonController = require("./controllers/People/Person/PersonController");
const PeopleLikeNameController = require("./controllers/People/PeopleLikeNameController");

const clientController = require("./controllers/People/Clients/ClientController");
const clientLikeNameFantasyController = require("./controllers/People/Clients/ClientLikeNameFantasyController");

const DriverController = require("./controllers/People/Drivers/DriverController");
const DriversLikeNameController = require("./controllers/People/Drivers/DriversLikeNameController");

const TypePeopleController = require("./controllers/TypePeople/TypePeopleController");

const PeopleAddressController = require("./controllers/PeopleAddress/PeopleAddressController");

const UsersController = require("./controllers/Users/UsersController");

const SessionsController = require("./controllers/Sessions/SessionsController");

const NeighborhoodsController = require("./controllers/Neighborhoods/NeighborhoodsController");
const NeighborhoodsLikeNameController = require("./controllers/Neighborhoods/NeighborhoodsLikeNameController");

const TravelFeeController = require("./controllers/TravelFee/TravelFeeController");

const ServiceOrdersController = require("./controllers/ServiceOrders/ServiceOrdersController");
const ServiceOrdersIndexController = require("./controllers/ServiceOrders/ServiceOrdersIndexController");
const ServiceOrdersUpdatesController = require("./controllers/ServiceOrders/ServiceOrdersUpdatesController");
const ServiceOrdersAttendanceController = require("./controllers/ServiceOrders/ServiceOrdersAttendanceController");
const ServiceOrdersCompletionController = require("./controllers/ServiceOrders/ServiceOrdersCompletionController");
const ServiceOrdersExecutionController = require("./controllers/ServiceOrders/ServiceOrdersExecutionController");

const VehicleModelsLikeDescriptionController = require("./controllers/VehicleModels/VehicleModelsLikeDescriptionController");

const VehicleController = require("./controllers/Vehicles/VehicleController");
const VehiclesLikeModelController = require("./controllers/Vehicles/VehiclesLikeModelController");

const ReportsServiceOrdersController = require("./controllers/Reports/ReportsServiceOrdersController");
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
  validatorClientUpdate,
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

// #region Reports
const {
  indexCompletedWithIdClientAndPeriod,
} = require("./validators/routesReports");
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

// #region Service Orders
const {
  validatorOsCreate,
  validatorOsShow,
  validatorOsIndexLikeClientSituationDate,
  validatorOsUpdateSituation1,
  validatorOsUpdateSituation2,
  validatorOsUpdateSituation3,
  validatorOsUpdateSituation7and8,
  validatorIndexSituations,
  validatorIndexSituationsPeriod,
  validatorDestroy,
  validatorOSAttendance,
  validatorOSCompletion,
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
  validatorClientUpdate,
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
  verifySession,
  permissionAdminAttendance,
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
  validatorOsShow,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersController.show
);

routes.get(
  "/serviceOrders/like/",
  validatorOsIndexLikeClientSituationDate,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexLikeClientSituationDate
);

routes.get(
  "/serviceOrders/index/",
  validatorIndexSituations,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexSituations
);

routes.get(
  "/serviceOrders/index/period/solicitation/",
  validatorIndexSituationsPeriod,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexSituationsPeriodSolicitation
);

routes.get(
  "/serviceOrders/index/period/attendance/",
  validatorIndexSituationsPeriod,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexSituationsPeriodAttendance
);

routes.get(
  "/serviceOrders/index/period/completion/",
  validatorIndexSituationsPeriod,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersIndexController.indexSituationsPeriodCompletion
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

routes.put(
  "/serviceOrder/cancellation/noFee/:idServiceOrder",
  validatorDestroy,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersController.destroyNoFee
);

routes.put(
  "/serviceOrder/cancellation/withFee/:idServiceOrder",
  validatorDestroy,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersController.destroyWithFee
);

routes.put(
  "/serviceOrder/completion/:idServiceOrder",
  validatorOSCompletion,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersCompletionController.store
);

routes.put(
  "/serviceOrder/attendance/:idServiceOrder",
  validatorOSAttendance,
  verifySession,
  permissionAdminAttendance,
  ServiceOrdersAttendanceController.store
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
  indexCompletedWithIdClientAndPeriod,
  verifySession,
  permissionAdminAttendance,
  ReportsServiceOrdersController.indexCompletedWithIdClientAndPeriod
);
// #endregion Reports

//#endregion Routes

module.exports = routes;
