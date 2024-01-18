import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000';

const $refresh = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`},
    withCredentials: true
});

export default $refresh