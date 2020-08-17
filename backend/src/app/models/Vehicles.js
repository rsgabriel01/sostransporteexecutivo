"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicles = sequelize.define(
    "Vehicles",
    {
      id_people: DataTypes.BIGINT,
      id_model: DataTypes.BIGINT,
      registration_number: DataTypes.STRING,
      color: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Vehicles",
      timestamps: false,
    }
  );

  Vehicles.associate = (models) => {
    Vehicles.belongsTo(models.Vehicle_models, {
      foreignKey: "id_model",
      as: "Vehicle_model",
    });
    Vehicles.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "People",
    });
  };

  return Vehicles;
};
