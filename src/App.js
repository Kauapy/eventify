import "./App.css";
import Login from "./componentes/LoginPage/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./componentes/Home/Home.jsx";
import Register from "./componentes/Register/Register.jsx";
import AdminDashboard from "./componentes/Home/AdminDashboard.jsx";
import React, { useState } from "react";
import axios from "axios"
import { useEffect } from "react";


function App() {

  const [eventos, setEventos] = useState([])

  useEffect(() => {
    axios
      .get("/events")
      .then(({ data }) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, []);


  const adicionarEvento = (novoEvento) => {
    setEventos((prev) => [...prev, novoEvento])
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/home" element={<Home eventos={eventos} adicionarEvento={adicionarEvento}></Home>}/>
          <Route path="/admin" element={<AdminDashboard adicionarEvento={adicionarEvento} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;