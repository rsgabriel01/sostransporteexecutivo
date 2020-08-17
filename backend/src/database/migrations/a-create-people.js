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
          type: DataTypes.STRING,
        },
        rg: {
          allowNull: true,
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
        },
        num_permit: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        phone: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        business_phone: {
          allowNull: true,
          type: DataTypes.STRING,
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
