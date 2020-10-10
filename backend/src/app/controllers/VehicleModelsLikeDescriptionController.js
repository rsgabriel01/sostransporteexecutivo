const { Vehicle_models } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeDescription(req, res) {
    const { vehicleModel } = req.query;

    console.log("vehicleLikeDescription");
    try {
      const vehicleModels = await Vehicle_models.findAll({
        where: {
          description: {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
        },
        include: ["ModelBrand"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicleModels);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveLikeDescription(req, res) {
    const { vehicleModel } = req.query;

    try {
      const vehicleModels = await Vehicle_models.findAll({
        where: {
          description: {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
        },
        include: ["ModelBrand"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicleModels);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactiveLikeDescription(req, res) {
    const { vehicleModel } = req.query;

    try {
      const vehicleModels = await Vehicle_models.findAll({
        where: {
          description: {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
        },
        include: ["ModelBrand"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicleModels);
    } catch (error) {
      console.log(error);
    }
  },
};
