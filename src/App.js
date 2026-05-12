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

  const carregarEventos = useCallback(() => {
    api
      .get("/events")
      .then(({ data }) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const adicionarEvento = (novoEvento) => {
    setEventos((prev) => [...prev, novoEvento]);
  };

  const removerEvento = (id) => {
    setEventos((prev) => prev.filter((evento) => evento._id !== id));
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
                <Home eventos={eventos} removerEvento={removerEvento} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard adicionarEvento={adicionarEvento} />
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
