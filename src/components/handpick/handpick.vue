<template>
    <div class="roll handpick">
        <Head :message="message" @switchView="switchView">
            <router-link class="search" to="/search" tag="div" slot="search">
                <input type="text" placeholder="穿越" />
            </router-link>
        </Head>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
    </div>
</template>

<script>
import Head from "./head";
import { tuijian, wanjie, lianzai, mianfei, component } from "./view";

export default {
    data() {
        return {
            message: {},
            componentId: ""
        };
    },
    created() {},
    components: {
        Head,
        tuijian,
        wanjie,
        lianzai,
        mianfei
    },
    methods: {
        switchView(key) {
            this.componentId = key;
        }
    }
};
</script>

<style lang="scss" scoped>
.search input {
    background-image: url(../../assets/images/search.png);
}
</style>