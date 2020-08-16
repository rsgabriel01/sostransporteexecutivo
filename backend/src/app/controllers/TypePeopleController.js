const { Type_people } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const typePeople = await Type_people.findAll({});

      return res.json(typePeople);
    } catch (error) {
      console.log(error);
    }
  },
};
