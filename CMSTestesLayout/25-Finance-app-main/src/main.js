import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Lottie from "vue-lottie";
import VueTypedJs from "vue-typed-js";
import InfiniteSlideBar from "vue-infinite-slide-bar";
import checkView from "vue-check-view";
import VueScrollReveal from "vue-scroll-reveal";

Vue.use(checkView);
Vue.component("InfiniteSlideBar", InfiniteSlideBar);
Vue.use(VueTypedJs);
Vue.component("lottie", Lottie);
Vue.config.productionTip = false;
Vue.use(VueScrollReveal, {
  class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 600,
  scale: 1.2,
  distance: "5px",
  mobile: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
