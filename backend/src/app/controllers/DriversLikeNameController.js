const { Type_people } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeName(req, res) {
    const { name } = req.query;
    console.log("aq");

    try {
      const driver = await Type_people.findAll({
        where: {
          id_type: 3,
          "$People.name$": { [Op.like]: `${name.toUpperCase()}%` },
        },
        attributes: ["id"],
        include: ["People"],
        order: [["id", "ASC"]],
      });

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveLikeName(req, res) {
    const { name } = req.query;

    try {
      const driver = await Type_people.findAll({
        where: {
          id_type: 3,
          active: true,
          "$People.name$": { [Op.like]: `${name.toUpperCase()}%` },
          "$People.active$": true,
        },
        attributes: ["id"],
        include: ["People"],
        order: [["id", "ASC"]],
      });

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactiveLikeName(req, res) {
    const { name } = req.query;

    try {
      const driver = await Type_people.findAll({
        where: {
          id_type: 3,
          active: false,
          "$People.name$": { [Op.like]: `${name.toUpperCase()}%` },
          "$People.active$": false,
        },
        attributes: ["id"],
        include: ["People"],
        order: [["id", "ASC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
