const OUT_LOGIN = 'OUT_LOGIN';
const RECODE_USER_INFO = 'RECODE_USER_INFO';

const RECODE_PATH = 'RECODE_PATH';
const RECODE_RECORD = 'RECODE_RECORD';
const DELETE_RECOED = 'DELETE_RECOED';

// bookcase
const BOOKCASE_ADD = 'BOOKCASE_ADD';
const BOOKCASE_DELETE = 'BOOKCASE_DELETE';
const BOOKCASE_ADD_CHAPTERS = 'BOOKCASE_ADD_CHAPTERS';
const BOOKCASE_RECODE_ACTIVECHAPTER = 'BOOKCASE_RECODE_ACTIVECHAPTER';
const BOOKCASE_RECODE_ACTIVEPAGE = 'BOOKCASE_RECODE_ACTIVEPAGE';
const BOOKCASE_RECODE_STATUS = 'BOOKCASE_RECODE_STATUS';


//history
const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
const DELETE_SEARCH_HISTORY = 'DELETE_SEARCH_HISTORY';

export default {
    [RECODE_USER_INFO](state, info) {
        state.userAccount = info.userAccount;
        state.passWord = info.passWord;
        state.login = true;
    },
    [OUT_LOGIN](state) {
        state.login = false;
    },

    [RECODE_PATH](state, info) {
        state.path = info;
    },
    [RECODE_RECORD](state, info) {
        //后续还会增加
        state.componentId = info.componentId;
    },
    [DELETE_RECOED](state, info) {
        for (let i = 0; i < info.length; i++) {
            state[info[i]] = null;
        }
    },

    [BOOKCASE_ADD](state, info) {
        let bookcase = state.bookcase;
        let index = -1;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info.id) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            state.bookcase.push(info);
        } else {
            Object.assign(
                state.bookcase[index],
                info
            )
        }
    },
    [BOOKCASE_DELETE](state, info) {
        let bookcase = state.bookcase;
        let index = -1;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            state.bookcase.splice(index, 1);
        }
    },
    [BOOKCASE_RECODE_ACTIVECHAPTER](state, info) {
        let bookcase = state.bookcase;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info.id) {
                state.bookcase[i].activeChapter = info.activeChapter;
                break;
            }
        }
    },
    [BOOKCASE_RECODE_ACTIVEPAGE](state, info) {
        let bookcase = state.bookcase;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info.id) {
                state.bookcase[i].activePage = info.activePage;
                break;
            }
        }
    },
    [BOOKCASE_ADD_CHAPTERS](state, info) {
        let bookcase = state.bookcase;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info.id) {
                state.bookcase[i].chapters.push(info.chapter);
                break;
            }
        }
    },
    [BOOKCASE_RECODE_STATUS](state, info) {
        let bookcase = state.bookcase;
        for (let i = 0; i < bookcase.length; i++) {
            if (bookcase[i].id == info) {
                state.bookcase[i].status = '已读';
                break;
            }
        }
    },

    [ADD_SEARCH_HISTORY](state, info) {
        let history = state.history;
        if (history.indexOf(info) == -1) {
            history.push(info);
        }
        if (history.length > 20) {
            history.splice(0, 1);
        }
    },
    [DELETE_SEARCH_HISTORY](state) {
        state.history = [];
    }
}