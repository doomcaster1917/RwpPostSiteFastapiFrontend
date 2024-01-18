import axios from 'axios';
import $refresh from "./axiosRefresh";
const BASE_URL = 'http://127.0.0.1:8000';

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout:2000
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
})

$api.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if ((error?.response?.status === 422) && (error.response?.data?.detail === 'Signature has expired')) {

                const response = await $refresh.post(`${BASE_URL}/authentication/refresh`, {withCredentials: true})
                localStorage.setItem('access_token', response?.data?.access_token)
                return $api.request(originalRequest)
        }else throw error
    }
)

export const axiosAccess = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`},
    withCredentials: true
});

export default $api


