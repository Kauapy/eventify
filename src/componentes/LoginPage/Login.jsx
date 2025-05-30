import React, { useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroSenha, setErroSenha] = useState("");

    const validarEmail = (email) => emailRegex.test(email);
    const validarSenha = (senha) => senhaRegex.test(senha);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValido = validarEmail(email);
        const senhaValida = validarSenha(senha);

        setErroEmail(emailValido ? "" : "E-mail inválido");
        setErroSenha(senhaValida ? "" : "A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");

        if (!emailValido || !senhaValida) return;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                console.log("Login Sucedido");
                navigate("/home");
            } else {
                console.error("Erro no login:", data.message);
                setErroEmail("E-mail ou senha inválidos");
            }
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    };

    return (
        <div className="login-container">
            <div className="main-container">
                <div className="login-box">
                    <h1 className='eventify'>Eventify</h1>
                    <p className='login'>Login</p>
                    <h2 className="login-title">Entrar</h2>
                    <form onSubmit={handleSubmit}>
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
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
