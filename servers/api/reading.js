var config = require('../config.js');

module.exports = function (request, response) {
    console.log('>>>>>>>>reading>>>>>>');

    let data = request.data;
    let label = data.label;
    let id = data.id;
    let chapterNum = data.chapterNum;

    if (!label) {
        return config.send(response, {
            errCode: 'fail',
            msg: '参数label不可为空'
        });
    }

    if (!id) {
        return config.send(response, {
            errCode: 'fail',
            msg: '参数id不可为空'
        });
    }

    /**
     * 具体数据参考 @/src/store/state.js
     * */
    let result = {};
    if (label == 'getBookInfo') {
        result.book = {
            id: id, // '书籍id'
            name: config.getCommonWord(5),// '书名'
            src: '',//封面图片
            status: '未读',//阅读状态【未读，已读】
            channel: 'girls',//频道【boys，girls，publish】男生，女生，出版
            type: 'free',//类型【limitfree，monthly，free】限免，包月，免费
            bookStatus: 'finish',//书籍状态【finish，serials】完结，连载
            words: 'minwords',//字数【minwords，words，maxwords】30以下，30-100，100以上 万字
            chapters: [],
            total: 600,// '总章节数'
            activeChapter: 0,//当前阅读的章节序号
            activePage: 0//当前阅读到本章的页数
        };
    } else if (label == 'getChapters') { }
    result.chapters = [{
        title: config.getCommonWord(6), //'章节名',
        content: config.getCommonWord(3500), //'内容',
        number: chapterNum + 1
    }];
    config.send(response, {
        errCode: 'ok',
        result: result
    });
};