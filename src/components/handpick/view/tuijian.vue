<template>
    <div class="viewscroll tuijian">
        <ul class="book-ul">
            <li v-for="(i, index) in books" :key="index" @click="goto(i.id)">
                <h5>{{i.title}}</h5>
                <div class="b-msg">
                    <div class="b-msg-img" :style="{backgroundImages:'url('+i.url+')'}"></div>
                    <div class="b-msg-text">
                        <h4>{{i.name}}</h4>
                        <p>{{i.synopsis}}</p>
                        <label>
                            <span class="b-writer">{{i.writer}}</span>
                            <span>
                                <span class="b-number">{{i.number}}万字</span>
                                <span class="b-class">{{i.class}}</span>
                            </span>
                        </label>
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
            step: 20,
            pageNumber: 0,
            pageTotal: null,
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
        this.loadBooks();
    },
    methods: {
        goto(id) {
            this.loadBooks();
        },
        loading(result) {
            this.pageNumber = result.pageNumber;
            this.pageTotal = result.pageTotal;
            this.books.push(...result.books);
        },
        loadBooks() {
            if (this.pageTotal && this.pageNumber >= this.pageTotal) {
                console.log("没有更多数据了");
                return;
            }
            let data = {
                step: this.step,
                pageNumber: this.pageNumber
            };
            post("tuijian", data)
                .then(result => {
                    console.log(result);
                    this.loading(result);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/mixin";

.tuijian {
    ul {
        @include view-ul-title();
    }
}
</style>
