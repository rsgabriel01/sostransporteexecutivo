// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorDriverCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idPerson: Joi.number().positive().integer().required(),
    cnh: Joi.string().regex(/^\d+$/).required().min(8).max(12),
    numPermit: Joi.string().regex(/^\d+$/).required().min(7).max(15),
    businessPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    active: Joi.boolean().required(),
  }),
});

const validatorDriverUpdate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idPeopleDriver: Joi.number().positive().integer().required(),
    cnh: Joi.string().regex(/^\d+$/).required().min(8).max(12),
    numPermit: Joi.string().regex(/^\d+$/).required().min(7).max(15),
    businessPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    active: Joi.boolean().required(),
  }),
});

const validatorDriversIndexLikeName = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    name: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorDriverCreate,
  validatorDriversIndexLikeName,
};
