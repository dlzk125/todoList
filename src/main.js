import Vue from "vue";
import App from "./App.vue";
import memoPage from "./views/memoPage.vue";
import editMemo from "./views/editMemo.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: memoPage },
  { 
    path: "/edit",
    component: editMemo,
    children: [
      {
        path: ":id",
        name: "editMemo",
        component: editMemo
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
