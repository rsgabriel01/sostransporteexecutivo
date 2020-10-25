const {
  Service_orders,
  People,
  Vehicles,
  Vehicle_models,
  Neighborhoods,
  Type_people,
  Types,
} = require("../../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async indexCompletedWithIdClientAndPeriod(req, res) {
    const { idClient, startDate, endDate } = req.query;
    console.log(idClient);
    console.log(startDate);
    console.log(endDate);

    try {
      const serviceOrders = await Service_orders.findAll({
        where: {
          id_client: idClient,
          id_status: { [Op.or]: [8, 98] },
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
          {
            model: People,
            as: "Driver",
            include: {
              model: Types,
              through: "Type_people",
              as: "People_Type",
              where: {
                "$Driver.People_Type.Type_people.id_type$": 3,
              },
            },
          },
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
        order: [["id", "DESC"]],
      });

      const serviceOrdersAllTravelFees = await Service_orders.findAll({
        where: {
          id_client: idClient,
          id_status: { [Op.or]: [8, 98] },
          date_time_completion: {
            [Op.between]: [
              `${startDate} 00:00:00-03`,
              `${endDate} 23:59:59-03`,
            ],
          },
        },
        include: [
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
        order: [["id", "DESC"]],
      });

      const arrValuesServiceOrders = serviceOrdersAllTravelFees.map((os) => {
        if (os.id_status === 8 || os.id_status === "8") {
          if (os.client_origin && !os.client_destiny) {
            if (os.id_neighborhood_destiny === os.id_neighborhood_origin) {
              return os.Neighborhood_destiny.Travel_fee.value / 2;
            } else {
              return os.Neighborhood_destiny.Travel_fee.value;
            }
          } else if (!os.client_origin && os.client_destiny) {
            if (os.id_neighborhood_origin === os.id_neighborhood_destiny) {
              return os.Neighborhood_origin.Travel_fee.value / 2;
            } else {
              return os.Neighborhood_origin.Travel_fee.value;
            }
          }
        } else if (os.id_status === 98 || os.id_status === "98") {
          return os.cancellation_fee;
        }
      });

      console.log(arrValuesServiceOrders);

      const totalValueServiceOrders = arrValuesServiceOrders.reduce(
        (total, sum) => total + sum,
        0
      );

      const totalAmountServiceOrders = arrValuesServiceOrders.reduce(
        (total) => total + 1,
        0
      );

      console.log(totalValueServiceOrders);

      const responseData = {
        serviceOrders,
        monthlyData: {
          totalValue: totalValueServiceOrders,
          totalAmount: totalAmountServiceOrders,
        },
      };

      return res.json(responseData);
    } catch (error) {
      console.log(error);
    }
  },
};
