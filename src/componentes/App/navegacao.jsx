const Navigation = ({
                        currentSection,
                        setCurrentSection,
                        mobileMenuOpen,
                        setMobileMenuOpen,
                        userTipo, // Pode ser 'ADMIN', 'USUARIO' ou null
                        onLogout
                    }) => {

    const isLoggedIn = !!userTipo; // Verifica se existe qualquer usuário logado
    const isAdmin = userTipo === 'ADMIN';

    return (
        <nav className="nav-container glass-dark">
            <div className="nav-content">
                {/* Logo e Marca */}
                <div className="nav-brand">
                    <div className="nav-logo"><span>🐾</span></div>
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

                    {/* Lógica de Exibição Dinâmica */}
                    {!isLoggedIn ? (
                        /* Se NÃO estiver logado: Mostra Cadastro e Login */
                        <>
                            <button
                                className={`nav-btn ${currentSection === 'register' ? 'active' : 'inactive'}`}
                                onClick={() => setCurrentSection('register')}
                            >
                                Cadastro
                            </button>
                            <button
                                className={`nav-btn ${currentSection === 'login' ? 'active' : 'inactive'}`}
                                onClick={() => setCurrentSection('login')}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        /* Se ESTIVER logado (qualquer tipo): Esconde login/cadastro e mostra opções de conta */
                        <>
                            {isAdmin && (
                                <button
                                    className={`nav-btn ${currentSection === 'admin-panel' ? 'active' : 'inactive'}`}
                                    onClick={() => setCurrentSection('admin-panel')}
                                >
                                    Painel Admin
                                </button>
                            )}

                        </>
                    )}
                </div>

                {/* Botão Menu Mobile */}
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Menu Mobile Expandido */}
            {mobileMenuOpen && (
                <div className="mobile-menu glass-dark">
                    <button className="mobile-menu-item" onClick={() => { setCurrentSection('home'); setMobileMenuOpen(false); }}>🏠 Início</button>
                    <button className="mobile-menu-item" onClick={() => { setCurrentSection('animals'); setMobileMenuOpen(false); }}>🐾 Pets</button>

                    {!isLoggedIn ? (
                        <>
                            <button className="mobile-menu-item" onClick={() => { setCurrentSection('register'); setMobileMenuOpen(false); }}>📝 Cadastro</button>
                            <button className="mobile-menu-item" onClick={() => { setCurrentSection('login'); setMobileMenuOpen(false); }}>🔑 Login</button>
                        </>
                    ) : (
                        <>
                            {isAdmin && (
                                <button className="mobile-menu-item" onClick={() => { setCurrentSection('admin-panel'); setMobileMenuOpen(false); }}>⚙️ Painel Admin</button>
                            )}
                            <button className="mobile-menu-item" onClick={() => { onLogout(); setMobileMenuOpen(false); }}>🚪 Sair</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};
export default Navigation;