"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Service_orders = sequelize.define(
    "Service_orders",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      id_client: DataTypes.BIGINT,
      id_user_solicitation: DataTypes.BIGINT,
      date_time_solicitation: DataTypes.DATE /** */,
      id_user_attendance: { type: DataTypes.BIGINT, defaultValue: null },
      date_time_attendance: { type: DataTypes.DATE, defaultValue: null } /** */,
      id_driver: { type: DataTypes.BIGINT, defaultValue: null } /** */,
      id_vehicle: { type: DataTypes.BIGINT, defaultValue: null } /** */,
      id_status: DataTypes.BIGINT /** */,
      id_neighborhood_origin: DataTypes.BIGINT,
      street_origin: DataTypes.STRING,
      street_number_origin: DataTypes.BIGINT,
      complement_origin: DataTypes.STRING,
      client_origin: DataTypes.BOOLEAN,
      id_neighborhood_destiny: DataTypes.BIGINT,
      street_destiny: DataTypes.STRING,
      street_number_destiny: DataTypes.BIGINT,
      complement_destiny: DataTypes.STRING,
      client_destiny: DataTypes.BOOLEAN,
      passenger_name: DataTypes.STRING,
      passenger_phone: DataTypes.STRING,
      travel_value: DataTypes.REAL,
      number_passengers: { type: DataTypes.BIGINT, defaultValue: 1 },
      date_time_completion: { type: DataTypes.DATE, defaultValue: null } /** */,
      id_user_completion: { type: DataTypes.BIGINT, defaultValue: null },
      observation_service: {
        type: DataTypes.STRING,
        defaultValue: null,
      } /**/,
      observation_update: {
        type: DataTypes.STRING,
        defaultValue: null,
      } /**/,
      observation_cancellation: {
        type: DataTypes.STRING,
        defaultValue: null,
      } /** */,
      cancellation_fee: { type: DataTypes.REAL, defaultValue: null } /** */,
      date_time_cancellation: { type: DataTypes.DATE, defaultValue: null },
    },
    {
      tableName: "Service_orders",
      timestamps: false,
    }
  );

  Service_orders.prototype.toJSON = function () {
    const values = { ...this.get() };
    if (values.date_time_solicitation) {
      const originalDateBD = moment
        .utc(values.date_time_solicitation)
        .local()
        .format();
      const fistUpdateDateToLocalFormat = originalDateBD.replace("T", " ");
      const secondUpdateDateToLocalFormat = fistUpdateDateToLocalFormat.replace(
        "-03:00",
        ""
      );
      values.date_time_solicitation = secondUpdateDateToLocalFormat;
    }

    if (values.date_time_attendance) {
      const originalDateBD = moment
        .utc(values.date_time_attendance)
        .local()
        .format();
      const fistUpdateDateToLocalFormat = originalDateBD.replace("T", " ");
      const secondUpdateDateToLocalFormat = fistUpdateDateToLocalFormat.replace(
        "-03:00",
        ""
      );
      values.date_time_attendance = secondUpdateDateToLocalFormat;
    }

    if (values.date_time_execution) {
      const originalDateBD = moment
        .utc(values.date_time_execution)
        .local()
        .format();
      const fistUpdateDateToLocalFormat = originalDateBD.replace("T", " ");
      const secondUpdateDateToLocalFormat = fistUpdateDateToLocalFormat.replace(
        "-03:00",
        ""
      );
      values.date_time_execution = secondUpdateDateToLocalFormat;
    }

    if (values.date_time_cancellation) {
      const originalDateBD = moment
        .utc(values.date_time_cancellation)
        .local()
        .format();
      const fistUpdateDateToLocalFormat = originalDateBD.replace("T", " ");
      const secondUpdateDateToLocalFormat = fistUpdateDateToLocalFormat.replace(
        "-03:00",
        ""
      );
      values.date_time_cancellation = secondUpdateDateToLocalFormat;
    }
    return values;
  };

  Service_orders.associate = (models) => {
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_client",
      as: "Client",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_user_solicitation",
      as: "User_solicitation",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_user_attendance",
      as: "User_attendance",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_driver",
      as: "Driver",
    });
    Service_orders.belongsTo(models.Vehicles, {
      foreignKey: "id_vehicle",
      as: "Vehicle",
    });
    Service_orders.belongsTo(models.Status, {
      foreignKey: "id_status",
      as: "Status",
    });
    Service_orders.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood_origin",
      as: "Neighborhood_origin",
    });
    Service_orders.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood_destiny",
      as: "Neighborhood_destiny",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_user_completion",
      as: "User_completion",
    });
  };

  return Service_orders;
};
