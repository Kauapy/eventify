import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import "./AdminDashboard.css";

function AdminDashboard({ adicionarEvento }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <nav className="links-container">
          <Link className="link02" to="/home">
            Home
          </Link>
          <Link className="link02" to="/admin">
            Admin Dashboard
          </Link>
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
              Gerencie os eventos da plataforma Eventify
            </p>
          </div>
          <button
            className="new-event"
            onClick={() => setModalVisivel(true)}
            type="button"
          >
            + Novo Evento
          </button>
        </div>

        <Link to="/home" className="back-home">
          ← Voltar para Home
        </Link>
      </section>

      <EventModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        adicionarEvento={adicionarEvento}
      />
    </div>
  );
}

export default AdminDashboard;
