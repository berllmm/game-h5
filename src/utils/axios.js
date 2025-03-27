import axios from 'axios';
import VueCookie from 'vue-cookie';

const instance = axios.create({
    // baseURL: 'https://tokyostupidgames.io'
    baseURL: 'https://test-tsg.com'
    // baseURL: 'http://192.168.1.234:19401'

});

instance.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json'
    if (config.url == '/tsg/login/qb') {
        config.headers['token'] = ''
    } else {
        config.headers['token'] = VueCookie.get('token')
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(res => {
    if (res.data.code == 300) {
        VueCookie.delete('token')
    }
    return res;
}, error => {
    console.error(error);
    return Promise.reject(error);
});

export default instance;
