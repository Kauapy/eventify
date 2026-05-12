import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValido = emailRegex.test(email);
    const senhaValida = senhaRegex.test(senha);

    setErroEmail(emailValido ? "" : "E-mail inválido");
    setErroSenha(
      senhaValida
        ? ""
        : "A senha precisa ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial."
    );

    if (!emailValido || !senhaValida) return;

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.nome) localStorage.setItem("nome", data.nome);
        navigate(data.role === "admin" ? "/admin" : "/home");
      } else {
        setErroEmail("E-mail ou senha inválidos");
      }
    } catch (error) {
      const mensagem =
        error?.response?.data?.mensagem || "E-mail ou senha inválidos";
      setErroEmail(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="main-container">
        <div className="login-box">
          <div className="brand">
            <h1 className="eventify">Eventify</h1>
            <span className="brand-tag">Login</span>
          </div>
          <h2 className="login-title">Entrar</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-container">
              <input
                type="email"
                className="input-field"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                autoComplete="current-password"
              />
              {erroSenha && <p className="erro-message">{erroSenha}</p>}
            </div>

            <button
              type="submit"
              className="input-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Enviar"}
            </button>

            <div className="link-container">
              <p>Ainda não tem conta?</p>
              <Link className="link" to="/register">
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
