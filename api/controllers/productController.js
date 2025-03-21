const { Product, Category } = require('../models'); 
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: Category, as: "categoria", attributes: ["nome"] } 
    });
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: Category, attributes: ['nome'] }
    });

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let productsData = req.body;

    if (!Array.isArray(productsData)) {
      productsData = [productsData];
    }

    const newProducts = await Promise.all(
      productsData.map(async (productData) => {
        if (!productData.nome || !productData.descricao || !productData.preco || !productData.estoque || !productData.categoria_id) {
          throw new Error(`Produto inválido: ${JSON.stringify(productData)}`);
        }

        const categoria = await Category.findByPk(productData.categoria_id);
        if (!categoria) {
          throw new Error(`Categoria ID '${productData.categoria_id}' não encontrada`);
        }

        return await Product.create({
          nome: productData.nome,
          descricao: productData.descricao,
          preco: productData.preco,
          estoque: productData.estoque,
          categoria_id: productData.categoria_id
        });
      })
    );

    res.status(201).json(newProducts);
  } catch (error) {
    console.error("Erro ao criar o produto:", error.message);
    res.status(500).json({ error: error.message || "Erro ao criar o produto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    if (req.body.categoria) {
      const categoria = await Category.findOne({ where: { nome: req.body.categoria } });

      if (!categoria) {
        return res.status(400).json({ error: `Categoria '${req.body.categoria}' não encontrada` });
      }

      req.body.categoria_id = categoria.id;
      delete req.body.categoria;
    }

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

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
