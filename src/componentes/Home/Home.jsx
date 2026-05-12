import React, { useState, useMemo } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Home({ eventos = [], removerEvento }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [filtroData, setFiltroData] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const normalize = (str = "") =>
    str
      .toString()
      .trim()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

  const eventosFiltrados = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return eventos.filter((evento) => {
      const dataEvento = new Date(evento.data);
      dataEvento.setHours(0, 0, 0, 0);

      if (filtroData === "futuro" && dataEvento <= hoje) return false;
      if (filtroData === "hoje" && dataEvento.getTime() !== hoje.getTime()) return false;
      if (filtroData === "passado" && dataEvento >= hoje) return false;

      if (
        filtroCategoria &&
        !normalize(evento.categoria).includes(normalize(filtroCategoria))
      ) {
        return false;
      }
      return true;
    });
  }, [eventos, filtroData, filtroCategoria]);

  const formatarData = (data) => {
    if (!data) return "";
    const d = new Date(data);
    if (Number.isNaN(d.getTime())) return data;
    return d.toLocaleDateString("pt-BR");
  };

  const excluirEvento = (id) => {
    if (!id) return;
    api
      .delete(`/events/${id}`)
      .then(() => removerEvento?.(id))
      .catch((err) => {
        console.error("Erro ao excluir evento:", err);
        alert("Não foi possível excluir o evento.");
      });
  };

  return (
    <div className="home-page">
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <nav className="links-container">
          <Link className="link02" to="/home">
            Home
          </Link>
          {role === "admin" && (
            <Link className="link02" to="/admin">
              Admin Dashboard
            </Link>
          )}
        </nav>
        <button onClick={handleSignOut} className="Sign-Out" type="button">
          Sair
        </button>
      </header>

      <section className="conteudo">
        <h2 className="titulo-secundario">Eventos</h2>

        <div className="select-container">
          <select
            className="select"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          >
            <option value="">Filtrar por data</option>
            <option value="futuro">Futuros</option>
            <option value="hoje">Hoje</option>
            <option value="passado">Passados</option>
          </select>

          <select
            className="select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="musica">Música</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="esportes">Esportes</option>
            <option value="arte">Arte</option>
            <option value="educacao">Educação</option>
            <option value="geral">Geral</option>
          </select>
        </div>

        {eventosFiltrados.length === 0 ? (
          <p className="sem-eventos">Nenhum evento encontrado.</p>
        ) : (
          <div className="eventos-grid">
            {eventosFiltrados.map((evento) => (
              <article key={evento._id || evento.nome} className="evento-card">
                <header className="evento-card-header">
                  <h3 className="evento-titulo">{evento.nome}</h3>
                  {role === "admin" && (
                    <button
                      onClick={() => excluirEvento(evento._id)}
                      className="btn-excluir"
                      title="Excluir evento"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </header>
                <p className="evento-data">📅 {formatarData(evento.data)}</p>
                <p className="evento-categoria">{evento.categoria}</p>
                <p className="evento-descricao">{evento.descricao}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
