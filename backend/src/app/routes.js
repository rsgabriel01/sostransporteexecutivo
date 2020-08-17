const express = require("express");

const routes = express.Router();

//#region Controllers
const CitysController = require("./controllers/CitysController");
const UsersController = require("./controllers/UsersController");
const NeighborhoodsController = require("./controllers/NeighborhoodsController");
const PeopleAddressController = require("./controllers/PeopleAddressController");
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
//#endregion

//#region Validators
const {
  validatorLogin,
  validatorSession,
  validatorLogout,
} = require("./validators/routesAcess");

const { validatorPersonCreate } = require("./validators/routesPerson");

const { validatorAddressCreate } = require("./validators/routesPeopleAddress");
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
routes.get("/people", PersonController.index);

routes.post("/person/create", validatorPersonCreate, PersonController.store);
//#endregion

//#region People Address
routes.post(
  "/address/create",
  validatorAddressCreate,
  PeopleAddressController.store
);

//#endregion

routes.get("/citys", CitysController.index);
routes.get("/users", UsersController.index);
routes.get("/neighborhoods", NeighborhoodsController.index);
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
