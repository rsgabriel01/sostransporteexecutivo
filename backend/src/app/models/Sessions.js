"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    "Sessions",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      id_user: DataTypes.BIGINT,
      token: DataTypes.STRING,
      first_acess: DataTypes.DATE,
      expiration: DataTypes.DATE,
    },
    {
      tableName: "Sessions",
      timestamps: false,
    }
  );

  Sessions.associate = (models) => {
    Sessions.belongsTo(models.Users, {
      foreignKey: "id_user",
      as: "User",
    });
  };

  return Sessions;
};
