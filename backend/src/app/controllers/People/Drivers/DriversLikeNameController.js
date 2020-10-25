const { Type_people, People, Vehicles } = require("../../../models");
const {
  Op,
  fn,
  col,
  literal,
  QueryTypes,
  Sequelize,
  models,
} = require("sequelize");

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
        attributes: ["id", "id_type", "id_people", "active"],
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
        attributes: ["id", "id_type", "id_people", "active"],
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
    console.log("aaaq");
    try {
      const driver = await Type_people.findAll({
        where: {
          id_type: 3,
          active: false,
          [Op.or]: [
            {
              "$People.active$": false,
            },
            {
              "$People.active$": true,
            },
          ],
          "$People.name$": { [Op.like]: `${name.toUpperCase()}%` },
        },
        attributes: ["id", "id_type", "id_people", "active"],
        include: ["People"],
        order: [["id", "ASC"]],
      });

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },

  async indexActiveVehicleNoLikeName(req, res) {
    const { name } = req.query;

    try {
      const driversWithVehicles = await Vehicles.findAll({
        include: ["People"],
        order: [["id", "ASC"]],
      });

      const personIdsOfDriversWithVehicles = driversWithVehicles.map(function (
        index
      ) {
        return Number(index.id_people);
      });

      const driversWithoutVehicle = await Type_people.findAll({
        where: {
          id_type: 3,
          active: true,
          "$People.name$": { [Op.like]: `${name.toUpperCase()}%` },
          "$People.id$": { [Op.notIn]: personIdsOfDriversWithVehicles },
          "$People.active$": true,
        },
        attributes: ["id", "id_type", "id_people", "active"],
        include: ["People"],
        order: [["id", "ASC"]],
      });

      return res.json(driversWithoutVehicle);
    } catch (error) {
      console.log(error);
    }
  },
};
