/*TOAST*/

const Toast = ({ toast }) => {
    if (!toast.show) return null;

    return (
        <div className="toast">
            <div className="toast-content">
                <div className="toast-icon">{toast.icon}</div>
                <div className="toast-text">
                    <div className="toast-title">{toast.title}</div>
                    <div className="toast-message">{toast.message}</div>
                </div>
            </div>
        </div>
    );
};


/*MODAL DE DETALHES */
const AnimalDetailModal = ({ animal, onClose }) => {
    if (!animal) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-header">
                    <h2 className="modal-title">{animal.name}</h2>
                    <p className="modal-subtitle">{animal.species} • {animal.breed}</p>
                    <span className={`status-badge ${animal.available ? 'status-available' : 'status-adopted'}`}>
                        {animal.available ? '✅ Disponível para Adoção' : '❌ Já Adotado'}
                    </span>
                </div>

                <div className="modal-body">

                    {animal.photos && Array.isArray(animal.photos) && animal.photos.length > 0 && (
                        <div className="detail-section">
                            <h3 className="detail-section-title">📸 Galeria de Fotos</h3>

                            <div className="photo-gallery">
                                {animal.photos
                                    .filter(p => typeof p === "string" && p.trim() !== "")
                                    .map((photo, index) => (
                                        <div key={index} className="gallery-item">
                                            <img
                                                src={photo}
                                                alt={`${animal.name} - Foto ${index + 1}`}
                                                className="gallery-image"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `
                                                        <div style="display: flex; align-items: center; justify-content: center;
                                                        height: 100%; background: rgba(239, 68, 68, 0.2); color: #ef4444; 
                                                        font-size: 3rem;">
                                                            ${animal.species === 'Cachorro' ? '🐕' : '🐱'}
                                                        </div>`;
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    <div className="detail-section">
                        <h3 className="detail-section-title">ℹ️ Informações</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-label">Espécie</div>
                                <div className="info-value">{animal.species === 'Cachorro' ? 'Cachorro' : 'Gato'}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Raça</div>
                                <div className="info-value">{animal.breed}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Idade</div>
                                <div className="info-value">{animal.age}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Sexo</div>
                                <div className="info-value">{animal.gender === 'Macho' ? '♂️ Macho' : '♀️ Fêmea'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3 className="detail-section-title">📝 Descrição</h3>
                        <div className="description-box">
                            <p className="description-text">{animal.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Toast, AnimalDetailModal};
export default AnimalDetailModal;
