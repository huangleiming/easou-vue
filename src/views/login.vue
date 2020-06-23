<template>
    <div class="login">
        <div class="user">
            <label>
                账号
                <input type="text" name="userAccount" v-model="userAccount" placeholder="请输入账号" />
            </label>
        </div>
        <div class="password">
            <label>
                密码
                <input type="password" name="password" v-model="passWord" placeholder="请输入密码" />
            </label>
        </div>
        <div class="forget">忘记密码？</div>
        <div class="enter" @click="login">立即登录</div>
        <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="closeTip"></alert-tip>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import AlertTip from "../components/alertTip";

export default {
    data() {
        return {
            userAccount: null,
            passWord: null,
            showAlert: false,
            alertText: ""
        };
    },
    components: {
        AlertTip
    },
    methods: {
        ...mapMutations(["RECODE_USER_INFO"]),
        login() {
            if (!this.userAccount) {
                this.showAlert = true;
                this.alertText = "请输入账号";
                return;
            }
            if (!this.passWord) {
                this.showAlert = true;
                this.alertText = "请输入密码";
                return;
            }
            this.RECODE_USER_INFO({
                userAccount: this.userAccount,
                passWord: this.passWord
            });
            this.$router.go(-1);
        },
        closeTip() {
            this.showAlert = false;
            this.alertText = "";
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common";
.login {
    @extend .wall;
    text-align: center;
    padding: 25% 8% 20% 8%;
    .user {
        margin-top: 1rem;
        height: 2rem;
        width: 100%;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #52d682;
        label {
            color: #fff;
            font-weight: 200;
            width: 100%;
            text-align: left;
            display: block;
            letter-spacing: 0.3rem;
            input {
                height: 1rem;
                background-color: #35be64;
            }
        }
    }
    .password {
        @extend .user;
    }
    .forget {
        margin-top: 1rem;
        height: 2rem;
        letter-spacing: 5px;
        color: #68e995;
    }
    .enter {
        margin: 5rem auto;
        height: 3rem;
        width: 60%;
        max-width: 15rem;
        background-color: #ffffff;
        border-radius: 3rem;
        line-height: 3rem;
        color: #35be64;
    }
    .alert {
        color: red;
    }
}
</style>