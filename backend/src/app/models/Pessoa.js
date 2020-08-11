module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
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
  return Pessoa;
};
