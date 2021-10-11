import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Game from "../views/Game.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/game",
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
  routes,
});

export default router;
