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

  People.associate = (models) => {
    People.hasOne(models.Logins, {
      foreignKey: "id_people",
      as: "People-Login",
    });
    People.hasOne(models.Vehicles, {
      foreignKey: "id_people",
      as: "People-Vehicles",
    });
    People.hasOne(models.People_address, {
      foreignKey: "id_people",
      as: "People-People_address",
    });
    People.hasMany(models.Type_people, {
      foreignKey: "id_people",
      as: "People-Type_people",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_client",
      as: "People-client-Service_orders",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_user_attendance",
      as: "People-user_attendance-Service_orders",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_driver",
      as: "People-driver-Service_orders",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_user_completion",
      as: "People-user_completion-Service_orders",
    });
  };

  return People;
};
