<template>
    <ul class="footer">
        <li @click="view('bookrack')" :class="{'active': active == 'bookrack'}" class="bookrack">
            <span class="iconfont icon-shujia"></span>
            <span>书架</span>
        </li>
        <li @click="view('handpick')" :class="{'active': active == 'handpick'}" class="handpick">
            <span class="iconfont icon-jingxuan"></span>
            <span>精选</span>
        </li>
        <li @click="view('ranking')" :class="{'active': active == 'ranking'}" class="ranking">
            <span class="iconfont icon-paihang"></span>
            <span>排行</span>
        </li>
        <li @click="view('classify')" :class="{'active': active == 'classify'}" class="classify">
            <span class="iconfont icon-fenlei"></span>
            <span>分类</span>
        </li>
        <li @click="view('mine')" :class="{'active': active == 'mine'}" class="mine">
            <span class="iconfont icon-wode"></span>
            <span>我的</span>
        </li>
    </ul>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            active: ""
        };
    },
    created() {
        this.active = "bookrack";
    },
    computed: {
        ...mapState(["componentId"])
    },
    watch: {
        componentId: function(newValue, oldValue) {
            if (newValue) {
                this.active = newValue; //触发视图切换
                this.DELETE_RECOED(["componentId"]); //清除记录
            }
        },
        active: function(newKey, oldKey) {
            this.$emit("changeView", newKey);
        }
    },
    methods: {
        ...mapMutations(["RECODE_RECORD", "DELETE_RECOED"]),
        view(key) {
            this.active = key;
        }
    }
};
</script>
<style lang="scss" scoped>
.footer li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    :nth-child(1) {
        font-size: 1.9rem;
    }
    :nth-child(2) {
        font-size: 0.6rem;
    }
}
.active {
    span {
        color: red;
    }
}
</style>