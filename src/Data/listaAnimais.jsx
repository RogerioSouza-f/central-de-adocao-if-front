import { useState } from 'react';
import { AdoptionModal } from "../componentes/App/AdoptionModal";

const API_ADOCOES = "http://localhost:8080/adocoes";

const AnimalsSection = ({ animals, onAdopt, showToast }) => {
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    // Filtros
    const filteredAnimals = animals.filter(animal =>
        animal.available &&
        (speciesFilter === '' || animal.species === speciesFilter) &&
        (genderFilter === '' || animal.gender === genderFilter)
    );

    // 🐾 ADOÇÃO REAL
    const handleAdopt = async (animalId) => {
        const userTipo = sessionStorage.getItem("userTipo");
        const userId = sessionStorage.getItem("userId");

        if (!userTipo || !userId) {
            showToast(
                '⚠️',
                'Login necessário',
                'Você precisa estar logado para adotar um pet!'
            );
            return;
        }

        try {
            const res = await fetch(API_ADOCOES, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuarioId: userId,
                    animalId: animalId
                })
            });

            if (!res.ok) {
                throw new Error("Erro ao realizar adoção");
            }

            showToast(
                '🎉',
                'Adoção realizada!',
                'Parabéns! Você acabou de adotar um novo amigo 🐾'
            );

            // atualiza tela imediatamente
            window.dispatchEvent(new Event("refreshAnimals"));

        } catch (error) {
            showToast(
                '❌',
                'Erro',
                'Não foi possível realizar a adoção'
            );
        }
    };

    return (
        <section className="section">
            {/* Cabeçalho */}
            <div className="animals-header">
                <div>
                    <h2 className="section-title">Pets Disponíveis</h2>
                    <p className="section-subtitle">Encontre seu novo companheiro</p>
                </div>

                {/* Filtros */}
                <div className="filters">
                    <select
                        className="filter-select"
                        value={speciesFilter}
                        onChange={(e) => setSpeciesFilter(e.target.value)}
                    >
                        <option value="">Todas as espécies</option>
                        <option value="Cachorro">Cachorros</option>
                        <option value="Gato">Gatos</option>
                    </select>

                    <select
                        className="filter-select"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="">Todos os sexos</option>
                        <option value="Macho">♂️ Macho</option>
                        <option value="Fêmea">♀️ Fêmea</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="animals-grid">
                {filteredAnimals.map(animal => (
                    <div key={animal.id} className="animal-card glass">

                        {/* Imagem */}
                        <div className="animal-image">
                            {animal.photos && animal.photos.length > 0 ? (
                                <img
                                    src={animal.photos[0]}
                                    alt={animal.name}
                                />
                            ) : (
                                <span style={{ fontSize: "4rem" }}>
                                    {animal.species === "Cachorro" ? "🐕" : "🐱"}
                                </span>
                            )}
                        </div>

                        <div className="animal-content">
                            <div className="animal-header">
                                <h3
                                    className="animal-name clickable"
                                    onClick={() => setSelectedAnimal(animal)}
                                >
                                    {animal.name}
                                </h3>

                                <span className={`animal-gender ${animal.gender === 'Macho' ? 'gender-male' : 'gender-female'}`}>
                                    {animal.gender === 'Macho' ? '♂️ Macho' : '♀️ Fêmea'}
                                </span>
                            </div>

                            <div className="animal-details">
                                <p><strong>Espécie:</strong> {animal.species}</p>
                                <p><strong>Raça:</strong> {animal.breed}</p>
                                <p><strong>Idade:</strong> {animal.age}</p>
                            </div>

                            <p className="animal-description">{animal.description}</p>

                            <button
                                className="adopt-btn"
                                onClick={() => handleAdopt(animal.id)}
                            >
                                Adotar {animal.name} ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAnimals.length === 0 && (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p className="empty-title">Nenhum pet encontrado</p>
                </div>
            )}

            <AdoptionModal
                animal={selectedAnimal}
                onClose={() => setSelectedAnimal(null)}
            />
        </section>
    );
};

export default AnimalsSection;
