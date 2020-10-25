const {
  Service_orders,
  People,
  Vehicles,
  Vehicle_models,
  Neighborhoods,
  Type_people,
  Types,
  People_address,
} = require("../../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const serviceOrders = await Service_orders.findAll({
        include: [
          "Client",
          "User_attendance",
          "Driver",
          "Status",
          "Neighborhood_origin",
          "Neighborhood_destiny",
          "User_completion",
        ],
      });

      return res.json(serviceOrders);
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

      let travelValue;

      const { id_executingperson } = req.headers;

      const clientFinded = await People.findOne({
        where: {
          id: idClient,
          active: true,
          "$People_Type.Type_people.id_type$": 4,
          "$People_Type.Type_people.active$": true,
        },
        include: [
          "People_Type",
          {
            model: People_address,
            as: "People_address",
            include: [
              {
                model: Neighborhoods,
                as: "Neighborhood",
                include: ["Travel_fee"],
              },
            ],
          },
        ],
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
        include: ["Travel_fee"],
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
        include: ["Travel_fee"],
      });

      if (!neighborhoodDestinyFinded) {
        return res.status(400).json({
          message:
            "O bairro de destino informado não foi encontrado em nossa base de dados, por favor verifique.",
        });
      }

      if (clientOrigin && !clientDestiny) {
        if (idNeighborhoodDestiny === idNeighborhoodOrigin) {
          travelValue = neighborhoodDestinyFinded.Travel_fee.value / 2;
        } else {
          travelValue = neighborhoodDestinyFinded.Travel_fee.value;
        }
      } else if (!clientOrigin && clientDestiny) {
        if (idNeighborhoodOrigin === idNeighborhoodDestiny) {
          travelValue = neighborhoodOriginFinded.Travel_fee.value / 2;
        } else {
          travelValue = neighborhoodOriginFinded.Travel_fee.value;
        }
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
        travel_value: travelValue,
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

  async destroyNoFee(req, res) {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async destroyWithFee(req, res) {
    try {
      const { idServiceOrder } = req.params;
      const { observationCancellation } = req.body;

      let columnsCancellation = {
        observation_cancellation: observationCancellation,
        id_status: 99,
      };

      const serviceOrder = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
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
      });

      if (!serviceOrder) {
        return res.status(400).json({
          message:
            "Não foi encontrado ordem de serviço com o código fornecido, por favor verifique.",
        });
      }

      if (serviceOrder.id_status > 4) {
        return res.status(400).json({
          message:
            "Não foi cancelar essa ordem de serviço, a mesma não está em situação apta de cancelamento, por favor verifique.",
        });
      }

      if (serviceOrder.id_status === 4 || serviceOrder.id_status === "4") {
        columnsCancellation.id_status = 98;

        if (serviceOrder.client_origin && !serviceOrder.client_destiny) {
          if (
            serviceOrder.id_neighborhood_destiny ===
            serviceOrder.id_neighborhood_origin
          ) {
            columnsCancellation["cancellation_fee"] =
              serviceOrder.Neighborhood_destiny.Travel_fee.value / 2 / 2;
          } else {
            columnsCancellation["cancellation_fee"] =
              serviceOrder.Neighborhood_destiny.Travel_fee.value / 2;
          }
        } else if (!serviceOrder.client_origin && serviceOrder.client_destiny) {
          if (
            serviceOrder.id_neighborhood_origin ===
            serviceOrder.id_neighborhood_destiny
          ) {
            columnsCancellation["cancellation_fee"] =
              serviceOrder.Neighborhood_origin.Travel_fee.value / 2 / 2;
          } else {
            columnsCancellation["cancellation_fee"] =
              serviceOrder.Neighborhood_origin.Travel_fee.value / 2;
          }
        }
      }

      console.log(serviceOrder.id_status);
      console.log(columnsCancellation);

      await Service_orders.update(columnsCancellation, {
        where: {
          id: idServiceOrder,
        },
      });

      return res.json({
        message: `Ordem de serviço ${serviceOrder.id} cancelada com sucesso!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
