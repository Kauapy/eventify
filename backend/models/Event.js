const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    data: { type: Date, required: true},
    descricao: { type: String, required: true},
    local: { type: String, required: true},
    vagas: { type: Number, required: true},
    criadoEm: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Event", EventSchema);