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
          id_type: 4,
        },
        include: ["People"],
        order: [["id", "ASC"]],
      });

      if (driver) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de motorista foi encontrado com o código fornecido, por favor verifique.",
        });
      }

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
            "Nenhum cadastro de motorista foi encontrado com o código fornecido, por favor verifique.",
        });
      }

      return res.json(driver);
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      let typesPeopleDriverId = [];
      let columnsUpdateDriver = {};
      let columnsUpdatePeople = {};

      let idPeopleDriverOld = "";
      let cnhOld = "";
      let numPermitOld = "";
      let businessPhoneOld = "";
      let activeOld = false;

      const {
        idPeopleDriver,
        cnh,
        numPermit,
        businessPhone,
        active,
      } = req.body;

      console.log(req.body);

      const oldPeoplDriverFinded = await People.findOne({
        where: {
          id: idPeopleDriver,
        },
        include: ["People_Type"],
      });

      // console.log(JSON.stringify(oldClientFinded));

      if (oldPeoplDriverFinded) {
        typesPeopleDriverId = oldPeoplDriverFinded.People_Type.map(function (
          index
        ) {
          if (index.Type_people.active) {
            return index.Type_people.id_type;
          }
        });

        if (typesPeopleDriverId.includes("4")) {
          return res.status(400).json({
            message:
              "Nenhum cadastro de motorista foi encontrado com o código informado, por favor verifique.",
          });
        }

        cnhOld = oldPeoplDriverFinded.cnh;
        numPermitOld = oldPeoplDriverFinded.num_permit;
        businessPhoneOld = oldPeoplDriverFinded.phone;
      } else {
        return res.status(400).json({
          message:
            "Nenhum cadastro de motorista foi encontrado com o código informado, por favor verifique.",
        });
      }

      const oldDriverFinded = await Type_people.findOne({
        where: {
          id_people: idPeopleDriver,
        },
      });

      if (oldDriverFinded) {
        idPeopleDriverOld = oldDriverFinded.id_people;
        activeOld = oldDriverFinded.active;
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
