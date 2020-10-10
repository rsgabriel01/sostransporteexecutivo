// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorVehicleModelsLikeDescription = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    vehicleModel: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorVehicleModelsLikeDescription,
};
