import React, { useState } from 'react';
import './Login.css'; 

function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

        setErroEmail(emailValido ? "" : "E-mail inválido");
        setErroSenha(senhaValida ? "" : "A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");

        if (emailValido && senhaValida) {
            console.log("Email:", email, "Senha:", senha) 
        }
    };

    return (
        <div className="login-container">
            {}
            {}
            <div className="main-container">
                {}
                <div className="login-box">
                    <h1 className='eventify'>Eventify</h1>
                    <p className='login'>Login</p>
                    <h2 className="login-title">Entrar</h2>
                    <form onSubmit={handleSubmit}>
                        {}
                        <div className="input-container">
                            <input
                                type="email"
                                className="input-field"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {erroEmail && (
                                <p className="erro-message">{erroEmail}</p>
                            )}
                        </div>

                        {}
                        <div className="input-container">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            {erroSenha && (
                                <p className="erro-message">{erroSenha}</p>
                            )}
                        </div>

                        {}
                        <button type="submit" className="input-button">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;