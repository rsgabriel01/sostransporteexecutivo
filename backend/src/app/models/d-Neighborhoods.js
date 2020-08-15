"use strict";

module.exports = (sequelize, DataTypes) => {
  const Neighborhoods = sequelize.define(
    "Neighborhoods",
    {
      id_city: DataTypes.BIGINT,
      situation: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      tableName: "Neighborhoods",
      timestamps: false,
    }
  );

  Neighborhoods.associate = (models) => {
    Neighborhoods.hasOne(models.Travel_fee, {
      foreignKey: "id_neighborhood",
      as: "Neighborhoods-Travel_fee",
    });
    Neighborhoods.hasMany(models.Service_orders, {
      foreignKey: "id_neighborhood_origin",
      as: "Neighborhoods-neighborhood_origin-Service_orders",
    });
    Neighborhoods.hasMany(models.Service_orders, {
      foreignKey: "id_neighborhood_destiny",
      as: "Neighborhoods-neighborhood_destiny-Service_orders",
    });
    Neighborhoods.hasMany(models.People_address, {
      foreignKey: "id_neighborhood",
      as: "Neighborhoods-People_address",
    });
    Neighborhoods.belongsTo(models.Citys, {
      foreignKey: "id",
      as: "Neighborhoods-Citys",
    });
  };

  return Neighborhoods;
};
