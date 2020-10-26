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
        id_user: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
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
        tableName: "Sessions",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Sessions");
  },
};
