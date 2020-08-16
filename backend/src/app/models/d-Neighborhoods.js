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
      as: "Travel_fee",
    });
    Neighborhoods.hasMany(models.Service_orders, {
      foreignKey: "id_neighborhood_origin",
      as: "Service_orders_neighborhoods-origin",
    });
    Neighborhoods.hasMany(models.Service_orders, {
      foreignKey: "id_neighborhood_destiny",
      as: "Service_orders_neighborhoods_destiny",
    });
    Neighborhoods.hasMany(models.People_address, {
      foreignKey: "id_neighborhood",
      as: "People_address",
    });
    Neighborhoods.belongsTo(models.Citys, {
      foreignKey: "id_city",
      as: "City",
    });
  };

  return Neighborhoods;
};
