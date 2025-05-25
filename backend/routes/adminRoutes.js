const express = require('express');
const User = require('../models/User');
const router = express.Router();
const verificarAdmin = require('../middlewares/verificarAdmin');


router.get('/users', verificarAdmin, async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuários", error: error.message });
  }
});


router.post('/user', verificarAdmin, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();
    res.json({ mensagem: "Usuário criado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar usuário", error: error.message });
  }
});


router.delete('/user/:id', verificarAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir usuário", error: error.message });
  }
});

module.exports = router;