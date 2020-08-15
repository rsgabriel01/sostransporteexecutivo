module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "People",
    {
      name: DataTypes.STRING,
      cpf_cnpj: DataTypes.BIGINT,
      company_name: DataTypes.STRING,
      name_fantasy: DataTypes.STRING,
      cnh: DataTypes.BIGINT,
      num_permit: DataTypes.BIGINT,
      phone: DataTypes.BIGINT,
      business_phone: DataTypes.BIGINT,
      email: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "People",
      timestamps: false,
    }
  );
  return People;
};
