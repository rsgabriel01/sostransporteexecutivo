"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Pessoas",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        nome: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        cpf: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        rg: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        telefone: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        ativo: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Pessoas");
  },
};
