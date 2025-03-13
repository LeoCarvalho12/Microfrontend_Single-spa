module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    perfil: {
      type: DataTypes.ENUM('CLIENTE', 'ADMIN'),
      defaultValue: 'CLIENTE'
    }
  });
  return User;
};
