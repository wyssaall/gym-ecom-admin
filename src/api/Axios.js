import axios from "axios";

const BASE_URL = process.env.VITE_API_BASE_URL;  //URL du backend

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

//ajouter le token automatiquement

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); //recup le token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;

        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

