const { Neighborhoods } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const neighborhoods = await Neighborhoods.findAll({
        include: [
          "Travel_fee",
          "Service_orders_neighborhoods_origin",
          "Service_orders_neighborhoods_destiny",
          "People_address",
          "City",
        ],
      });

      return res.json(neighborhoods);
    } catch (error) {
      console.log(error);
    }
  },
};
