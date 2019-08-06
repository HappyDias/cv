import Vue from "vue";
import Sandbox from "./views/Sandbox.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store/";
import "./vuetify";
import vuetify from './plugins/vuetify';
//import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Sandbox)
}).$mount("#app");
