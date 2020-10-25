require("dotenv/config");

const { Sessions, Users } = require("../../models");

const crypto = require("crypto");

const bcrypt = require("bcrypt");

const moment = require("moment");

module.exports = {
  async show(req, res) {
    try {
      const { token } = req.headers;

      const sessionFinded = await Sessions.findAll({
        where: {
          token,
        },
      });

      if (sessionFinded.length == 0) {
        return res.status(401).json({ message: "Token de sessão inválido." });
      }

      const [{ expiration, id_user }] = sessionFinded;

      const userFinded = await Users.findOne({
        where: {
          id: id_user,
        },
        include: ["People"],
      });

      if (id_user) {
        if (!userFinded.active) {
          return res.status(401).json({ message: "Token de sessão inválido." });
        }
        if (!userFinded.People.active) {
          return res.status(401).json({ message: "Token de sessão inválido." });
        }
      } else {
        return res.status(401).json({ message: "Token de sessão inválido." });
      }

      const expirationDate = moment.utc(expiration).local().format();

      if (!moment(expirationDate).isSameOrAfter(moment())) {
        return res.status(401).json({ message: "Token de sessão expirado." });
      }

      return res.json({ message: "Token de sessão válido." });
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      let tokenUnavailable = false;
      let token;

      const { user, password } = req.body;

      const dataUser = await Users.findOne({
        where: {
          user,
        },
        include: ["People", "Sessions"],
      });

      if (!dataUser) {
        console.log("user nao encontrado");
        return res
          .status(400)
          .json({ message: "Usuário ou senha incorretos." });
      }

      if (!dataUser.active) {
        console.log("usuario inativo");

        return res
          .status(400)
          .json({ message: "Usuário ou senha incorretos." });
      }

      if (!dataUser.People.active) {
        console.log("pessoa inativa");

        return res
          .status(400)
          .json({ message: "Usuário ou senha incorretos." });
      }

      const passwordMatch = bcrypt.compareSync(password, dataUser.password);

      if (!passwordMatch) {
        console.log("senha incorreta");
        return res
          .status(400)
          .json({ message: "Usuário ou senha incorretos." });
      }

      const { id, id_people } = dataUser;

      personName = dataUser.People.name;

      while (tokenUnavailable === false) {
        token = `${id}!${crypto.randomBytes(64).toString("HEX")}`;

        const foundTokens = await Sessions.findAll({
          where: {
            token,
          },
        });

        if (foundTokens.length == 0) {
          tokenUnavailable = true;
        }
      }

      const sessionFinded = await Sessions.findAll({
        where: {
          id_user: id,
        },
      });

      if (sessionFinded.length !== 0) {
        await Sessions.destroy({
          where: {
            id_user: id,
          },
        });
      }

      const expiration = moment().add(1, "d").format();

      const first_acess = moment().format();

      await Sessions.create({
        id_user: id,
        token,
        first_acess,
        expiration,
      });

      return res.json({
        userId: id,
        id_person: id_people,
        personName,
        session: { token },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async destroy(req, res) {
    try {
      const { token } = req.headers;

      await Sessions.destroy({
        where: {
          token,
        },
      });

      res.json({ message: "Sessão inativada com sucesso." });
    } catch (error) {
      console.log(error);
    }
  },
};
