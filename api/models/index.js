const sequelize = require('../config/database'); 
const { DataTypes } = require('sequelize');

const Cart = require('../models/cartModel')(sequelize, DataTypes);
const CartProduct = require('../models/cartProductModel')(sequelize, DataTypes);
const Category = require('../models/categoryModel')(sequelize, DataTypes);
const Payment = require('../models/paymentModel')(sequelize, DataTypes);
const Order = require('../models/orderModel')(sequelize, DataTypes);
const Product = require('../models/productModel')(sequelize, DataTypes);
const User = require('../models/userModel')(sequelize, DataTypes);

// Relação Produto -> Categoria
Product.belongsTo(Category, { foreignKey: 'categoria_id', as: 'categoria' });

// Relação Carrinho -> Usuário
Cart.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

// Relação Pedido -> Usuário
Order.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

// Relação Pagamento -> Pedido
Payment.belongsTo(Order, { foreignKey: 'pedido_id', as: 'pedido' });

// Relação Carrinho -> Itens no Carrinho
Cart.hasMany(CartProduct, { foreignKey: 'carrinho_id', as: 'itens' });
CartProduct.belongsTo(Cart, { foreignKey: 'carrinho_id', as: 'carrinho' });

// Relação Itens do Carrinho -> Produto
CartProduct.belongsTo(Product, { foreignKey: 'produtos_id', as: 'produto' });
Product.hasMany(CartProduct, { foreignKey: 'produtos_id', as: 'carrinhoProdutos' });

sequelize.sync()
  .then(() => console.log("Banco de dados sincronizado com sucesso!"))
  .catch(error => console.error("Erro ao sincronizar o banco:", error));

module.exports = { 
  sequelize, 
  Cart, 
  CartProduct, 
  Category, 
  Payment, 
  Order, 
  Product, 
  User 
};
