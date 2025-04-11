import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    // Проверяем наличие токена и данных пользователя
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Если нет токена или пользователь не админ, перенаправляем на страницу входа
    if (!token || !user.isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Если все проверки пройдены, отображаем защищенный контент
    return children;
};

export default ProtectedRoute; 