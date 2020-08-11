const { Tipos_usuarios } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const tipos_usuarios = await Tipos_usuarios.findAll();

      return res.json(tipos_usuarios);
    } catch (error) {
      console.log(error);
    }
  },
};
