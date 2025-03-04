import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },

    {
      path: "/about",
      name: "about",
      component: () => import("../views/about/index.vue"),
    },
    {
      path: "/all-games",
      name: "allGames",
      component: () => import("../views/allGames/index.vue"),
    },
    {
      path: "/game-detail",
      name: "gameDetail",
      component: () => import("../views/allGames/detail.vue"),
    },
    {
      path: "/live-winners",
      name: "liveWinners",
      component: () => import("../views/liveWinners/index.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("../views/play/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/result",
      name: "result",
      component: () => import("../views/results/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/sell",
      name: "sell",
      component: () => import("../views/sell/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/shipping",
      name: "shipping",
      component: () => import("../views/shipping/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/event",
      name: "event",
      component: () => import("../views/event/index.vue"),
    },
    {
      path: "/user-info",
      name: "userInfo",
      component: () => import("../views/userInfo/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/missing",
      name: "missing",
      component: () => import("../views/missing/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/account-setting",
      name: "accountSetting",
      component: () => import("../views/accountSetting/index.vue"),
      meta: {
        isLogin: true
      },
    },
  ],
});

router.afterEach((to, from) => {

  window.scrollTo(0, 0);
});

export default router;
