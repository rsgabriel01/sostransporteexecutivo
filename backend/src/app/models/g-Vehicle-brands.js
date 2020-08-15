"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicle_brands = sequelize.define(
    "Vehicle_brands",
    {
      description: DataTypes.BIGINT,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicle_brands",
      timestamps: false,
    }
  );
  return Vehicle_brands;
};
