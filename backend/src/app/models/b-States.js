"use strict";

module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    "States",
    {
      name: DataTypes.STRING,
      uf: DataTypes.BIGINT,
    },
    {
      tableName: "States",
      timestamps: false,
    }
  );
  return States;
};
