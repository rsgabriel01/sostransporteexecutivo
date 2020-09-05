const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

var CpfValidation = require("../helpers/CpfValidation");

module.exports = {
  async store(req, res) {
    try {
      // let typeExecutingPersonIdAllowed = false;
      let typeIds = [];

      const { company_name, name_fantasy, cpf_cnpj, phone, email } = req.body;
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

      const companyNameFinded = await People.findOne({
        where: {
          company_name,
        },
      });

      if (companyNameFinded) {
        return res.status(400).json({
          message:
            "A razão social informada já foi cadastrada, por favor verifique.",
        });
      }

      const cnpjFinded = await People.findOne({
        where: {
          cpf_cnpj,
        },
      });

      if (cnpjFinded) {
        return res.status(400).json({
          message: "O CNPJ informado já foi cadastrado, por favor verifique.",
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

      const createdClient = await People.create({
        company_name: company_name.toUpperCase(),
        name_fantasy: name_fantasy.toUpperCase(),
        cpf_cnpj,
        phone,
        email,
        active: true,
      });

      if (createdClient) {
        return res.json({
          createdClient,
          message: "Cadastro de cliente efetuado com sucesso!",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
