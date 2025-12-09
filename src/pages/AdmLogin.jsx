import React, {useState} from 'react';
import "../style/globalAdmin.css";


const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            onLogin();
        } else {
            setError('Usuário ou senha incorretos!');
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
                        <label htmlFor="username" className="form-label">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            placeholder="Digite seu usuário"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Digite sua senha"
                            value={credentials.password}
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