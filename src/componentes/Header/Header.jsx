import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="titulo">Eventify</h1>
      <Link to="/register" className="link">Login</Link>
      <h1 className="login">Entrar</h1>
    </header>
  );
}

export default Header;