const {
  Service_orders,
  People,
  Vehicles,
  Vehicle_models,
  Neighborhoods,
  Type_people,
  Types,
} = require("../models");

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
            return os.Neighborhood_destiny.Travel_fee.value;
          } else if (!os.client_origin && os.client_destiny) {
            return os.Neighborhood_origin.Travel_fee.value;
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

  async show(req, res) {
    try {
      const { idServiceOrder } = req.params;

      const serviceOrder = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
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
        order: [["id", "ASC"]],
      });

      if (!serviceOrder) {
        return res.status(400).json({
          message:
            "Nenhuma ordem de serviço foi encontrado com o código fornecido, por favor verifique.",
        });
      }

      return res.json(serviceOrder);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const {
        idClient,
        clientOrigin,
        idNeighborhoodOrigin,
        streetOrigin,
        streetNumberOrigin,
        complementOrigin,
        clientDestiny,
        idNeighborhoodDestiny,
        streetDestiny,
        streetNumberDestiny,
        complementDestiny,
        passengerName,
        passengerPhone,
        numberPassengers,
        observationService,
      } = req.body;

      const { id_executingperson } = req.headers;

      const clientFinded = await People.findOne({
        where: {
          id: idClient,
          active: true,
          "$People_Type.Type_people.id_type$": 4,
          "$People_Type.Type_people.active$": true,
        },
        include: ["People_Type"],
      });

      if (!clientFinded) {
        return res.status(400).json({
          message:
            "O cliente informado não existe ou não está ativo, por favor verifique.",
        });
      }

      const neighborhoodOriginFinded = await Neighborhoods.findOne({
        where: {
          id: idNeighborhoodOrigin,
        },
      });

      if (!neighborhoodOriginFinded) {
        return res.status(400).json({
          message:
            "O bairro de origem informado não foi encontrado em nossa base de dados, por favor verifique.",
        });
      }

      const neighborhoodDestinyFinded = await Neighborhoods.findOne({
        where: {
          id: idNeighborhoodDestiny,
        },
      });

      if (!neighborhoodDestinyFinded) {
        return res.status(400).json({
          message:
            "O bairro de destino informado não foi encontrado em nossa base de dados, por favor verifique.",
        });
      }

      const createdOs = await Service_orders.create({
        id_user_solicitation: id_executingperson,
        id_client: idClient,
        id_status: 1,
        date_time_solicitation: moment().format(),
        id_neighborhood_origin: idNeighborhoodOrigin,
        street_origin: streetOrigin.toUpperCase(),
        street_number_origin: streetNumberOrigin,
        complement_origin: complementOrigin.toUpperCase(),
        client_origin: clientOrigin,
        id_neighborhood_destiny: idNeighborhoodDestiny,
        street_destiny: streetDestiny.toUpperCase(),
        street_number_destiny: streetNumberDestiny,
        complement_destiny: complementDestiny.toUpperCase(),
        client_destiny: clientDestiny,
        passenger_name: passengerName.toUpperCase(),
        passenger_phone: passengerPhone,
        number_passengers: numberPassengers,
        observation_service: observationService.toUpperCase(),
      });

      if (createdOs) {
        return res.status(201).json({
          createdOs,
          message: `Cadastro de ordem de serviço efetuado com sucesso! Código: ${createdOs.id}`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
