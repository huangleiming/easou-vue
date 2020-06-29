var config = require('../config.js');

module.exports = function (request, response) {
    console.log('>>>>>>>>search>>>>>>');

    let data = request.data;
    let result = {};

    let label = data.label;
    if (label == 'search') {
        let text = data.text;
        let channel = data.channel;
        let bookStatus = data.bookStatus;
        let type = data.type;
        let words = data.words;

        let number = 30;
        if (words == 'minwords') {
            number = 20;
        } else if (words == 'words') {
            number = 60;
        } else if (words == 'maxwords') {
            number = 120
        } else { }

        /**
            * 具体数据参考 @/src/store/state.js
            * */
        result.books = [];
        for (let i = 0; i < 10; i++) {
            result.books.push({
                id: Math.random() * 666666, // '书籍id'
                name: config.getCommonWord(5),// '书名'
                url: "",
                synopsis: text + config.getCommonWord(56),
                writer: config.getCommonWord(4),
                number: number,
                class: '东方玄幻',
                channel: channel,//频道【boys，girls，publish】男生，女生，出版
                type: type,//类型【limitfree，monthly，free】限免，包月，免费
                bookStatus: bookStatus,//书籍状态【finish，serials】完结，连载
                words: words,//字数【minwords，words，maxwords】30以下，30-100，100以上 万字
            });
        }
    }
    config.send(response, {
        errCode: 'ok',
        result: result
    });
};