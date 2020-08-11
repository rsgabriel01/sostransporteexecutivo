module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define(
    "Pessoas",
    {
      nome: DataTypes.STRING,
      cpf: DataTypes.BIGINT,
      rg: DataTypes.BIGINT,
      telefone: DataTypes.BIGINT,
      email: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
  return Pessoas;
};
