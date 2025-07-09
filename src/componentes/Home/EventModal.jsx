import React, { useState } from "react";
import "./EventModal.css";
import axios from "axios";


function EventModal({ visible, onClose, onSave }) {
    
    const token = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("Geral");
  if (!visible) return null;


  function handleSave(e) {
  e.preventDefault();
  axios
    .post(
      "/events",
      { nome: title, data: date, categoria, descricao },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    .then(() => {
      alert("Evento criado com sucesso!");
      onClose();
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao criar evento.");
    });
}



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Novo Evento</h2>
        <form
          onSubmit={(handleSave)}
        >
          <label>
            Título
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </label>
          <label>
            Data
            <input
              type="date"
              name="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label>
            Descrição
            <textarea
              name="description"
              rows="4"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
