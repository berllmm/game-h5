<template>
  <div class="candy-box">
    <div class="candy-box-header">
      <div class="candy-info">
        <div class="candy-info__title">Candy balance</div>
        <div class="candy-info__num">
          <img src="../assets/candy.svg" alt="" />
          <span>6868</span>
        </div>
        <img src="../assets/gold.svg" alt="" />
      </div>
    </div>
    <div class="candy-box-content">
      <div class="candy-info__title">Buy candies with USDC</div>
      <div class="candy-info__desc">
        Candies may be used to purchase tickets in the GACHA GAMES
      </div>
    </div>
    <div class="candy-list">
      <div
        v-for="(item, index) in candyNumList"
        :key="index"
        class="candy-list__item d-flex align-items-center justify-content-between"
      >
        <div class="left d-flex align-items-center">
          <img src="../assets/candy.svg" class="candy-icon" />
          <div>
            <div class="fs-24">{{ item.candyNum }}</div>
            <div class="fs-16">{{ item.candyPrice }} USDC</div>
          </div>
        </div>
        <div class="right">Buy</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const candyNumList = ref([
  {
    candyNum: "50,000",
    candyPrice: "50",
  },
  {
    candyNum: "100,000",
    candyPrice: "100",
  },
  {
    candyNum: "500,000",
    candyPrice: "500",
  },
  {
    candyNum: "1,000,000",
    candyPrice: "1,000",
  },
  {
    candyNum: "5,000,000",
    candyPrice: "5,000",
  },
  {
    candyNum: "10,000,000",
    candyPrice: "10,000",
  },
  {
    candyNum: "50,000,000",
    candyPrice: "50,000",
  },
]);
</script>

<style lang="scss">
.candy-box {
  text-align: center;
  color: #fff;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
  }
  .candy-box-header {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 166px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* 黑色，50%透明度 */
    }
    background: url("../assets/candy-bg.jpg") no-repeat 100% 100%;
    .candy-info {
      padding: 24px;
      position: relative;
      z-index: 99;
      &__title {
        font-size: 16px;
        font-weight: 400;
      }
      &__num {
        margin: 8px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        font-weight: 600;
        img {
          margin-right: 8px;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .candy-box-content {
    padding: 40px 24px 24px;
    border-bottom: 1px solid #3f3f3f;
    .candy-info__title {
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 600;
    }
    .candy-info__desc {
      font-size: 16px;
      font-weight: 400;
    }
  }
  .candy-list {
    margin-top: 24px;
    // height: 300px;
    max-height: 500px;
    overflow: auto;
    .candy-list__item {
      margin-top: 24px;
      color: #fff;
      .candy-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .fs-24 {
        font-size: 24px;
      }
      .fs-16 {
        font-size: 16px;
        color: #606060;
      }
      .right {
        font-size: 16px;
        font-weight: 600;
        padding: 10px 42.5px;
        border-radius: 48px;
        border: 1px solid #3f3f3f;
      }
    }
  }
}

@media (max-width: 576px) {
  .candy-box {
    .candy-list {
      text-align: left;
      .candy-list__item {
        margin-top: 8px;
        .fs-24 {
          font-size: 16px;
          line-height: 20px;
        }
        .fs-16 {
          font-size: 12px;
          line-height: 20px;
          color: #606060;
        }
      }
    }
  }
}
</style>
