const { People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async store(req, res) {
    try {
      const { company_name, name_fantasy, cpf_cnpj, phone, email } = req.body;
      const { id_executingperson } = req.headers;

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
