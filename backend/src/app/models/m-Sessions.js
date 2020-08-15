"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    "Sessions",
    {
      id_login: DataTypes.BIGINT,
      token: DataTypes.STRING,
      first_acess: DataTypes.DATE,
      expiration: DataTypes.DATE,
    },
    {
      tableName: "Sessions",
      timestamps: false,
    }
  );
  return Sessions;
};
