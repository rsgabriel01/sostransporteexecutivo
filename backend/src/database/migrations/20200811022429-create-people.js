"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "People",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        nome: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cpf_cnpj: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        rg: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        razao_social: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        nome_fantasia: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cnh: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        num_alvara: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        telefone: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        telefone_empresarial: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        email: {
          allowNull: true,
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
    return queryInterface.dropTable("People");
  },
};
