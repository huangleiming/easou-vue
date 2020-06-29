<template>
    <div class="bookrack">
        <header>
            <span>本周阅读时长{{readTime}}分钟&nbsp;对劵></span>
            <span class="iconfont icon-search" @click="goto('search')"></span>
        </header>
        <div class="line">
            <span>签到3天赢大奖！</span>
            <span>
                <p>+14书劵</p>
                <p @click="goto('checkin')">签到</p>
            </span>
        </div>
        <ul class="rack">
            <li
                v-for="(i, index) in bookcase"
                :key="index"
                @click="goto('reading/'+i.id, {id: i.id, origin: 'local'})"
            >
                <div class="cover" :style="{backgroundImage:'url('+i.url+')'}"></div>
                <span>{{i.name}}</span>
                <span class="status">{{i.status}}</span>
            </li>
            <li v-show="true" :key="bookcase.length + 1" @click="record('handpick')">
                <div class="iconfont icon-shizi extra"></div>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {};
    },
    created() {
        console.log("bookrack->created");
    },
    computed: {
        ...mapState(["readTime", "bookcase"])
    },
    methods: {
        ...mapMutations(["RECODE_RECORD"]),
        goto(target, data = {}) {
            this.$router.push({ path: "/" + target, query: data });
        },
        record(id) {
            this.RECODE_RECORD({
                componentId: id
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.bookrack {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 3.2rem;
    header {
        padding: 1rem;
        @include df(center, row, space-between);
        :nth-child(2) {
            @include wh(2rem, 2rem);
            font-size: 1.8rem;
            line-height: 2rem;
        }
    }
    .line {
        padding: 0rem 1.5rem;
        @include df(center, row, space-between);
        span {
            @include sc(0.9rem, #999999);
            @include df(center, row, space-between);
            :nth-child(1) {
                @include sc(0.9rem, #999999);
            }
            :nth-child(2) {
                @include sc(0.9rem, #ffffff);
                @include wh(4.2rem, 1.8rem);
                margin-left: 0.5rem;
                background-color: #fc6e51;
                border-radius: 20px;
                text-align: center;
                line-height: 1.8rem;
            }
        }
    }
    .rack {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        li {
            @include df(center, column, flex-start);
            @include wh(calc(100% / 3), auto);
            padding: 0.4rem 0.6rem;
            div.cover {
                @include wh(100%, 10rem);
                text-align: center;
                line-height: 10rem;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            span {
                margin-top: 0.3rem;
                width: 100%;
                @include ellipsis(1);
                @include sc(1rem, #282828);
            }
            span.status {
                @include sc(0.8rem, #999999);
            }
            div.extra {
                @extend div.cover;
                @include border(solid, 1px, #dddddd);
                font-size: 4rem;
            }
        }
    }
}
</style>