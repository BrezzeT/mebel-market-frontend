import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = !!auth.token;
    const isAdmin = auth.user?.isAdmin;

    if (!isAuthenticated) {
        // Сохраняем текущий URL для редиректа после входа
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        // Если требуются права админа, но у пользователя их нет
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute; 