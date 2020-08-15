"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "People_address",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_people: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_neighborhood: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Neighborhoods",
            key: "id",
          },
        },
        street: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        street_number: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
      },
      {
        tableName: "People_address",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("People_address");
  },
};
