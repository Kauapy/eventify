import React, { useState } from "react";
import "./EventModal.css";
import axios from "axios";

function EventModal({ visible, onClose, adicionarEvento }) {
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

    adicionarEvento({
      nome: title,
      data: date,
      categoria,
      descricao,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Criar Novo Evento</h2>

        <form onSubmit={handleSave} className="modal-form">
          <label className="modal-label">
            Título
            <input
              className="modal-input"
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="modal-label">
            Data
            <input
              className="modal-input"
              type="date"
              name="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="modal-label">
            Categoria
            <select
              className="modal-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Geral">Geral</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Negócios">Negócios</option>
              <option value="Educação">Educação</option>
            </select>
          </label>

          <label className="modal-label">
            Descrição
            <textarea
              className="modal-textarea"
              name="description"
              rows="4"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </label>

          <div className="modal-actions">
            <button
              className="modal-button cancel"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button className="modal-button save" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
