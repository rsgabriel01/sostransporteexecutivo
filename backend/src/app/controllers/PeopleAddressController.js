const { People_address } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const peopleAddress = await People_address.findAll({
        include: ["People", "Neighborhood"],
      });

      return res.json(peopleAddress);
    } catch (error) {
      console.log(error);
    }
  },
};
