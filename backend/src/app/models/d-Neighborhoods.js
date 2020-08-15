"use strict";

module.exports = (sequelize, DataTypes) => {
  const Neighborhoods = sequelize.define(
    "Neighborhoods",
    {
      id_city: DataTypes.BIGINT,
      situation: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      tableName: "Neighborhoods",
      timestamps: false,
    }
  );
  return Neighborhoods;
};
