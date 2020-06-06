import { satisfies } from "semver";

const OUT_LOGIN = 'OUT_LOGIN';
const RECODE_USER_INFO = 'RECODE_USER_INFO';

const RECODE_PATH = 'RECODE_PATH';
const RECODE_RECORD = 'RECODE_RECORD';
const DELETE_RECOED = 'DELETE_RECOED';


const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const RECODE_BOOK_STATUS = 'RECODE_BOOK_STATUS';

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

    [ADD_BOOK](state, info) {
        state.books.push(info);
    },
    [DELETE_BOOK](state, info) {
        let index = -1;
        let books = state.books;
        for (let i = 0; i < books.length; i++) {
            if (books[i].id == info) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            state.books.splice(index, 1);
        }
    },
    [RECODE_BOOK_STATUS](state, info) {
        let books = state.books;
        for (let i = 0; i < books.length; i++) {
            if (books[i].id == info) {
                state.books[i].status = '已读';
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