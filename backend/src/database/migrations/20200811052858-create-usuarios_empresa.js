"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "Usuarios_empresa",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        id_pessoa: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            // user hasmany 1:n
            model: "Pessoas",
            key: "id",
          },
        },
        id_tipo_usuario: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            // user hasmany 1:n
            model: "Tipos_usuarios",
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
        tableName: "Usuarios_empresa",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Usuarios_empresa");
  },
};
