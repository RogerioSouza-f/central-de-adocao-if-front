import {useState} from 'react';

const AnimalsSection = ({animals, users, onAdopt, showToast}) => {
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');

    // Filtros dinâmicos
    const filteredAnimals = animals.filter(animal =>
        animal.available &&
        (speciesFilter === '' || animal.species === speciesFilter) &&
        (genderFilter === '' || animal.gender === genderFilter)
    );

    // Handler de adoção
    const handleAdopt = (animalId) => {
        if (users.length === 0) {
            showToast('⚠️', 'Cadastro Necessário', 'Você precisa se cadastrar primeiro para adotar um pet!');
            return;
        }
        onAdopt(animalId);
    };

    return (
        <section className="section">
            {/* Cabeçalho com Filtros */}
            <div className="animals-header">
                <div>
                    <h2 className="section-title">Pets Disponíveis</h2>
                    <p className="section-subtitle">Encontre seu novo melhor amigo</p>
                </div>

                <div className="filters">
                    <select
                        className="filter-select"
                        value={speciesFilter}
                        onChange={(e) => setSpeciesFilter(e.target.value)}
                    >
                        <option value="">Todas as espécies</option>
                        <option value="Cachorro"> Cachorros </option>
                        <option value="Gato"> Gatos </option>
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

            {/* Grid de Cards dos Pets */}
            <div className="animals-grid">
                {filteredAnimals.map(animal => (
                    <div key={animal.id} className="animal-card glass">
                        <div className="animal-image">
                            <span>{animal.species === 'Cachorro' ? '🐕' : '🐱'}</span>
                        </div>
                        <div className="animal-content">
                            <div className="animal-header">
                                <h3 className="animal-name">{animal.name}</h3>
                                <span className={`animal-gender ${animal.gender === 'Macho' ? 'gender-male' : 'gender-female'}`}>
                                            {animal.gender === 'Macho' ? '♂️' : '♀️'} {animal.gender}
                                        </span>
                            </div>
                            <div className="animal-details">
                                <p className="animal-detail"><strong>Espécie:</strong> {animal.species}</p>
                                <p className="animal-detail"><strong>Raça:</strong> {animal.breed}</p>
                                <p className="animal-detail"><strong>Idade:</strong> {animal.age}</p>
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

            {/* Estado Vazio */}
            {filteredAnimals.length === 0 && (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p className="empty-title">Nenhum pet encontrado</p>
                    <p className="empty-subtitle">Tente ajustar os filtros ou volte mais tarde</p>
                </div>
            )}
        </section>
    );
};
export default AnimalsSection;