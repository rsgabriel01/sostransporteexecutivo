var express = require("express");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");
const { People, Sessions, Type_people } = require("../models");
const moment = require("moment");

const permissionAdminAttendance = async function (req, res, next) {
  const { id_executingperson } = req.headers;

  const executingPersonData = await People.findOne({
    where: {
      id: id_executingperson,
    },
    include: ["People_Type", "Users"],
  });

  if (executingPersonData) {
    const activeExecutingPerson = executingPersonData.Users.active;

    if (activeExecutingPerson != true) {
      return res.status(401).json({
        message: "Ação não permitida.",
      });
    }

    typeIds = executingPersonData.People_Type.map(function (index) {
      if (index.active) {
        return index.Type_people.id_type;
      }
    });
  } else {
    return res.status(401).json({
      message: "Ação não permitida.",
    });
  }

  if (!typeIds.includes("1") && !typeIds.includes("2")) {
    return res.status(401).json({
      message: "Seu usuário não tem permissao para realizar essa operação",
      typeIds,
    });
  }

  next();
};

module.exports = {
  permissionAdminAttendance,
};
