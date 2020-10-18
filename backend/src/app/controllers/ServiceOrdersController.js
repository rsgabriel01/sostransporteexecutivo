const {
  Service_orders,
  People,
  People_type,
  Neighborhoods,
} = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

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
        id_client: idClient,
        client_origin: clientOrigin,
        id_neighborhood_origin: idNeighborhoodOrigin,
        street_origin: streetOrigin,
        street_number_origin: streetNumberOrigin,
        complement_origin: complementOrigin,
        client_destiny: clientDestiny,
        id_neighborhood_destiny: idNeighborhoodDestiny,
        street_destiny: streetDestiny,
        street_number_destiny: streetNumberDestiny,
        complement_destiny: complementDestiny,
        observation_service: observationService,
      });

      if (createdOs) {
        return res.status(201).json({
          createdOs,
          message: "Cadastro de cliente efetuado com sucesso!",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
