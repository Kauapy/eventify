import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/LoginPage/Login.jsx";
import Register from "./componentes/Register/Register.jsx";
import Home from "./componentes/Home/Home.jsx";
import AdminDashboard from "./componentes/Home/AdminDashboard.jsx";
import api from "./services/api";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarEventos = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const { data } = await api.get("/events");
      setEventos(data);
    } catch (err) {
      setErro(
        err?.response?.data?.mensagem ||
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const adicionarEvento = (novoEvento) => {
    setEventos((prev) => [...prev, novoEvento]);
  };

  const atualizarEvento = (eventoAtualizado) => {
    setEventos((prev) =>
      prev.map((e) => (e._id === eventoAtualizado._id ? eventoAtualizado : e))
    );
  };

  const removerEvento = (id) => {
    setEventos((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home eventos={eventos} carregando={carregando} erro={erro} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard
                  eventos={eventos}
                  carregando={carregando}
                  erro={erro}
                  adicionarEvento={adicionarEvento}
                  atualizarEvento={atualizarEvento}
                  removerEvento={removerEvento}
                />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
