const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

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
      let typeIds = [];

      const { name, cpf_cnpj, rg, phone, email } = req.body;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type"],
      });

      if (executingPersonData) {
        typeIds = executingPersonData.People_Type.map(function (index) {
          return index.id;
        });
      } else {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      if (!(typeIds.includes("1") || typeIds.includes("2"))) {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      if (CpfValidation(cpf_cnpj) === false) {
        return res.status(400).json({
          message: "O CPF informado é inválido, por favor verifique.",
        });
      }

      const cpfFinded = await People.findOne({
        where: {
          cpf_cnpj,
        },
      });

      if (cpfFinded) {
        return res.status(400).json({
          message: "O CPF informado já foi cadastrado, por favor verifique.",
        });
      }

      const emailFinded = await People.findOne({
        where: {
          email,
        },
      });

      if (emailFinded) {
        return res.status(400).json({
          message: "O email informado já foi cadastrado, por favor verifique.",
        });
      }

      const createdPerson = await People.create({
        name: name.toUpperCase(),
        cpf_cnpj,
        rg,
        phone,
        email,
        active: true,
      });

      return res.json({
        createdPerson,
        message: "Cadastro de pessoa efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
