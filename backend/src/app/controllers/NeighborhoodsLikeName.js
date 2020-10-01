const { Neighborhood } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeNameFantsy(req, res) {
    const { name } = req.query;

    try {
      const neighborhood = await Neighborhood.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`,
          },
        },
        order: [["id", "ASC"]],
      });

      console.log(neighborhood);
      return res.json(neighborhood);
    } catch (error) {
      console.log(error);
    }
  },
};
