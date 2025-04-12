import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Добавляем перехватчик запросов
api.interceptors.request.use(
    (config) => {
        // Добавляем токен авторизации, если он есть
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Устанавливаем правильный Content-Type для FormData
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Добавляем перехватчик ответов
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Обработка ошибок сервера
            console.error('Server error:', error.response.data);
            
            // Если токен истек
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // Обработка ошибок сети
            console.error('Network error:', error.request);
        } else {
            // Обработка других ошибок
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api; 