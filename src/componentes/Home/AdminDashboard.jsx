import React, { useState } from "react";
import EventModal from "./EventModal";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";


function AdminDashboard({ adicionarEvento }) {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <div>

    <h2 className="titulo-admin">AdminFy</h2>

    <h2 className="subtitulo-admin">Events</h2>

      <div className="event-container">
        <button className="new-event" onClick={() => setModalVisivel(true)}>
          Novo Evento
        </button>
      </div>

      <EventModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        adicionarEvento={adicionarEvento}
      />

      <Link to={"/home"} className="back-home">
        Voltar para home
      </Link>
    </div>

    
  );
}

export default AdminDashboard;