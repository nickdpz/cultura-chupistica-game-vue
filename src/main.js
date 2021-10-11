import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { Plugin } from "vue-fragment";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vuesax/dist/vuesax.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@/assets/css/bootstrap.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: "#FDD402",
      success: "#0097d6",
      danger: "#EA5455",
      warning: "#FF9F43",
      dark: "#1E1E1E",
    },
  },
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Plugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
