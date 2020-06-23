<template>
    <div class="ranking">
        <Head :message="message" @switchView="switchView">
            <router-link class="search" to="/search" tag="div" slot="search">
                <input type="text" placeholder="王者荣耀" />
            </router-link>
        </Head>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
    </div>
</template>

<script>
import Head from "./head";
import { renqibang, rexiaobang, wanjiebang, resoubang } from "./view";

export default {
    data() {
        return {
            message: {},
            componentId: ""
        };
    },
    components: {
        Head,
        renqibang,
        rexiaobang,
        wanjiebang,
        resoubang
    },
    methods: {
        switchView(key) {
            this.componentId = key;
        }
    }
};
</script>

<style lang="scss" scoped>
.ranking {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .search input {
        background-image: url(../../assets/images/search.png);
    }
}
</style>