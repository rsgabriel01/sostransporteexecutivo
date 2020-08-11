// const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const validatorTest = celebrate({
  [Segments.BODY]: Joi.object().keys({
    user: Joi.string().required(),
    password: Joi.string().required().min(8).max(16),
    email: Joi.string().required().email(),
  }),
});

const validatorTest1 = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
      password: Joi.string().required().min(8).max(16),
      email: Joi.string().required().email(),
    }),
  });

  next();
};
module.exports = {
  validatorTest,
  validatorTest1,
};
