const { People_address, People, Neighborhoods } = require("../../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const peopleAddress = await People_address.findAll({
        include: ["People", "Neighborhood"],
      });

      return res.json(peopleAddress);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const { id_people, id_neighborhood, street, street_number } = req.body;
      const { id_executingperson } = req.headers;

      const personFinded = await People.findOne({
        where: {
          id: id_people,
        },
      });

      if (!personFinded) {
        return res.status(400).json({
          message:
            "A pessoa informada não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      const peopleAddressFinded = await People_address.findOne({
        where: {
          id_people,
        },
      });

      if (peopleAddressFinded) {
        return res.status(400).json({
          message:
            "A pessoa informada já possui um endereço cadastrado, por favor verifique.",
        });
      }

      const neighborhoodFinded = await Neighborhoods.findOne({
        where: {
          id: id_neighborhood,
        },
      });

      if (!neighborhoodFinded) {
        return res.status(400).json({
          message:
            "O bairro informado não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      const createdPeopleAddress = await People_address.create({
        id_people,
        id_neighborhood,
        street: street.toUpperCase(),
        street_number,
      });

      return res.json({
        createdPeopleAddress,
        message: "Cadastro de endereço efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
