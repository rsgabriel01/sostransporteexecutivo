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
  return Status;
};
