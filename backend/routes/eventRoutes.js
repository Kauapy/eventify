const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado. Permissão de administrador requerida.' });
  }
  next();
};

const validarPayload = (body, { parcial = false } = {}) => {
  const erros = [];
  const obrigatorios = ['titulo', 'descricaoCurta', 'data', 'categoria'];
  if (!parcial) {
    obrigatorios.forEach((campo) => {
      if (body[campo] === undefined || body[campo] === null || body[campo] === '') {
        erros.push(`${campo} é obrigatório`);
      }
    });
  }

  if (body.titulo && typeof body.titulo !== 'string') erros.push('titulo inválido');
  if (body.descricaoCurta && body.descricaoCurta.length > 200) {
    erros.push('descricaoCurta deve ter até 200 caracteres');
  }
  if (body.valor !== undefined && body.valor !== null && body.valor !== '') {
    const valorNum = Number(body.valor);
    if (Number.isNaN(valorNum) || valorNum < 0) erros.push('valor deve ser um número >= 0');
  }
  if (body.data) {
    const d = new Date(body.data);
    if (Number.isNaN(d.getTime())) erros.push('data inválida');
  }
  if (body.vagas !== undefined && body.vagas !== null && body.vagas !== '') {
    const v = Number(body.vagas);
    if (!Number.isInteger(v) || v < 0) erros.push('vagas deve ser um inteiro >= 0');
  }

  return erros;
};

const sanitizarPayload = (body) => {
  const payload = {};
  const campos = [
    'titulo',
    'descricaoCurta',
    'descricaoCompleta',
    'imagem',
    'data',
    'horario',
    'local',
    'categoria',
  ];
  campos.forEach((c) => {
    if (body[c] !== undefined) payload[c] = body[c];
  });
  if (body.valor !== undefined && body.valor !== '') payload.valor = Number(body.valor);
  if (body.vagas !== undefined && body.vagas !== '' && body.vagas !== null) {
    payload.vagas = Number(body.vagas);
  } else if (body.vagas === null || body.vagas === '') {
    payload.vagas = null;
  }
  return payload;
};

router.get('/', async (req, res) => {
  try {
    const eventos = await Event.find().sort({ data: 1 });
    return res.json(eventos);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar eventos', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    const evento = await Event.findById(req.params.id);
    if (!evento) return res.status(404).json({ mensagem: 'Evento não encontrado' });
    return res.json(evento);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar evento', error: error.message });
  }
});

router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const erros = validarPayload(req.body);
    if (erros.length) return res.status(400).json({ mensagem: 'Dados inválidos', erros });

    const novoEvento = new Event(sanitizarPayload(req.body));
    await novoEvento.save();
    return res.status(201).json(novoEvento);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar evento', error: error.message });
  }
});

router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    const erros = validarPayload(req.body, { parcial: true });
    if (erros.length) return res.status(400).json({ mensagem: 'Dados inválidos', erros });

    const eventoAtualizado = await Event.findByIdAndUpdate(
      req.params.id,
      sanitizarPayload(req.body),
      { new: true, runValidators: true }
    );
    if (!eventoAtualizado) return res.status(404).json({ mensagem: 'Evento não encontrado' });
    return res.json(eventoAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar evento', error: error.message });
  }
});

router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    const deletado = await Event.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ mensagem: 'Evento não encontrado' });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao deletar evento', error: error.message });
  }
});

module.exports = router;
