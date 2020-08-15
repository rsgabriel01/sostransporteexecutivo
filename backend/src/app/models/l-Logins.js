"use strict";

module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define(
    "Logins",
    {
      id_people: DataTypes.BIGINT,
      user: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Logins",
      timestamps: false,
    }
  );
  return Logins;
};
