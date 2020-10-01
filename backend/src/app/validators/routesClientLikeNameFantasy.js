// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorClientIndexLikeNameFantasy = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
    id_executingClient: Joi.number().positive().integer().required(),
  }).unknown(),
  [Segments.QUERY]: {
    nameFantasy: Joi.string().required().allow("", null),
  },
});

module.exports = {
  validatorClientIndexLikeNameFantasy,
};
