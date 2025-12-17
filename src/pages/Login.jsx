import React, { useState } from 'react';
import "../style/globalAdmin.css";

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        senha: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!res.ok) {
                throw new Error("Login inválido");
            }

            const data = await res.json();

            // sessão simples
            sessionStorage.setItem("adminLogged", "true");
            sessionStorage.setItem("adminEmail", data.email);

            onLogin();

        } catch (err) {
            setError("Email ou senha incorretos!");
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            <div className="login-bg"></div>

            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">🔐</div>
                    <h2 className="login-title">Seja Bem-vindo</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Digite seu email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            className="form-input"
                            placeholder="Digite sua senha"
                            value={credentials.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Login
                    </button>

                    {error && <div className="error-message">❌ {error}</div>}
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
