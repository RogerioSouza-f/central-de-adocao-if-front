import React, { useState, useEffect } from 'react';

import Navigation from './App/navegacao';
import HomeSection from './App/Home';
import AnimalsSection from '../Data/listaAnimais';
import RegisterSection from './App/CadastroAdotante';

import initialAnimals from './App/DadosIniciais'
import {AdoptionModal, Toast} from './App/AdoptionModal'
import AdminLogin from "../pages/AdmLogin";
import AdminPanel from "../pages/PainelAdm";

const App = () => {
    const [currentSection, setCurrentSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [animals, setAnimals] = useState(initialAnimals);
    const [users, setUsers] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [adoptionModal, setAdoptionModal] = useState({ isOpen: false, animalId: null });
    const [toast, setToast] = useState({ show: false, icon: '', title: '', message: '' });

    useEffect(() => {
        if (currentSection === "admin-panel") {
            import("../style/globalAdmin.css");
        }
    }, [currentSection]);

    const showToast = (icon, title, message) => {
        setToast({ show: true, icon, title, message });
        setTimeout(() => {
            setToast({ show: false, icon: '', title: '', message: '' });
        }, 4000);
    };

    const handleRegister = (userData) => {
        const newUser = { id: users.length + 1, ...userData };
        setUsers([...users, newUser]);
    };

    const handleAdopt = (animalId) => {
        setAdoptionModal({ isOpen: true, animalId });
    };

    const confirmAdoption = () => {
        if (adoptionModal.animalId && users.length > 0) {
            const animal = animals.find(a => a.id === adoptionModal.animalId);
            const user = users[users.length - 1];

            setAnimals(animals.map(a =>
                a.id === adoptionModal.animalId ? { ...a, available: false } : a
            ));

            const newAdoption = {
                id: adoptions.length + 1,
                animalId: adoptionModal.animalId,
                userId: user.id,
                date: new Date().toLocaleDateString('pt-BR')
            };

            setAdoptions([...adoptions, newAdoption]);
            showToast('🎉', 'Parabéns!', `${animal.name} foi adotado com sucesso!`);
            setAdoptionModal({ isOpen: false, animalId: null });
        }
    };

    const closeAdoptionModal = () => {
        setAdoptionModal({ isOpen: false, animalId: null });
    };

    return (
        <div>
            <Navigation
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className="main-content">
                {currentSection === 'home' && (
                    <HomeSection animals={animals} users={users} adoptions={adoptions} setCurrentSection={setCurrentSection}/>
                )}

                {currentSection === 'animals' && (
                    <AnimalsSection animals={animals} users={users} onAdopt={handleAdopt} showToast={showToast}/>
                )}

                {currentSection === 'register' && (
                    <RegisterSection onRegister={handleRegister} showToast={showToast}/>
                )}

                {currentSection === 'login' && (
                    <AdminLogin
                        onLogin={() => {
                            showToast("🔐", "Login bem-sucedido!", "Bem-vindo ao painel administrativo.");
                            setCurrentSection('admin-panel');
                        }}
                    />
                )}

                {currentSection === 'admin-panel' && (
                    <AdminPanel onLogout={() => setCurrentSection('home')} showToast={showToast}/>
                )}
            </main>

            <AdoptionModal
                isOpen={adoptionModal.isOpen}
                onClose={closeAdoptionModal}
                onConfirm={confirmAdoption}
            />

            <Toast toast={toast} />
        </div>
    );
};

export default App;
