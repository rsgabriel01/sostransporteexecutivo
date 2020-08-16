"use strict";

module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
    {
      description: DataTypes.STRING,
    },
    {
      tableName: "Status",
      timestamps: false,
    }
  );

  Status.associate = (models) => {
    Status.hasMany(models.Service_orders, {
      foreignKey: "id_status",
      as: "Service_orders",
    });
  };

  return Status;
};
