const { Citys } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const citys = await Citys.findAll({
        include: ["Neighborhoods", "State"],
      });

      return res.json(citys);
    } catch (error) {
      console.log(error);
    }
  },
};
