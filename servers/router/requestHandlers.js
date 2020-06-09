var search = require('../api/search');
var tuijian = require('../api/tuijian');

module.exports = function () {
    var handle = {};
    handle['search'] = search;
    handle['tuijian'] = tuijian;

    return handle;
};