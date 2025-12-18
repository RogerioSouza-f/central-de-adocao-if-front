import React from "react";
import "../style/userProfile.css";

const UserProfile = ({ onLogout }) => {
    const email = sessionStorage.getItem("userEmail");
    const tipo = sessionStorage.getItem("userTipo");

    if (!email || !tipo) return null;

    return (
        <div className="user-profile">
            <div className="user-avatar">
                {email.charAt(0).toUpperCase()}

                {/* TOOLTIP */}
                <div className="user-tooltip">
                    <span className="tooltip-email">{email}</span>
                    <span className={`tooltip-role ${tipo.toLowerCase()}`}>
                        {tipo}
                    </span>

                    <button
                        className="tooltip-logout"
                        onClick={onLogout}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
