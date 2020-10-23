"use strict";

module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define(
    "Types",
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Types",
      timestamps: false,
    }
  );

  Types.associate = (models) => {
    Types.belongsToMany(models.People, {
      through: "Type_people",
      foreignKey: "id_type",
      as: "Type_People",
    });
  };

  return Types;
};
