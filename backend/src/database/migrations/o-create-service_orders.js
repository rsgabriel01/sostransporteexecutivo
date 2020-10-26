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
        id_client: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_user_solicitation: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_user_attendance: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_driver: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        id_vehicle: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "Vehicles",
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
        date_time_solicitation: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        date_time_attendance: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        date_time_execution: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        id_neighborhood_origin: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Neighborhoods",
            key: "id",
          },
        },
        street_origin: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        street_number_origin: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        complement_origin: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        client_origin: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        id_neighborhood_destiny: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Neighborhoods",
            key: "id",
          },
        },
        street_destiny: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        street_number_destiny: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        complement_destiny: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        client_destiny: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        passenger_name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        passenger_phone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        number_passengers: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        travel_value: {
          allowNull: false,
          type: DataTypes.REAL,
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
        observation_service: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        observation_update: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        id_user_cancellation: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
            model: "People",
            key: "id",
          },
        },
        observation_cancellation: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cancellation_fee: {
          allowNull: true,
          type: DataTypes.REAL,
        },
        date_time_cancellation: {
          allowNull: true,
          type: DataTypes.DATE,
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
