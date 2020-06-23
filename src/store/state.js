export default {
    /**个人信息
     * @param {String} userAccount   登录账号
     * @param {String} nickName      昵称  默认'打不死的小明'
     * @param {String} passWord     登录密码
     * @param {Boolean} login        登录状态
     * @param {String} synopsis     个人信息概要
    */
    userAccount: null,
    nickName: '打不死的小明',
    passWord: null,
    login: false,
    synopsis: '概要',

    /**
    * @param {String} path 记录当前路由path（未使用）
    * @param {String} componentId 记录home页componentId
    */
    path: null,
    componentId: null,

    /**
     * @param {Number} gold 金币数量
     * @param {Number} coupons 书劵数量
     * @param {Number} integral 积分数量
    */
    gold: 0,
    coupons: 0,
    integral: 0,

    /**
     *@param {Number} readTime 本周阅读时长 分钟
    */
    readTime: 0,

    /**
     * @member bookcase 当前阅读书籍数据
     * @param {Number} id
     * @param {String} name
     * @param {String} src 书籍封面
     * @param {String} status 阅读状态【未读，已读】
     * @param {String} synopsis 书籍剧情简要
     * @param {String} writer 书籍作者
     * @param {String} class 书籍类别 例如：玄幻，修仙，都市 等
     * @param {String} channel 频道【boys，girls，publish】男生，女生，出版
     * @param {String} type 类型【limitfree，monthly，free】限免，包月，免费
     * @param {String} bookStatus 书籍状态【finish，serials】完结，连载
     * @param {String} words 字数【minwords，words，maxwords】30以下，30-100，100以上 万字
     * @param {Array} chapters 全部章节
     * @param {Number} total 本书全部章节数量
     * @param {Number} activeChapter 当前阅读的章节序号
     * @param {Number} activePage 当前阅读到本章的页数
    */
    bookcase: [
        {
            id: 1001,
            name: '书名1',
            src: '',
            status: '未读',
            synopsis: '',
            writer: '土豆',
            class: '东方玄幻',
            channel: 'girls',
            type: 'free',
            bookStatus: 'finish',
            words: 'minwords',
            chapters: [{
                title: '章节名', //本章节名称
                content: '内容', //本章节内容
                number: 0        //本章节序号
            }],
            total: '总章节数',
            activeChapter: 0,
            activePage: 0
        },
        {
            id: 1002,
            name: '书名2',
            src: '',
            status: '未读',
            synopsis: '',
            writer: '土豆',
            class: '东方玄幻',
            channel: 'girls',
            type: 'free',
            bookStatus: 'finish',
            words: 'minwords',
            chapters: [],
            total: '总章节数',
            activeChapter: 0,
            activePage: 0
        }
    ],

    /**
     *@member {Array} history 搜索历史记录 最大20条记录
    */
    history: [
        '搜索历史001 ',
        '搜索历史002'
    ],
}