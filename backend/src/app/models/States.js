"use strict";

module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    "States",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      name: DataTypes.STRING,
      uf: DataTypes.STRING,
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
