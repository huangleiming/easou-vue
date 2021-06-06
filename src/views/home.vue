<template>
    <div class="home">
        <router-view></router-view>
        <Footer @changeView="changeView"></Footer>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Footer from "../components/Footer";

export default {
    data() {
        return {
            componentId: ""
        };
    },
    components: {
        Footer
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
            this.$router.replace({
                path: key,
            })
        }
    }
};
</script>
<style lang="scss" scoped>
</style>