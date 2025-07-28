import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { useEffect } from "react";

function Home({ eventos, adicionarEvento }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [filtroData, setFiltroData] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [eventosState, setEventos] = useState(eventos || []);
  const user = JSON.parse(localStorage.getItem("user"));

  const normalize = (str = "") =>
    str
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  useEffect(() => {
    axios
      .get("http://localhost:3001/events")
      .then((res) => setEventos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const eventosFiltrados = eventosState.filter((evento) => {
    const dataEvento = new Date(evento.data);
    const hoje = new Date();

    if (filtroData === "futuro" && dataEvento < hoje) return false;
    if (
      filtroData === "hoje" &&
      dataEvento.toDateString() !== hoje.toDateString()
    )
      return false;
    if (filtroData === "passado" && dataEvento > hoje) return false;

    if (
      filtroCategoria &&
      !normalize(evento.categoria).includes(normalize(filtroCategoria))
    ) {
      return false;
    }

    return true;
  });

  function excluirEvento(id) {
    if (!id) {
      console.warn("ID inválido:", id);
      return;
    }
    axios
      .delete(`http://localhost:3001/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      .then(() => {
        setEventos((prev) => prev.filter((evento) => evento._id !== id));
      })

      .catch((err) => {
        console.error("Erro ao excluir evento:", err);
      });
  }

  return (
    <div>
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <div className="links-container">
          <Link className="link02" to="/home">
            Home
          </Link>
          {localStorage.getItem("role") === "admin" && (
            <Link className="link02" to="/admin">
              Admin Dashboard
            </Link>
          )}
        </div>
        <button onClick={handleSignOut} className="Sign-Out">
          Sign out
        </button>
      </header>

      <h1 className="titulo-secundario">Home</h1>
      <div className="select-container">
        <select
          className="select"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        >
          <option value="">Filtrar por data</option>
          <option value="futuro">Futuro</option>
          <option value="hoje">Presente</option>
          <option value="passado">Passado</option>
        </select>

        <select
          className="select"
          value={filtroCategoria}
          onChange={(e) => {
            console.log("Categoria selecionada:", e.target.value);
            setFiltroCategoria(e.target.value);
          }}
        >
          <option value="">Categorias</option>
          <option value="musica">Música</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="esportes">Esportes</option>
          <option value="arte">Arte</option>
          <option value="educacao">Educação</option>
        </select>
      </div>

      {eventosFiltrados.map((evento) => (
        <div key={evento.id || evento.nome} className="evento-card">
          <h3 className="evento-titulo">{evento.nome}</h3>
          <p className="evento-data">Data: {evento.data}</p>
          <p className="evento-categoria">Categoria: {evento.categoria}</p>
          <p className="evento-descricao">{evento.descricao}</p>
          {user?.role === "admin" && (
            <button
              onClick={() => excluirEvento(evento._id)}
              className="btn-excluir"
            >
              ❌
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
