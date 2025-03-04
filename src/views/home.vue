<template>
  <div class="content">
    <Banner />

    <GamesList />

    <Market />

    <div class="transparent-head">
      <Winners />
    </div>

    <Faq />
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import Faq from "@/components/Faq.vue";
import GamesList from "@/components/GamesList.vue";
import Market from "@/components/Market.vue";
import Winners from "@/components/Winners.vue";
</script>

<style lang="scss" scoped></style>
