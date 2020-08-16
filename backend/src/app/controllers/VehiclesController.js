const { Vehicles } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const vehicles = await Vehicles.findAll({
        include: ["Vehicle_model", "People"],
      });

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },
};
