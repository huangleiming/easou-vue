<template>
    <div class="wall">
        <span class="btn-redirect" @click="redirect">点击进入</span>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        redirect() {
            this.$router.replace("/home");
        }
    }
};
</script>
<style lang="scss" scoped>
.btn-redirect {
    margin: 3px;
    padding: 4px 8px;
    background-color: #919191;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}
</style>
