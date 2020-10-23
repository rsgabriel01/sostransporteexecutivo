"use strict";

module.exports = (sequelize, DataTypes) => {
  const People_address = sequelize.define(
    "People_address",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      id_people: DataTypes.BIGINT,
      id_neighborhood: DataTypes.BIGINT,
      street: DataTypes.STRING,
      street_number: DataTypes.BIGINT,
      complement: DataTypes.STRING,
    },
    {
      tableName: "People_address",
      timestamps: false,
    }
  );

  People_address.associate = (models) => {
    People_address.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "People",
    });
    People_address.belongsTo(models.Neighborhoods, {
      foreignKey: "id_neighborhood",
      as: "Neighborhood",
    });
  };

  return People_address;
};
