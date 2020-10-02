// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorClientCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    company_name: Joi.string().required(),
    name_fantasy: Joi.string().required(),
    cpf_cnpj: Joi.string().regex(/^\d+$/).required().min(14).max(14),
    phone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    email: Joi.string().required().email(),
    id_neighborhood: Joi.number().positive().integer().required(),
    street: Joi.string().required(),
    street_number: Joi.string().required(),
    complement: Joi.string().required().allow("", null),
    active: Joi.boolean().required(),
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
  validatorClientCreate,
};
