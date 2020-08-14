"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "States",
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        name: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        uf: {
          allowNull: true,
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "States",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("States");
  },
};
