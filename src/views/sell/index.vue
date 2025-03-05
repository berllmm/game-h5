<template>
  <div class="sell modal-border">
    <div class="title base-border">SELL/ EXCHANGE/ BURN NFT</div>
    <Sell />
  </div>
</template>
<script setup>
import Sell from "@/components/Sell.vue";
</script>

<style lang="scss" scoped>
.sell {
  margin: 60px 110px;
  color: #fff;
  text-align: center;
  .title {
    margin-bottom: 20px;
    display: inline-block;
    color: #fff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }
}
@media (max-width: 576px) {
  .sell {
    margin: 12px 24px;
    .title {
      font-size: 16px;
    }
  }
}
</style>
