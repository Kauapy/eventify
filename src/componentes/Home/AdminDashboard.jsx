import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import EventCard from "./EventCard";
import api from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard({ eventos = [], carregando, erro, adicionarEvento, atualizarEvento, removerEvento }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [excluindoId, setExcluindoId] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    navigate("/login");
  };

  const mostrarFeedback = (tipo, mensagem) => {
    setFeedback({ tipo, mensagem });
    setTimeout(() => setFeedback(null), 3000);
  };

  const abrirCriar = () => {
    setEventoEditando(null);
    setModalVisivel(true);
  };

  const abrirEditar = (evento) => {
    setEventoEditando(evento);
    setModalVisivel(true);
  };

  const onSalvo = (evento, foiEdicao) => {
    if (foiEdicao) {
      atualizarEvento?.(evento);
      mostrarFeedback("ok", "Evento atualizado com sucesso!");
    } else {
      adicionarEvento?.(evento);
      mostrarFeedback("ok", "Evento criado com sucesso!");
    }
  };

  const handleExcluir = async (evento) => {
    if (!window.confirm(`Excluir o evento "${evento.titulo}"?`)) return;
    setExcluindoId(evento._id);
    try {
      await api.delete(`/events/${evento._id}`);
      removerEvento?.(evento._id);
      mostrarFeedback("ok", "Evento excluído.");
    } catch (err) {
      mostrarFeedback("erro", err?.response?.data?.mensagem || "Erro ao excluir evento.");
    } finally {
      setExcluindoId(null);
    }
  };

  const renderLista = () => {
    if (carregando) {
      return (
        <div className="eventos-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="event-skeleton" />
          ))}
        </div>
      );
    }
    if (erro) {
      return (
        <div className="estado-vazio">
          <h3>Erro ao carregar eventos</h3>
          <p>{erro}</p>
        </div>
      );
    }
    if (!eventos.length) {
      return (
        <div className="estado-vazio">
          <h3>Você ainda não cadastrou nenhum evento</h3>
          <p>Comece criando o primeiro!</p>
          <button className="new-event" onClick={abrirCriar} type="button">
            + Criar primeiro evento
          </button>
        </div>
      );
    }
    return (
      <div className="eventos-grid">
        {eventos.map((evento) => (
          <EventCard
            key={evento._id}
            evento={evento}
            acoesAdmin={
              <div
                className="event-card-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="event-card-action"
                  onClick={() => abrirEditar(evento)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  className="event-card-action danger"
                  onClick={() => handleExcluir(evento)}
                  disabled={excluindoId === evento._id}
                  type="button"
                >
                  {excluindoId === evento._id ? "..." : "Excluir"}
                </button>
              </div>
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="admin-page">
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <nav className="links-container">
          <Link className="link02" to="/home">Home</Link>
          <Link className="link02" to="/admin">Admin Dashboard</Link>
        </nav>
        <button onClick={handleSignOut} className="Sign-Out" type="button">
          Sair
        </button>
      </header>

      <section className="admin-section">
        <div className="admin-header">
          <div>
            <h2 className="titulo-admin">Painel do Administrador</h2>
            <p className="subtitulo-admin">
              Gerencie todos os eventos da plataforma Eventify
            </p>
          </div>
          <button className="new-event" onClick={abrirCriar} type="button">
            + Novo Evento
          </button>
        </div>

        {feedback && (
          <div className={`feedback feedback-${feedback.tipo}`}>
            {feedback.mensagem}
          </div>
        )}

        {renderLista()}

        <Link to="/home" className="back-home">
          ← Voltar para Home
        </Link>
      </section>

      <EventModal
        visible={modalVisivel}
        evento={eventoEditando}
        onClose={() => setModalVisivel(false)}
        onSalvo={onSalvo}
      />
    </div>
  );
}

export default AdminDashboard;
