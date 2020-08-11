const express = require("express");

const { validatorTest } = require("./validators/routeTest");

const routes = express.Router();

const TestController = require("./controllers/TestController");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

routes.post("/test", validatorTest, TestController.index);

//Interventions --------------------------------------------

// routes.get("/interventions", InterventionController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

module.exports = routes;
