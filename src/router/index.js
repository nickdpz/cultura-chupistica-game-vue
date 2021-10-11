import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Game from "../views/Game.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/cultura-chupistica/",
    name: "Login",
    component: Login,
  },
  {
    path: "/cultura-chupistica/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/not-found",
    name: "NotFount",
    component: NotFound,
  },
  {
    path: "*",
    redirect: "/not-found",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
