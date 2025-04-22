import axios from 'axios';

export const Base_URL = import.meta.env.VITE_API_URL ;
export const myAxios = axios.create({
    baseURL: Base_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    

});
export const myAxios2 = axios.create({
    baseURL: Base_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    

});