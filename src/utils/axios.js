import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000
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
            // Не устанавливаем Content-Type для FormData, браузер сделает это автоматически
            // с правильным boundary
            delete config.headers['Content-Type'];
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        // Для отладки
        console.log('Making request to:', config.url);
        if (config.data instanceof FormData) {
            // Логируем содержимое FormData
            for (let pair of config.data.entries()) {
                console.log(pair[0], pair[1]);
            }
        } else {
            console.log('Request data:', config.data);
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
        // Для отладки
        console.log('Response from:', response.config.url, response.data);
        
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            return Promise.reject(new Error('Время ожидания истекло. Пожалуйста, проверьте подключение к интернету.'));
        }

        if (!error.response) {
            console.error('Network error:', error);
            return Promise.reject(new Error('Ошибка сети. Пожалуйста, проверьте подключение к интернету.'));
        }

        // Для отладки
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
        });

        // Обработка ошибок аутентификации
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error.response.data);
    }
);

export default api; 