const { CartProduct, Cart, Product } = require("../models");

const addProductToCart = async (req, res) => {
  try {
    const { usuario_id, produto_id, quantidade } = req.body;

    let cart = await Cart.findOne({ where: { usuario_id } });

    if (!cart) {
      cart = await Cart.create({ usuario_id });
    }

    let cartProduct = await CartProduct.findOne({
      where: { carrinho_id: cart.id, produto_id },
    });

    if (cartProduct) {
      cartProduct.quantidade += quantidade;
      await cartProduct.save();
    } else {
      cartProduct = await CartProduct.create({
        carrinho_id: cart.id,
        produto_id,
        quantidade,
      });
    }

    res.status(200).json({ message: "Produto adicionado ao carrinho!", cartProduct });
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
    res.status(500).json({ error: "Erro ao adicionar produto ao carrinho" });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { usuario_id } = req.query;
    const { produto_id } = req.params; 
    
    if (!produto_id || !usuario_id) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    const cart = await Cart.findOne({ where: { usuario_id } });
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    const cartProduct = await CartProduct.findOne({
      where: { carrinho_id: cart.id, produto_id },
    });

    if (!cartProduct) {
      return res.status(404).json({ error: "Produto não encontrado no carrinho" });
    }

    await cartProduct.destroy();
    res.status(200).json({ message: "Produto removido do carrinho" });
  } catch (error) {
    console.error("Erro ao remover produto do carrinho:", error);
    res.status(500).json({ error: "Erro ao remover produto do carrinho" });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { usuario_id, produto_id, quantidade } = req.body;

    const cart = await Cart.findOne({ where: { usuario_id } });
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    const cartProduct = await CartProduct.findOne({
      where: { carrinho_id: cart.id, produto_id },
    });

    if (!cartProduct) return res.status(404).json({ error: "Produto não encontrado no carrinho" });

    cartProduct.quantidade = quantidade;
    await cartProduct.save();

    res.status(200).json({ message: "Quantidade do produto atualizada", cartProduct });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar quantidade" });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const cart = await Cart.findOne({ where: { usuario_id } });

    if (!cart) return res.json({ message: "Carrinho vazio", itens: [] });

    const cartProducts = await CartProduct.findAll({
      where: { carrinho_id: cart.id },
      include: [{ model: Product, attributes: ["id", "nome", "preco"] }], // Mantendo apenas os atributos relevantes
    });

    if (!cartProducts || cartProducts.length === 0) {
      return res.json({ message: "Carrinho vazio", itens: [] });
    }

    const formattedCart = cartProducts.map((item) => ({
      id: item.produto.id,
      nome: item.produto.nome,
      preco: parseFloat(item.produto.preco),
      quantidade: item.quantidade,
    }));

    res.json({ itens: formattedCart });
  } catch (error) {
    console.error("Erro ao buscar produtos do carrinho:", error);
    res.status(500).json({ error: "Erro ao buscar produtos do carrinho" });
  }
};

const createCart = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    let existingCart = await Cart.findOne({ where: { usuario_id } });

    if (existingCart) {
      return res.status(400).json({ error: "O usuário já tem um carrinho" });
    }

    const newCart = await Cart.create({ usuario_id });
    res.status(201).json({ message: "Carrinho criado com sucesso!", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar carrinho" });
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  getCartProducts,
  createCart,
};
