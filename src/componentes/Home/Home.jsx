import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function Home() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [filtroData, setFiltroData] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [eventos, setEventos] = useState([]);

  const eventosFiltrados = eventos.filter((evento) => {
    const dataEvento = new Date(evento.data);
    const hoje = new Date();

    if (filtroData === "próximos" && dataEvento > hoje) return false;
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
          <Link className="link02" to="/">
            Home
          </Link>
          <Link className="link02" to="/events">
            Events
          </Link>
          {localStorage.getItem("role") === "admin" && (
            <Link className="link02" to="/admin">
              Painel Admin
            </Link>
          )}
        </div>
        <Link onClick={handleSignOut} className="Sign-Out">
          Sign out
        </Link>
      </header>

      <h1 className="titulo-secundario">Home</h1>
      <div className="select-container">
        <select
          className="select"
          onChange={(e) => setFiltroData(e.target.value)}
        >
          <option value="">Filtrar por data</option>
          <option value="futuro">Futuro</option>
          <option value="hoje">Presente</option>
          <option value="passado">Passado</option>
        </select>

        <select
          className="select"
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Categorias</option>
          <option value="musica">Música</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="esportes">Esportes</option>
        </select>
      </div>

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
