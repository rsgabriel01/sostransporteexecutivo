"use strict";

module.exports = (sequelize, DataTypes) => {
  const Service_orders = sequelize.define(
    "Service_orders",
    {
      id_client: DataTypes.BIGINT,
      id_user_attendance: DataTypes.BIGINT,
      id_driver: DataTypes.BIGINT,
      id_status: DataTypes.BIGINT,
      date_time_attendance: DataTypes.DATE,
      id_neighborhood_origin: DataTypes.BIGINT,
      street_origin: DataTypes.STRING,
      street_number_origin: DataTypes.BIGINT,
      id_neighborhood_destiny: DataTypes.BIGINT,
      street_destiny: DataTypes.STRING,
      street_number_destiny: DataTypes.BIGINT,
      date_time_completion: DataTypes.DATE,
      id_user_completion: DataTypes.BIGINT,
      observation: DataTypes.STRING,
    },
    {
      tableName: "Service_orders",
      timestamps: false,
    }
  );
  return Service_orders;
};
