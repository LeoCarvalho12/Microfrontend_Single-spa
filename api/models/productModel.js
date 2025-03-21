module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    categoria_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: { model: 'categorias', key: 'id' } 
    }
  }, { 
    tableName: 'produtos', 
    timestamps: false 
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { 
      foreignKey: 'categoria_id', 
      as: 'categoria' 
    });
  };

  return Product;
};
