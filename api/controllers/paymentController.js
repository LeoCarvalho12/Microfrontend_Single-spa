const { Payment } = require("../models");

const createPayment = async (req, res) => {
  try {
    const { pedido_id, valor, status } = req.body;

    const newPayment = await Payment.create({ pedido_id, valor, status });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};

module.exports = { createPayment, getAllPayments };