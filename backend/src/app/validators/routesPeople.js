// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorPeopleIndexActive = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingperson: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    name: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorPeopleIndexActive,
};
