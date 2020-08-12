"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Sessoes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_usuario_empresa: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            // user hasmany 1:n
            model: "Usuarios_empresa",
            key: "id",
          },
        },
        token: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        first_acess: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        expiration: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Sessoes");
  },
};
