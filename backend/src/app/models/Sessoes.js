module.exports = (sequelize, DataTypes) => {
  const Sessoes = sequelize.define(
    "Sessoes",
    {
      id_usuario_empresa: DataTypes.BIGINT,
      token: DataTypes.STRING,
      first_acess: DataTypes.DATE,
      expiration: DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );
  Sessoes.associate = (models) => {
    Sessoes.belongsTo(models.Usuarios_empresa, {
      foreignKey: "id",
      as: "Usuarios_empresa",
    });
  };
  return Sessoes;
};
