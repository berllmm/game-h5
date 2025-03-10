<template>
  <div class="market-box">
    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <!-- 向右切换按钮 -->
    <!-- <img @click="handleScroll" src="../assets/banner-right.svg" class="cursor right-icon d-none d-sm-block" /> -->
    <div class="market d-none d-sm-block">
      <div class="title base-border">Marketplace</div>

      <div class="item-box" ref="scrollContainer2">
        <div class="item me-4">
          <img src="../assets/market1.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
        </div>

        <div class="item me-4">
          <img src="../assets/market2.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
        </div>

        <div class="item me-4">
          <img src="../assets/market3.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>

        </div>

        <div class="item me-4">
          <img src="../assets/market4.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
        </div>

        <div class="item">
          <img src="../assets/market5.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
        </div>
      </div>

      <div class="right-btn">
        <div class="round-btn" @click="goPage">
          All items <img src="../assets/link.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- 在小屏幕（<576px）上显示 -->
    <div class="market market-small d-block d-sm-none">
      <div class="title base-border">MARKETPLACE</div>

      <div class="item-box">
        <div class="item me-4">
          <img src="../assets/market1.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
          <!-- <div class="market-price">200 USDC</div> -->
        </div>

        <div class="item me-4">
          <img src="../assets/market2.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
          <!-- <div class="market-price">200 USDC</div> -->
        </div>

        <div class="item me-4">
          <img src="../assets/market3.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>

          <!-- <div class="market-price">200 USDC</div> -->
        </div>

        <div class="item me-4">
          <img src="../assets/market4.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
          <!-- <div class="market-price">200 USDC</div> -->
        </div>

        <div class="item">
          <img src="../assets/market5.gif" alt="" />
          <span class="market-desc">2007 EX Power Keepers #1 Aggrpn -Holo(CGC 9)</span>
          <!-- <div class="market-price">200 USDC</div> -->
        </div>
      </div>

      <div class="right-btn">
        <div class="round-btn" @click="goPage">
          All items <img src="../assets/link.svg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <Modal v-model="marketBox" width="500px">
    <div class="results-box">
      <div>
        <div class="result-title">Coming Soon</div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
// const scrollContainer2 = ref();

// const handleScroll = () => {
//   scrollContainer2.value.scrollBy({
//     left: 200,
//     behavior: "smooth", // 平滑滚动
//   });
// };

const marketBox = ref(false)

const goPage = () => {
  marketBox.value = true
}
</script>

<style lang="scss" scoped>
.market-box {
  margin: 25px 0;
  position: relative;

  .right-icon {
    position: absolute;
    right: 18px;
    top: 230px;
    z-index: 9;
  }
}

.results-box {
  color: #fff;
  text-align: center;

  div {
    padding: 60px 0;
  }

  .result-title {
    font-size: 24px;
    font-weight: 600;
  }
}

.market {
  margin: 0;
  padding: 25px;
  //   height: 466px;
  background: rgba(45, 16, 57, 0.3);
  border: 1px solid #3f3f3f;
  border-radius: 32px;

  color: #fff;

  .title {
    display: inline-block;
    margin-bottom: 25px;
    font-size: 40px;
    font-weight: 600;
  }

  .item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
  }

  .item {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 16px;

    img {
      width: 100%;
      border-radius: 16px 16px 0 0;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(30deg,
          rgb(30, 88, 252) 0%,
          #a427eb 35%,
          #d914e4 50%,
          #e10fa3 100%);
      opacity: 0.1;
      /* 只影响背景图像 */
      border-radius: 16px;
    }

    .market-desc {
      padding: 16px;
      font-weight: 600;
      font-size: 14px;
    }

    .market-price {
      padding: 0 16px 16px;

      margin-top: 8px;

      color: #fcb455;
      font-size: 12px;
    }
  }

  .right-btn {
    padding-top: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .round-btn {
    font-size: 0.8rem;
    padding: 6px 10px;
    display: inline-block;
    border-radius: 20px;
    // border: 1px solid #fff;
    border: 1px solid #3f3f3f;
    cursor: pointer;
  }
}

.market-small {
  padding: 16px;

  .title {
    display: inline-block;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .item {
    margin-right: 15px !important;

    img {
      width: 120px;
    }

    .market-desc {
      font-size: 16px;
    }
  }

  .right-btn {
    padding-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .round-btn {
    font-size: 0.6rem;
    padding: 2px 6px;
    display: inline-block;
    border-radius: 20px;
    border: 1px solid #fff;
  }
}

@media (max-width: 576px) {
  .market-box {
    margin: 32px 0;
  }
}
</style>
