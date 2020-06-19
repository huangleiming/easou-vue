var search = require('../api/search');
var tuijian = require('../api/tuijian');
var reading = require('../api/reading');

module.exports = function () {
    var handle = {};
    handle['search'] = search;
    handle['tuijian'] = tuijian;
    handle['reading'] = reading;

    return handle;
};