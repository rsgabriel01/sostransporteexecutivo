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

// const validatorLogin = celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     user: Joi.string().required(),
//     password: Joi.string().required().min(8).max(16),
//   }),
// });

// const validatorLogout = celebrate({
//   [Segments.HEADERS]: Joi.object({
//     token: Joi.string().required(),
//   }).unknown(),
// });

module.exports = {
  validatorVehiclesCreate,
};
