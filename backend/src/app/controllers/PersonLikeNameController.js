const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeName(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          [Op.or]: [
            { "$People_Type.Type_people.id_type$": 1 },
            { "$People_Type.Type_people.id_type$": 2 },
          ],
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveLikeName(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        // attributes: ["People_type.id_type"],
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: true,
          [Op.or]: [
            { "$People_Type.Type_people.id_type$": 1 },
            { "$People_Type.Type_people.id_type$": 2 },
          ],
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactiveLikeName(req, res) {
    const { name } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: false,
          [Op.or]: [
            { "$People_Type.Type_people.id_type$": 1 },
            { "$People_Type.Type_people.id_type$": 2 },
          ],
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },
};
