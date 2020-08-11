const { Usuarios_empresa, Pessoas, Tipos_usuarios } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const usuarios_empresa = await Usuarios_empresa.findAll({
        include: ["Pessoas", "Tipos_usuarios"],
      });

      return res.json(usuarios_empresa);
    } catch (error) {
      console.log(error);
    }
  },
};
