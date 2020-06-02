<template>
    <div class="app">
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
        <Footer @changeView="changeView"></Footer>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Footer from "../components/Footer";

import bookrack from "../components/bookrack/bookrack";
import handpick from "../components/handpick/handpick";
import ranking from "../components/ranking/ranking";
import classify from "../components/classify/classify";
import mine from "../components/mine/mine";

export default {
    data() {
        return {
            componentId: ""
        };
    },
    components: {
        Footer,
        bookrack,
        handpick,
        ranking,
        classify,
        mine
    },
    created() {
        this.listenRouter(this.$route.path);
    },
    watch: {
        $route: function(r) {
            this.listenRouter(r.path);
        }
    },
    computed: {},
    methods: {
        ...mapMutations(["RECODE_PATH"]),
        listenRouter(path) {
            this.RECODE_PATH(path);
        },
        changeView(key) {
            this.componentId = key;
        },
        change(key) {
            viewId;
        }
    }
};
</script>
<style lang="scss" scoped>
</style>