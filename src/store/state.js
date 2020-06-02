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

    /**书架
     * @param {String} id 书籍id
     * @param {String} name 书名
     * @param {String} src 书籍封面image 'url'
     * @param {String} status 书籍阅读状态 '已读' '未读'
     */
    books: [
        {
            id: '123',
            name: '你结婚水水',
            src: '',
            status: '未读'
        },
        {
            id: '123reewr',
            name: '你结婚水水警方打击对方',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '你结婚水水士大夫受到太阳高度',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '爱神的箭噶撒旦撒旦好的',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '地方的飞机发动机分隔符',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '打扫房间回复的是第三方付费电视 ',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '但是房价和第三方',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '大师傅士大夫',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '你结婚水水士大夫受到太阳高度',
            src: '',
            status: '未读'
        },
        {
            id: '123343443',
            name: '你结婚水水士大夫受到太阳高度',
            src: '',
            status: '未读'
        }
    ],

    /**
     *@param {Number} readTime 本周阅读时长 分钟
    */
    readTime: 0,

    /**
     *@param {Array} history 搜索历史记录
    */
    history: [
        '反对和附近的各方 ',
        'fdgggfgd谷歌',
        '方法 ',
        '发广告滚动',
        '东方给官方 ',
        '豆腐干反对',
        '官方到各地广泛广泛法国德国 ',
        'fdgggfgd分隔符谷歌',
    ],
}