const AdoptionModal = ({ animal, onClose }) => {
    if (!animal) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                {/* Título */}
                <div className="modal-header">
                    <h2 className="modal-title">{animal.name}</h2>
                    <p className="modal-subtitle">
                        {animal.species} • {animal.breed}
                    </p>

                    <span className={`status-badge ${animal.available ? "status-available" : "status-adopted"}`}>
                        {animal.available ? "✅ Disponível para Adoção" : "❌ Já Adotado"}
                    </span>
                </div>

                <div className="modal-body">

                    {/* FOTOS */}
                    {animal.photos && animal.photos.length > 0 && (
                        <div className="detail-section">
                            <h3 className="detail-section-title">📸 Fotos</h3>

                            <div className="photo-gallery">
                                {animal.photos
                                    .filter(p => p.trim() !== "")
                                    .map((photo, index) => (
                                        <div key={index} className="gallery-item">
                                            <img
                                                src={photo}
                                                alt={`${animal.name} Foto ${index + 1}`}
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                    e.target.parentElement.innerHTML =
                                                        `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#eee;font-size:3rem;">
                                                            ${animal.species === "Cachorro" ? "🐕" : "🐱"}
                                                        </div>`;
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* INFORMAÇÕES */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">ℹ️ Informações</h3>

                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-label">Espécie</div>
                                <div className="info-value">{animal.species}</div>
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
                                <div className="info-value">
                                    {animal.gender === "Macho" ? "♂️ Macho" : "♀️ Fêmea"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIÇÃO */}
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


/*
   Notificações temporárias */

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
export {AdoptionModal, Toast};
