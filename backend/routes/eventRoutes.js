const express = require('express');
const Event = require('../models/Event');
const router = express.Router();


router.post('/', async (req, res) => {
  const { nome, data, local, descricao, vagas } = req.body;
  const novoEvento = new Event({ nome, data, local, descricao, vagas });

  await novoEvento.save();
  res.json({ mensagem: "Evento criado com sucesso!" });
});


router.get('/', async (req, res) => {
  const eventos = await Event.find();
  res.json(eventos);
});

module.exports = router;