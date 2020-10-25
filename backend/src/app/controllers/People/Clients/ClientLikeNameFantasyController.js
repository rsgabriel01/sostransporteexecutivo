const { People, People_address } = require("../../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const idTypeClient = 4;

module.exports = {
  async indexLikeNameFantsy(req, res) {
    const { nameFantasy } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name_fantasy: {
            [Op.like]: `${nameFantasy.toUpperCase()}%`,
          },
          "$People_Type.Type_people.id_type$": idTypeClient,
        },
        include: ["People_Type"],
        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveLikeNameFantasy(req, res) {
    const { nameFantasy } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name_fantasy: {
            [Op.like]: `${nameFantasy.toUpperCase()}%`,
          },
          active: true,
          "$People_Type.Type_people.id_type$": idTypeClient,
        },
        include: [
          "People_Type",
          {
            model: People_address,
            as: "People_address",
            include: ["Neighborhood"],
          },
        ],

        order: [["id", "ASC"]],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactiveLikeNameFantasy(req, res) {
    const { nameFantasy } = req.query;

    try {
      const people = await People.findAll({
        where: {
          name_fantasy: {
            [Op.like]: `${nameFantasy.toUpperCase()}%`,
          },
          active: false,
          "$People_Type.Type_people.id_type$": idTypeClient,
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
