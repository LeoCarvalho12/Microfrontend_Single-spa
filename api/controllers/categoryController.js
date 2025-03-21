const { Category } = require('../models');

exports.createCategory = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ error: "O campo 'nome' é obrigatório." });

    const existingCategory = await Category.findOne({ where: { nome } });
    if (existingCategory)return res.status(400).json({ error: "Categoria já cadastrada" });

    const newCategory = await Category.create({ nome });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};
