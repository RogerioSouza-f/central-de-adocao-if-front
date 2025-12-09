import { useState } from 'react';

const RegisterSection = ({ onRegister, showToast }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bond: '',
        password: '' // ✅ Campo de senha adicionado
    });

    // Handler de submit
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
        setFormData({ name: '', email: '', phone: '', bond: '', password: '' });
        showToast('✅', 'Cadastro Realizado!', 'Agora você pode adotar um pet incrível!');
    };

    // Handler de mudança de campo
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="form-section">
            <div className="section-header">
                <h2 className="section-title">Cadastro de Adotante</h2>
                <p className="section-subtitle">Preencha seus dados para poder adotar um pet</p>
            </div>

            <div className="form-card">
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            {/* Campo Nome */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Seu nome completo"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Campo Email */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="seu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Campo Telefone */}
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Telefone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="(83) 99999-9999"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Campo Vínculo */}
                            <div className="form-group">
                                <label htmlFor="bond" className="form-label">Vínculo com o IFPB</label>
                                <select
                                    id="bond"
                                    name="bond"
                                    className="form-select"
                                    value={formData.bond}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione seu vínculo...</option>
                                    <option value="Estudante"> Estudante </option>
                                    <option value="Professor"> Professor </option>
                                    <option value="Funcionario"> Funcionario </option>
                                    <option value="Visitante"> Visitante </option>
                                </select>
                            </div>

                            {/* ✅ Campo Senha */}
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Sua senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Botão Submit */}
                        <button type="submit" className="submit-btn">
                            Criar Conta ✨
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterSection;
