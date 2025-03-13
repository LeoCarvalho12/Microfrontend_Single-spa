module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Product;
};
