const { Travel_fee } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const travelFees = await Travel_fee.findAll({
        include: ["Neighborhood"],
      });

      return res.json(travelFees);
    } catch (error) {
      console.log(error);
    }
  },
};
