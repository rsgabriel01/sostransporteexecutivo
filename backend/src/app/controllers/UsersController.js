require("dotenv/config");

const { Users, People, Sessions } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const bcrypt = require("bcrypt");

const moment = require("moment");

module.exports = {
  async index(req, res) {
    try {
      const logins = await Logins.findAll({
        include: ["People", "Sessions"],
      });

      return res.json(logins);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      let typeIds = [];

      const salt = process.env.DB_SALT_HASH_PASSWORD;

      const { id_people, user, password } = req.body;
      const { id_executingperson, authorization } = req.headers;

      const sessionFinded = await Sessions.findAll({
        where: {
          token: authorization,
        },
      });

      if (sessionFinded.length == 0) {
        return res.status(401).json({ message: "Token inválido." });
      }

      const [{ expiration }] = sessionFinded;

      const expirationDate = moment.utc(expiration).local().format();

      if (!moment(expirationDate).isSameOrAfter(moment())) {
        return res.status(401).json({ message: "Token expirado." });
      }

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

      const userPeopleFinded = await Users.findOne({
        where: {
          id_people,
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
        id_people,
        user,
        password: encryptedPassword,
        active: true,
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
};
