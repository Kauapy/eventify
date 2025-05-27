import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Footer from "../FooterLoginPage/Footer";

function Header() {
  return (
    <header className="header">
      <h1 className="titulo">Eventify</h1>
      <p className="link">Login</p>
      <h1 className="login">Entrar</h1>
      <Input></Input>
      <Footer></Footer>
    </header> 
  );
}

export default Header;