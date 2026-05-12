import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";

const CATEGORIAS = [
  { value: "", label: "Todas as categorias" },
  { value: "Música", label: "Música" },
  { value: "Tecnologia", label: "Tecnologia" },
  { value: "Esportes", label: "Esportes" },
  { value: "Arte", label: "Arte" },
  { value: "Educação", label: "Educação" },
  { value: "Negócios", label: "Negócios" },
  { value: "Geral", label: "Geral" },
];

function Home({ eventos = [], carregando, erro }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [filtroData, setFiltroData] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
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
    const buscaNorm = normalize(busca);

    return eventos.filter((evento) => {
      const dataEvento = new Date(evento.data);
      dataEvento.setHours(0, 0, 0, 0);

      if (filtroData === "futuro" && dataEvento <= hoje) return false;
      if (filtroData === "hoje" && dataEvento.getTime() !== hoje.getTime()) return false;
      if (filtroData === "passado" && dataEvento >= hoje) return false;

      if (filtroCategoria && evento.categoria !== filtroCategoria) return false;

      if (buscaNorm) {
        const alvo = normalize(
          `${evento.titulo || ""} ${evento.descricaoCurta || ""} ${evento.local || ""}`
        );
        if (!alvo.includes(buscaNorm)) return false;
      }
      return true;
    });
  }, [eventos, filtroData, filtroCategoria, busca]);

  const renderConteudo = () => {
    if (carregando) {
      return (
        <div className="eventos-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="event-skeleton" />
          ))}
        </div>
      );
    }
    if (erro) {
      return (
        <div className="estado-vazio">
          <h3>Não foi possível carregar os eventos</h3>
          <p>{erro}</p>
        </div>
      );
    }
    if (!eventosFiltrados.length) {
      return (
        <div className="estado-vazio">
          <h3>Nenhum evento encontrado</h3>
          <p>Tente ajustar os filtros ou volte mais tarde.</p>
        </div>
      );
    }
    return (
      <div className="eventos-grid">
        {eventosFiltrados.map((evento) => (
          <EventCard
            key={evento._id}
            evento={evento}
            onAbrir={setSelecionado}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      <header className="header-container">
        <h1 className="titulo-principal">Eventify</h1>
        <nav className="links-container">
          <Link className="link02" to="/home">Home</Link>
          {role === "admin" && (
            <Link className="link02" to="/admin">Admin Dashboard</Link>
          )}
        </nav>
        <button onClick={handleSignOut} className="Sign-Out" type="button">
          Sair
        </button>
      </header>

      <section className="conteudo">
        <div className="hero">
          <h2 className="titulo-secundario">Descubra eventos imperdíveis</h2>
          <p className="subtitulo">
            Encontre experiências de música, tecnologia, esportes e muito mais.
          </p>
        </div>

        <div className="filtros">
          <input
            className="busca-input"
            type="search"
            placeholder="Buscar por título, local..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select
            className="select"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          >
            <option value="">Qualquer data</option>
            <option value="futuro">Futuros</option>
            <option value="hoje">Hoje</option>
            <option value="passado">Passados</option>
          </select>
          <select
            className="select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {renderConteudo()}
      </section>

      {selecionado && (
        <EventDetail evento={selecionado} onClose={() => setSelecionado(null)} />
      )}
    </div>
  );
}

export default Home;
