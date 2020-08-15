"use strict";

module.exports = (sequelize, DataTypes) => {
  const Travel_fee = sequelize.define(
    "Travel_fee",
    {
      id_neighborhood: DataTypes.BIGINT,
      value: DataTypes.BIGINT,
    },
    {
      tableName: "Travel_fee",
      timestamps: false,
    }
  );
  return Travel_fee;
};
