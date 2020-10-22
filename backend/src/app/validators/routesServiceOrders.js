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
    passengerName: Joi.string().required(),
    passengerPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    numberPassengers: Joi.number().positive().integer().required(),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsUpdateSituation1 = celebrate({
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
    passengerName: Joi.string().required(),
    passengerPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    numberPassengers: Joi.number().positive().integer().required(),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsShow = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    idServiceOrder: Joi.number().positive().integer().required(),
  }),
});

const validatorOsUpdateSituation2 = celebrate({
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
    passengerName: Joi.string().required(),
    passengerPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    numberPassengers: Joi.number().positive().integer().required(),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsUpdateSituation3 = celebrate({
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
    passengerName: Joi.string().required(),
    passengerPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    numberPassengers: Joi.number().positive().integer().required(),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsUpdateSituation7and8 = celebrate({
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
    passengerName: Joi.string().required(),
    passengerPhone: Joi.string().regex(/^\d+$/).required().min(10).max(11),
    numberPassengers: Joi.number().positive().integer().required(),
    observationService: Joi.string().required().allow("", null),
  }),
});

const validatorOsIndexLikeIdClient = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    nameFantasyClient: Joi.string().required().allow("", null),
    dateSolicitation: Joi.string().required(),
  },
});

module.exports = {
  validatorOsCreate,
  validatorOsShow,
  validatorOsIndexLikeIdClient,
};
