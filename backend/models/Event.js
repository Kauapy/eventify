const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    descricaoCurta: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    descricaoCompleta: {
      type: String,
      default: '',
      trim: true,
    },
    imagem: {
      type: String,
      default: '',
      trim: true,
    },
    valor: {
      type: Number,
      default: 0,
      min: 0,
    },
    data: {
      type: Date,
      required: true,
    },
    horario: {
      type: String,
      default: '',
      trim: true,
    },
    local: {
      type: String,
      default: '',
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    vagas: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
