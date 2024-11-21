import axios from 'axios';
import { getTokenFromIndexedDB } from '../Actions/indexedDB';

const API = axios.create({
    // baseURL:'http://zenquipserver.herokuapp.com/v1'

    baseURL: 'http://localhost:5000/v1'
    // baseURL: 'https://api.wellnestperu.com/v1'

});

API.interceptors.request.use(async (config) => {

    const token = await getTokenFromIndexedDB();

    if (!token) {
        console.log('Token is not stored in IndexedDB.');
        return config;
    }

    config.headers.Authorization = token;
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;
