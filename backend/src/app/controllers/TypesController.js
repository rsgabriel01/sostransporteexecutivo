const { Types } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const types = await Types.findAll({
        include: ["Type_People"],
      });

      return res.json(types);
    } catch (error) {
      console.log(error);
    }
  },
};
