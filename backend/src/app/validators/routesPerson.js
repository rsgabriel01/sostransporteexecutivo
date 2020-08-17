// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorPersonCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    id_person: Joi.number().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    cpf_cnpj: Joi.string().required().min(9).max(11),
    rg: Joi.string().required().min(7).max(11),
    phone: Joi.string().required().min(10).max(11),
    email: Joi.string().required().email(),
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
  validatorPersonCreate,
};
