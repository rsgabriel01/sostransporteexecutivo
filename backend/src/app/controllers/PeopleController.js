const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const people = await People.findAll({
        include: [
          "Logins",
          "Vehicles",
          "People_address",
          "People_Type",
          "Service_orders_clients",
          "Service_orders_users_attendance",
          "Service_orders_drivers",
        ],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },
};
