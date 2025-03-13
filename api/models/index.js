// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:'  // ou use um arquivo, por exemplo, './database.sqlite'
});

const Product = require('./productModel')(sequelize, DataTypes);
const User = require('./userModel')(sequelize, DataTypes);

// Sincroniza o banco de dados (para testes)
sequelize.sync()
  .then(() => console.log("Banco de dados sincronizado"))
  .catch(error => console.error("Erro ao sincronizar o banco:", error));

module.exports = {
  sequelize,
  Product,
  User
};
