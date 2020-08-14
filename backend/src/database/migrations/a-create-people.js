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
        name: {
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
        company_name: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        name_fantasy: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cnh: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        num_permit: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        phone: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        business_phone: {
          allowNull: true,
          type: DataTypes.BIGINT,
        },
        email: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        active: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
      },
      {
        tableName: "People",
        timestamps: false,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("People");
  },
};
