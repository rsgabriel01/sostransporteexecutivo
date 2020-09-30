const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

var CpfValidation = require("../helpers/CpfValidation");

module.exports = {
  async index(req, res) {
    try {
      const people = await People.findAll({});

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveInactive(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: true,
        },
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },
};
