"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Vehicles",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_people: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_model: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Vehicle_models",
            key: "id",
          },
        },
        car_plate: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        registration_number: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        color: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        active: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        tableName: "Vehicles",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Vehicles");
  },
};
