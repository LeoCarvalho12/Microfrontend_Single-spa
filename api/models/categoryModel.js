module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    nome: { type: DataTypes.STRING, allowNull: false }
  }, { 
    tableName: 'categorias', 
    timestamps: false 
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { 
      foreignKey: 'categoria_id', 
      as: 'produtos' 
    });
  };

  return Category;
};