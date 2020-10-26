const { Service_orders } = require("../../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async store(req, res) {
    try {
      const { idServiceOrder } = req.params;
      const { id_executingperson } = req.headers;

      let columnsCompletion = {
        id_status: 8,
        date_time_completion: moment().format(),
        id_user_completion: id_executingperson,
      };

      const serviceOrder = await Service_orders.findOne({
        where: {
          id: idServiceOrder,
        },
      });

      if (!serviceOrder) {
        return res.status(400).json({
          message:
            "Não foi encontrado ordem de serviço com o código fornecido, por favor verifique.",
        });
      }

      if (serviceOrder.id_status != 7) {
        return res.status(400).json({
          message:
            "Não foi possível finalizar essa ordem de serviço, a mesma não está em situação apta de finalização, por favor verifique.",
        });
      }

      console.log(serviceOrder.id_status);
      console.log(columnsCompletion);

      await Service_orders.update(columnsCompletion, {
        where: {
          id: idServiceOrder,
        },
      });

      return res.json({
        message: `Ordem de serviço ${serviceOrder.id} finalizada com sucesso!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
