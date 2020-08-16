const { Status } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const status = await Status.findAll({
        include: ["Service_orders"],
      });

      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
};
