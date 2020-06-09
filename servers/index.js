var http = require('http');
var url = require('url');
var config = require('./config.js');

var route = require('./router/index.js');
var handle = require('./router/requestHandlers.js')();

http.createServer(function (request, response) {

    /**
    if (!request.method || request.method !== 'POST') {
        config.send(response,{
            errCode: 'fail',
            msg: '请使用post请求'
        }, 400);
        return;
    }
     */

    let pathname = url.parse(request.url, true).pathname;
    route(handle, pathname, function (status, callback) {
        if (status !== 'Found') {
            return config.send(response, {
                errCode: 'fail',
                msg: 'Not Found'
            }, 404);
        }
        let method = request.method;
        if (method == 'GET') {
            config.captureReqGetData(request, function (query) {
                request.query = query;
                callback(request, response);
            }, function () {
                config.send(response, {
                    errCode: 'fail',
                    msg: 'get数据非JSON格式'
                });
            });
        } else if (method == 'POST') {
            config.captureReqPostData(request, function (data) {
                request.data = data;
                callback(request, response);
            }, function () {
                config.send(response, {
                    errCode: 'fail',
                    msg: 'post数据非JSON格式'
                });
            });
        }
    });

}).listen(8001);

console.log('Server running at http://127.0.0.1:8001');