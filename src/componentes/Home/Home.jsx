import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
function Home() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };

  function ProtectedRoute({ children}){
    const userRole = localStorage.getItem("role");
    return userRole === "admin" ? children : <Navigate to="/"></Navigate>
  }


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
          <Link className="link02">Home</Link>
          <Link className="link02">Events</Link>
          <Route path="/admin" element={<ProtectedRoute> <AdminDashBoard></AdminDashBoard></ProtectedRoute>}></Route>
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
