<template>
    <div class="roll search">
        <header>
            <span @click="back"><</span>
            <input type="text" placeholder="输入要搜索的内容" v-model.trim="searchText" autofocus />
            <span class="reset" v-show="showReset" @click.stop.prevent="reset">x</span>
        </header>
        <div v-if="!showResult">
            <section class="history">
                <div class="section-head">
                    <span>&nbsp;搜索历史</span>
                    <span @click="deleteHistory">清空</span>
                </div>
                <ul>
                    <li v-for="(m, index) in history" :key="index" @click="onSearch(m)">{{m}}</li>
                </ul>
            </section>
            <section class="list">
                <div class="section-head">
                    <span>&nbsp;大家都在搜</span>
                    <span @click="changeSearchList">换一换</span>
                </div>
                <ul>
                    <li v-for="(n, index) in searchList" :key="index" @click="onSearch(n)">{{n}}</li>
                </ul>
            </section>
            <section class="toplist">
                <div class="section-head">
                    <span>&nbsp;热搜TOP榜</span>
                </div>
                <ul>
                    <li v-for="(r, index) in searchTopList" :key="index" @click="goto(r.id)">
                        <span :style="{backgroundImages:'url('+r.url+')'}"></span>
                        <span>{{r.name}}</span>
                    </li>
                </ul>
            </section>
        </div>
        <div v-else>
            <ul>
                <li v-for="(book, index) in books" :key="index">
                    <div :style="{backgroundImages:'url('+book.url+')'}"></div>
                    <div>
                        <h4>{{book.name}}</h4>
                        <p>{{book.synopsis}}</p>
                        <p>
                            <span>{{book.writer}}</span>
                            <span>{{book.number}}万字</span>
                            <span>{{book.class}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="closeTip()"></alert-tip>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { post } from "../axios";
import AlertTip from "../components/alertTip";
import {
    getScrollHeight,
    getScrollTop,
    getWindowHeight
} from "../config/utils";

export default {
    data() {
        return {
            showReset: true,

            showAlert: false,
            alertText: "",

            showResult: false,
            books: [],

            searchText: "",

            searchList: [],
            searchTopList: [],

            time: null
        };
    },
    components: {
        AlertTip
    },
    created() {
        post("search", {
            label: ["searchList", "searchTopList"]
        })
            .then(response => {
                this.searchList = response.searchList;
                this.searchTopList = response.searchTopList;
            })
            .catch(error => {});
    },
    computed: {
        ...mapState(["history"])
    },
    methods: {
        ...mapMutations(["ADD_SEARCH_HISTORY", "DELETE_SEARCH_HISTORY"]),
        back() {
            this.$router.go(-1);
        },
        reset() {
            this.showReset = false;
            this.showResult = false;
            this.books = "";
            this.searchText = "";
        },
        changeSearchList() {
            post("search", {
                label: ["searchList"]
            })
                .then(response => {
                    this.searchTopList = response.searchTopList;
                })
                .catch(error => {});
        },
        onSearch(text) {
            post("search", {
                label: "search",
                text: text
            })
                .then(response => {
                    this.showAlert = true;
                    this.showResult = true;
                    this.books = response.books;
                })
                .catch(error => {
                    this.showAlert = true;
                    this.alertText = error.msg;
                });
        },
        deleteHistory() {
            this.DELETE_SEARCH_HISTORY();
        },
        closeTip() {
            this.showAlert = false;
            this.alertText = "";
            this.searchText = "";
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin";

.search {
    header {
        padding: 1rem 1rem 1rem 0;
        display: flex;
        justify-content: space-between;
        position: relative;
        span {
            width: 3rem;
            height: 2.2rem;
            line-height: 2.2rem;
            font-size: 1.5rem;
            text-align: center;
        }
        input {
            width: calc(100% - 3rem);
            height: 2.2rem;
            padding-left: 0.8rem;
        }
        .reset {
            position: absolute;
            right: 1rem;
            top: 1rem;
            line-height: 2.2rem;
            text-align: center;
        }
    }
    .history,
    .list {
        padding: 1rem;
        ul {
            flex-wrap: wrap;
            @include df(null, row, flex-start);
            li {
                border-style: solid;
                border-width: 1px;
                border-color: #bfbfbf;
                margin: 0.5rem;
                max-width: 9rem;
                height: 2.5rem;
                line-height: 2.5rem;
                padding: 0 0.8rem;
                text-align: center;
                @include ellipsis();
            }
        }
    }
    .toplist {
        padding: 1rem;
        ul {
            flex-wrap: wrap;
            @include df(null, row, null);
            li {
                width: 16%;
                margin: 1rem 2%;
                @include df(null, column, flex-start);
                :nth-child(1) {
                    width: 100%;
                    min-height: 6rem;
                    background-color: crimson;
                }
                :nth-child(2) {
                    width: 100%;
                    margin-top: 1rem;
                    padding: 0 0.5rem;
                    font-size: 0.8rem;
                    color: #bfbfbf;
                    text-align: center;
                    @include ellipsis();
                }
            }
        }
    }
    .section-head {
        display: flex;
        justify-content: space-between;
        :nth-child(1) {
            font-size: 1.1rem;
        }
        :nth-child(2) {
            color: #bfbfbf;
        }
        :nth-child(1)::before {
            content: "|";
            color: chartreuse;
        }
    }
}
</style>