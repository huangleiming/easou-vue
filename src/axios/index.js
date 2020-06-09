import axios from 'axios';

const http = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/',
    timeout: 3000
});

http.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject({
            errCode: 'fail',
            msg: '发起请求失败'
        });
    }
);

http.interceptors.response.use(
    response => {
        // console.log(response);
        if (!response.data || typeof response.data != 'object') {
            return Promise.reject({
                errCode: 'fail',
                msg: '返回数据格式不合法'
            });
        }
        if (response.data.errCode != 'ok') {
            return Promise.reject(response.data);
        }
        return Promise.resolve(response.data.result);
    },
    error => {
        // console.log(error.message);
        return Promise.reject({
            errCode: 'fail',
            msg: error.message
        });
    }
);

export const post = async function (url, data) {
    return new Promise((resolve, reject) => {
        http({
            method: 'POST',
            url: url,
            data: JSON.stringify(data || {})
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}