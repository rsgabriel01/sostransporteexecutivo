"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicles = sequelize.define(
    "Vehicles",
    {
      id_people: DataTypes.BIGINT,
      id_model: DataTypes.BIGINT,
      registration_number: DataTypes.BIGINT,
      color: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicles",
      timestamps: false,
    }
  );
  return Vehicles;
};
