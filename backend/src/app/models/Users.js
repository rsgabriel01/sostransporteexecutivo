"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id_people: DataTypes.BIGINT,
      user: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );

  Users.associate = (models) => {
    Users.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "People",
    });
    Users.hasOne(models.Sessions, {
      foreignKey: "id_user",
      as: "Sessions",
    });
  };

  return Users;
};
