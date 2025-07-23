const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    categoria: { 
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Event", EventSchema)