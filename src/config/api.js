const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    PRODUCTS: `${API_URL}/api/products`,
    USERS: `${API_URL}/api/users`,
    AUTH: `${API_URL}/api/auth`,
    UPLOADS: `${API_URL}/uploads`
};

export default API_ENDPOINTS; 