<template>
    <header>
        <slot name="search"></slot>
        <ul class="scroll">
            <li
                v-for="(items, index) in component"
                :class="{active:isActive===items.key}"
                :key="index"
                @click="loadView(items.key)"
            >{{items.title}}</li>
        </ul>
    </header>
</template>
<script>
import { home_classify } from "../../config/common";

export default {
    data() {
        return {
            isActive: "",
            component: home_classify
        };
    },
    props: ["message"],
    mounted() {
        this.loadView(this.component[0].key);
    },
    methods: {
        loadView(key) {
            this.isActive = key;
            this.$emit("switchView", key);
        }
    }
};
</script>
<style lang="scss" scoped>
header {
    margin: 0.6rem 0;
    ul {
        margin: 0.5rem;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        -webkit-overflow-scrolling: touch;
        li {
            width: 5rem;
            height: 2rem;
            line-height: 2rem;
            display: inline-block;
            text-align: center;
        }
        li.active {
            color: red;
            font-weight: 200;
        }
    }
}
</style>