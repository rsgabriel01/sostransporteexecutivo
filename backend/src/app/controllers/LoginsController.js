const { Logins } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const logins = await Logins.findAll({
        include: ["People", "Sessions"],
      });

      return res.json(logins);
    } catch (error) {
      console.log(error);
    }
  },
};
