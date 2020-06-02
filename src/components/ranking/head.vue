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
import { home_ranking } from "../../config/common";

export default {
    data() {
        return {
            isActive: "",
            component: home_ranking
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
        display: flex;
        margin: 0.5rem;
        li {
            flex: 1;
            text-align: center;
        }
    }
}
</style>