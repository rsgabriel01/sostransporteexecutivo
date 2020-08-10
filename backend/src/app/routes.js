const express = require("express");

const { celebrate, Segments, Joi } = require("celebrate");

const routes = express.Router();

// const InterventionController = require("./controllers/InterventionController");

routes.get("/", (req, res) => {
  return res.json("Server is running...");
});

//Interventions --------------------------------------------

// routes.get("/interventions", InterventionController.index);

// routes.post("/interventions/create", InterventionController.store);

// routes.get("/interventions/last/:scaleId", InterventionController.show);

module.exports = routes;
