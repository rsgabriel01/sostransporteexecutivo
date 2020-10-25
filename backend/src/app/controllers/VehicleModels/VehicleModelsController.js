const { Vehicle_models } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const vehicleModels = await Vehicle_models.findAll({
        include: ["Vehicles", "Vehicle_model"],
      });

      return res.json(vehicleModels);
    } catch (error) {
      console.log(error);
    }
  },
};
