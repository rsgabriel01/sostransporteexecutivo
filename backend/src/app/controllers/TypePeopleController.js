const { Type_people, People, Types } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const typePeople = await Type_people.findAll({});

      return res.json(typePeople);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      let typeIds = [];

      const { id_people, id_type } = req.body;
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

      const typeFinded = await Types.findOne({
        where: {
          id: id_type,
        },
      });

      if (!typeFinded) {
        return res.status(400).json({
          message:
            "A tipo informado não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      const typePeopleFinded = await Type_people.findOne({
        where: {
          id_people,
          id_type,
        },
      });

      if (typePeopleFinded) {
        return res.status(400).json({
          message: "A pessoa informada já está relacionada ao tipo informado.",
        });
      }

      const createdTypePeople = await Type_people.create({
        id_people,
        id_type,
      });

      return res.json({
        createdTypePeople,
        message: "Tipo relacionado a pessoa com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
