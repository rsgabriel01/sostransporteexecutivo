"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Sessions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_login: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            // user hasmany 1:n
            model: "Logins",
            key: "id",
          },
        },
        token: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        first_acess: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        expiration: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Sessions");
  },
};
