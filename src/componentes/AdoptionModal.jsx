const AdoptionModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-emoji">💝</div>
                <h3 className="modal-title">Confirmar Adoção</h3>
                <p className="modal-description">
                    Você está prestes a dar um lar amoroso para este pet especial! Esta é uma decisão importante e cheia de amor.
                </p>
                <div className="modal-actions">
                    <button className="modal-btn cancel-btn" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="modal-btn confirm-btn" onClick={onConfirm}>
                        Confirmar Adoção ❤️
                    </button>
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
export default AdoptionModal;
