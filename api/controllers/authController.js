const { User } = require('../models');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const userExistente = await User.findOne({ where: { email } });
    if (userExistente) {
      return res.status(400).json({ error: "Usuário já cadastrado" });
    }
    
    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, senha: hashedSenha });
    
    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ user: novoUsuario, token });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

async function loginUser(req, res) {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ user, token, message: 'Login efetuado com sucesso' });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

async function getAllUser(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

module.exports = { registerUser, loginUser, getAllUser };
