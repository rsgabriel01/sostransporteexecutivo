const { People, Sessions, Type_people } = require("../models");
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
      // let typeExecutingPersonIdAllowed = false;
      let typeExecutingPersonIds = [];

      const { id_people, cnh, num_permit, business_phone } = req.body;
      const { id_executingperson, authorization } = req.headers;

      const sessionFinded = await Sessions.findAll({
        where: {
          token: authorization,
        },
      });

      if (sessionFinded.length == 0) {
        return res.status(401).json({ message: "Authorization inválido." });
      }

      const [{ expiration }] = sessionFinded;

      const expirationDate = moment.utc(expiration).local().format();

      if (!moment(expirationDate).isSameOrAfter(moment())) {
        return res.status(401).json({ message: "Authorization expirado." });
      }

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
          return index.id;
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
