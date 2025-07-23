import React, { useState } from "react";
import EventModal from "./EventModal";
import { Link } from "react-router-dom";


function AdminDashboard({ adicionarEvento }) {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <div>

    <h2 className="titulo-admin">AdminFy</h2>

    <h2 className="subtitulo-admin">Events</h2>

      <button onClick={() => setModalVisivel(true)}>
        Criar Novo Evento
      </button>

      <EventModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        adicionarEvento={adicionarEvento}
      />

      <Link to={"/home"} className="link02">
        Voltar para home
      </Link>
    </div>

    
  );
}

export default AdminDashboard;