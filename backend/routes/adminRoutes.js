const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verificarAdmin = require('../middlewares/verificarAdmin');

const router = express.Router();

router.get('/users', verificarAdmin, async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários', error: error.message });
  }
});

router.post('/user', verificarAdmin, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios.' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();
    const usuario = novoUsuario.toObject();
    delete usuario.senha;
    res.json({ mensagem: 'Usuário criado com sucesso!', usuario });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário', error: error.message });
  }
});

router.delete('/user/:id', verificarAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Usuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir usuário', error: error.message });
  }
});

module.exports = router;
