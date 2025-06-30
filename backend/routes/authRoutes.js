console.log("🔍 authRoutes carregado!");
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/register', async (req, res) => {
  try{
    const { nome, email, senha } = req.body;

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado!" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";
    
    const novoUsuario = new User({ nome, email, senha: senhaHash });

    await novoUsuario.save();

    res.json({ mensagem: "Usuário registrado com sucesso!" });
  }catch (error){
    res.status(500).json({
      mensagem: "Erro ao registrar usuário",
      error: error.message
    })
  }
});


router.post('/login', async  (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta!" });
    }
    
    console.log(`Usuário logado: ${usuario.email} | Role: ${usuario.role}`);

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, role: usuario.role });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;