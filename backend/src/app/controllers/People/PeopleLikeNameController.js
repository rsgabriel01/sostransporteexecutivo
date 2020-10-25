const { People } = require("../../models");
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
            { "$People_Type.Type_people.id_type$": 3 },
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
        where: {
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
          active: true,
          [Op.or]: [
            { "$People_Type.Type_people.id_type$": 1 },
            { "$People_Type.Type_people.id_type$": 2 },
            { "$People_Type.Type_people.id_type$": 3 },
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
            { "$People_Type.Type_people.id_type$": 3 },
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

  async indexActiveNoDriverLikeName(req, res) {
    const { name } = req.query;

    try {
      const drivers = await People.findAll({
        where: {
          active: true,
          "$People_Type.Type_people.id_type$": 3,
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });

      console.log(drivers);
      const driversIds = drivers.map(function (index) {
        return Number(index.id);
      });

      console.log(driversIds);

      const peopleNotDriver = await People.findAll({
        where: {
          id: { [Op.notIn]: driversIds },
          active: true,
          name: { [Op.like]: `${name.toUpperCase()}%` },
          "$People_Type.Type_people.id_type$": { [Op.ne]: 4 },
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });
      return res.json(peopleNotDriver);
    } catch (error) {
      console.log(error);
    }
  },
};
