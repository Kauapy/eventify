const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();


router.post('/', async (req, res) => {
  const { userId, eventId } = req.body;
  const reserva = new Reservation({ userId, eventId });

  await reserva.save();
  res.json({ mensagem: "Reserva confirmada!" });
});


router.get('/:userId', async (req, res) => {
  const reservas = await Reservation.find({ userId: req.params.userId }).populate('eventId');
  res.json(reservas);
});

module.exports = router;