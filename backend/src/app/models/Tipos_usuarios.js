module.exports = (sequelize, DataTypes) => {
  const Tipos_usuarios = sequelize.define(
    "Tipos_usuarios",
    {
      descricao: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
  return Tipos_usuarios;
};
