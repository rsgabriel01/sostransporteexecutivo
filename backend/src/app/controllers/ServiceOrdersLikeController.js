const {
  Service_orders,
  Neighborhoods,
  Vehicles,
  Vehicle_models,
} = require("../models");
const {
  Op,
  fn,
  col,
  literal,
  QueryTypes,
  Sequelize,
  cast,
} = require("sequelize");

const moment = require("moment");

const idTypeClient = 4;

module.exports = {
  async indexLikeIdClientDate(req, res) {
    const { nameFantasyClient, dateSolicitation } = req.query;

    console.log(`${dateSolicitation} 00:00:00-03`);

    try {
      const serviceOrders = await Service_orders.findAll({
        where: {
          "$Client.name_fantasy$": { [Op.like]: `${nameFantasyClient}%` },
          date_time_solicitation: {
            [Op.gte]: `${dateSolicitation} 00:00:00-03`,
          },
        },
        include: [
          "Status",
          "Client",
          {
            model: Vehicles,
            as: "Vehicle",
            include: {
              model: Vehicle_models,
              as: "VehicleModel",
              include: ["ModelBrand"],
            },
          },
          "Driver",
          "Neighborhood_origin",
          {
            model: Neighborhoods,
            as: "Neighborhood_destiny",
            include: ["Travel_fee"],
          },
        ],
        order: [["id", "ASC"]],
      });

      console.log(
        moment.utc(serviceOrders.date_time_solicitation).local().format()
      );
      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },
};
