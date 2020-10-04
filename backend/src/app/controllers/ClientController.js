const {
  People,
  People_address,
  Neighborhoods,
  Type_people,
} = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async store(req, res) {
    try {
      const {
        company_name,
        name_fantasy,
        cpf_cnpj,
        phone,
        email,
        id_neighborhood,
        street,
        street_number,
        complement,
        active,
      } = req.body;

      const companyNameFinded = await People.findOne({
        where: {
          company_name: company_name.toUpperCase(),
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

      console.log(id_neighborhood);
      const neighborhoodFinded = await Neighborhoods.findByPk(id_neighborhood);

      console.log(neighborhoodFinded);
      if (!neighborhoodFinded) {
        return res.status(400).json({
          message:
            "O bairro informado não foi encontrado em nossa base de dados, por favor verifique.",
        });
      }

      const createdClient = await People.create({
        company_name: company_name.toUpperCase(),
        name_fantasy: name_fantasy.toUpperCase(),
        cpf_cnpj,
        phone,
        email,
        active,
      });

      if (createdClient) {
        const createdClientAddress = await People_address.create({
          id_people: createdClient.id,
          id_neighborhood,
          street: street.toUpperCase(),
          street_number,
          complement,
        });

        if (createdClientAddress) {
          const createdTypePeople4 = await Type_people.create({
            id_people: createdClient.id,
            id_type: 4,
            active: true,
          });

          if (createdTypePeople4) {
            const createdClientComplete = await People.findByPk(
              createdClient.id,
              {
                include: ["People_address", "People_Type"],
              }
            );

            if (createdClientComplete) {
              return res.json({
                createdClientComplete,
                message: "Cadastro de cliente efetuado com sucesso!",
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async show(req, res) {
    try {
      let typesClientId = [];

      const { idClient } = req.params;
      const { id_executingperson } = req.headers;

      const client = await People.findByPk(idClient, {
        include: ["People_Type"],
      });

      if (!client) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de cliente foi encontrada com o código fornecido.",
        });
      }

      typesClientId = client.People_Type.map(function (index) {
        if (index.Type_people.active) {
          return index.Type_people.id_type;
        }
      });

      if (!typesClientId.includes("4")) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de cliente foi encontrada com o código informado.",
        });
      }

      const {
        id,
        cpf_cnpj,
        company_name,
        name_fantasy,
        phone,
        email,
        active,
        People_Type,
      } = client;

      const peopleAddress = await People_address.findOne({
        where: {
          id_people: idClient,
        },
        include: ["Neighborhood"],
      });

      const responseData = {
        client: {
          id,
          cpf_cnpj,
          company_name,
          name_fantasy,
          phone,
          email,
          active,
        },
        peopleAddress,
        peopleType: People_Type,
      };

      return res.json(responseData);
    } catch (error) {
      console.log(error);
    }
  },
};
