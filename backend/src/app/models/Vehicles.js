"use strict";

module.exports = (sequelize, DataTypes) => {
  const Vehicles = sequelize.define(
    "Vehicles",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      id_people: DataTypes.BIGINT,
      id_model: DataTypes.BIGINT,
      car_plate: DataTypes.STRING,
      registration_number: DataTypes.STRING,
      number_seats: DataTypes.BIGINT,
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
      as: "VehicleModel",
    });
    Vehicles.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "People",
    });

    Vehicles.hasMany(models.Service_orders, {
      foreignKey: "id_vehicle",
      as: "VehiclesServiceOrders",
    });
  };

  return Vehicles;
};
