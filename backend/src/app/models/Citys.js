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

  Citys.associate = (models) => {
    Citys.hasMany(models.Neighborhoods, {
      foreignKey: "id_city",
      as: "Neighborhoods",
    });
    Citys.belongsTo(models.States, {
      foreignKey: "id_state",
      as: "State",
    });
  };

  return Citys;
};
