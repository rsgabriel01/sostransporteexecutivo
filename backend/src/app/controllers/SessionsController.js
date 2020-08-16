const { Sessions } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const sessions = await Sessions.findAll({
        include: ["Login"],
      });

      return res.json(sessions);
    } catch (error) {
      console.log(error);
    }
  },
};

// require("dotenv/config");

// const { Sessoes, Usuarios_empresa } = require("../models");

// const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

// const crypto = require("crypto");

// const bcrypt = require("bcrypt");

// const moment = require("moment");

// module.exports = {
//   async show(req, res) {
//     try {
//       const { token } = req.headers;

//       const sessionFinded = await Sessoes.findAll({
//         where: {
//           token,
//         },
//       });

//       if (sessionFinded.length == 0) {
//         return res.status(401).json({ message: "Token informado inválido." });
//       }

//       const [{ expiration }] = sessionFinded;

//       const expirationDate = moment.utc(expiration).local().format();

//       if (!moment(expirationDate).isSameOrAfter(moment())) {
//         return res.status(401).json({ message: "Token informado expirado." });
//       }

//       return res.json({ message: "Token válido." });
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async store(req, res) {
//     try {
//       let tokenUnavailable = false;
//       let token;

//       const { usuario, senha } = req.body;

//       const dadosUsuario = await Usuarios_empresa.findOne({
//         where: {
//           usuario,
//         },
//         include: ["Pessoas", "Tipos_usuarios"],
//       });

//       // console.log(dadosUsuario);

//       if (!dadosUsuario) {
//         return res
//           .status(400)
//           .json({ message: "Usuário ou senha incorretos." });
//       }

//       // console.log(`senha banco: ${dadosUsuario.senha}`);

//       const passwordMatch = bcrypt.compareSync(senha, dadosUsuario.senha);
//       // console.log(passwordMatch);

//       if (!passwordMatch) {
//         return res
//           .status(400)
//           .json({ message: "Usuário ou senha incorretos." });
//       }

//       const { id } = dadosUsuario;

//       while (tokenUnavailable === false) {
//         token = `${id}!${crypto.randomBytes(64).toString("HEX")}`;

//         const foundTokens = await Sessoes.findAll({
//           where: {
//             token,
//           },
//         });

//         if (foundTokens.length == 0) {
//           tokenUnavailable = true;
//         }
//       }

//       const sessionFinded = await Sessoes.findAll({
//         where: {
//           id_usuario_empresa: id,
//         },
//       });

//       if (sessionFinded.length !== 0) {
//         await Sessoes.destroy({
//           where: {
//             id_usuario_empresa: id,
//           },
//         });
//       }

//       const expiration = moment().add(1, "d").format();

//       const first_acess = moment().format();

//       await Sessoes.create({
//         id_usuario_empresa: id,
//         token,
//         first_acess,
//         expiration,
//       });

//       return res.json({ id_usuario: id, token });
//       // return res.json(dadosUsuario);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async destroy(req, res) {
//     try {
//       const { token } = req.headers;

//       await Sessoes.destroy({
//         where: {
//           token,
//         },
//       });

//       res.json({ message: "Sessão inativada com sucesso." });
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
