var express = require("express");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");
const { People, Sessions, Type_people } = require("../models");
const moment = require("moment");

const verifySession = async function (req, res, next) {
  const { authorization } = req.headers;

  const sessionFinded = await Sessions.findAll({
    where: {
      token: authorization,
    },
  });

  if (sessionFinded.length == 0) {
    return res.status(401).json({
      message: "Token de sessão inválido, por favor faça login novamente.",
    });
  }

  const [{ expiration }] = sessionFinded;

  const expirationDate = moment.utc(expiration).local().format();

  if (!moment(expirationDate).isSameOrAfter(moment())) {
    return res.status(401).json({
      message: "Token de sessão inválido, por favor faça login novamente.",
    });
  }

  next();
};

module.exports = {
  verifySession,
};
