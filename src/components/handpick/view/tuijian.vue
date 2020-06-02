<template>
    <div class="roll tuijian">
        <ul>
            <li v-for="(i, index) in books" :key="index" @click="goto(i.id)">
                <h5>{{i.title}}</h5>
                <div>
                    <div :style="{backgroundImages:'url('+i.url+')'}"></div>
                    <div>
                        <h4>{{i.name}}</h4>
                        <p>{{i.synopsis}}</p>
                        <p>
                            <span>{{i.writer}}</span>
                            <span>{{i.number}}万字</span>
                            <span>{{i.class}}</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { post } from "../../../axios";

export default {
    data() {
        return {
            books: [
                {
                    id: "123456",
                    title: "东方玄幻精品好书",
                    url: "",
                    name: "将夜",
                    synopsis:
                        "与天斗，其乐无穷。巴萨的，吧的地方不大舒服阿萨的，静安寺带回家发货京哈是否看",
                    writer: "猫腻",
                    number: "374.2",
                    class: "东方玄幻"
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        goto() {
            this.getData();
        },
        getData(id) {
            post("handepick", {
                id: id
            })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.tuijian {
    li {
    }
}
</style>
