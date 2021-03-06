"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Travel_fee",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_neighborhood: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Neighborhoods",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        value: {
          allowNull: false,
          type: DataTypes.REAL,
        },
      },
      {
        tableName: "Travel_fee",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Travel_fee");
  },
};
