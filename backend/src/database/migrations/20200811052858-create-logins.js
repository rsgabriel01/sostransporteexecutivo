"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Logins",
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
        usuario: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        senha: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        ativo: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        tableName: "Logins",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Logins");
  },
};
