// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorUsersCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idPeople: Joi.number().positive().integer().required(),
    user: Joi.string().required(),
    password: Joi.string().required().min(6).max(16),
    active: Joi.boolean().required(),
  }),
});

const validatorUsersUpdate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idPeople: Joi.number().positive().integer().required(),
    user: Joi.string().required(),
    password: Joi.string().required().min(6).max(16).allow("", null),
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
  validatorUsersCreate,
  validatorUsersUpdate,
};
