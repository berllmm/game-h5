import VueCookie from "vue-cookie";
import { createRouter, createWebHistory } from "vue-router";
import { Loginbox } from "../utils/counter";

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
      path: "/stake",
      name: "stake",
      component: () => import("../views/stake/index.vue"),
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
      path: "/abount-us",
      name: "aboutUs",
      component: () => import("../views/aboutUs/index.vue"),
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
      path: "/market",
      name: "market",
      component: () => import("../views/marketplace/index.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/market-card",
      name: "marketcard",
      component: () => import("../views/marketplace/card.vue"),
      meta: {
        isLogin: true
      },
    },
    {
      path: "/market-details",
      name: "marketdetails",
      component: () => import("../views/marketplace/details.vue"),
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

// router.afterEach((to, from) => {
//   const token = VueCookie.get('token')

//   if (to.meta.isLogin) {
//     if (token) {
//       window.scrollTo(0, 0);
//     } else {
//       alert('PLEASE LOGIN')
//       return
//       // tipText.openSet('PLEASE LOGIN')
//     }
//   } else {
//     window.scrollTo(0, 0);
//   }
// });

router.beforeEach((to, from, next) => {
  const token = VueCookie.get('token')

  if (to.meta.isLogin) {
    if (token) {
      next()
      window.scrollTo(0, 0);
    } else {
      router.push({ path: '/' })
      Loginbox().changLogin()
      next(false)
    }
  } else {
    next()
    window.scrollTo(0, 0);
  }
})

export default router;
