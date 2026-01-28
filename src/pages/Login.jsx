import { useState } from "react";
import "../style/globalAdmin.css";

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: "",
        senha: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            if (!res.ok) {
                throw new Error("Login inválido");
            }

            const data = await res.json();

            // 🔥 NORMALIZA A ROLE (ESSA É A CHAVE)
            const tipo =
                data.tipo ||
                data.role ||
                (data.authorities?.includes("ROLE_ADMIN") ? "ADMIN" : "USUARIO");

            if (!tipo) {
                throw new Error("Tipo de usuário não identificado");
            }

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userTipo", tipo);
            sessionStorage.setItem("userEmail", data.email);
            sessionStorage.setItem("userId", data.id);

            onLogin(tipo);

        } catch (err) {
            setError("Email ou senha incorretos!");
            setTimeout(() => setError(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-bg"></div>

            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">🔐</div>
                    <h2 className="login-title">Seja Bem-vindo</h2>
                    <p className="login-subtitle">
                        Faça login para continuar
                    </p>
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

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Entrando..." : "Login"}
                    </button>

                    {error && (
                        <div className="error-message">❌ {error}</div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
