import React, { useState, useEffect } from 'react';

import Navigation from './App/navegacao';
import HomeSection from './App/Home';
import AnimalsSection from '../Data/listaAnimais';
import RegisterSection from './App/CadastroAdotante';

import { AdoptionModal, Toast } from './App/AdoptionModal';
import Login from "../pages/Login";
import AdminPanel from "../pages/PainelAdm";
import UserProfile from "../pages/UserProfile";

const API_URL = "http://localhost:8080/animais";
const IMG_URL = "http://localhost:8080";

const App = () => {

    const [currentSection, setCurrentSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [animals, setAnimals] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [loadingAnimals, setLoadingAnimals] = useState(true);
    const [adoptionModal, setAdoptionModal] = useState({ isOpen: false, animalId: null });
    const [toast, setToast] = useState({ show: false, icon: '', title: '', message: '' });

    // 🔐 LOGIN UNIFICADO
    const [userTipo, setUserTipo] = useState(
        sessionStorage.getItem("userTipo")
    );

    //  BUSCAR ANIMAIS
    const fetchAnimals = async () => {
        const res = await fetch(`${API_URL}/listar`);
        const data = await res.json();


        const formatted = data.map(a => ({
            id: a.id,
            name: a.nome,
            species: a.especie,
            breed: a.raca,
            age: a.idade,
            gender: a.sexo,
            description: a.descricao,
            photos: a.fotoUrl ? [`${IMG_URL}${a.fotoUrl}`] : [],
            available: !a.adotado
        }));

        setAnimals(formatted);
        sessionStorage.setItem("animals", JSON.stringify(formatted));
        setLoadingAnimals(false);
    };

    const fetchAdoptions = async () => {
        const res = await fetch("http://localhost:8080/adocoes/admin");
        const data = await res.json();
        setAdoptions(data);
    };


    useEffect(() => {
        if (currentSection === "admin-panel") {
            import("../style/globalAdmin.css");
        }
    }, [currentSection]);

    useEffect(() => {
        const cached = sessionStorage.getItem("animals");

        if (cached) {
            setAnimals(JSON.parse(cached));
            setLoadingAnimals(false);
        }

        fetchAnimals();
        fetchAdoptions();
    }, []);

    useEffect(() => {
        const refresh = () => fetchAnimals();

        window.addEventListener("refreshAnimals", refresh);

        return () => window.removeEventListener("refreshAnimals", refresh);
    }, []);

    const showToast = (icon, title, message) => {
        setToast({ show: true, icon, title, message });
        setTimeout(() => {
            setToast({ show: false, icon: '', title: '', message: '' });
        }, 4000);
    };

    const handleAdopt = (animalId) => {
        setAdoptionModal({ isOpen: true, animalId });
    };

    const confirmAdoption = () => {
        if (!adoptionModal.animalId) return;

        const animal = animals.find(a => a.id === adoptionModal.animalId);

        setAnimals(animals.map(a =>
            a.id === adoptionModal.animalId
                ? { ...a, available: false }
                : a
        ));

        setAdoptions([
            ...adoptions,
            {
                id: adoptions.length + 1,
                animalId: adoptionModal.animalId,
                date: new Date().toLocaleDateString('pt-BR')
            }
        ]);

        showToast('🎉', 'Parabéns!', `${animal.name} foi adotado com sucesso!`);
        setAdoptionModal({ isOpen: false, animalId: null });


        window.dispatchEvent(new Event("refreshAnimals"));
        fetchAdoptions();
    };

    const closeAdoptionModal = () => {
        setAdoptionModal({ isOpen: false, animalId: null });
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setUserTipo(null);
        setCurrentSection('home');
        showToast("👋", "Logout realizado", "Até a próxima!");
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
                    <HomeSection
                        animals={animals}
                        adoptions={adoptions}
                        setCurrentSection={setCurrentSection}
                    />
                )}

                {currentSection === 'animals' && (
                    <AnimalsSection
                        animals={animals}
                        onAdopt={handleAdopt}
                        showToast={showToast}
                    />
                )}

                {currentSection === 'register' && (
                    <RegisterSection
                        showToast={showToast}
                        setCurrentSection={setCurrentSection}
                    />
                )}

                {currentSection === 'login' && (
                    <Login
                        onLogin={(tipo) => {
                            setUserTipo(tipo);
                            sessionStorage.setItem("userTipo", tipo);

                            if (tipo === "ADMIN") {
                                showToast("🔐", "Login admin", "Bem-vindo ao painel.");
                                setCurrentSection('admin-panel');
                            } else {
                                showToast("✅", "Login realizado", "Bem-vindo!");
                                setCurrentSection('home');
                            }
                        }}
                    />
                )}

                {currentSection === 'admin-panel' && userTipo === "ADMIN" && (
                    <AdminPanel
                        onLogout={handleLogout}
                        showToast={showToast}
                    />
                )}

                {currentSection === 'admin-panel' && userTipo !== "ADMIN" && (
                    setCurrentSection('login')
                )}

                {sessionStorage.getItem("userTipo") && (
                    <UserProfile onLogout={handleLogout} />
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
