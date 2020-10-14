const { People, Type_people } = require("../models");
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
            "Nenhum cadastro de motorista foi encontrado com o código fornecido.",
        });
      }

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },
};
