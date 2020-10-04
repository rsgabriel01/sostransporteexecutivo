// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorPersonCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    cpf_cnpj: Joi.string().regex(/^\d+$/).required().min(9).max(11),
    rg: Joi.string().regex(/^\d+$/).required().min(7).max(11),
    phone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    email: Joi.string().required().email(),
    typeAdmin: Joi.boolean().required(),
    typeAttendance: Joi.boolean().required(),
  }),
});

const validatorPersonShow = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    idPerson: Joi.number().positive().integer().required(),
  }),
});

const validatorPersonUpdate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idPeople: Joi.number().positive().integer().required(),
    name: Joi.string().required(),
    cpf_cnpj: Joi.string().regex(/^\d+$/).required().min(9).max(11),
    rg: Joi.string().regex(/^\d+$/).required().min(7).max(12),
    phone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .allow("", null),
    typeAdmin: Joi.boolean().required(),
    typeAttendance: Joi.boolean().required(),
    active: Joi.boolean().required(),
  }),
});

const validatorPersonIndexLikeName = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    name: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorPersonCreate,
  validatorPersonShow,
  validatorPersonUpdate,
  validatorPersonIndexLikeName,
};
