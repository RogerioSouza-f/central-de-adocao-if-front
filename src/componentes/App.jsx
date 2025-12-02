import React, {useState} from 'react';
import Navigation from './navegacao';
import HomeSection from './Home';
import AnimalsSection from './listaAnimais';
import RegisterSection from './CadastroAdotante';
import AdoptionModal from "./AdoptionModal";
import initialAnimals from './DadosIniciais'
import Toast from './AdoptionModal'


const App = () => {
    // Estados
    const [currentSection, setCurrentSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [animals, setAnimals] = useState(initialAnimals);
    const [users, setUsers] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [adoptionModal, setAdoptionModal] = useState({ isOpen: false, animalId: null });
    const [toast, setToast] = useState({ show: false, icon: '', title: '', message: '' });

    // Função: Mostrar Toast
    const showToast = (icon, title, message) => {
        setToast({ show: true, icon, title, message });
        setTimeout(() => {
            setToast({ show: false, icon: '', title: '', message: '' });
        }, 4000);
    };

    // Função: Registrar Usuário
    const handleRegister = (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData
        };
        setUsers([...users, newUser]);
    };

    // Função: Iniciar Adoção
    const handleAdopt = (animalId) => {
        setAdoptionModal({ isOpen: true, animalId });
    };

    // Função: Confirmar Adoção
    const confirmAdoption = () => {
        if (adoptionModal.animalId && users.length > 0) {
            const animal = animals.find(a => a.id === adoptionModal.animalId);
            const user = users[users.length - 1];

            // Atualizar disponibilidade do animal
            setAnimals(animals.map(a =>
                a.id === adoptionModal.animalId ? { ...a, available: false } : a
            ));

            // Adicionar registro de adoção
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

    // Função: Fechar Modal
    const closeAdoptionModal = () => {
        setAdoptionModal({ isOpen: false, animalId: null });
    };

    // Renderização
    return (
        <div>
            {/* Navegação */}
            <Navigation
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Conteúdo Principal */}
            <main className="main-content">
                {currentSection === 'home' && (
                    <HomeSection
                        animals={animals}
                        users={users}
                        adoptions={adoptions}
                        setCurrentSection={setCurrentSection}
                    />
                )}

                {currentSection === 'animals' && (
                    <AnimalsSection
                        animals={animals}
                        users={users}
                        onAdopt={handleAdopt}
                        showToast={showToast}
                    />
                )}

                {currentSection === 'register' && (
                    <RegisterSection
                        onRegister={handleRegister}
                        showToast={showToast}
                    />
                )}
            </main>

            {/* Modal de Adoção */}
            <AdoptionModal
                isOpen={adoptionModal.isOpen}
                onClose={closeAdoptionModal}
                onConfirm={confirmAdoption}
            />

            {/* Notificações Toast */}
            <Toast toast={toast} />
        </div>
    );
};
export default App;
