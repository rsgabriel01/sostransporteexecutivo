// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorOsCreate = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    idClient: Joi.number().positive().integer().required(),
    clientOrigin: Joi.boolean().required(),
    idNeighborhoodOrigin: Joi.number().positive().integer().required(),
    streetOrigin: Joi.string().required(),
    streetNumberOrigin: Joi.string().required(),
    complementOrigin: Joi.string().required().allow("", null),
    clientDestiny: Joi.boolean().required(),
    idNeighborhoodDestiny: Joi.number().positive().integer().required(),
    streetDestiny: Joi.string().required(),
    streetNumberDestiny: Joi.string().required(),
    complementDestiny: Joi.string().required().allow("", null),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsIndexLike = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    nameFantasy: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorOsCreate,
  validatorOsIndexLike,
};
