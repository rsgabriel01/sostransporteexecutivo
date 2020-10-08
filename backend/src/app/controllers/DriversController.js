const { People, Type_people } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

var CpfValidation = require("../helpers/CpfValidation");

module.exports = {
  async index(req, res) {
    try {
      const people = await People.findAll({
        include: [
          "Logins",
          "Vehicles",
          "People_address",
          "People_Type",
          "Service_orders_clients",
          "Service_orders_users_attendance",
          "Service_orders_drivers",
        ],
      });

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const { id_people, cnh, num_permit, business_phone, active } = req.body;
      const { id_executingperson } = req.headers;

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

      const driverFinded = await Type_people.findOne({
        where: {
          id_people,
          id_type: 3,
        },
      });

      if (driverFinded) {
        return res.status(401).json({
          message:
            "A pessoa informada já está cadastrada como motorista, por favor verifique.",
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
          num_permit,
        },
      });

      if (numPermitFinded) {
        return res.status(400).json({
          message:
            "O número do alvará de condutor informado já foi cadastrado, por favor verifique.",
        });
      }

      const createdTypeDriver = await Type_people.create({
        id_people,
        id_type: 3,
      });

      if (!createdTypeDriver) {
        return res.status(500);
      }

      const createdDriver = await People.update(
        { cnh, num_permit, business_phone },
        {
          where: {
            id: id_people,
          },
        }
      );

      return res.json({
        createdDriver,
        message: "Cadastro de motorista efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
