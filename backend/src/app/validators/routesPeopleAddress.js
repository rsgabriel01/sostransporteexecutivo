// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorAddressCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    id_people: Joi.number().positive().integer().required(),
    id_neighborhood: Joi.number().positive().integer().required(),
    street: Joi.string().required(),
    street_number: Joi.number().positive().integer().required(),
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
  validatorAddressCreate,
};
