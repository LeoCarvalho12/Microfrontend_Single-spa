const { Product } = require('../models');
const { Op } = require('sequelize');
// Importando o modelo Product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Função para obter um produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};

// Função para criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    // Verifica se o corpo da requisição é um array
    if (Array.isArray(req.body)) {
      // Cria todos os produtos usando Promise.all para executar as operações em paralelo
      const newProducts = await Promise.all(
        req.body.map((productData) => Product.create(productData))
      );
      return res.status(201).json(newProducts);
    } else {
      // Se for um único objeto, cria apenas um produto
      const newProduct = await Product.create(req.body);
      return res.status(201).json(newProduct);
    }
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    return res.status(500).json({ error: "Erro ao criar o produto" });
  }
};


// Função para atualizar um produto existente
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

// Função para excluir um produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    await product.destroy();
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o produto' });
  }
};

exports.getProductsByIds = async (req, res) => {
  try {
    if (!req.query.ids) {
      return res.status(400).json({ error: "Parâmetro 'ids' é obrigatório." });
    }

    const ids = req.query.ids
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));

    console.log("Ids recebidos:", ids);

    if (ids.length === 0) {
      return res.status(400).json({ error: "Nenhum id válido informado." });
    }

    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });

    console.log("Produtos encontrados:", products);

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "Nenhum produto encontrado" });
    }

    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};
