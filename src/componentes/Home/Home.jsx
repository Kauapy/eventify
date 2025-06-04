import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
function Home() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };

  const [filtroData, setFiltroData] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [eventos, setEventos] = useState([]);

  const eventosFiltrados = eventos.filter((evento) => {
    const dataEvento = new Date(evento.data);
    const hoje = new Date();

    if (filtroData === "futuro" && dataEvento > hoje) return false;
    if (
      filtroData === "hoje" &&
      dataEvento.toDateString() !== hoje.toDateString()
    )
      return false;
    if (filtroData === "passado" && dataEvento < hoje) return false;

    if (filtroCategoria && evento.categoria !== filtroCategoria) return false;

    return true;
  });

  return (
    <div>
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <div className="links-container">
          <Link className="link02">Home</Link>
          <Link className="link02">Events</Link>
        </div>
        <Link onClick={handleSignOut} className="Sign-Out">
          Sign out
        </Link>
      </header>
      <h1 className="titulo-secundario">Home</h1>
      <select onChange={(e) => setFiltroData(e.target.value)}>
        <option value="futuro">Eventos Futuros</option>
        <option value="hoje">Eventos Hoje</option>
        <option value="passado">Eventos Passados</option>
      </select>

      <select onChange={(e) => setFiltroCategoria(e.target.value)}>
        <option value="">Todas as Categorias</option>
        <option value="musica">Música</option>
        <option value="tecnologia">Tecnologia</option>
        <option value="esportes">Esportes</option>
      </select>

      {eventosFiltrados.map((evento) => (
        <div key={evento.id}>
          <h3>{evento.nome}</h3>
          <p>Data: {evento.data}</p>
          <p>Categoria: {evento.categoria}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
