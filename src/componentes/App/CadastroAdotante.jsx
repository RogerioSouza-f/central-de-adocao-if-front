import { useState } from 'react';

const RegisterSection = ({ showToast, setCurrentSection }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bond: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/usuarios/salvar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: formData.name,
                    email: formData.email,
                    senha: formData.password,
                    telefone: formData.phone,
                    vinculoIFPB: formData.bond
                })
            });

            if (!res.ok) {
                throw new Error();
            }

            showToast(
                '✅',
                'Cadastro realizado!',
                'Agora você pode fazer login.'
            );

            setFormData({
                name: '',
                email: '',
                phone: '',
                bond: '',
                password: ''
            });

            setCurrentSection('login');

        } catch {
            showToast(
                '❌',
                'Erro no cadastro',
                'Não foi possível cadastrar o usuário.'
            );
        }
    };

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
                <p className="section-subtitle">
                    Preencha seus dados para poder adotar um pet
                </p>
            </div>

            <div className="form-card">
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">

                            <div className="form-group">
                                <label className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Telefone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Vínculo com o IFPB</label>
                                <select
                                    name="bond"
                                    className="form-select"
                                    value={formData.bond}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="ALUNO">Aluno</option>
                                    <option value="PROFESSOR">Professor</option>
                                    <option value="FUNCIONARIO">Funcionário</option>
                                    <option value="VISITANTE">Visitante</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

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
