<template>
    <div class="search-tip">
        <div class="filtration">
            <span>按综合</span>
            <span @click="onOff">筛选</span>
        </div>
        <ul v-show="!showFilter">
            <li v-for="(book, index) in books" :key="index">
                <div class="b-msg-img" :style="{backgroundImages:'url('+book.url+')'}"></div>
                <div class="b-msg-text">
                    <h4>{{book.name}}</h4>
                    <p>{{book.synopsis}}</p>
                    <label>
                        <span class="b-writer">{{book.writer}}</span>
                        <span>
                            <span class="b-number">{{book.number}}万字</span>
                            <span class="b-class">{{book.class}}</span>
                        </span>
                    </label>
                </div>
            </li>
        </ul>
        <div class="filter" v-show="showFilter">
            <label>频道</label>
            <label>
                <span
                    ref="tip"
                    :class="{active:channel == 'boys'}"
                    @click="selectChannel($event,'boys')"
                >男生</span>
                <span
                    ref="tip"
                    :class="{active:channel == 'girls'}"
                    @click="selectChannel($event,'girls')"
                >女生</span>
                <span
                    ref="tip"
                    :class="{active:channel == 'publish'}"
                    @click="selectChannel($event,'publish')"
                >出版</span>
            </label>
            <label>状态</label>
            <label>
                <span
                    ref="tip"
                    :class="{active:status == 'finish'}"
                    @click="selectStatus($event, 'finish')"
                >完结</span>
                <span
                    ref="tip"
                    :class="{active:status == 'serials'}"
                    @click="selectStatus($event,'serials')"
                >连载</span>
            </label>
            <label>类型</label>
            <label>
                <span
                    ref="tip"
                    :class="{active:type == 'limitfree'}"
                    @click="selectType($event,'limitfree')"
                >限免</span>
                <span
                    ref="tip"
                    :class="{active:type == 'monthly'}"
                    @click="selectType($event,'monthly')"
                >包月</span>
                <span
                    ref="tip"
                    :class="{active:type == 'free'}"
                    @click="selectType($event,'free')"
                >免费</span>
            </label>
            <label>字数</label>
            <label>
                <span
                    ref="tip"
                    :class="{active:words == 'minwords'}"
                    @click="selectWords($event,'minwords')"
                >30万字以下</span>
                <span
                    ref="tip"
                    :class="{active:words == 'words'}"
                    @click="selectWords($event,'words')"
                >30-100万字</span>
                <span
                    ref="tip"
                    :class="{active:words == 'maxwords'}"
                    @click="selectWords($event,'maxwords')"
                >100万字以上</span>
            </label>
            <label>
                <button class="reset" @click="onReset">重置</button>
                <button class="save" @click="onSave">确定</button>
            </label>
        </div>
    </div>
</template>

<script>
import { post } from "../../axios";
export default {
    data() {
        return {
            showFilter: false,
            channel: "",
            status: "",
            type: "",
            words: "",

            books: "",
            alertText: ""
        };
    },
    props: ["postData"],
    created() {
        this.getbooks();
    },
    watch: {
        postData: function() {
            this.getbooks();
        }
    },
    methods: {
        getbooks() {
            console.log(this.postData);
            if (this.postData) {
                let data = {
                    label: "search",
                    text: this.postData,
                    channel: this.channel,
                    status: this.status,
                    type: this.type,
                    words: this.words
                };
                console.log(data);
                post("search", data)
                    .then(response => {
                        this.books = response.books;
                    })
                    .catch(error => {
                        this.alertText = "没有更多书籍了";
                    });
            }
        },
        onOff(e) {
            this.showFilter = !this.showFilter;
        },
        selectChannel(e, flag) {
            this.channel = flag;
        },
        selectStatus(e, flag) {
            this.status = flag;
        },
        selectType(e, flag) {
            this.type = flag;
        },
        selectWords(e, flag) {
            this.words = flag;
        },
        onReset(e) {
            let tip = this.$refs.tip;
            for (let i = 0; i < tip.length; i++) {
                tip[i].classList.remove("active");
            }
            this.channel = "";
            this.status = "";
            this.type = "";
            this.words = "";
        },
        onSave(e) {
            this.showFilter = false;
            this.getbooks();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
.search-tip {
    @include wh(100%, calc(100% - 4.2rem));
    .filtration {
        @include df(null, row, flex-start);
        span {
            height: 3rem;
            padding: 0rem 1.5rem;
            text-align: center;
            line-height: 3rem;
        }
    }
    ul {
        @include wh(100%, calc(100% - 3rem));
        @include view-ul-notitle();
    }
    .filter {
        @include wh(100%, calc(100% - 3rem));
        label {
            @include df(null, row, flex-start);
            padding: 0.3rem 1rem;
            font-size: 1.06rem;
            span {
                margin-right: 1rem;
                padding: 0.6rem 1.2rem;
                background-color: #f7f7f7;
                color: #2b2b2b;
                font-size: 0.9rem;
            }
            button {
                background-color: #f7f7f7;
                color: #2b2b2b;
                width: 50%;
                padding: 1rem;
            }
            button.save {
                color: #fef8f6;
                background-color: #f2512e;
            }
        }
        .active {
            border-color: #f2512e;
            color: #f2512e;
        }
    }
}
</style>
