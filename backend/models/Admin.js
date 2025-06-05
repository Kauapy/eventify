const express = require("express")
const router = express.Router()
const autenticarAdmin = require("../middlewares/autenticarAdmin")
const Event = require("../models/Event")

router.post("/events", autenticarAdmin, async (req, res) =>{
    try{
        const { nome, data, categoria, descricao} = req.body;

        const novoEvento = new Event({ nome, data, categoria, descricao})
        await novoEvento.save()

        res.status(201).json({ mensagem: "Evento criado com sucesso!", evento: novoEvento })
    } catch (errror){
        res.status(500).json({ mensagem: "Erro ao criar evento", erro: error.mensage})
    }
}) 