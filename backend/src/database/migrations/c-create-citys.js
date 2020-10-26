"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Citys",
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_state: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "States",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        name: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        ddd: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        ibge: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
      },
      {
        tableName: "Citys",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Citys");
  },
};
