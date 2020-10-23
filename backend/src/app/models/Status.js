"use strict";

module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
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
