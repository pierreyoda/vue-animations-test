import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/lottie",
      name: "lottie",
      component: () => import(/* webpackChunkName: "lottie" */ "./views/Lottie.vue"),
    },
    {
      path: "/anime",
      name: "anime",
      component: () => import(/* webpackChunkName: "animejs" */ "./views/Anime.vue"),
    },
  ],
});
