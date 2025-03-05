<template>
  <div class="content">
    <Banner />

    <GamesList />

    <Market />

    <div class="transparent-head">
      <Winners />
    </div>

    <Faq />

    <img
      v-if="showBackToTop"
      src="../assets/up.svg"
      class="up-icon"
      @click="scrollToTop"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Banner from "@/components/Banner.vue";
import Faq from "@/components/Faq.vue";
import GamesList from "@/components/GamesList.vue";
import Market from "@/components/Market.vue";
import Winners from "@/components/Winners.vue";

const showBackToTop = ref(false); // 控制按钮显示状态
// 监听滚动事件
const handleScroll = () => {
  // 判断是否超过屏幕高度的一半
  showBackToTop.value = window.scrollY > window.innerHeight / 2;
};

// 回到顶部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
};

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.content {
  overflow-y: auto;
}
.up-icon {
  position: fixed;
  bottom: 72px;
  right: 32px;
}
</style>
