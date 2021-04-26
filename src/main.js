import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueSpinners } from '@saeris/vue-spinners'
import { BarLoader } from '@saeris/vue-spinners'
import VuexPersistence from 'vuex-persist'



Vue.use(VueSpinners)

Vue.config.productionTip = false;

new Vue({
  BarLoader,
  router,
  store,
 //
  render: h => h(App)
}).$mount("#app");
