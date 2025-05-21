const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;


  const senhaHash = await bcrypt.hash(senha, 10);
  const novoUsuario = new User({ nome, email, senha: senhaHash });

  await novoUsuario.save();
  res.json({ mensagem: "Usuário registrado com sucesso!" });
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await User.findOne({ email });

  if (!usuario) return res.status(400).json({ mensagem: "Usuário não encontrado!" });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(401).json({ mensagem: "Senha incorreta!" });

  const token = jwt.sign({ id: usuario._id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  res.json({ token });
});

module.exports = router;