<template>
    <div class="search">
        <header>
            <span @click="back"><</span>
            <input
                type="text"
                @keyup.enter="enter(searchText)"
                v-model.trim="searchText"
                autofocus
                placeholder="输入要搜索的内容"
            />
            <span class="reset" v-show="showReset" @click.stop.prevent="reset">x</span>
        </header>
        <search-tip v-if="showSearchResult" :searchInfo="searchInfo"></search-tip>
        <div v-else>
            <section class="history">
                <div class="section-head">
                    <span>&nbsp;搜索历史</span>
                    <span @click="deleteHistory">清空</span>
                </div>
                <ul>
                    <li v-for="(m, index) in history" :key="index" @click="enter(m)">{{m}}</li>
                </ul>
            </section>
            <section class="list">
                <div class="section-head">
                    <span>&nbsp;大家都在搜</span>
                    <span @click="changeSearchList">换一换</span>
                </div>
                <ul>
                    <li v-for="(n, index) in searchList" :key="index" @click="enter(n)">{{n}}</li>
                </ul>
            </section>
            <section class="toplist">
                <div class="section-head">
                    <span>&nbsp;热搜TOP榜</span>
                </div>
                <ul>
                    <li v-for="(r, index) in searchTopList" :key="index" @click="goto(r.id)">
                        <span :style="{backgroundImage:r.url ? 'url('+r.url+')' : ''}"></span>
                        <span>{{r.name}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { post } from "../axios";
import SearchTip from "../components/search/searchTip";
import {
    getScrollHeight,
    getScrollTop,
    getWindowHeight
} from "../config/utils";

export default {
    data() {
        return {
            showReset: false,

            showSearchResult: false,
            searchInfo: "",

            searchText: "",

            searchList: [],
            searchTopList: []
        };
    },
    components: {
        SearchTip
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
            this.$destroy();
        },
        reset() {
            this.showReset = false;
            this.showSearchResult = false;
            this.searchInfo = "";
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
        search(text) {
            this.searchInfo = text;
            this.showSearchResult = true;
            this.showReset = true;
        },
        enter(text) {
            this.searchText = text;
            this.ADD_SEARCH_HISTORY(text);
            this.search(text);
        },
        deleteHistory() {
            this.DELETE_SEARCH_HISTORY();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin";

.search {
    @include wh(100%, 100%);
    overflow: hidden;
    background-color: #ffffff;
    header {
        //高度是4.2rem 后面会用到
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
            color: #121212;
            background-color: #f3f3f3;
        }
        .reset {
            @include wh(1.3rem, 1.3rem);
            position: absolute;
            right: 1.5rem;
            top: 1.5rem;
            line-height: 1.2rem;
            font-size: 12px;
            text-align: center;
            color: #f7f7f7;
            background-color: #c2c2c2;
            border-radius: 50%;
        }
    }
    .history,
    .list {
        padding: 1rem;
        ul {
            flex-wrap: wrap;
            @include df(null, row, flex-start);
            li {
                @include border(solid, 1px, #b1b1b1);
                margin: 0.5rem;
                max-width: 9rem;
                height: 2.5rem;
                line-height: 2.5rem;
                padding: 0 0.8rem;
                text-align: center;
                color: #939393;
                @include ellipsis(1);
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
                    background-color: #f2512e;
                    background-image: url(../assets/images/book.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                :nth-child(2) {
                    width: 100%;
                    margin-top: 1rem;
                    padding: 0 0.5rem;
                    font-size: 0.8rem;
                    color: #959595;
                    text-align: center;
                    @include ellipsis(1);
                }
            }
        }
    }
    .section-head {
        display: flex;
        justify-content: space-between;
        :nth-child(1) {
            font-size: 1.1rem;
            color: #616161;
        }
        :nth-child(2) {
            color: #9c9c9c;
        }
        :nth-child(1)::before {
            content: "|";
            color: #f6aa93;
        }
    }
}
</style>