module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "People",
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: DataTypes.STRING,
      cpf_cnpj: DataTypes.STRING,
      rg: DataTypes.STRING,
      company_name: DataTypes.STRING,
      name_fantasy: DataTypes.STRING,
      cnh: DataTypes.STRING,
      num_permit: DataTypes.STRING,
      phone: DataTypes.STRING,
      business_phone: DataTypes.STRING,
      email: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: "People",
      timestamps: false,
    }
  );

  People.associate = (models) => {
    People.hasOne(models.Users, {
      foreignKey: "id_people",
      as: "Users",
    });
    People.hasOne(models.Vehicles, {
      foreignKey: "id_people",
      as: "Vehicles",
    });
    People.hasOne(models.People_address, {
      foreignKey: "id_people",
      as: "People_address",
    });
    People.belongsToMany(models.Types, {
      through: "Type_people",
      foreignKey: "id_people",
      as: "People_Type",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_client",
      as: "Service_orders_clients",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_user_solicitation",
      as: "Service_orders_users_solicitation",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_user_attendance",
      as: "Service_orders_users_attendance",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_driver",
      as: "Service_orders_drivers",
    });
    People.hasMany(models.Service_orders, {
      foreignKey: "id_user_completion",
      as: "Service_orders_users_completion",
    });
  };

  return People;
};
