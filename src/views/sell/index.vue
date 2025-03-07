<template>
  <div class="sell modal-border">
    <BaseHeader title="Sell/Exchange/Burn NFT"/>
    <div class="d-none d-sm-block">
      <div class="title base-border">SELL/ EXCHANGE/ BURN NFT</div>
    </div>
    
    <Sell />
  </div>
</template>
<script setup>
import Sell from "@/components/Sell.vue";
import BaseHeader from "@/components/BaseHeader.vue";

</script>

<style lang="scss" scoped>
.sell {
  position: relative;
  // margin: 60px 110px;
  margin: 60px 0;
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
    // margin: 12px 24px;
    margin: 0;
    height: 100vh;
    overflow-y: auto;
    .title {
      font-size: 16px;
    }
  }
}
</style>
