"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Service_orders",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_cliente: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_user_attendance: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_motorista: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_status: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Status",
            key: "id",
          },
        },
        date_time_attendance: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        id_neighborhood_origin: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Status",
            key: "id",
          },
        },
        street_origin: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        street_number_origin: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        id_neighborhood_destiny: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Status",
            key: "id",
          },
        },
        street_destiny: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        street_number_destiny: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        date_time_completion: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        id_user_completion: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        observation: {
          allowNull: true,
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "Service_orders",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Service_orders");
  },
};
