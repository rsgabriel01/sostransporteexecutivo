const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const people = await People.findAll({
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActive(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: true,
        },
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactive(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: false,
        },
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },
};
