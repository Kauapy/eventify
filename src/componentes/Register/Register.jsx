import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (data.mensagem === "Usuário registrado com sucesso!") {
        const loginResponse = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });

        const loginData = await loginResponse.json();

        if (loginData.token) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("role", loginData.role);
          navigate("/home");
        } else {
          setErroEmail("Erro ao logar após cadastro.");
          console.error("Erro ao logar:", loginData.mensagem);
        }
      } else {
        setErroEmail("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="main-container">
        <div className="login-box">
          <h1 className="eventify">Eventify</h1>
          <p className="login">Cadastro</p>
          <h2 className="login-title">Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                className="input-field"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erroEmail && <p className="erro-message">{erroEmail}</p>}
            </div>

            <div className="input-container">
              <input
                type="password"
                className="input-field"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {erroSenha && <p className="erro-message">{erroSenha}</p>}
            </div>

            <button type="submit" className="input-button">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
