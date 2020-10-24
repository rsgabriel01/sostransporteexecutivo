const {
  Service_orders,
  People,
  Type_people,
  Neighborhoods,
  Vehicles,
} = require("../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async updateSituation1(req, res) {
    try {
      let columnsUpdateOs = {};

      let idClientOld = "";

      let clientOriginOld = true;
      let idNeighborhoodOriginOld = "";
      let streetOriginOld = "";
      let streetNumberOriginOld = "";
      let complementOriginOld = "";

      let clientDestinyOld = false;
      let idNeighborhoodDestinyOld = "";
      let streetDestinyOld = "";
      let streetNumberDestinyOld = "";
      let complementDestinyOld = "";

      let passengerNameOld = "";
      let passengerPhoneOld = "";
      let numberPassengersOld = "";

      let observationServiceOld = "";
      let observationUpdateOld = "";

      const {
        idServiceOrder,
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
        observationUpdate,
      } = req.body;

      console.log(req.body);

      const oldOsFinded = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
        },
      });

      console.log(JSON.stringify(oldOsFinded));

      if (oldOsFinded) {
        idClientOld = oldOsFinded.id_client;

        clientOriginOld = oldOsFinded.client_origin;
        idNeighborhoodOriginOld = oldOsFinded.id_neighborhood_origin;
        streetOriginOld = oldOsFinded.street_origin;
        streetNumberOriginOld = oldOsFinded.street_number_origin;
        complementOriginOld = oldOsFinded.complement_origin;

        clientDestinyOld = oldOsFinded.client_destiny;
        idNeighborhoodDestinyOld = oldOsFinded.id_neighborhood_destiny;
        streetDestinyOld = oldOsFinded.street_destiny;
        streetNumberDestinyOld = oldOsFinded.street_number_destiny;
        complementDestinyOld = oldOsFinded.complement_destiny;

        passengerNameOld = oldOsFinded.passenger_name;
        passengerPhoneOld = oldOsFinded.passenger_phone;
        numberPassengersOld = oldOsFinded.number_passengers;

        observationServiceOld = oldOsFinded.observation_service;
        observationUpdateOld = oldOsFinded.observation_update;
      } else {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrado com o código informado.",
        });
      }

      if (Number(idClientOld) !== Number(idClient)) {
        const clientFinded = await People.findOne({
          where: {
            id: idClient,
            active: true,
          },
        });

        if (clientFinded) {
          return res.status(400).json({
            message:
              "O cliente informado para alteração não foi encontrado ou está inativo, por favor verifique.",
          });
        }

        columnsUpdateOs["id_client"] = idClient;
      }

      if (clientOriginOld !== clientOrigin) {
        columnsUpdateOs["client_origin"] = clientOrigin;
      }

      if (Number(idNeighborhoodOriginOld) !== Number(idNeighborhoodOrigin)) {
        const neighborhoodFinded = await Neighborhoods.findOne({
          where: {
            id: idNeighborhoodDestiny,
          },
        });

        if (!neighborhoodFinded) {
          return res.status(400).json({
            message:
              "O bairro informado não foi encontrado, por favor verifique.",
          });
        }

        columnsUpdateOs["id_neighborhood_origin"] = idNeighborhoodOrigin;
      }

      if (streetOriginOld !== streetOrigin) {
        columnsUpdateOs["street_origin"] = streetOrigin;
      }

      if (streetNumberOriginOld !== streetNumberOrigin) {
        columnsUpdateOs["street_number_origin"] = streetNumberOrigin;
      }

      if (complementOriginOld !== complementOrigin) {
        columnsUpdateOs["complement_origin"] = complementOrigin;
      }

      if (clientDestinyOld !== clientDestiny) {
        columnsUpdateOs["client_destiny"] = clientDestiny;
      }

      if (Number(idNeighborhoodDestinyOld) !== Number(idNeighborhoodDestiny)) {
        const neighborhoodFinded = await Neighborhoods.findOne({
          where: {
            id: idNeighborhoodDestiny,
          },
        });

        if (!neighborhoodFinded) {
          return res.status(400).json({
            message:
              "O bairro informado não foi encontrado, por favor verifique.",
          });
        }

        columnsUpdateOs["id_neighborhood_destiny"] = idNeighborhoodDestiny;
      }

      if (streetDestinyOld !== streetDestiny) {
        columnsUpdateOs["street_destiny"] = streetDestiny;
      }

      if (streetNumberDestinyOld !== streetNumberDestiny) {
        columnsUpdateOs["street_number_destiny"] = streetNumberDestiny;
      }

      if (complementDestinyOld !== complementDestiny) {
        columnsUpdateOs["complement_destiny"] = complementDestiny;
      }

      if (passengerNameOld !== passengerName) {
        columnsUpdateOs["passenger_name"] = passengerName;
      }

      if (passengerPhoneOld !== passengerPhone) {
        columnsUpdateOs["passenger_phone"] = passengerPhone;
      }

      if (Number(numberPassengersOld) !== Number(numberPassengers)) {
        columnsUpdateOs["number_passengers"] = numberPassengers;
      }

      if (observationServiceOld !== observationService) {
        columnsUpdateOs["observation_service"] = observationService;
      }

      if (observationUpdateOld !== "") {
        if (observationUpdateOld !== null) {
          columnsUpdateOs[
            "observation_update"
          ] = `${observationUpdateOld}; ${observationUpdate}`;
        } else {
          columnsUpdateOs["observation_update"] = observationUpdate;
        }
      } else {
        return res.status(400).json({
          message:
            "A observação de alteração não pode estar em branco, por favor verifique.",
        });
      }

      console.log(columnsUpdateOs);
      await Service_orders.update(columnsUpdateOs, {
        where: {
          id: idServiceOrder,
        },
      });

      const dataOsUpdated = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
        },
      });

      return res.json({
        dataOsUpdated,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async updateSituation2(req, res) {
    try {
      let columnsUpdateOs = {};

      let idClientOld = "";

      let clientOriginOld = true;
      let idNeighborhoodOriginOld = "";
      let streetOriginOld = "";
      let streetNumberOriginOld = "";
      let complementOriginOld = "";

      let clientDestinyOld = false;
      let idNeighborhoodDestinyOld = "";
      let streetDestinyOld = "";
      let streetNumberDestinyOld = "";
      let complementDestinyOld = "";

      let passengerNameOld = "";
      let passengerPhoneOld = "";
      let numberPassengersOld = "";

      let observationServiceOld = "";
      let observationUpdateOld = "";

      let idVehicleOld = "";
      let idDriverOld = "";

      const {
        idServiceOrder,
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
        observationUpdate,
        idVehicle,
        idDriver,
      } = req.body;

      console.log(req.body);

      const oldOsFinded = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
        },
      });

      console.log(JSON.stringify(oldOsFinded));

      if (oldOsFinded) {
        idClientOld = oldOsFinded.id_client;

        clientOriginOld = oldOsFinded.client_origin;
        idNeighborhoodOriginOld = oldOsFinded.id_neighborhood_origin;
        streetOriginOld = oldOsFinded.street_origin;
        streetNumberOriginOld = oldOsFinded.street_number_origin;
        complementOriginOld = oldOsFinded.complement_origin;

        clientDestinyOld = oldOsFinded.client_destiny;
        idNeighborhoodDestinyOld = oldOsFinded.id_neighborhood_destiny;
        streetDestinyOld = oldOsFinded.street_destiny;
        streetNumberDestinyOld = oldOsFinded.street_number_destiny;
        complementDestinyOld = oldOsFinded.complement_destiny;

        passengerNameOld = oldOsFinded.passenger_name;
        passengerPhoneOld = oldOsFinded.passenger_phone;
        numberPassengersOld = oldOsFinded.number_passengers;

        observationServiceOld = oldOsFinded.observation_service;
        observationUpdateOld = oldOsFinded.observation_update;

        idVehicleOld = oldOsFinded.id_vehicle;
        idDriverOld = oldOsFinded.id_driver;
      } else {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrado com o código informado.",
        });
      }

      if (Number(idClientOld) !== Number(idClient)) {
        const clientFinded = await People.findOne({
          where: {
            id: idClient,
            active: true,
          },
        });

        if (clientFinded) {
          return res.status(400).json({
            message:
              "O cliente informado para alteração não foi encontrado ou está inativo, por favor verifique.",
          });
        }

        columnsUpdateOs["id_client"] = idClient;
      }

      if (clientOriginOld !== clientOrigin) {
        columnsUpdateOs["client_origin"] = clientOrigin;
      }

      if (Number(idNeighborhoodOriginOld) !== Number(idNeighborhoodOrigin)) {
        const neighborhoodFinded = await Neighborhoods.findOne({
          where: {
            id: idNeighborhoodDestiny,
          },
        });

        if (!neighborhoodFinded) {
          return res.status(400).json({
            message:
              "O bairro informado não foi encontrado, por favor verifique.",
          });
        }

        columnsUpdateOs["id_neighborhood_origin"] = idNeighborhoodOrigin;
      }

      if (streetOriginOld !== streetOrigin) {
        columnsUpdateOs["street_origin"] = streetOrigin;
      }

      if (streetNumberOriginOld !== streetNumberOrigin) {
        columnsUpdateOs["street_number_origin"] = streetNumberOrigin;
      }

      if (complementOriginOld !== complementOrigin) {
        columnsUpdateOs["complement_origin"] = complementOrigin;
      }

      if (clientDestinyOld !== clientDestiny) {
        columnsUpdateOs["client_destiny"] = clientDestiny;
      }

      if (Number(idNeighborhoodDestinyOld) !== Number(idNeighborhoodDestiny)) {
        const neighborhoodFinded = await Neighborhoods.findOne({
          where: {
            id: idNeighborhoodDestiny,
          },
        });

        if (!neighborhoodFinded) {
          return res.status(400).json({
            message:
              "O bairro informado não foi encontrado, por favor verifique.",
          });
        }

        columnsUpdateOs["id_neighborhood_destiny"] = idNeighborhoodDestiny;
      }

      if (streetDestinyOld !== streetDestiny) {
        columnsUpdateOs["street_destiny"] = streetDestiny;
      }

      if (streetNumberDestinyOld !== streetNumberDestiny) {
        columnsUpdateOs["street_number_destiny"] = streetNumberDestiny;
      }

      if (complementDestinyOld !== complementDestiny) {
        columnsUpdateOs["complement_destiny"] = complementDestiny;
      }

      if (passengerNameOld !== passengerName) {
        columnsUpdateOs["passenger_name"] = passengerName;
      }

      if (passengerPhoneOld !== passengerPhone) {
        columnsUpdateOs["passenger_phone"] = passengerPhone;
      }

      if (Number(numberPassengersOld) !== Number(numberPassengers)) {
        columnsUpdateOs["number_passengers"] = numberPassengers;
      }

      if (observationServiceOld !== observationService) {
        columnsUpdateOs["observation_service"] = observationService;
      }

      if (observationUpdateOld !== "") {
        if (observationUpdateOld !== null) {
          columnsUpdateOs[
            "observation_update"
          ] = `${observationUpdateOld}; ${observationUpdate}`;
        } else {
          columnsUpdateOs["observation_update"] = observationUpdate;
        }
      } else {
        return res.status(400).json({
          message:
            "A observação de alteração não pode estar em branco, por favor verifique.",
        });
      }

      if (Number(idVehicleOld) !== Number(idVehicle)) {
        const vehicleFinded = await Vehicles.findOne({
          where: {
            id: idVehicle,
            active: true,
          },
        });

        if (!vehicleFinded) {
          return res.status(400).json({
            message:
              "O veículo informado para alteração não foi encontrado ou está inativo, por favor verifique.",
          });
        }

        columnsUpdateOs["id_vehicle"] = idVehicle;
      }

      if (Number(idDriverOld) !== Number(idDriver)) {
        const driverFinded = await Type_people.findOne({
          where: {
            id_people: idDriver,
            id_type: 3,
            active: true,
            "$People.active$": true,
          },
          include: ["People"],
        });

        if (!driverFinded) {
          return res.status(400).json({
            message:
              "O motorista informado para alteração não foi encontrado ou está inativo, por favor verifique.",
          });
        }

        columnsUpdateOs["id_driver"] = idDriver;
      }

      console.log(columnsUpdateOs);
      await Service_orders.update(columnsUpdateOs, {
        where: {
          id: idServiceOrder,
        },
      });

      const dataOsUpdated = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
        },
      });

      return res.json({
        dataOsUpdated,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
