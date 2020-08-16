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

  States.associate = (models) => {
    States.hasMany(models.Citys, {
      foreignKey: "id_state",
      as: "Citys",
    });
  };

  return States;
};
