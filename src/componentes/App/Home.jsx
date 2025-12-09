import { useState } from 'react';

const HomeSection = ({ animals, users, adoptions, setCurrentSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const availableAnimals = animals.filter(a => a.available).length;

    return (
        <div>

            {/* Botão hambúrguer no canto superior direito */}
            <button
                className="hamburger-btn right-menu"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* Menu lateral */}
            {menuOpen && (
                <div className="side-menu right-side">
                    <button
                        className="side-menu-item"
                        onClick={() => {
                            setCurrentSection('login');
                            setMenuOpen(false);
                        }}
                    >
                        Login
                    </button>
                </div>
            )}

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-content">
                    <div className="hero-emoji">🐕‍🦺</div>
                    <h1 className="hero-title">
                        Conectando <span className="hero-gradient-text">Corações</span>
                    </h1>
                    <p className="hero-subtitle">
                        A plataforma mais moderna para conectar pets abandonados com famílias amorosas da comunidade IFPB. Tecnologia e amor trabalhando juntos.
                    </p>

                    <div className="hero-cta">

                        <button
                            className="cta-btn cta-primary"
                            onClick={() => setCurrentSection('animals')}
                        >
                            Encontrar Pet ✨
                        </button>

                        <button
                            className="cta-btn cta-secondary"
                            onClick={() => setCurrentSection('register')}
                        >
                            Cadastrar-se 🚀
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card glass">
                        <div className="stat-content">
                            <div className="stat-emoji">📊</div>
                            <div className="stat-number">{animals.length}</div>
                            <p className="stat-label">Pets Cadastrados</p>
                        </div>
                    </div>

                    <div className="stat-card glass">
                        <div className="stat-content">
                            <div className="stat-emoji">❤️</div>
                            <div className="stat-number">{adoptions.length}</div>
                            <p className="stat-label">Adoções Realizadas</p>
                        </div>
                    </div>

                    <div className="stat-card glass">
                        <div className="stat-content">
                            <div className="stat-emoji">🏠</div>
                            <div className="stat-number">{availableAnimals}</div>
                            <p className="stat-label">Aguardando Lar</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeSection;
