// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorVehiclesCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    id_people: Joi.number().positive().integer().allow(),
    id_model: Joi.number().positive().integer().required(),
    registration_number: Joi.string().regex(/^\d+$/).required().min(8).max(15),
    color: Joi.string().required(),
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
  validatorVehiclesCreate,
  validatorVehiclesLikeModel,
};
