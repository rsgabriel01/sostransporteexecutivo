"use strict";

module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define(
    "Types",
    {
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Types",
      timestamps: false,
    }
  );
  return Types;
};
