<template>
    <div class="reading">
        <ul class="flipbook">
            <li class="hard" :data-chapter="0" :data-page="0">书名：{{book.name}}</li>
            <li
                v-for="(pages, index) in allChapterPage"
                :key="index"
                :ref="pages.isTemplate ? 'templateLi' : ''"
                :data-chapter="pages.chapterNum"
                :data-page="pages.pageNum"
            >
                <div class="page-header">第{{pages.chapterNum}}章&nbsp;{{pages.chapterTitle}}</div>
                <div class="content">{{pages.pageText}}</div>
                <div class="page-footer">
                    <span>{{time}}</span>
                    <span>{{pages.chapterNum}}/{{book.total}}章</span>
                    <span>本章第{{pages.pageNum}}/{{pages.pageTotal}}页</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import "../plugins/jquery.min.js";
import turn from "../plugins/turn.min.js";

import { mapState, mapMutations } from "vuex";
import { post } from "../axios";

export default {
    data() {
        return {
            time: "",
            book: "",
            allChapterPage: [],
            $turn: ""
        };
    },
    created() {
        this.init();
    },
    mounted() {},
    computed: {
        ...mapState(["bookcase"])
    },
    watch: {
        $route: function(to, from) {
            console.log(to);
            console.log(from);
            if (to.path.indexOf("/reading/") != -1) {
                this.init();
            } else {
                this.back();
            }
        }
    },
    methods: {
        ...mapMutations([
            "BOOKCASE_ADD",
            "BOOKCASE_DELETE",
            "BOOKCASE_ADD_CHAPTERS",
            "BOOKCASE_RECODE_ACTIVECHAPTER",
            "BOOKCASE_RECODE_ACTIVEPAGE",
            "BOOKCASE_RECODE_STATUS"
        ]),
        init() {
            var query = this.$route.query;
            if (query.origin == "local") {
                let bookcase = this.bookcase;
                for (let i = 0; i < bookcase.length; i++) {
                    if (query.id == bookcase[i].id) {
                        this.book = bookcase[i];
                        break;
                    }
                }
                console.log(this.book);
                this.setChapterPage(this.book.chapters, false, true);
                this.setTurn();
            } else {
                this.getBookInfo(query.id);
            }
        },
        slice(str) {
            var strArr = [];
            var n = 600;
            for (var i = 0, l = str.length; i < l / n; i++) {
                var a = str.slice(n * i, n * (i + 1));
                strArr.push(a);
            }
            return strArr;
        },
        setChapterPage(chapters, isTemplate, isLocal = false) {
            for (let c = 0; c < chapters.length; c++) {
                if (!isLocal) {
                    this.book.chapters.push(chapters[c]);
                }
                let text = this.slice(chapters[c].content);
                let chapterNum = chapters[c].number;
                let chapterTitle = chapters[c].title;
                for (let i = 0; i < text.length; i++) {
                    let pages = {
                        pageText: text[i],
                        pageNum: i + 1,
                        pageTotal: text.length,
                        chapterNum: chapterNum,
                        chapterTitle: chapterTitle,
                        isTemplate: isTemplate
                    };
                    this.allChapterPage.push(pages);
                }
            }
        },
        setTurn() {
            this.$nextTick(() => {
                this.$turn = $(".flipbook");
                this.$turn.turn({
                    width: "100%",
                    height: "100%",
                    display: "single",
                    autoCenter: true,
                    when: {
                        last: event => {
                            let chapterNum = $(event.target)
                                .find("li[data-chapter]")
                                .last()
                                .data("chapter");
                            this.getChapters(this.book.id, chapterNum); //翻到最后一页触发
                        },
                        turned: this.setActiveInfo //翻页结束触发
                    }
                });
            });
        },
        setActiveInfo(event, page, view) {
            let $activePage = $(event.target).find(".p" + page);
            this.book.activeChapter = $activePage.data("chapter");
            this.book.activePage = $activePage.data("page");
            this.book.status = "已读";
            this.time = this.getTime();
        },
        addBookcaseInfo() {
            let find = false;
            let bookcase = this.bookcase;
            for (let i = 0; i < bookcase.length; i++) {
                if (this.book.id == bookcase[i].id) {
                    find = true;
                }
            }
            if (find) {
                this.BOOKCASE_ADD(this.book);
            } else {
                let r = confirm("是否把本书放入书架");
                if (r) {
                    this.BOOKCASE_ADD(this.book);
                }
            }
        },
        getTime() {
            let date = new Date();
            return (
                date.getHours().toString() + ":" + date.getMinutes().toString()
            );
        },
        getBookInfo(bookId) {
            let data = {
                label: "getBookInfo",
                id: bookId,
                chapterNum: 0
            };
            post("reading", data)
                .then(response => {
                    this.book = response.book;
                    let chapters = response.chapters;
                    this.setChapterPage(chapters, false);
                    this.setTurn();
                })
                .catch(error => {});
        },
        getChapters(bookId, num) {
            let data = {
                label: "getChapters",
                id: bookId,
                chapterNum: num
            };
            post("reading", data)
                .then(response => {
                    let chapters = response.chapters;
                    this.setChapterPage(chapters, true);
                    this.$nextTick(() => {
                        let li = this.$refs.templateLi;
                        console.log(li);
                        for (let i = 0; i < li.length; i++) {
                            this.$turn.turn("addPage", $(li[i]));
                        }
                        this.allChapterPage.forEach(c => {
                            c.isTemplate = false;
                        });
                    });
                })
                .catch(error => {});
        },
        back() {
            this.addBookcaseInfo();
            this.$destroy();
        }
    }
};
</script>
<style lang="scss" scoped>
.reading {
    width: 100%;
    height: 100%;
    .flipbook {
        width: 100%;
        height: 100%;
        li {
            background-color: #ccc;
        }
    }
    .flipbook .turn-page {
        background-size: 100% 100%;
    }
}
</style>