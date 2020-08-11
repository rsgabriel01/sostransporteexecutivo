module.exports = (sequelize, DataTypes) => {
  const Usuarios_empresa = sequelize.define(
    "Usuarios_empresa",
    {
      id_pessoa: DataTypes.BIGINT,
      id_tipo_usuario: DataTypes.BIGINT,
      usuario: DataTypes.STRING,
      senha: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
    },
    {
      tableName: "Usuarios_empresa",
      timestamps: false,
    }
  );
  Usuarios_empresa.associate = (models) => {
    Usuarios_empresa.belongsTo(models.Pessoas, {
      foreignKey: "id",
      as: "Pessoas",
    });
    Usuarios_empresa.belongsTo(models.Tipos_usuarios, {
      foreignKey: "id",
      as: "Tipos_usuarios",
    });
  };

  return Usuarios_empresa;
};
