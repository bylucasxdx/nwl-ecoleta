import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3111',
});

export default api;
