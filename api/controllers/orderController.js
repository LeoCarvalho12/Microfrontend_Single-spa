const { Order, Cart, CartProduct, Payment, Product } = require("../models");

const createOrder = async (req, res) => {
  try {
    const { userId, valorTotal } = req.body;

    const cart = await Cart.findOne({
      where: { usuario_id: userId },
      include: [
        {
          model: CartProduct,
          as: "itens",
          include: {
            model: Product,
            as: "produto",
          },
        },
      ],
    });

    if (!cart || cart.itens.length === 0) 
      return res.status(400).json({ error: "Carrinho vazio" });

    const order = await Order.create({ usuario_id: userId, status: "PENDENTE" });

    for (const cartItem of cart.itens) {
      await cartItem.update({ pedido_id: order.id });
    }

    const payment = await Payment.create({ pedido_id: order.id, valor: valorTotal, status: "PENDENTE" });

    await CartProduct.destroy({ where: { carrinho_id: cart.id } });

    res.status(201).json({ message: "Pedido criado", orderId: order.id, paymentId: payment.id });
  } catch (error) {
    console.error("❌ Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status do pedido atualizado!", status: order.status });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
