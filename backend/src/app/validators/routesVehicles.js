// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorVehicleCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idDriver: Joi.number().positive().integer().required().allow(null),
    carPlate: Joi.string().required(),
    registrationNumber: Joi.string().regex(/^\d+$/).required().min(8).max(15),
    idVehicleModel: Joi.number().positive().integer().required(),
    vehicleColor: Joi.string().required(),
    active: Joi.boolean().required(),
  }),
});

const validatorVehicleShow = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    idVehicle: Joi.number().positive().integer().required(),
  }),
});

const validatorVehicleUpdate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idVehicle: Joi.number().positive().integer().required(),
    carPlate: Joi.string().required(),
    registrationNumber: Joi.string().regex(/^\d+$/).required().min(8).max(15),
    idVehicleModel: Joi.number().positive().integer().required(),
    idDriver: Joi.number().positive().integer().required().allow(null),
    vehicleColor: Joi.string().required(),
    active: Joi.boolean().required(),
  }),
});

const validatorVehiclesLikeModel = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    vehicleModel: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorVehicleCreate,
  validatorVehicleShow,
  validatorVehicleUpdate,
  validatorVehiclesLikeModel,
};
