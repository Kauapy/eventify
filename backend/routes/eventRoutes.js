const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Event = require('../models/Event');



router.post('/', authMiddleware, async (req, res) => {
  if(req.user.role !== 'admin'){
    return res.status(403).json({ 
      mensagem: "Acesso negado. Você não tem permissão para criar eventos."
    }
  )
    try{
      const { nome, data, local, descricao, vagas} = req.body
      const novoEvento = new Event({ nome, data, local, descricao, vagas})
      await novoEvento.save()
      res.json({ mensagem: "Evento Criado com sucesso!"})
    } catch (error){
      res.status(500).json({
        mensagem: "Erro ao criar evento",
        error: error.message
      })
    }
}})


router.get('/', async (req, res) => {
  const eventos = await Event.find();
  res.json(eventos);
});

module.exports = router;