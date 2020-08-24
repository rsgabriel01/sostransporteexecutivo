// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorClientsCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    company_name: Joi.string().required(),
    name_fantasy: Joi.string().required(),
    cpf_cnpj: Joi.string().regex(/^\d+$/).required().min(9).max(11),
    phone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
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
  validatorClientsCreate,
};
