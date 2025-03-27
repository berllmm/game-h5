<template>
  <!-- width (<768) -->
  <div class="base-title base-border d-block d-sm-none">
    <img v-if="showBackIcon" @click="goBack" src="../assets/arrow-left.svg" class="back-icon" />
    {{ title }}
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
defineProps({
  title: {
    type: String,
    default: "Account-Setting",
  },
  showBackIcon: {
    type: Boolean,
    default: true,
  },
});
const router = useRouter();
const route = useRoute()
const goBack = () => {
  if (route.path == '/user-info') {
    router.push({ path: '/' })
  } else {
    router.back();
  }

};
</script>

<style lang="scss" scoped>
.base-title {
  display: block;
  background: #36253d;
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  border: none;
  text-align: center;
}

@media (max-width: 576px) {
  .back-icon {
    display: inline-block;
    position: absolute;
    left: 16px;
    top: 16px;
  }
}
</style>
