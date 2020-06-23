<template>
    <div class="roll mine">
        <div class="user" @click.prevent="goto()">
            <span class="iconfont icon-touxiang headPortrait"></span>
            <div class="message">
                <p>{{nickname}}</p>
                <p>{{synopsis}}</p>
            </div>
        </div>
        <div class="assets">
            <label>
                <span>{{gold > 0 ? gold :'—'}}</span>
                <span>金币</span>
            </label>
            <label>
                <span>{{coupons > 0 ? coupons:'—'}}</span>
                <span>书劵</span>
            </label>
            <label>
                <span>{{integral > 0 ? integral:'—'}}</span>
                <span>积分</span>
            </label>
        </div>
        <div class="assignment">
            <div class="title">
                <span>我的任务</span>
                <span>更多任务></span>
            </div>
            <ul>
                <li>
                    <span class="iconfont icon-zuanshi"></span>
                    <span>幸运抽奖</span>
                    <span>有惊喜</span>
                </li>
                <li>
                    <span class="iconfont icon-tianjia"></span>
                    <span>邀请好友</span>
                    <span>赚金币</span>
                </li>
                <li>
                    <span class="iconfont icon-qiandao"></span>
                    <span>每日签到</span>
                    <span>得好礼</span>
                </li>
            </ul>
        </div>
        <div class="tool">
            <div class="title">我的工具</div>
            <ul>
                <router-link v-for="(item, index) in Tool" :key="index" :to="item.url" tag="li">
                    <span class="iconfont" :class="item.iconfont"></span>
                    <span>{{item.text}}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { home_mine_tool } from "../../config/common";
export default {
    data() {
        return {
            nickname: "立即登录",
            synopsis: "登录后同步信息",
            gold: 0,
            coupons: 0,
            integral: 0,
            Tool: home_mine_tool
        };
    },
    created() {
        console.log("mine->created");
        if (this.login) {
            this.mapstate();
        }
    },
    computed: {
        ...mapState(["login"])
    },
    methods: {
        mapstate() {
            let state = this.$store.state;
            console.log(state);
            this.nickname = state.nickName;
            this.synopsis = state.synopsis;
            this.gold = state.gold;
            this.coupons = state.coupons;
            this.integral = state.integral;
        },
        goto() {
            this.$router.push({
                path: "/login",
                query: { back: "onback" }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.mine {
    padding: 0.5rem;
    .user {
        padding: 3rem 1.6rem 0rem 1.6rem;
        display: flex;
        justify-content: flex-start;
        .headPortrait {
            font-size: 6rem;
            color: #bfbfbf;
        }
        .message {
            @include df(flex-start, column, center);
            margin-left: 1rem;
            :nth-child(1) {
                font-size: 1.5rem;
                margin: 0.3rem 0;
            }
        }
    }
    .assets {
        padding: 1rem 2rem 5rem 2rem;
        display: flex;
        justify-content: space-around;
        label {
            @include df(center, column, center);
            margin: 0 5px;
            span {
                margin: 2px;
                text-align: center;
            }
        }
    }
    .assignment {
        padding: 1.2rem 1.6rem 0rem 1.6rem;
        .title {
            display: flex;
            justify-content: space-between;
            margin: 1.2rem 0;
            :nth-child(1) {
                font-size: 1.2rem;
                font-weight: 200;
            }
            :nth-child(2) {
                font-size: 0.8rem;
            }
        }
        ul {
            display: flex;
            justify-content: space-between;
            li {
                flex: 1;
                margin: 0 0.5rem;
                @include df(center, column, space-around);
                min-height: 7rem;
                box-shadow: 0px 0px 10px 5px rgba($color: #f2f2f2, $alpha: 0.7);
                span {
                    text-align: center;
                }
                :nth-child(2) {
                    font-size: 0.8rem;
                }
                :nth-child(3) {
                    font-size: 0.7rem;
                    color: #bfbfbf;
                }
            }
        }
    }
    .tool {
        padding: 1.2rem 1.6rem 1.6rem 1.6rem;
        .title {
            display: flex;
            justify-content: space-between;
            margin: 1.2rem 0;
            font-size: 1.2rem;
            font-weight: 200;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                width: calc((100% - 80px) / 4);
                margin: 10px;
                @include df(center, column, space-around);
                :nth-child(1) {
                    font-size: 2rem;
                }
                :nth-child(2) {
                    font-size: 0.8rem;
                }
            }
        }
    }
}
</style>