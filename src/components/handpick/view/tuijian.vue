<template>
    <div class="tuijian">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <ul class="book-ul">
                <li
                    v-for="(i, index) in books"
                    :key="index"
                    @click="goto('reading/'+i.id, {id: i.id, origin: 'non-local'})"
                >
                    <h5>{{i.title}}</h5>
                    <div class="b-msg">
                        <div
                            class="b-msg-img"
                            :style="{backgroundImage:i.url ? 'url('+i.url+')' : ''}"
                        ></div>
                        <div class="b-msg-text">
                            <h4>{{i.name}}</h4>
                            <p>{{i.synopsis}}</p>
                            <label>
                                <span class="b-writer">{{i.writer}}</span>
                                <span>
                                    <span class="b-number">{{i.number}}万字</span>
                                    <span class="b-class">{{i.class}}</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </mescroll-vue>
    </div>
</template>

<script>
import { post } from "../../../axios";
import MescrollVue from "mescroll.js/mescroll.vue";

export default {
    data() {
        return {
            pageTotal: null,
            books: [],

            mescroll: null,
            mescrollDown: {
                //callback: this.downCallback
            },
            mescrollUp: {
                callback: this.upCallback,
                page: {
                    num: 0,
                    size: 10
                }
            }
        };
    },
    components: {
        MescrollVue
    },
    created() {},
    methods: {
        goto(target, data = {}) {
            this.$router.push({ path: "/" + target, query: data });
        },
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        downCallback() {
            //下拉刷新
        },
        upCallback(page) {
            //上拉加载||下拉刷新
            post("tuijian", {
                step: page.size,
                pageNumber: page.num
            })
                .then(result => {
                    console.log("-----up-----");
                    console.log(result);
                    this.pageTotal = result.pageTotal;
                    let arr = result.books;
                    if (page.num == 1) {
                        this.books = [];
                    }
                    this.books.push(...arr);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        this.mescroll.endSuccess(arr.length);
                    });
                })
                .catch(error => {
                    this.mescroll.endErr();
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/mixin";

.tuijian {
    width: 100%;
    height: 100%;
    //header 6.2rem footer 3.2rem
    padding-top: 6.2rem;
    padding-bottom: 3.2rem;
    ul {
        @include view-ul-title();
        .b-msg-img {
            background-image: url(../../../assets/images/book.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
.mescroll {
    position: fixed;
    top: 6.2rem; //header 6.2rem
    bottom: 0;
    height: auto;
}
</style>
