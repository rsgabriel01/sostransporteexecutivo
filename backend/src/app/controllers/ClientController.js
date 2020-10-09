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
            "Nenhum cadastro de cliente foi encontrado com o código fornecido.",
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
            "Nenhum cadastro de cliente foi encontrado com o código informado.",
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

  async update(req, res) {
    try {
      let typesPersonId = [];
      let columnsUpdateClient = {};
      let columnsUpdateClientAddress = {};

      let companyNameOld = "";
      let nameFantasyOld = "";
      let cpfCnpjOld = "";
      let phoneOld = "";
      let emailOld = "";
      let activeOld = false;

      let idNeighborhoodOld = "";
      let streetOld = "";
      let streetNumberOld = "";
      let complementOld = "";

      const {
        idClient,
        companyName,
        nameFantasy,
        cpfCnpj,
        phone,
        email,
        idNeighborhood,
        street,
        streetNumber,
        complement,
        active,
      } = req.body;

      console.log(req.body);

      const oldClientFinded = await People.findOne({
        where: {
          id: idClient,
        },
        include: ["People_Type"],
      });

      // console.log(JSON.stringify(oldClientFinded));

      if (oldClientFinded) {
        typesPersonId = oldClientFinded.People_Type.map(function (index) {
          if (index.Type_people.active) {
            return index.Type_people.id_type;
          }
        });

        if (!typesPersonId.includes("4")) {
          return res.status(400).json({
            message: "Nenhum cadastro foi encontrado com o código informado.",
          });
        }

        companyNameOld = oldClientFinded.company_name;
        nameFantasyOld = oldClientFinded.name_fantasy;
        cpfCnpjOld = oldClientFinded.cpf_cnpj;
        phoneOld = oldClientFinded.phone;
        emailOld = oldClientFinded.email;
        activeOld = oldClientFinded.active;
      } else {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrado com o código informado.",
        });
      }

      const oldClientAddressFinded = await People_address.findOne({
        where: {
          id_people: idClient,
        },
        include: ["Neighborhood"],
      });

      if (oldClientAddressFinded) {
        idNeighborhoodOld = oldClientAddressFinded.id_neighborhood;
        streetOld = oldClientAddressFinded.street;
        streetNumberOld = oldClientAddressFinded.street_number;
        complementOld = oldClientAddressFinded.complement;
      }

      if (companyNameOld.toUpperCase() !== companyName.toUpperCase()) {
        columnsUpdateClient["company_name"] = companyName.toUpperCase();
      }

      if (nameFantasyOld.toUpperCase() !== nameFantasy.toUpperCase()) {
        columnsUpdateClient["name_fantasy"] = nameFantasy.toUpperCase();
      }

      if (cpfCnpjOld !== cpfCnpj) {
        const cnpjFinded = await People.findOne({
          where: {
            cpf_cnpj: cpfCnpj,
          },
        });

        if (cnpjFinded) {
          return res.status(400).json({
            message:
              "O CNPJ informado para alteração já foi cadastrado, por favor verifique.",
          });
        }

        columnsUpdateClient["cpf_cnpj"] = cpfCnpj;
      }

      if (phoneOld !== phone) {
        columnsUpdateClient["phone"] = phone;
      }

      if (emailOld !== email) {
        if (email != "") {
          const emailFinded = await People.findOne({
            where: {
              email,
            },
          });

          if (emailFinded) {
            return res.status(400).json({
              message:
                "O email informado já foi cadastrado, por favor verifique.",
            });
          }
        }

        columnsUpdateClient["email"] = email;
      }

      if (activeOld !== active) {
        columnsUpdateClient["active"] = active;
      }

      if (idNeighborhoodOld !== idNeighborhood) {
        const neighborhoodFinded = await Neighborhoods.findOne({
          where: {
            id: idNeighborhood,
          },
        });

        if (!neighborhoodFinded) {
          return res.status(400).json({
            message:
              "O email informado já foi cadastrado, por favor verifique.",
          });
        }

        columnsUpdateClientAddress["id_neighborhood"] = idNeighborhood;
      }

      if (streetOld !== street) {
        columnsUpdateClientAddress["street"] = street;
      }

      if (streetNumberOld !== streetNumber) {
        columnsUpdateClientAddress["street_number"] = streetNumber;
      }

      if (complementOld !== complement) {
        columnsUpdateClientAddress["complement"] = complement;
      }

      console.log(columnsUpdateClient);
      await People.update(columnsUpdateClient, {
        where: {
          id: idClient,
        },
      });

      console.log(columnsUpdateClientAddress);
      await People_address.update(columnsUpdateClientAddress, {
        where: {
          id_people: idClient,
        },
      });

      const dataClientUpdated = await People.findOne({
        where: {
          id: idClient,
        },
        include: ["People_Type"],
      });

      const dataAddressClientUpdated = await People_address.findOne({
        where: {
          id_people: idClient,
        },
        include: ["Neighborhood"],
      });

      return res.json({
        dataClientUpdated,
        dataAddressClientUpdated,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
