const { Neighborhoods } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeName(req, res) {
    const { name } = req.query;

    const idCascavelCity = 5941;

    try {
      const neighborhoods = await Neighborhoods.findAll({
        where: {
          id_city: idCascavelCity,
          name: {
            [Op.like]: `${name.toUpperCase()}%`,
          },
        },
        include: ["Travel_fee"],
        order: [["id", "ASC"]],
      });

      return res.json(neighborhoods);
    } catch (error) {
      console.log(error);
    }
  },
};
