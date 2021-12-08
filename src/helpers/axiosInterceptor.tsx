import axios from 'axios';
import { apiConstants } from '../helpers/constants';


axios.defaults.headers.common = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
axios.defaults.baseURL = apiConstants.baseUrl

axios.interceptors.request.use(function (config) {
    const storage = JSON.parse(localStorage.getItem('persist:storage') as any)
    let auth_token
    if (storage) {
        auth_token = JSON.parse(storage.auth).auth_token
    }
    config.headers['Authorization'] = 'Bearer ' + auth_token;
    return config;

}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code range of 2xx
    return response.data;
}, function (error) {

    const originalRequest = error.config;

    if (error.response.status === 500 && originalRequest.url === `${apiConstants.baseUrl}/refresh`) {
        localStorage.removeItem('access_token')
        window.location.href = '/login';
        return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.headers.Authorization === "Bearer undefined") {

        originalRequest._retry = true;

        const storage = JSON.parse(localStorage.getItem('persist:storage') as any)
        let auth_token
        if (storage) {
            auth_token = JSON.parse(storage.auth).auth_token
        }
        error.config.headers['Authorization'] = 'Bearer ' + auth_token;
        return axios(originalRequest);

    } else if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        
		localStorage.clear();
        window.location.href = '/auth/logout';

        // const access_token = localStorage.getItem('access_token')
        // const tokens = {
        //     tokens: access_token,
        // }
        // return axios.post('/refresh', tokens)
        //     .then(response => {
        //         localStorage.setItem('access_token', response.data.access_token)
        //         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
        //         error.hasRefreshedToken = true;
        //         // return instance.request(error.config);
        //         return axios(originalRequest);
        //     })
    } else
        console.log(error.response, "other than 401")
    return Promise.reject(error);
});


export default axios;
