module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define(
    "CartProduct",
    {
      Carrinho_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "Carrinho", key: "id" },
      },
      Carrinho_Usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Usuario", key: "id" },
      },
      Produtos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "Produtos", key: "id" },
      },
      Produtos_Categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Categoria", key: "id" },
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    { 
      tableName: "carrinhoProduto",
      timestamps: false
    }
  );

  CartProduct.associate = (models) => {
    CartProduct.belongsTo(models.Cart, { foreignKey: "Carrinho_id", as: "carrinho" });
    CartProduct.belongsTo(models.User, { foreignKey: "Carrinho_Usuario_id", as: "usuario" });
    CartProduct.belongsTo(models.Product, { foreignKey: "Produtos_id", as: "produto" });
    CartProduct.belongsTo(models.Category, { foreignKey: "Produtos_Categoria_id", as: "categoria" });
  };

  return CartProduct;
};
