const { Vehicles, People, Vehicle_models, Type_people } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const vehicles = await Vehicles.findAll({});

      return res.json(vehicles);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const {
        idDriver,
        carPlate,
        registrationNumber,
        idVehicleModel,
        numberSeats,
        vehicleColor,
        active,
      } = req.body;

      console.log(idDriver);
      if (idDriver !== null && idDriver !== "") {
        const personFinded = await People.findOne({
          where: {
            id: idDriver,
          },
        });

        if (!personFinded) {
          return res.status(400).json({
            message:
              "O pessoa informada não foi encontrado em nosso banco de dados, por favor verifique.",
          });
        }

        const driverFinded = await Type_people.findOne({
          where: {
            id_people: idDriver,
            id_type: 3,
          },
        });

        if (!driverFinded) {
          return res.status(400).json({
            message:
              "O motorista informado não foi encontrado em nosso banco de dados, por favor verifique.",
          });
        }
      }

      const modelFinded = await Vehicle_models.findOne({
        where: {
          id: idVehicleModel,
        },
      });

      if (!modelFinded) {
        return res.status(400).json({
          message:
            "O modelo do veiculo informado não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      if (idDriver !== null && idDriver !== "") {
        const vehicleDriverFinded = await Vehicles.findOne({
          where: {
            id_people: idDriver,
          },
        });

        if (vehicleDriverFinded) {
          return res.status(400).json({
            message:
              "A pessoa informada já é motorista de outro veiculo, por favor verifique.",
          });
        }
      }

      const carPlateFinded = await Vehicles.findOne({
        where: {
          car_plate: carPlate,
        },
      });

      if (carPlateFinded) {
        return res.status(400).json({
          message:
            "A placa do veículo informada já está vinculado a outro veiculo, por favor verifique.",
        });
      }

      const registrationNumberFinded = await Vehicles.findOne({
        where: {
          registration_number: registrationNumber,
        },
      });

      if (registrationNumberFinded) {
        return res.status(400).json({
          message:
            "O número de registro informado já está vinculado a outro veiculo, por favor verifique.",
        });
      }

      const createdVehicle = await Vehicles.create({
        id_people: idDriver !== null && idDriver !== "" ? idDriver : null,
        id_model: idVehicleModel,
        car_plate: carPlate.toUpperCase(),
        registration_number: registrationNumber,
        number_seats: numberSeats,
        color: vehicleColor.toUpperCase(),
        active,
      });

      if (!createdVehicle) {
        return res.json(500, "Erro: Problema ao criar veículo.");
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

  async show(req, res) {
    try {
      const { idVehicle } = req.params;
      let idDriver = null;
      let idPeopleDriver = null;
      let driverName = null;

      const vehicleData = await Vehicles.findByPk(idVehicle, {
        include: ["People"],
      });

      if (!vehicleData) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de veículo foi encontrado com o código fornecido.",
        });
      }

      if (vehicleData.People) {
        const driverData = await Type_people.findOne({
          attributes: ["id"],
          where: {
            id_people: vehicleData.People.id,
            id_type: 3,
          },
        });

        idDriver = driverData.id;

        idPeopleDriver = vehicleData.People.id;

        driverName = vehicleData.People.name;
      }

      const vehicleModelData = await Vehicle_models.findByPk(
        vehicleData.id_model,
        { include: ["ModelBrand"] }
      );

      const {
        id,
        id_model,
        registration_number,
        car_plate,
        number_seats,
        color,
        active,
      } = vehicleData;

      const model = vehicleModelData.description;

      const brand = vehicleModelData.ModelBrand.description;

      const responseData = {
        vehicle: {
          id,
          id_model,
          car_plate,
          registration_number,
          model,
          brand,
          number_seats,
          color,
          active,
        },
        driver: { id: idDriver, idPeopleDriver, name: driverName },
      };

      return res.json(responseData);
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      let columnsUpdateVehicle = {};

      let carPlateOld = "";
      let registrationNumberOld = "";
      let idVehicleModelOld = "";
      let idDriverOld = "";
      let numberSeatsOld = "";
      let vehicleColorOld = "";
      let activeOld = false;

      const {
        idVehicle,
        carPlate,
        registrationNumber,
        idVehicleModel,
        numberSeats,
        vehicleColor,
        idDriver,
        active,
      } = req.body;

      console.log(req.body);
      console.log("");

      const oldVehicleFinded = await Vehicles.findOne({
        where: {
          id: idVehicle,
        },
      });

      console.log(JSON.stringify(oldVehicleFinded));
      console.log("");

      if (!oldVehicleFinded) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de veículo foi encontrado com o código informado, por favor verifique.",
        });
      } else {
        carPlateOld = oldVehicleFinded.car_plate;
        registrationNumberOld = oldVehicleFinded.registration_number;
        idVehicleModelOld = oldVehicleFinded.id_model;
        idDriverOld = oldVehicleFinded.id_people;
        numberSeatsOld = oldVehicleFinded.number_seats;
        vehicleColorOld = oldVehicleFinded.color;
        activeOld = oldVehicleFinded.active;
      }

      if (carPlateOld !== carPlate) {
        const carPlateFinded = await Vehicles.findOne({
          where: {
            car_plate: carPlate,
          },
        });

        if (carPlateFinded) {
          return res.status(400).json({
            message:
              "A placa do carro informada para alteração já foi cadastrada, por favor verifique.",
          });
        }
        columnsUpdateVehicle["car_plate"] = carPlate.toUpperCase();
      }

      if (registrationNumberOld !== registrationNumber) {
        const registrationNumberFinded = await Vehicles.findOne({
          where: {
            registration_number: registrationNumber,
          },
        });

        if (registrationNumberFinded) {
          return res.status(400).json({
            message:
              "O número de registro do veículo informado para alteração já foi cadastrado, por favor verifique.",
          });
        }

        columnsUpdateVehicle["registration_number"] = registrationNumber;
      }

      if (idVehicleModelOld !== idVehicleModel) {
        const oldVehicleModelFinded = await Vehicle_models.findOne({
          where: {
            id: idVehicleModel,
          },
        });

        if (!oldVehicleModelFinded) {
          return res.status(400).json({
            message:
              "Nenhum cadastro de modelo de veículo foi encontrado com o código informado, por favor verifique.",
          });
        }

        columnsUpdateVehicle["id_model"] = idVehicleModel;
      }

      if (idDriverOld !== idDriver) {
        if (idDriver !== null && idDriver !== "") {
          const personFinded = await People.findOne({
            where: {
              id: idDriver,
            },
          });

          if (!personFinded) {
            return res.status(400).json({
              message:
                "O motorista informado não foi encontrado em nosso banco de dados, por favor verifique.",
            });
          }

          const ClientFinded = await Type_people.findOne({
            where: {
              id_people: idDriver,
              id_type: 4,
            },
          });

          if (ClientFinded) {
            return res.status(400).json({
              message:
                "O motorista informado não foi encontrado com o código informado, por favor verifique.",
            });
          }

          const driverFinded = await Type_people.findOne({
            where: {
              id_people: idDriver,
              id_type: 3,
            },
          });

          if (!driverFinded) {
            return res.status(400).json({
              message:
                "O motorista informado não foi encontrado em nosso banco de dados, por favor verifique.",
            });
          }
        }

        columnsUpdateVehicle["id_people"] =
          idDriver !== null && idDriver !== "" ? idDriver : null;
      }

      if (numberSeatsOld !== numberSeats) {
        columnsUpdateVehicle["number_seats"] = numberSeats;
      }

      if (vehicleColorOld !== vehicleColor) {
        columnsUpdateVehicle["color"] = vehicleColor.toUpperCase();
      }

      if (activeOld !== active) {
        columnsUpdateVehicle["active"] = active;
      }

      console.log(columnsUpdateVehicle);
      console.log("");

      await Vehicles.update(columnsUpdateVehicle, {
        where: {
          id: idVehicle,
        },
      });

      const vehicleUpdated = await Vehicles.findOne({
        where: {
          id: idVehicle,
        },
      });

      return res.json({
        vehicleUpdated,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
