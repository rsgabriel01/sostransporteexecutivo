const { States } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const states = await States.findAll({
        include: ["Citys"],
      });

      return res.json(states);
    } catch (error) {
      console.log(error);
    }
  },
};
