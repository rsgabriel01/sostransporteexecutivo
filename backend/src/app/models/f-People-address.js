"use strict";

module.exports = (sequelize, DataTypes) => {
  const People_adress = sequelize.define(
    "People_adress",
    {
      id_people: DataTypes.BIGINT,
      id_neighborhood: DataTypes.BIGINT,
      street: DataTypes.STRING,
      street_number: DataTypes.BIGINT,
    },
    {
      tableName: "People_adress",
      timestamps: false,
    }
  );
  return People_adress;
};
