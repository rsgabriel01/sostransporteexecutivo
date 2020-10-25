const {
  Service_orders,
  Neighborhoods,
  Vehicles,
  Vehicle_models,
} = require("../../models");
const {
  Op,
  fn,
  col,
  literal,
  QueryTypes,
  Sequelize,
  cast,
} = require("sequelize");

module.exports = {
  async indexLikeClientSituationDate(req, res) {
    const { nameFantasyClient, situation, dateSolicitation } = req.query;

    let serviceOrders = [];

    try {
      console.log(situation);
      console.log(dateSolicitation);
      console.log(" ");
      if (situation === 0 || situation === "0") {
        serviceOrders = await Service_orders.findAll({
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
            {
              model: Neighborhoods,
              as: "Neighborhood_origin",
              include: ["Travel_fee"],
            },
            {
              model: Neighborhoods,
              as: "Neighborhood_destiny",
              include: ["Travel_fee"],
            },
          ],
          order: [["id", "ASC"]],
        });
      } else {
        serviceOrders = await Service_orders.findAll({
          where: {
            "$Client.name_fantasy$": { [Op.like]: `${nameFantasyClient}%` },
            id_status: situation,
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
            {
              model: Neighborhoods,
              as: "Neighborhood_origin",
              include: ["Travel_fee"],
            },
            {
              model: Neighborhoods,
              as: "Neighborhood_destiny",
              include: ["Travel_fee"],
            },
          ],
          order: [["id", "ASC"]],
        });
      }

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },

  async indexSituations(req, res) {
    const { situations } = req.query;

    let serviceOrders = [];

    const arraySituationsString = situations.split(",");

    const arraySituationsInt = arraySituationsString.map((situation) =>
      Number(situation)
    );

    try {
      if (
        !arraySituationsInt.includes("NaN") &&
        !arraySituationsInt.includes(NaN) &&
        !arraySituationsInt.includes("nan")
      ) {
        if (situations === 0 || situations === "0") {
          serviceOrders = await Service_orders.findAll({
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        } else {
          serviceOrders = await Service_orders.findAll({
            where: {
              id_status: { [Op.in]: arraySituationsInt },
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        }
      } else {
        return res.status(400).json({
          error:
            "Os parametros de rota não são como o esperado, por favor verifique",
        });
      }

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },

  async indexSituationsPeriodSolicitation(req, res) {
    const { situations, startDate, endDate } = req.query;

    let serviceOrders = [];

    const arraySituationsString = situations.split(",");

    const arraySituationsInt = arraySituationsString.map((situation) =>
      Number(situation)
    );

    try {
      if (
        !arraySituationsInt.includes("NaN") &&
        !arraySituationsInt.includes(NaN) &&
        !arraySituationsInt.includes("nan")
      ) {
        if (situations === 0 || situations === "0") {
          serviceOrders = await Service_orders.findAll({
            where: {
              date_time_solicitation: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        } else {
          serviceOrders = await Service_orders.findAll({
            where: {
              id_status: { [Op.in]: arraySituationsInt },
              date_time_solicitation: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        }
      } else {
        return res.status(400).json({
          error:
            "Os parametros de rota não são como o esperado, por favor verifique",
        });
      }

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },

  async indexSituationsPeriodAttendance(req, res) {
    const { situations, startDate, endDate } = req.query;

    let serviceOrders = [];

    const arraySituationsString = situations.split(",");

    const arraySituationsInt = arraySituationsString.map((situation) =>
      Number(situation)
    );

    try {
      if (
        !arraySituationsInt.includes("NaN") &&
        !arraySituationsInt.includes(NaN) &&
        !arraySituationsInt.includes("nan")
      ) {
        if (situations === 0 || situations === "0") {
          serviceOrders = await Service_orders.findAll({
            where: {
              date_time_attendance: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        } else {
          serviceOrders = await Service_orders.findAll({
            where: {
              id_status: { [Op.in]: arraySituationsInt },
              date_time_attendance: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        }
      } else {
        return res.status(400).json({
          error:
            "Os parametros de rota não são como o esperado, por favor verifique",
        });
      }

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },

  async indexSituationsPeriodCompletion(req, res) {
    const { situations, startDate, endDate } = req.query;

    let serviceOrders = [];

    const arraySituationsString = situations.split(",");

    const arraySituationsInt = arraySituationsString.map((situation) =>
      Number(situation)
    );

    try {
      if (
        !arraySituationsInt.includes("NaN") &&
        !arraySituationsInt.includes(NaN) &&
        !arraySituationsInt.includes("nan")
      ) {
        if (situations === 0 || situations === "0") {
          serviceOrders = await Service_orders.findAll({
            where: {
              date_time_completion: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        } else {
          serviceOrders = await Service_orders.findAll({
            where: {
              id_status: { [Op.in]: arraySituationsInt },
              date_time_completion: {
                [Op.between]: [
                  `${startDate} 00:00:00-03`,
                  `${endDate} 23:59:59-03`,
                ],
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
              {
                model: Neighborhoods,
                as: "Neighborhood_origin",
                include: ["Travel_fee"],
              },
              {
                model: Neighborhoods,
                as: "Neighborhood_destiny",
                include: ["Travel_fee"],
              },
            ],
            order: [["id", "ASC"]],
          });
        }
      } else {
        return res.status(400).json({
          error:
            "Os parametros de rota não são como o esperado, por favor verifique",
        });
      }

      return res.json(serviceOrders);
    } catch (error) {
      console.log(error);
    }
  },
};
