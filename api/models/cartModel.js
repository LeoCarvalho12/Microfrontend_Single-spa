module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "carrinho", timestamps: false }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "usuario_id", as: "usuario" });
    Cart.hasMany(models.CartProduct, { foreignKey: "carrinho_id", as: "itens" });
  };

  return Cart;
};
