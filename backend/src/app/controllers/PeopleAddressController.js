const { People_address, People, Neighborhoods } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

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
      let typeIds = [];

      const { id_people, id_neighborhood, street, street_number } = req.body;
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
        console.log("aqui1");
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      console.log(typeIds);
      if (!(typeIds.includes("1") || typeIds.includes("2"))) {
        console.log("aqui2");
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
