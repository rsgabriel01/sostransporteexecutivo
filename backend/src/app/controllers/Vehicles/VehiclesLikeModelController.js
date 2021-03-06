const { Vehicles } = require("../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async indexLikeModel(req, res) {
    const { vehicleModel } = req.query;

    console.log("vehicleLikeModel");
    try {
      const vehicles = await Vehicles.findAll({
        where: {
          "$VehicleModel.description$": {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
        },
        include: ["VehicleModel", "People"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveLikeModel(req, res) {
    const { vehicleModel } = req.query;

    try {
      const vehicles = await Vehicles.findAll({
        where: {
          "$VehicleModel.description$": {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
          active: true,
        },
        include: ["VehicleModel", "People"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },

  async indexInactiveLikeModel(req, res) {
    const { vehicleModel } = req.query;

    try {
      const vehicles = await Vehicles.findAll({
        where: {
          "$VehicleModel.description$": {
            [Op.like]: `${vehicleModel.toUpperCase()}%`,
          },
          active: false,
        },
        include: ["VehicleModel", "People"],
        order: [["id", "ASC"]],
      });

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },
};
