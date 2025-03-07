<template>
  <div class="user-info-content">
    <BaseHeader title="My Account" />
    <UserInfo />
  </div>
</template>
<script setup>
import UserInfo from "@/components/UserInfo.vue";
import BaseHeader from "@/components/BaseHeader.vue";
</script>

<style lang="scss" scoped>
.user-info-content {
  margin-top: 60px;
  background-color: #1f0c27;
  border-radius: 32px;
  padding: 40px;
  position: relative;
  height: 100vh;
}

@media (max-width: 576px) {
  .user-info-content {
    margin-top: 0;
    border-radius: 0;
    padding: 0 0 32px;
  }
}
</style>
