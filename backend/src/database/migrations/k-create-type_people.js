"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Type_people",
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
        id_type: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "Types",
            key: "id",
          },
        },
        active: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        tableName: "Type_people",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Type_people");
  },
};
