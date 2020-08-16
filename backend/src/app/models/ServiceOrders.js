"use strict";

module.exports = (sequelize, DataTypes) => {
  const Service_orders = sequelize.define(
    "Service_orders",
    {
      id_client: DataTypes.BIGINT,
      id_user_attendance: DataTypes.BIGINT,
      id_driver: DataTypes.BIGINT,
      id_status: DataTypes.BIGINT,
      date_time_attendance: DataTypes.DATE,
      id_neighborhood_origin: DataTypes.BIGINT,
      street_origin: DataTypes.STRING,
      street_number_origin: DataTypes.BIGINT,
      id_neighborhood_destiny: DataTypes.BIGINT,
      street_destiny: DataTypes.STRING,
      street_number_destiny: DataTypes.BIGINT,
      date_time_completion: DataTypes.DATE,
      id_user_completion: DataTypes.BIGINT,
      observation: DataTypes.STRING,
    },
    {
      tableName: "Service_orders",
      timestamps: false,
    }
  );

  Service_orders.associate = (models) => {
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_client",
      as: "Client",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_user_attendance",
      as: "User_attendance",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_driver",
      as: "Driver",
    });
    Service_orders.belongsTo(models.Status, {
      foreignKey: "id_status",
      as: "Status",
    });
    Service_orders.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood_origin",
      as: "Neighborhood_origin",
    });
    Service_orders.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood_destiny",
      as: "Neighborhood_destiny",
    });
    Service_orders.belongsTo(models.People, {
      foreignKey: "id_user_completion",
      as: "User_completion",
    });
  };

  return Service_orders;
};
