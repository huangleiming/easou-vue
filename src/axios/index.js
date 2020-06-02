import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 3000
});

http.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject({
            errCode: 'fall',
            msg: '发起请求失败'
        });
    }
);

http.interceptors.response.use(
    response => {
        if (response.errCode && response.errCode == 'ok') {
            return Promise.resolve(JSON.parse(response.data));
        }
        return Promise.reject({
            errCode: 'fall',
            msg: response.msg ? response.msg : '未知错误'
        });
    },
    error => {
        return Promise.reject({
            errCode: 'fall',
            msg: error.message
        });
    }
);

export const post = async function (url, data) {
    return new Promise((resolve, reject) => {
        http({
            url: url,
            data: data || {},
            method: 'post'
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}