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
};
