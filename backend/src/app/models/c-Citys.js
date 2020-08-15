"use strict";

module.exports = (sequelize, DataTypes) => {
  const Citys = sequelize.define(
    "Citys",
    {
      id_state: DataTypes.BIGINT,
      name: DataTypes.STRING,
      ddd: DataTypes.INTEGER,
      ibge: DataTypes.BIGINT,
    },
    {
      tableName: "Citys",
      timestamps: false,
    }
  );
  return Citys;
};
