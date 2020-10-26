const { Service_orders, Vehicles } = require("../../models");

const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

module.exports = {
  async store(req, res) {
    try {
      const { idServiceOrder } = req.params;
      const { id_executingperson } = req.headers;
      const { idVehicleAttendance } = req.body;

      let columnsAttendance = {
        id_status: 2,
        date_time_attendance: moment().format(),
        id_user_attendance: id_executingperson,
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

      if (serviceOrder.id_status != 1) {
        return res.status(400).json({
          message:
            "Não foi possível atender essa ordem de serviço, a mesma não está em situação apta de atendimento, por favor verifique.",
        });
      }

      const vehicle = await Vehicles.findOne({
        where: {
          id: idVehicleAttendance,
          active: true,
        },
      });

      if (!vehicle) {
        return res.status(400).json({
          message:
            "O veículo informado não foi encontrado ou está inativo, por favor verifique.",
        });
      }

      if (
        Number(serviceOrder.number_passengers) > Number(vehicle.number_seats)
      ) {
        return res.status(400).json({
          message:
            "O veículo informado não comporta o número de passageiros dessa ordem de serviço, por favor verifique.",
        });
      }

      console.log(serviceOrder.id_status);

      console.log(columnsAttendance);

      await Service_orders.update(columnsAttendance, {
        where: {
          id: idServiceOrder,
        },
      });

      return res.json({
        message: `Ordem de serviço ${serviceOrder.id} atendida com sucesso!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
