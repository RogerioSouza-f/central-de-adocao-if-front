import { useState } from 'react';
import { AdoptionModal } from "../componentes/App/AdoptionModal";

const AnimalsSection = ({ animals, users, onAdopt, showToast }) => {
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    // Filtros iguais ao ADM
    const filteredAnimals = animals.filter(animal =>
        animal.available &&
        (speciesFilter === '' || animal.species === speciesFilter) &&
        (genderFilter === '' || animal.gender === genderFilter)
    );

    // Lógica de adoção igual ao ADM
    const handleAdopt = (animalId) => {
        if (users.length === 0) {
            showToast('⚠️', 'Cadastro Necessário', 'Você precisa se cadastrar primeiro para adotar um pet!');
            return;
        }
        onAdopt(animalId);
    };

    return (
        <section className="section">
            {/* Cabeçalho */}
            <div className="animals-header">
                <div>
                    <h2 className="section-title">Pets Disponíveis</h2>
                    <p className="section-subtitle">Encontre seu novo companheiro</p>
                </div>

                {/* FILTROS COM A MESMA LÓGICA DO ADM */}
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

            {/* GRID IGUAL DO ADM */}
            <div className="animals-grid">
                {filteredAnimals.map(animal => (
                    <div key={animal.id} className="animal-card glass">

                        {/* Imagem */}
                        <div
                            className="animal-image"
                            style={{
                                width: "100%",
                                height: "220px",
                                overflow: "hidden",
                                borderRadius: "0",
                                background: "transparent"
                            }}
                        >
                            {animal.photos && animal.photos.length > 0 ? (
                                <img
                                    src={animal.photos[0]}
                                    alt={animal.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "0"
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.parentElement.innerHTML =
                                            `<span style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;">${
                                                animal.species === "Cachorro" ? "🐕" : "🐱"
                                            }</span>`;
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: "4rem" }}>
            {animal.species === "Cachorro" ? "🐕" : "🐱"}
        </span>
                            )}
                        </div>


                        <div className="animal-content">
                            <div className="animal-header">

                                {/* NOME ABRE MODAL — IGUAL AO ADM */}
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

                            {/* DETALHES */}
                            <div className="animal-details">
                                <p><strong>Espécie:</strong> {animal.species}</p>
                                <p><strong>Raça:</strong> {animal.breed}</p>
                                <p><strong>Idade:</strong> {animal.age}</p>
                            </div>

                            {/* Descrição */}
                            <p className="animal-description">{animal.description}</p>

                            {/* BOTÃO DE ADOÇÃO COM LÓGICA DO ADM */}
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

            {/* Nenhum pet */}
            {filteredAnimals.length === 0 && (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p className="empty-title">Nenhum pet encontrado</p>
                    <p className="empty-subtitle">Tente ajustar os filtros ou volte mais tarde</p>
                </div>
            )}

            {/* Modal igual ADM */}
            <AdoptionModal
                animal={selectedAnimal}
                onClose={() => setSelectedAnimal(null)}
            />
        </section>
    );
};

export default AnimalsSection;
