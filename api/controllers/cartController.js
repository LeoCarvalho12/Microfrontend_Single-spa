const { Cart, CartProduct, Product } = require("../models");

const getCartByUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) 
      return res.status(400).json({ error: "ID inválido" });

    let cart = await Cart.findOne({
      where: { usuario_id: id },
      attributes: ["id", "usuario_id"],
      include: [
        {
          model: CartProduct,
          as: "itens",
          attributes: ["quantidade", "Produtos_id"],
          include: {
            model: Product,
            as: "produto",
            attributes: ["id", "nome", "descricao", "preco", "estoque", "categoria_id"],
          },
        },
      ],
    });

    if (!cart)cart = await Cart.create({ usuario_id: id });

    const cartData = cart.toJSON();
    cartData.itens = cartData.itens.filter(item => item.produto);

    res.json(cartData);
  } catch (error) {
    console.error(" Erro ao buscar o carrinho:", error);
    res.status(500).json({ error: "Erro ao buscar o carrinho" });
  }
};

const addToCart = async (req, res) => {
  try {
    const usuario_id = req.body.usuario_id || req.body.userId;
    const { produto_id, produtoId, quantidade } = req.body;
    const produtoIdFinal = produto_id || produtoId;

    if (!usuario_id) 
      return res.status(400).json({ error: "ID do usuário é obrigatório" });

    if (!produtoIdFinal) 
      return res.status(400).json({ error: "ID do produto é obrigatório" });

    const produto = await Product.findByPk(produtoIdFinal);
    if (!produto) 
      return res.status(404).json({ error: "Produto não encontrado" });

    let cart = await Cart.findOne({ where: { usuario_id } });

    if (!cart) 
      cart = await Cart.create({ usuario_id });

    let cartProduct = await CartProduct.findOne({
      where: { Carrinho_id: cart.id, Produtos_id: produtoIdFinal },
    });

    if (cartProduct) {
      cartProduct.quantidade += quantidade;
      await cartProduct.save();
    } else {
      cartProduct = await CartProduct.create({
        Carrinho_id: cart.id,
        Carrinho_Usuario_id: usuario_id,
        Produtos_id: produtoIdFinal,
        Produtos_Categoria_id: produto.categoria_id,
        quantidade,
      });
    }

    res.status(200).json({ message: "Produto adicionado ao carrinho!", cartProduct });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto ao carrinho" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { produtoId } = req.params; 
    const { usuarioId } = req.query; 

    if (!produtoId) {
      return res.status(400).json({ error: "ID do produto não informado" });
    }

    if (!usuarioId) {
      return res.status(400).json({ error: "ID do usuário não informado" });
    }

    const cart = await Cart.findOne({ where: { usuario_id: usuarioId } });

    if (!cart) {
      return res.status(404).json({ error: "Carrinho não encontrado" });
    }

    const deletedItem = await CartProduct.destroy({
      where: {
        carrinho_id: cart.id,
        Produtos_id: produtoId, 
      },
    });

    if (!deletedItem) {
      return res.status(404).json({ error: "Produto não encontrado no carrinho" });
    }

    return res.json({ message: "Produto removido do carrinho com sucesso" });
  } catch (error) {
    console.error("Erro ao remover produto do carrinho:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ where: { usuario_id: userId } });
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    await CartProduct.destroy({ where: { carrinho_id: cart.id } });

    res.json({ message: "Checkout realizado com sucesso. Carrinho esvaziado!" });
  } catch (error) {
    console.error("Erro ao finalizar a compra:", error);
    res.status(500).json({ error: "Erro ao finalizar a compra" });
  }
};

const createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) 
      return res.status(400).json({ error: "ID do usuário não fornecido" });

    const existingCart = await Cart.findOne({ where: { usuario_id: userId } });

    if (existingCart) 
      return res.status(400).json({ error: "Usuário já tem um carrinho" });

    const newCart = await Cart.create({ usuario_id: userId });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar carrinho" });
  }
};

module.exports = { getCartByUser, addToCart, removeFromCart, checkout, createCart };
