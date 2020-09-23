require("dotenv/config");

const { Users, People } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const salt = process.env.DB_SALT_HASH_PASSWORD;

      const { idPeople, user, password, active } = req.body;
      const { id_executingperson } = req.headers;

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
      let typesExecutingPersonIds = [];

      let typesPersonOfUser = [];
      let columnsUpdateUser = {};

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

      typesExecutingPersonIds = executingPersonData.People_Type.map(function (
        index
      ) {
        if (index.Type_people.active) {
          return index.Type_people.id_type;
        }
      });

      const personFinded = await People.findOne({
        where: {
          id: idPeople,
        },
        include: ["People_Type"],
      });

      if (personFinded) {
        typesPersonOfUser = personFinded.People_Type.map(function (index) {
          if (index.Type_people.active) {
            return index.Type_people.id_type;
          }
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
          !typesExecutingPersonIds.includes("1") &&
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
        newUserFinded,
        message: "Cadastro alterado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
