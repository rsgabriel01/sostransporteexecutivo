const { Service_orders } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const serviceOrders = await Service_orders.findAll({
        include: [
          "Client",
          "User_attendance",
          "Driver",
          "Status",
          "Neighborhood_origin",
          "Neighborhood_destiny",
          "User_completion",
        ],
      });

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },
};
