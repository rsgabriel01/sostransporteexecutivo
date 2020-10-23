"use strict";

module.exports = (sequelize, DataTypes) => {
  const Travel_fee = sequelize.define(
    "Travel_fee",
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      id_neighborhood: DataTypes.BIGINT,
      value: DataTypes.REAL,
    },
    {
      tableName: "Travel_fee",
      timestamps: false,
    }
  );

  Travel_fee.associate = (models) => {
    Travel_fee.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood",
      as: "Neighborhood",
    });
  };

  return Travel_fee;
};
