import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valido = true;

    if (!nome.trim()) {
      setErroNome("Informe seu nome");
      valido = false;
    } else setErroNome("");

    if (!emailRegex.test(email)) {
      setErroEmail("E-mail inválido");
      valido = false;
    } else setErroEmail("");

    if (!senhaRegex.test(senha)) {
      setErroSenha(
        "A senha precisa ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial."
      );
      valido = false;
    } else setErroSenha("");

    if (!valido) return;

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { nome, email, senha });
      if (data?.mensagem === "Usuário registrado com sucesso!") {
        const { data: loginData } = await api.post("/auth/login", {
          email,
          senha,
        });
        if (loginData?.token) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("role", loginData.role);
          if (loginData.nome) localStorage.setItem("nome", loginData.nome);
          navigate(loginData.role === "admin" ? "/admin" : "/home");
        } else {
          setErroEmail("Erro ao logar após cadastro.");
        }
      } else {
        setErroEmail(data?.mensagem || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      const mensagem =
        error?.response?.data?.mensagem || "Erro ao cadastrar usuário.";
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
            <span className="brand-tag">Cadastro</span>
          </div>
          <h2 className="login-title">Criar Conta</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
              />
              {erroNome && <p className="erro-message">{erroNome}</p>}
            </div>

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
                autoComplete="new-password"
              />
              {erroSenha && <p className="erro-message">{erroSenha}</p>}
            </div>

            <button type="submit" className="input-button" disabled={loading}>
              {loading ? "Cadastrando..." : "Registrar"}
            </button>

            <div className="link-container">
              <p>Já tem conta?</p>
              <Link className="link" to="/login">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
