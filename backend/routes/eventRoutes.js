const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middlewares/authMiddleware");




router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      mensagem: "Acesso negado. Você não tem permissão para criar eventos."
    });
  }

  try {

    const { nome, data, categoria, descricao } = req.body;

    const novoEvento = new Event({ nome, data, categoria, descricao });
    await novoEvento.save();

    return res.status(201).json(novoEvento);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao criar evento",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const eventos = await Event.find();  
    return res.json(eventos);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar eventos",
      error: error.message
    });
  }
});

module.exports = router;