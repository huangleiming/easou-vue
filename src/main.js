import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from "./store"

import "./assets/icon/iconfont.css";

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
});

new Vue({
  router,
  store
}).$mount('#app');
