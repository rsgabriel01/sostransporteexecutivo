const {
  People,
  Type_people,
  Service_orders,
  Vehicles,
} = require("../../../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async store(req, res) {
    try {
      const { idPerson, cnh, numPermit, businessPhone, active } = req.body;

      const personFinded = await People.findOne({
        where: {
          id: idPerson,
        },
      });

      if (!personFinded) {
        return res.status(400).json({
          message:
            "O pessoa informada não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      const cnhFinded = await People.findOne({
        where: {
          cnh,
        },
      });

      if (cnhFinded) {
        return res.status(400).json({
          message:
            "O número da habilitação informado já foi cadastrado, por favor verifique.",
        });
      }

      const numPermitFinded = await People.findOne({
        where: {
          num_permit: numPermit,
        },
      });

      if (numPermitFinded) {
        return res.status(400).json({
          message:
            "O número do alvará de condutor informado já foi cadastrado, por favor verifique.",
        });
      }

      const driverFinded = await Type_people.findOne({
        where: {
          id_people: idPerson,
          id_type: 3,
        },
      });

      if (driverFinded) {
        return res.status(401).json({
          message:
            "A pessoa informada já está cadastrada como motorista, por favor verifique.",
        });
      }

      const createdTypeDriver = await Type_people.create({
        id_people: idPerson,
        id_type: 3,
        active: active,
      });

      if (!createdTypeDriver) {
        return res.json(
          500,
          "Erro: Problema na criação do tipo de usuario motorista."
        );
      }

      const createdDriver = await People.update(
        { cnh, num_permit: numPermit, business_phone: businessPhone },
        {
          where: {
            id: idPerson,
          },
        }
      );

      if (!createdDriver) {
        return res.json(
          500,
          "Erro: Problema na inserção dos dados do motorista."
        );
      }

      return res.json({
        createdDriver,
        message: "Cadastro de motorista efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async show(req, res) {
    try {
      const { idDriver } = req.params;

      const driver = await Type_people.findOne({
        where: {
          id: idDriver,
          id_type: 3,
        },
        include: ["People"],
        order: [["id", "ASC"]],
      });

      if (!driver) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de motorista foi encontrado com o código fornecido, por favor verifique.",
        });
      }

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      let typesPeopleDriverId = [];
      let columnsUpdateDriver = {};
      let columnsUpdatePeople = {};

      let columnsUpdateDataPeopleOfUpdateDriver = {
        cnh: null,
        num_permit: null,
        business_phone: null,
      };

      let idPeopleDriverOld = "";
      let cnhOld = "";
      let numPermitOld = "";
      let businessPhoneOld = "";
      let activeOld = false;

      const {
        idDriver,
        idPeopleDriver,
        cnh,
        numPermit,
        businessPhone,
        active,
      } = req.body;

      const oldPeoplDriverFinded = await People.findOne({
        where: {
          id: idPeopleDriver,
        },
        include: ["People_Type"],
      });

      if (oldPeoplDriverFinded) {
        typesPeopleDriverId = oldPeoplDriverFinded.People_Type.map(function (
          index
        ) {
          if (index.Type_people.active) {
            return index.Type_people.id_type;
          }
        });

        if (typesPeopleDriverId.includes("4")) {
          return res.status(400).json({
            message:
              "Nenhum cadastro de motorista foi encontrado com o código informado, por favor verifique.",
          });
        }

        cnhOld = oldPeoplDriverFinded.cnh;
        numPermitOld = oldPeoplDriverFinded.num_permit;
        businessPhoneOld = oldPeoplDriverFinded.business_phone;
      } else {
        return res.status(400).json({
          message:
            "Nenhum cadastro de motorista foi encontrado com o código informado, por favor verifique.",
        });
      }

      const oldDriverFinded = await Type_people.findOne({
        where: {
          id: idDriver,
        },
      });

      if (oldDriverFinded) {
        idPeopleDriverOld = Number(oldDriverFinded.id_people);
        activeOld = oldDriverFinded.active;
      } else {
        return res.status(400).json({
          message:
            "Nenhum cadastro de motorista foi encontrado com o código informado, por favor verifique.",
        });
      }

      if (cnhOld !== cnh) {
        const cnhFinded = await People.findOne({
          where: {
            cnh,
          },
        });

        if (cnhFinded) {
          return res.status(400).json({
            message:
              "A CNH informada para alteração já foi cadastrada, por favor verifique.",
          });
        }
        columnsUpdatePeople["cnh"] = cnh;
      }

      if (numPermitOld !== numPermit) {
        const numPermitFinded = await People.findOne({
          where: {
            num_permit: numPermit,
          },
        });

        if (numPermitFinded) {
          return res.status(400).json({
            message:
              "O número de alvará informado para alteração já foi cadastrado, por favor verifique.",
          });
        }

        columnsUpdatePeople["num_permit"] = numPermit;
      }

      if (businessPhoneOld !== businessPhone) {
        columnsUpdatePeople["business_phone"] = businessPhone;
      }

      if (idPeopleDriverOld !== Number(idPeopleDriver)) {
        const driverSOFinded = await Service_orders.findOne({
          where: {
            id_driver: idPeopleDriver,
          },
        });

        if (driverSOFinded) {
          return res.status(400).json({
            message:
              "Esse motorista já está vinculado a Ordens de Serviço, não é possivel alterar seus dados pessoais.",
          });
        }

        const driverVehicleFinded = await Vehicles.findOne({
          where: {
            id_people: idPeopleDriver,
            active: true,
          },
        });

        if (driverVehicleFinded) {
          return res.status(400).json({
            message:
              "Esse motorista já está vinculado a um veículo, não é possivel alterar seus dados pessoais.",
          });
        }

        const idPeopleDriverFinded = await Type_people.findOne({
          where: {
            id_people: idPeopleDriver,
          },
        });

        if (idPeopleDriverFinded) {
          return res.status(400).json({
            message:
              "A pessoa informada já possui um cadastro de motorista, por favor verifique.",
          });
        }

        columnsUpdateDriver["id_people"] = idPeopleDriver;
      }

      if (activeOld !== active) {
        if (active === false) {
          const driverVehicleFinded = await Vehicles.findOne({
            where: {
              id_people: idPeopleDriver,
            },
          });

          if (driverVehicleFinded) {
            return res.status(400).json({
              message: `Não foi possivel inativar esse motorista pois ele está vinculado a um veículo, para fazer isso é preciso desvinculá-lo do veículo de Código: ${driverVehicleFinded.id}.`,
            });
          }
        }

        columnsUpdateDriver["active"] = active;
      }

      if (idPeopleDriverOld !== idPeopleDriver) {
        await People.update(columnsUpdateDataPeopleOfUpdateDriver, {
          where: {
            id: idPeopleDriverOld,
          },
        });
      }

      await People.update(columnsUpdatePeople, {
        where: {
          id: idPeopleDriver,
        },
      });

      await Type_people.update(columnsUpdateDriver, {
        where: {
          id: idDriver,
        },
      });

      const driverUpdated = await Type_people.findOne({
        where: {
          id: idDriver,
        },
        include: ["People"],
        order: [["id", "ASC"]],
      });

      return res.json({
        driverUpdated,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
