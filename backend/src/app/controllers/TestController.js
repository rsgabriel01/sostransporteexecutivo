// const { user } = require("../models");
// const Sequelize = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      console.log(req.body);

      return res.json(req.body);
    } catch (error) {
      console.log(error);
    }
  },
};
