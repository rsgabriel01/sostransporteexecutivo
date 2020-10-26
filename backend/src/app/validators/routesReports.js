// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const indexCompletedWithIdClientAndPeriod = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    idClient: Joi.number().positive().integer().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
  },
});

module.exports = {
  indexCompletedWithIdClientAndPeriod,
};
