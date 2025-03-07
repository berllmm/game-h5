import axios from 'axios';
import VueCookie from 'vue-cookie';

// 创建 Axios 实例
const instance = axios.create({
    baseURL: 'https://tokyostupidgames.io'
    // baseURL: 'https://test-tsg.com'
    // baseURL: 'http://192.168.1.234:19401'

});

// 请求拦截器
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

// 响应拦截器
instance.interceptors.response.use(res => {
    if (res.data.code == 300) {
        VueCookie.delete('token')
    }
    return res;
}, error => {
    console.error('请求失败:', error);
    return Promise.reject(error);
});

export default instance;
