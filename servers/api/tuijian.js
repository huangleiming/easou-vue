var config = require('../config.js');

/**
 * step: 20
 * pageNumber: 当前页数
 * pageTotal: 总页数
*/

module.exports = function (request, response) {
    console.log('>>>>>>>>tuijian>>>>>>');

    let data = request.data;
    let step = data.step;
    let pageNumber = data.pageNumber;

    console.log(data);

    if (typeof step != 'number') {
        return config.send(response, {
            errCode: 'fail',
            msg: '参数step格式不合法'
        });
    }
    if (typeof pageNumber != 'number') {
        return config.send(response, {
            errCode: 'fail',
            msg: '参数pageNumber格式不合法'
        });
    }

    let pageTotal = 10;//没有使用数据库，暂定为10页
    if (pageTotal <= 0 || pageNumber >= pageTotal) {
        return config.send(response, {
            errCode: 'fail',
            msg: '没有更多数据了'
        });
    }

    let books = [];
    for (let i = 0; i < step; i++) {
        books.push({
            id: Math.random() * 666666,
            title: config.getCommonWord(6),
            url: "",
            name: config.getCommonWord(5),
            synopsis: config.getCommonWord(25),
            writer: config.getCommonWord(5),
            number: (Math.random() * 1000).toFixed(2),
            class: config.getCommonWord(4)
        });
    }

    config.send(response, {
        errCode: 'ok',
        result: {
            pageNumber: pageNumber + 1,
            pageTotal,
            books
        }
    });
}