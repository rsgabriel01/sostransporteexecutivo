"use strict";

module.exports = (sequelize, DataTypes) => {
  const Type_people = sequelize.define(
    "Type_people",
    {
      id_people: DataTypes.BIGINT,
      id_type: DataTypes.BIGINT,
    },
    {
      tableName: "Type_people",
      timestamps: false,
    }
  );
  return Type_people;
};
