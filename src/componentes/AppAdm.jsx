import React, {useState} from 'react';
import AdminPanel from '../pages/PainelAdm';
import AdminLogin from '../pages/AdmLogin';
import {Toast} from './admin/AdoptionModalAdm'

const AppAdm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toast, setToast] = useState({ show: false, icon: '', title: '', message: '' });

    const showToast = (icon, title, message) => {
        setToast({ show: true, icon, title, message });
        setTimeout(() => {
            setToast({ show: false, icon: '', title: '', message: '' });
        }, 4000);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        showToast( 'Login Bem-sucedido!', 'Bem-vindo ao painel administrativo!');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        showToast('Logout Realizado', 'Até a próxima!');
    };

    return (
        <div>
            {isLoggedIn ? (
                <AdminPanel onLogout={handleLogout} showToast={showToast} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
            <Toast toast={toast} />
        </div>
    );
};
export default AppAdm;
