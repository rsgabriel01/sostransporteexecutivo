const { Neighborhoods } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const neighborhoods = await Neighborhoods.findAll({
        include: ["Travel_fee"],
      });

      return res.json(neighborhoods);
    } catch (error) {
      console.log(error);
    }
  },
};
