"use strict";

module.exports = (sequelize, DataTypes) => {
  const People_address = sequelize.define(
    "People_address",
    {
      id_people: DataTypes.BIGINT,
      id_neighborhood: DataTypes.BIGINT,
      street: DataTypes.STRING,
      street_number: DataTypes.BIGINT,
    },
    {
      tableName: "People_address",
      timestamps: false,
    }
  );
  return People_address;
};
