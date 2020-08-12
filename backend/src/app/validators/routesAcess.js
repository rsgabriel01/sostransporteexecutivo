// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorSession = celebrate({
  [Segments.HEADERS]: Joi.object({
    token: Joi.string().required(),
  }).unknown(),
});

const validatorLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    usuario: Joi.string().required(),
    senha: Joi.string().required().min(8).max(16),
  }),
});

const validatorLogout = celebrate({
  [Segments.HEADERS]: Joi.object({
    token: Joi.string().required(),
  }).unknown(),
});

module.exports = {
  validatorLogin,
  validatorSession,
  validatorLogout,
};
