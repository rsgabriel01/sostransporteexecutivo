"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicle_models = sequelize.define(
    "Vehicle_models",
    {
      id_brand: DataTypes.BIGINT,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicle_models",
      timestamps: false,
    }
  );

  Vehicle_models.associate = (models) => {
    Vehicle_models.hasMany(models.Vehicles, {
      foreignKey: "id_model",
      as: "Vehicles",
    });
    Vehicle_models.belongsTo(models.Vehicle_brands, {
      foreignKey: "id_brand",
      as: "Vehicle_model",
    });
  };

  return Vehicle_models;
};
