import React, { useState } from 'react';
import './input.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Input() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const validarEmail = (email) => emailRegex.test(email);
  const validarSenha = (senha) => senhaRegex.test(senha);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = validarEmail(email);
    const senhaValida = validarSenha(senha);

    if (!emailValido) {
      setErroEmail("E-mail inválido");
    } else {
      setErroEmail("");
    }

    if (!senhaValida) {
      setErroSenha("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
    } else {
      setErroSenha("");
    }

    if (emailValido && senhaValida) {
      console.log("Email:", email, "Senha:", senha);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
            type="email"
            className="input-field"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {erroEmail && <p className="error-text">{erroEmail}</p>}
        
        <div className='input-container'>
          <input
            type="password"
            className="input-field"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        {erroSenha && <p className="error-text">{erroSenha}</p>}
        
        <button type="submit" className="input-button">Enviar</button>
      </form>
    </div>
  );
}

export default Input;