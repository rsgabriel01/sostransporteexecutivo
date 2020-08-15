"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicle_models = sequelize.define(
    "Vehicle_models",
    {
      id_brand: DataTypes.BIGINT,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicle_models",
      timestamps: false,
    }
  );
  return Vehicle_models;
};
