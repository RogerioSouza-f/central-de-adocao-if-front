import React, {useState} from 'react';
import initialAnimals from "../componentes/admin/DadosIniciaisAdm";
import {initialAdoptions} from "../componentes/admin/DadosIniciaisAdm";
import AnimalDetailModal from "../componentes/admin/AdoptionModalAdm";

const AdminPanel = ({ onLogout, showToast }) => {
    const [activeTab, setActiveTab] = useState('animals');
    const [animals, setAnimals] = useState(initialAnimals);
    const [adoptions, setAdoptions] = useState(initialAdoptions);
    const [editingId, setEditingId] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [animalForm, setAnimalForm] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        description: '',
        photos: ['']
    });

    const handleAnimalSubmit = (e) => {
        e.preventDefault();

        // Filtrar fotos vazias
        const validPhotos = animalForm.photos.filter(p => p.trim() !== '');
        const formData = { ...animalForm, photos: validPhotos.length > 0 ? validPhotos : [''] };

        if (editingId) {
            // Editar pet existente
            setAnimals(animals.map(a =>
                a.id === editingId ? { ...a, ...formData } : a
            ));
            showToast('✏️', 'Pet Atualizado!', `${animalForm.name} foi atualizado com sucesso!`);
            setEditingId(null);
        } else {
            // Cadastrar novo pet
            const newAnimal = {
                id: animals.length + 1,
                ...formData,
                available: true
            };
            setAnimals([...animals, newAnimal]);
            showToast('🐾', 'Pet Cadastrado!', `${animalForm.name} foi adicionado com sucesso!`);
        }

        setAnimalForm({ name: '', species: '', breed: '', age: '', gender: '', description: '', photos: [''] });
    };

    const handleAddPhoto = () => {
        setAnimalForm({
            ...animalForm,
            photos: [...animalForm.photos, '']
        });
    };

    const handleRemovePhoto = (index) => {
        const newPhotos = animalForm.photos.filter((_, i) => i !== index);
        setAnimalForm({
            ...animalForm,
            photos: newPhotos.length > 0 ? newPhotos : ['']
        });
    };

    const handlePhotoChange = (index, value) => {
        const newPhotos = [...animalForm.photos];
        newPhotos[index] = value;
        setAnimalForm({
            ...animalForm,
            photos: newPhotos
        });
    };

    const handleAnimalChange = (e) => {
        setAnimalForm({
            ...animalForm,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (id) => {
        const animal = animals.find(a => a.id === id);
        setAnimalForm({
            name: animal.name,
            species: animal.species,
            breed: animal.breed,
            age: animal.age,
            gender: animal.gender,
            description: animal.description,
            photos: animal.photos && animal.photos.length > 0 ? animal.photos : ['']
        });
        setEditingId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setAnimalForm({ name: '', species: '', breed: '', age: '', gender: '', description: '', photos: [''] });
    };

    const handleRemove = (id) => {
        const animal = animals.find(a => a.id === id);
        setAnimals(animals.filter(a => a.id !== id));
        showToast('🗑️', 'Pet Removido', `${animal.name} foi removido do sistema.`);

        // Se estava editando este pet, cancelar edição
        if (editingId === id) {
            handleCancelEdit();
        }
    };

    return (
        <>
            <AnimalDetailModal
                animal={selectedAnimal}
                onClose={() => setSelectedAnimal(null)}
            />
            <div className="admin-panel">
                <div className="admin-header">
                    <div className="admin-header-content">
                        <h1 className="admin-title">Painel Administrativo</h1>
                        <p className="admin-subtitle">Gerencie pets e acompanhe adoções</p>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        ← Sair do Painel
                    </button>
                </div>

                <div className="admin-content">
                    <div className="admin-tabs">
                        <button
                            className={`admin-tab ${activeTab === 'animals' ? 'active' : 'inactive'}`}
                            onClick={() => setActiveTab('animals')}
                        >
                            🐾 Gerenciar Pets
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'adoptions' ? 'active' : 'inactive'}`}
                            onClick={() => setActiveTab('adoptions')}
                        >
                            📋 Adoções
                        </button>
                    </div>

                    {activeTab === 'animals' && (
                        <div>
                            <div className="admin-card">
                                <h3 className="card-title">
                                    {editingId ? '✏️ Editar Pet' : '🐾 Cadastrar Novo Pet'}
                                </h3>

                                <form onSubmit={handleAnimalSubmit}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="animalName" className="form-label">Nome do Pet</label>
                                            <input
                                                type="text"
                                                id="animalName"
                                                name="name"
                                                className="form-input"
                                                placeholder="Nome do pet"
                                                value={animalForm.name}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="animalSpecies" className="form-label">Esp��cie</label>
                                            <select
                                                id="animalSpecies"
                                                name="species"
                                                className="form-select"
                                                value={animalForm.species}
                                                onChange={handleAnimalChange}
                                                required
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Cachorro"> Cachorro</option>
                                                <option value="Gato"> Gato</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="animalBreed" className="form-label">Raça</label>
                                            <input
                                                type="text"
                                                id="animalBreed"
                                                name="breed"
                                                className="form-input"
                                                placeholder="Raça do pet"
                                                value={animalForm.breed}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="animalAge" className="form-label">Idade</label>
                                            <input
                                                type="text"
                                                id="animalAge"
                                                name="age"
                                                className="form-input"
                                                placeholder="Ex: 2 anos"
                                                value={animalForm.age}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="animalGender" className="form-label">Sexo</label>
                                            <select
                                                id="animalGender"
                                                name="gender"
                                                className="form-select"
                                                value={animalForm.gender}
                                                onChange={handleAnimalChange}
                                                required
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Macho">♂️ Macho</option>
                                                <option value="Fêmea">♀️ Fêmea</option>
                                            </select>
                                        </div>
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label htmlFor="animalDescription" className="form-label">Descrição</label>
                                            <textarea
                                                id="animalDescription"
                                                name="description"
                                                className="form-input"
                                                style={{ minHeight: '120px', resize: 'vertical' }}
                                                placeholder="Descreva o temperamento e características..."
                                                value={animalForm.description}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">📸 Fotos do Pet</label>
                                            {animalForm.photos.map((photo, index) => (
                                                <div key={index} className="photo-input-container">
                                                    <div className="photo-input-wrapper">
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder="Cole a URL da foto aqui"
                                                            value={photo}
                                                            onChange={(e) => handlePhotoChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                    {animalForm.photos.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="remove-photo-btn"
                                                            onClick={() => handleRemovePhoto(index)}
                                                        >
                                                            ❌
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="add-photo-btn"
                                                onClick={handleAddPhoto}
                                            >
                                                ➕ Adicionar Mais Fotos
                                            </button>

                                            {animalForm.photos.some(p => p.trim() !== '') && (
                                                <div className="photo-preview-grid">
                                                    {animalForm.photos.filter(p => p.trim() !== '').map((photo, index) => (
                                                        <div key={index} className="photo-preview-item">
                                                            <img
                                                                src={photo}
                                                                alt={`Preview ${index + 1}`}
                                                                className="photo-preview-img"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(239, 68, 68, 0.2); color: #ef4444; font-size: 0.8rem;">❌ Erro</div>';
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="photo-preview-remove"
                                                                onClick={() => {
                                                                    const photoIndex = animalForm.photos.indexOf(photo);
                                                                    handlePhotoChange(photoIndex, '');
                                                                }}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="submit-btn" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                                            {editingId ? '✏️ Atualizar Pet' : '🐾 Cadastrar Pet'}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                className="submit-btn"
                                                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                                                onClick={handleCancelEdit}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="admin-card">
                                <h3 className="card-title">Pets Cadastrados ({animals.length})</h3>
                                <div className="admin-list">
                                    {animals.map(animal => (
                                        <div key={animal.id} className="admin-item">
                                            <div className="admin-item-info">
                                                {animal.photos && animal.photos.length > 0 && animal.photos[0] ? (
                                                    <div>
                                                        <img
                                                            src={animal.photos[0]}
                                                            alt={animal.name}
                                                            className="admin-item-photo"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.parentElement.innerHTML = `<div class="admin-item-emoji">${animal.species === 'Cachorro' ? '🐕' : '🐱'}</div>`;
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="admin-item-emoji">{animal.species === 'Cachorro' ? '🐕' : '🐱'}</div>
                                                )}
                                                <div className="admin-item-details">
                                                    <h4 onClick={() => setSelectedAnimal(animal)}>{animal.name}</h4>
                                                    <p>{animal.species} • {animal.breed} • {animal.age}</p>
                                                    {animal.photos && animal.photos.length > 1 && (
                                                        <div className="photo-carousel">
                                                            {animal.photos.slice(0, 5).map((photo, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={photo}
                                                                    alt={`${animal.name} ${idx + 1}`}
                                                                    className="photo-carousel-img"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                    <span className={`status-badge ${animal.available ? 'status-available' : 'status-adopted'}`}>
                                                            {animal.available ? '✅ Disponível' : '❌ Adotado'}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="admin-actions">
                                                <button
                                                    className="action-btn edit-btn"
                                                    onClick={() => handleEdit(animal.id)}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    className="action-btn delete-btn"
                                                    onClick={() => handleRemove(animal.id)}
                                                >
                                                    🗑️ Remover
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'adoptions' && (
                        <div className="admin-card">
                            <h3 className="card-title">Histórico de Adoções ({adoptions.length})</h3>
                            <div className="admin-list">
                                {adoptions.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-emoji">📋</div>
                                        <p className="empty-title">Nenhuma adoção registrada</p>
                                        <p className="empty-subtitle">As adoções aparecerão aqui</p>
                                    </div>
                                ) : (
                                    adoptions.map(adoption => {
                                        const animal = animals.find(a => a.id === adoption.animalId);

                                        return (
                                            <div key={adoption.id} className="admin-item">
                                                <div className="admin-item-info">
                                                    <div className="admin-item-emoji">{animal?.species === 'Cachorro' ? '🐕' : '🐱'}</div>
                                                    <div className="admin-item-details">
                                                        <h4>🎉 {animal?.name} foi adotado!</h4>
                                                        <p><strong>Adotante:</strong> {adoption.userName}</p>
                                                        <p><strong>E-mail:</strong> {adoption.userEmail}</p>
                                                        <p><strong>Telefone:</strong> {adoption.userPhone}</p>
                                                        <p><strong>Vínculo:</strong> {adoption.userBond}</p>
                                                    </div>
                                                </div>
                                                <span className="status-badge" style={{ background: 'rgba(102, 126, 234, 0.2)', color: '#667eea', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                                                        {adoption.date}
                                                    </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default AdminPanel;