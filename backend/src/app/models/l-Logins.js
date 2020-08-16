"use strict";

module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define(
    "Logins",
    {
      id_people: DataTypes.BIGINT,
      user: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "Logins",
      timestamps: false,
    }
  );

  Logins.associate = (models) => {
    Logins.belongsTo(models.People, {
      foreignKey: "id_people",
      as: "People",
    });
    Logins.hasOne(models.Sessions, {
      foreignKey: "id_login",
      as: "Sessions",
    });
  };

  return Logins;
};
