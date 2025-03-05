<template>
  <div class="content">
    <!-- 区域1 -->
    <Main />

    <div class="border-2"></div>
    <!-- 区域2 -->
    <About />

    <!-- 区域3 -->
    <Portal />

    <!-- 区域4 -->
    <Why />

    <div class="border-2"></div>

    <!-- 区域5 -->
    <LearnMore />

    <div class="border-2"></div>
  </div>
</template>

<script setup>
import Main from "./components/Main.vue";
import About from "./components/About.vue";
import Portal from "./components/Portal.vue";
import Why from "./components/Why.vue";
import LearnMore from "./components/LearnMore.vue";
</script>

<style lang="scss" scoped>
.border-2 {
  margin: 60px 0;
  height: 2px;
  background-image: linear-gradient(
    to right,
    rgba(40, 34, 86, 0) 0%,
    rgba(40, 34, 86, 1) 50%,
    rgba(40, 34, 86, 0) 100%
  );
}
</style>
