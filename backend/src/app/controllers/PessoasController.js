const { Pessoas } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const pessoas = await Pessoas.findAll();

      return res.json(pessoas);
    } catch (error) {
      console.log(error);
    }
  },
};
