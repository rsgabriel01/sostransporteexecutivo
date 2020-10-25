const { Type_people, People, Types } = require("../../models");
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
      const { id_people, id_type } = req.body;
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
