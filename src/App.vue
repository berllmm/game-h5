<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import useWindow from "@/hooks/useWindow";

const route = useRoute();
const { windowWidth } = useWindow();

const hideHeader = computed(() => {
  // 不需要header和footer的页面列表
  const routerLIst = ["/missing", "/account-setting", "/result", "/user-info",'/sell'];
  return routerLIst.includes(route.path) && windowWidth.value < 576;
});
</script>

<template>
  <div class="main">
    <Header v-if="!hideHeader" />
    <div
      class="main-box container"
      :class="hideHeader ? 'special-container' : ''"
    >
      <router-view></router-view>
    </div>
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <Footer v-if="!hideHeader" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;

  background: #000000;

  background: url("./assets/bg.png") no-repeat 100% 100%;
  background-size: cover;
  min-height: 100vh;
  min-width: 100%;
  .main-box {
    flex: 1;
  }
}

.main-bg2 {
  background: url("./assets/play-bg.png") no-repeat center;
  background-size: cover;
}

@media (min-width: 1200px) {
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 1200px;
    padding: 0;
  }
}

@media (max-width: 576px) {
  .special-container {
    padding: 0;
  }
  .container {
    // padding: 0 24px;
  }
}
// special-container

// .main::before {
//   content: "";
//   position: absolute;
//   top: 76px;
//   right: 0;
//   // bottom: 90%;
//   bottom: 0;
//   left: 0;
//   background: linear-gradient(
//     30deg,
//     rgb(30, 88, 252) 0%,
//     #a427eb 35%,
//     #d914e4 50%,
//     #e10fa3 100%
//   );
//   opacity: 0.2; /* 只影响背景图像 */
// }
</style>
