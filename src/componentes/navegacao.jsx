const Navigation = ({ currentSection, setCurrentSection, mobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <nav className="nav-container glass-dark">
            <div className="nav-content">
                {/* Logo e Marca */}
                <div className="nav-brand">
                    <div className="nav-logo">
                        <span>🐾</span>
                    </div>
                    <div>
                        <h1 className="nav-title">PetConnect</h1>
                        <p className="nav-subtitle">IFPB Campus</p>
                    </div>
                </div>

                {/* Menu Desktop */}
                <div className="nav-menu">
                    <button
                        className={`nav-btn ${currentSection === 'home' ? 'active' : 'inactive'}`}
                        onClick={() => setCurrentSection('home')}
                    >
                        Início
                    </button>
                    <button
                        className={`nav-btn ${currentSection === 'animals' ? 'active' : 'inactive'}`}
                        onClick={() => setCurrentSection('animals')}
                    >
                        Pets
                    </button>
                    <button
                        className={`nav-btn ${currentSection === 'register' ? 'active' : 'inactive'}`}
                        onClick={() => setCurrentSection('register')}
                    >
                        Cadastro
                    </button>
                </div>

                {/* Botão Menu Mobile */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Menu Mobile Expandido */}
            {mobileMenuOpen && (
                <div className="mobile-menu glass-dark">
                    <button
                        className="mobile-menu-item"
                        onClick={() => { setCurrentSection('home'); setMobileMenuOpen(false); }}
                    >
                        🏠 Início
                    </button>
                    <button
                        className="mobile-menu-item"
                        onClick={() => { setCurrentSection('animals'); setMobileMenuOpen(false); }}
                    >
                        🐾 Pets
                    </button>
                    <button
                        className="mobile-menu-item"
                        onClick={() => { setCurrentSection('register'); setMobileMenuOpen(false); }}
                    >
                        📝 Cadastro
                    </button>
                </div>
            )}
        </nav>
    );
};
export default Navigation;