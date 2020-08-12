const { Sessoes, Usuarios_empresa } = require("../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const crypto = require("crypto");

const moment = require("moment");

module.exports = {
  async create(req, res) {
    try {
      let tokenUnavailable = false;
      let token;

      const { usuario, senha } = req.body;

      const dadosUsuario = await Usuarios_empresa.findAll({
        where: {
          usuario,
          senha,
        },
        include: ["Pessoas", "Tipos_usuarios"],
      });

      if (dadosUsuario.length == 0) {
        return res
          .status(400)
          .json({ message: "Usuário ou senha incorretos." });
      }

      const [{ id, id_tipo_usuario }] = dadosUsuario;

      console.log(token);

      while (tokenUnavailable === false) {
        token = `${id}!${crypto.randomBytes(6).toString("HEX")}`;

        const foundTokens = await Sessoes.findAll({
          where: {
            token,
          },
        });

        if (foundTokens.length == 0) {
          tokenUnavailable = true;
        }
      }

      const sessionFinded = await Sessoes.findAll({
        where: {
          id_usuario_empresa: id,
        },
      });

      if (sessionFinded.length !== 0) {
        await Sessoes.destroy({
          where: {
            id_usuario_empresa: id,
          },
        });
      }

      const expiration = moment().add(1, "d").format();

      const first_acess = moment().format();

      console.log(expiration, first_acess);

      await Sessoes.create({
        id_usuario_empresa: id,
        token,
        first_acess,
        expiration,
      });

      return res.json({ id_usuario: id, id_tipo_usuario, token });
    } catch (error) {
      console.log(error);
    }
  },
};
