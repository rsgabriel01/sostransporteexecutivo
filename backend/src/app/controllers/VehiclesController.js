const { Vehicles, People, Vehicle_models } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const vehicles = await Vehicles.findAll({
      });

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      // let typeExecutingPersonIdAllowed = false;
      let typeExecutingPersonIds = [];

      const { id_people, id_model, registration_number, color } = req.body;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type"],
      });

      if (executingPersonData) {
        typeExecutingPersonIds = executingPersonData.People_Type.map(function (
          index
        ) {
          if (!index.active) {
            return index.id;
          }
        });
      } else {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      if (
        !(
          typeExecutingPersonIds.includes("1") ||
          typeExecutingPersonIds.includes("2")
        )
      ) {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      if (id_people) {
        const personFinded = await People.findOne({
          where: {
            id: id_people,
          },
        });

        if (!personFinded) {
          return res.status(400).json({
            message:
              "O pessoa informada não foi encontrado em nosso banco de dados, por favor verifique.",
          });
        }
      }

      const modelFinded = await Vehicle_models.findOne({
        where: {
          id: id_model,
        },
      });

      if (!modelFinded) {
        return res.status(400).json({
          message:
            "O modelo do veiculo informado não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      if (id_people) {
        const vehicleDriverFinded = await Vehicles.findOne({
          where: {
            id_people,
          },
        });

        if (vehicleDriverFinded) {
          return res.status(401).json({
            message:
              "A pessoa informada já é motorista de outro veiculo, por favor verifique.",
          });
        }
      }

      const registrationNumberFinded = await Vehicles.findOne({
        where: {
          registration_number,
        },
      });

      if (registrationNumberFinded) {
        return res.status(401).json({
          message:
            "O número de registro informado já está vinculado a outro veiculo, por favor verifique.",
        });
      }

      const createdVehicle = await Vehicles.create({
        id_people: id_people ? id_people : null,
        id_model,
        registration_number,
        color,
        active: true,
      });

      if (!createdVehicle) {
        return res.status(500);
      }

      return res.json({
        createdVehicle,
        message: "Cadastro de veículo efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
