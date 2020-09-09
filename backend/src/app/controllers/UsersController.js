require("dotenv/config");

const { Users, People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const bcrypt = require("bcrypt");

const moment = require("moment");
const { update } = require("./PersonController");

module.exports = {
  async index(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      let typeIds = [];

      const salt = process.env.DB_SALT_HASH_PASSWORD;

      const { idPeople, user, password, active } = req.body;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      if (executingPersonData) {
        const activeExecutingPerson = executingPersonData.Users.active;

        console.log(activeExecutingPerson);

        if (activeExecutingPerson != true) {
          return res.status(401).json({
            message: "Ação não permitida.",
          });
        }

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
          id: idPeople,
        },
      });

      if (!personFinded) {
        return res.status(400).json({
          message:
            "O pessoa informada não foi encontrado em nosso banco de dados, por favor verifique.",
        });
      }

      const userPeopleFinded = await Users.findOne({
        where: {
          id_people: idPeople,
        },
      });

      if (userPeopleFinded) {
        return res.status(400).json({
          message:
            "O pessoa informada já possui usuário cadastrado, por favor verifique.",
        });
      }

      const userFinded = await Users.findOne({
        where: {
          user,
        },
      });

      if (userFinded) {
        return res.status(400).json({
          message:
            "O usuário informado já está cadastrado, por favor verifique.",
        });
      }

      console.log(salt);

      const encryptedPassword = bcrypt.hashSync(password, salt);

      console.log(encryptedPassword);

      const createdUser = await Users.create({
        id_people: idPeople,
        user,
        password: encryptedPassword,
        active,
      });

      return res.json({
        createdUser,
        message: "Cadastro de usuário efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async update(req, res) {
    try {
      let executingTypeIds = [];

      let typesPersonOfUser = [];
      let columnsUpdateUser = {};

      let removedOrAddActive = "";

      let userOld = "";
      let passwordOld = "";
      let activeOld = false;

      const salt = process.env.DB_SALT_HASH_PASSWORD;

      const { idPeople, user, password, active } = req.body;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      if (executingPersonData) {
        const activeExecutingPerson = executingPersonData.Users.active;

        console.log(activeExecutingPerson);

        if (activeExecutingPerson != true) {
          return res.status(401).json({
            message: "Ação não permitida.",
          });
        }

        executingTypeIds = executingPersonData.People_Type.map(function (
          index
        ) {
          return index.id;
        });
      } else {
        console.log("Pessoa executante nao encontrada");
        return res.status(401).json({
          message: "Ação não permitida.",
        });
      }

      if (!(executingTypeIds.includes("1") || executingTypeIds.includes("2"))) {
        console.log("Tipo de pessoa diferente de 1 ou 2");
        return res.status(401).json({
          message: "Seu usuário não tem permissao para realizar essa operação.",
        });
      }

      const personFinded = await People.findOne({
        where: {
          id: idPeople,
        },
        include: ["People_Type"],
      });

      if (personFinded) {
        typesPersonOfUser = personFinded.People_Type.map(function (index) {
          return index.id;
        });

        if (typesPersonOfUser.includes("4")) {
          return res.status(400).json({
            message: "Nenhum cadastro foi encontrada com o código informado.",
          });
        }
      } else {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrada com o código informado.",
        });
      }

      const oldUserFinded = await Users.findOne({
        where: {
          id_people: idPeople,
        },
      });

      if (oldUserFinded) {
        userOld = oldUserFinded.user;
        passwordOld = oldUserFinded.password;
        activeOld = oldUserFinded.active;
      } else {
        return res.status(400).json({
          message:
            "O pessoa informada não possui usuário cadastrado para ser alterado, por favor verifique.",
        });
      }

      if (userOld != user) {
        const userFinded = await Users.findOne({
          where: {
            user,
          },
        });

        if (userFinded) {
          return res.status(400).json({
            message:
              "O usuário informado já está cadastrado, por favor verifique.",
          });
        }

        columnsUpdateUser["user"] = user;
      }

      if (password != "" && password != null) {
        const passwordMatch = bcrypt.compareSync(password, passwordOld);

        console.log(passwordMatch);

        if (!passwordMatch) {
          console.log(salt);

          const encryptedPassword = bcrypt.hashSync(password, salt);

          console.log(encryptedPassword);

          columnsUpdateUser["password"] = encryptedPassword;
        }
      }

      if (activeOld != active) {
        if (
          !executingTypeIds.includes("1") &&
          typesPersonOfUser.includes("1")
        ) {
          return res.status(401).json({
            message:
              "Seu usuário não tem permissão para INATIVAR um administrador.",
          });
        }

        if (id_executingperson === idPeople) {
          return res.status(400).json({
            message: "Você não pode INATIVAR o próprio usuário.",
          });
        }

        columnsUpdateUser["active"] = active;
      }

      console.log(`${userOld} ${activeOld}`);

      console.log(columnsUpdateUser);

      const updatedUser = await Users.update(columnsUpdateUser, {
        where: {
          id_people: idPeople,
        },
      });

      const newUserFinded = await Users.findOne({
        where: {
          id_people: idPeople,
        },
      });

      return res.json({
        columnsUpdateUser,
        newUserFinded,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
