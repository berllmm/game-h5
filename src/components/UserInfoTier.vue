<template>
  <div class="tier">
    <div class="desc">Your tier:</div>
    <div class="number-box">
      <img src="../assets/candy.svg" alt="" />
      <span class="value">{{ cutApart(props.userInfo.vipExp) }}</span>
    </div>

    <div class="tips-box">
      <div class="title1">Tier benefit description</div>
      <div class="title2">
        You need to accumulate {{ cutApart(nextPrize) }} more points to reach
        the next tier.
      </div>
      <div class="process">
        <div class="process-line"></div>
        <div
          class="process-bar"
          :style="{ width: props.userInfo.expChange }"
        ></div>
        <img src="../assets/candy1-bg.png" alt="" />
        <img src="../assets/candy2-bg.png" alt="" />
        <img src="../assets/candy3-bg.png" alt="" />
        <img src="../assets/candy4-bg.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { playerInfo } from "../utils/counter";
import { cutApart } from "../utils/burn";
import axios from "@/utils/axios";
import currency from "currency.js";

const props = defineProps({
  activeKey: String,
  userInfo: Object,
});

const nextPrize = ref(0);

const tierInit = async () => {
  console.log(props.userInfo);

  if (props.userInfo.vipExp < 3000000) {
    const numNow = currency(props.userInfo.vipExp).divide(3000000).value;
    props.userInfo.expChange = currency(33.33).multiply(numNow).value + "%";
    nextPrize.value = currency(3000000).subtract(props.userInfo.vipExp);
  } else if (
    props.userInfo.vipExp > 3000000 &&
    props.userInfo.vipExp < 15000000
  ) {
    const numNow = currency(props.userInfo.vipExp).divide(15000000).value;
    props.userInfo.expChange =
      currency(33.33).multiply(numNow).add(33.33).value + "%";
    nextPrize.value = currency(15000000).subtract(props.userInfo.vipExp);
  } else if (props.userInfo.vipExp >= 90000000) {
    props.userInfo.expChange = "100%";
    nextPrize.value = 0;
  } else {
    const numNow = currency(props.userInfo.vipExp).divide(90000000).value;
    props.userInfo.expChange =
      currency(33.33).multiply(numNow).add(66.66).value + "%";
    nextPrize.value = currency(90000000).subtract(props.userInfo.vipExp);
  }
};

watch(
  () => props.activeKey,
  (newVal, oldVal) => {
    console.log(newVal);
    if (newVal == "1") {
      tierInit();
    }
  }
);
</script>

<style lang="scss" scoped>
.tier {
  text-align: center;
  margin: 0 114px;

  .desc {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
  }

  .number-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    padding-bottom: 40px;
    border-bottom: 1px solid #3f3f3f;

    .value {
      margin-left: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      line-height: 100%;
      text-align: center;
      color: #ffffff;
    }
  }

  .tips-box {
    margin-top: 40px;

    .title1 {
      margin-bottom: 24px;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      /* identical to box height, or 83% */
      text-align: center;

      color: #ffffff;
    }

    .title2 {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 42px;

      /* White */
      color: #ffffff;
    }

    .process {
      position: relative;
      display: flex;
      justify-content: space-between;
      //
      width: 100%;

      img {
        z-index: 3;
        width: 20%;
      }

      &-line {
        position: absolute;
        left: 10%;
        top: 29.5%;
        background: #36253d;
        // background: red;
        border-radius: 8px;
        // height: 16px;
        height: 9%;
        width: 80%;
        z-index: 1;
      }

      &-bar {
        position: absolute;
        left: 10%;
        top: 29.5%;
        // background: red;
        background-image: linear-gradient(
          90deg,
          #1e58fc,
          #a427eb,
          #d914e4,
          #e10fa3,
          #f10419
        );
        // background: red;
        border-radius: 8px;
        // height: 16px;
        height: 9%;
        width: 15%;
        z-index: 2;
      }
    }
  }
}

@media (max-width: 738px) {
  .tier {
    margin: 0 16px;

    .number-box {
      padding-bottom: 20px;

      .value {
        font-size: 24px;
      }
    }

    .tips-box {
      margin-top: 20px;

      .title1 {
        font-size: 16px;
        margin-bottom: 12px;
      }

      .title2 {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
