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

  Type_people.associate = function (models) {
    Type_people.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "Type_people_People",
    });
    Type_people.belongsTo(models.Type_people, {
      foreignKey: "id_type",
      as: "Type_people_Type",
    });
  };

  return Type_people;
};