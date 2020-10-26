"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Vehicle_models",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_brand: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Vehicle_brands",
            key: "id",
          },
          onUpdate: "CASCADE",
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        active: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        tableName: "Vehicle_models",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Vehicle_models");
  },
};
