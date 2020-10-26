"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Neighborhoods",
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_city: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Citys",
            key: "id",
          },
          onUpdate: "CASCADE",
        },
        situation: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        name: {
          allowNull: true,
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "Neighborhoods",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Neighborhoods");
  },
};
