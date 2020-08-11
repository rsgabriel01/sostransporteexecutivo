const { Pessoa } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const pessoas = await Pessoa.findAll();

      return res.json(pessoas);
    } catch (error) {
      console.log(error);
    }
  },
};
