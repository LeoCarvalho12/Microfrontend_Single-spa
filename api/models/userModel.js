module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false },
    perfil: { type: DataTypes.ENUM('ADMIN', 'CLIENTE'), allowNull: false }
  }, { tableName: 'usuario', timestamps: false });

  return User;
};
