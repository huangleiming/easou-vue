<template>
    <div class="app">
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name: "App",
    created() {
        /**
        console.log(localStorage.getItem("vueState"));
        localStorage.getItem("vueState") &&
            this.$store.replaceState(
                Object.assign(
                    this.$store.state,
                    JSON.parse(localStorage.getItem("vueState"))
                )
            );
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("vueState", JSON.stringify(this.$store.state));
        });
        */
    }
};
</script>
<style lang="scss">
@import "./assets/style/common";

.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
</style>