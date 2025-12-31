import React, {useEffect, useState} from 'react';
import AnimalDetailModal from "../componentes/admin/AdoptionModalAdm";
import "../style/globalAdmin.css";

const API_URL = "http://localhost:8080/animais";
const IMG_URL = "http://localhost:8080";

const AdminPanel = ({ onLogout, showToast }) => {
    const [activeTab, setActiveTab] = useState('animals');
    const [animals, setAnimals] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);


    const [animalForm, setAnimalForm] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        description: '',
        photos: [null]
    });

    // Manipular fotos

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
    };

    const fetchAdoptions = async () => {
        const res = await fetch("http://localhost:8080/adocoes/admin");
        const data = await res.json();

        setAdoptions(data.map(a => ({
            id: a.id,
            date: a.dataAdocao,
            animalId: a.animalId,
            animalName: a.animalNome,
            animalPhoto: a.animalFoto
                ? `http://localhost:8080${a.animalFoto}`
                : null,
            userName: a.nome,
            userEmail: a.email,
            userPhone: a.telefone,
            userBond: a.vinculo
        })));
    };


    useEffect(() => {
        fetchAnimals();
        fetchAdoptions();
    }, []);

    useEffect(() => {
        if (activeTab === 'adoptions') {
            fetchAdoptions();
        }
    }, [activeTab]);


    /* ======================
       FOTOS
    ====================== */
    const handlePhotoChange = (index, file) => {
        const newPhotos = [...animalForm.photos];
        newPhotos[index] = file;
        setAnimalForm({ ...animalForm, photos: newPhotos });
    };

    const handleAddPhoto = () => {
        setAnimalForm({ ...animalForm, photos: [...animalForm.photos, null] });
    };

    const handleRemovePhoto = (index) => {
        let newPhotos = animalForm.photos.filter((_, i) => i !== index);
        if (newPhotos.length === 0) newPhotos = [null];
        setAnimalForm({ ...animalForm, photos: newPhotos });
    };
    //formulário
    const handleAnimalChange = (e) => {
        setAnimalForm({ ...animalForm, [e.target.name]: e.target.value });
    };

    const handleAnimalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "dados",
            new Blob([JSON.stringify({
                nome: animalForm.name,
                especie: animalForm.species,
                raca: animalForm.breed,
                idade: Number(animalForm.age),
                sexo: animalForm.gender,
                descricao: animalForm.description
            })], { type: "application/json" })
        );

        if (animalForm.photos[0] instanceof File) {
            formData.append("foto", animalForm.photos[0]);
        }

        // ATUALIZAR
        const url = editingId
            ? `${API_URL}/atualizar/${editingId}`
            : `${API_URL}/salvar`;

        const method = editingId ? "PUT" : "POST";

        await fetch(url, {
            method,
            body: formData
        });

        showToast(
            editingId ? '✏️' : '🐾',
            editingId ? 'Pet Atualizado!' : 'Pet Cadastrado!',
            `${animalForm.name} ${editingId ? 'foi atualizado' : 'foi adicionado'} com sucesso!`
        );

        setAnimalForm({
            name: '',
            species: '',
            breed: '',
            age: '',
            gender: '',
            description: '',
            photos: [null]
        });

        setEditingId(null); // ⬅️ importante limpar edição
        fetchAnimals();
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
            photos: animal.photos.length > 0 ? animal.photos : [null]
        });

        setEditingId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setAnimalForm({
            name: '',
            species: '',
            breed: '',
            age: '',
            gender: '',
            description: '',
            photos: [null]
        });
    };

    const handleRemove = async (id) => {
        const animal = animals.find(a => a.id === id);

        await fetch(`${API_URL}/deletar/${id}`, {
            method: "DELETE"
        });

        showToast('🗑️', 'Pet Removido', `${animal.name} foi removido do sistema.`);

        fetchAnimals();

        if (editingId === id) handleCancelEdit();
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

                    {/* Aba de Pets*/}
                    {activeTab === 'animals' && (
                        <div>
                            <div className="admin-card">
                                <h3 className="card-title">
                                    {editingId ? '✏️ Editar Pet' : '🐾 Cadastrar Novo Pet'}
                                </h3>

                                <form onSubmit={handleAnimalSubmit}>
                                    <div className="form-grid">

                                        {/* Nome */}
                                        <div className="form-group">
                                            <label className="form-label">Nome</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-input"
                                                value={animalForm.name}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>

                                        {/* Espécie */}
                                        <div className="form-group">
                                            <label className="form-label">Espécie</label>
                                            <select
                                                name="species"
                                                className="form-select"
                                                value={animalForm.species}
                                                onChange={handleAnimalChange}
                                                required
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Cachorro">Cachorro</option>
                                                <option value="Gato">Gato</option>
                                            </select>
                                        </div>

                                        {/* Raça */}
                                        <div className="form-group">
                                            <label className="form-label">Raça</label>
                                            <input
                                                type="text"
                                                name="breed"
                                                className="form-input"
                                                value={animalForm.breed}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>

                                        {/* Idade */}
                                        <div className="form-group">
                                            <label className="form-label">Idade</label>
                                            <input
                                                type="text"
                                                name="age"
                                                className="form-input"
                                                value={animalForm.age}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>

                                        {/* Sexo */}
                                        <div className="form-group">
                                            <label className="form-label">Sexo</label>
                                            <select
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

                                        {/* Descrição */}
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">Descrição</label>
                                            <textarea
                                                name="description"
                                                className="form-input"
                                                style={{ minHeight: '120px' }}
                                                value={animalForm.description}
                                                onChange={handleAnimalChange}
                                                required
                                            />
                                        </div>

                                        {/* Fotos */}
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">📸 Fotos do Pet</label>

                                            {animalForm.photos.map((photo, index) => (
                                                <div key={index} className="photo-input-container">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-input"
                                                        onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                                                    />

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

                                            <button type="button" className="add-photo-btn" onClick={handleAddPhoto}>
                                                ➕ Adicionar Mais Fotos
                                            </button>

                                            {/* Previews */}
                                            {animalForm.photos.some(p => p) && (
                                                <div className="photo-preview-grid">
                                                    {animalForm.photos.map((photo, index) =>
                                                        photo ? (
                                                            <div key={index} className="photo-preview-item">
                                                                <img
                                                                    src={
                                                                        photo instanceof File
                                                                            ? URL.createObjectURL(photo)
                                                                            : photo
                                                                    }
                                                                    alt="preview"
                                                                    className="photo-preview-img"
                                                                />

                                                                <button
                                                                    type="button"
                                                                    className="photo-preview-remove"
                                                                    onClick={() => handlePhotoChange(index, null)}
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="submit-btn">
                                            {editingId ? '✏️ Atualizar Pet' : '🐾 Cadastrar Pet'}
                                        </button>

                                        {editingId && (
                                            <button
                                                type="button"
                                                className="submit-btn"
                                                style={{ background: 'rgba(255,255,255,0.1)' }}
                                                onClick={handleCancelEdit}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Lista de Pets */}
                            <div className="admin-card">
                                <h3 className="card-title">Pets Cadastrados ({animals.length})</h3>
                                <div className="admin-list">

                                    {animals.map(animal => (
                                        <div key={animal.id} className="admin-item">
                                            <div className="admin-item-info">

                                                {/* Foto principal */}
                                                {animal.photos && animal.photos[0] ? (
                                                    <img
                                                        src={
                                                            animal.photos[0] instanceof File
                                                                ? URL.createObjectURL(animal.photos[0])
                                                                : animal.photos[0]
                                                        }
                                                        alt={animal.name}
                                                        className="admin-item-photo"
                                                    />
                                                ) : (
                                                    <div className="admin-item-emoji">
                                                        {animal.species === 'Cachorro' ? '🐕' : '🐱'}
                                                    </div>
                                                )}

                                                <div className="admin-item-details">
                                                    <h4 onClick={() => setSelectedAnimal(animal)}>{animal.name}</h4>
                                                    <p>{animal.species} • {animal.breed} • {animal.age}</p>

                                                    {/* Mini-carousel */}
                                                    {animal.photos.length > 1 && (
                                                        <div className="photo-carousel">
                                                            {animal.photos.slice(0, 5).map((photo, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={
                                                                        photo instanceof File
                                                                            ? URL.createObjectURL(photo)
                                                                            : photo
                                                                    }
                                                                    className="photo-carousel-img"
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
                                                <button className="action-btn edit-btn" onClick={() => handleEdit(animal.id)}>
                                                    ✏️ Editar
                                                </button>
                                                <button className="action-btn delete-btn" onClick={() => handleRemove(animal.id)}>
                                                    🗑️ Remover
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    )}

                    {/* Aba de Adoçõe */}
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
                                        return (
                                            <div key={adoption.id} className="admin-item">
                                                <div className="admin-item-info">
                                                    {adoption.animalPhoto ? (
                                                        <img
                                                            src={adoption.animalPhoto}
                                                            className="admin-item-photo"
                                                            alt={adoption.animalName}
                                                        />
                                                    ) : (
                                                        <div className="admin-item-emoji">🐾</div>
                                                    )}


                                                    <div className="admin-item-details">
                                                        <h4>🎉 {adoption.animalName} foi adotado!</h4>
                                                        <p><strong>Adotante:</strong> {adoption.userName}</p>
                                                        <p><strong>E-mail:</strong> {adoption.userEmail}</p>
                                                        <p><strong>Telefone:</strong> {adoption.userPhone}</p>
                                                        <p><strong>Vínculo:</strong> {adoption.userBond}</p>
                                                    </div>
                                                </div>

                                                <span className="status-badge" style={{ background: 'rgba(102,126,234,0.2)', color: '#667eea' }}>
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