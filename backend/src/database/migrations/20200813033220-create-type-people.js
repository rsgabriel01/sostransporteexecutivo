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
            // user hasmany 1:n
            model: "People",
            key: "id",
          },
        },
        id_type: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            // user hasmany 1:n
            model: "Types",
            key: "id",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Type_people");
  },
};
