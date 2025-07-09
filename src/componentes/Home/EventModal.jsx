import React, { useState } from "react";
import "./EventModal.css";

const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [descricao, setDescricao] = useState("");

function EventModal({ visible, onClose, onSave }) {
  if (visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Novo Evento</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
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
