<template>
    <div class="roll classify">
        <Head :message="message" @switchView="switchView">
            <router-link class="search" to="/search" tag="div" slot="search">
                <input type="text" placeholder="都市纵横" />
            </router-link>
        </Head>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
    </div>
</template>

<script>
import Head from "./head";
import {
    xiandaidushi,
    xuanhuanqihuan,
    kehuanxiaoshuo,
    wuxiaxianxia,
    zhaixiaoshuo,
    youxijingji,
    chuban
} from "./view";

export default {
    data() {
        return {
            message: {},
            componentId: ""
        };
    },
    components: {
        Head,
        xiandaidushi,
        xuanhuanqihuan,
        kehuanxiaoshuo,
        wuxiaxianxia,
        zhaixiaoshuo,
        youxijingji,
        chuban
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