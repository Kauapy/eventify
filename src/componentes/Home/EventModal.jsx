import React, { useState } from "react";
import "./EventModal.css";
import api from "../../services/api";

function EventModal({ visible, onClose, adicionarEvento }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Geral");
  const [salvando, setSalvando] = useState(false);

  if (!visible) return null;

  const resetar = () => {
    setTitle("");
    setDate("");
    setDescricao("");
    setCategoria("Geral");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (salvando) return;
    setSalvando(true);
    try {
      const { data: novoEvento } = await api.post("/events", {
        nome: title,
        data: date,
        categoria,
        descricao,
      });
      adicionarEvento?.(novoEvento);
      resetar();
      onClose();
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      alert(err?.response?.data?.mensagem || "Não foi possível criar o evento.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true">
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
              <option value="Esportes">Esportes</option>
              <option value="Educação">Educação</option>
              <option value="Arte">Arte</option>
              <option value="Música">Música</option>
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
              disabled={salvando}
            >
              Cancelar
            </button>
            <button className="modal-button save" type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
