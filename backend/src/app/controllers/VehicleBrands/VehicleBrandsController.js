const { Vehicle_brands } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const vehicleBrands = await Vehicle_brands.findAll({
        include: ["Vehicle_models"],
      });

      return res.json(vehicleBrands);
    } catch (error) {
      console.log(error);
    }
  },
};
