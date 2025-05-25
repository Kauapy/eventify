import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="titulo">Eventify</h1>
      <Link to="/register" className="link">Registre-se</Link>
    </header>
  );
}

export default Header;