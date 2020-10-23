"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicle_brands = sequelize.define(
    "Vehicle_brands",
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      description: DataTypes.BIGINT,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicle_brands",
      timestamps: false,
    }
  );

  Vehicle_brands.associate = (models) => {
    Vehicle_brands.hasMany(models.Vehicle_models, {
      foreignKey: "id_brand",
      as: "Vehicle_models",
    });
  };

  return Vehicle_brands;
};
