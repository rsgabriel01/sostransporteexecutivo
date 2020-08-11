"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Tipos_usuarios",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        descricao: {
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
    return queryInterface.dropTable("Tipos_usuarios");
  },
};
