<template>
  <div class="row more">
    <div class="col-12 col-sm-3 col-md-3 title">Learn more</div>

    <div class="col-12 col-sm-9 col-md-9 flex-right">
      <div class="btn" @click="goPage('Rewards')">Rewards</div>

      <div class="btn" @click="goPage('map')">Road map</div>

      <div class="btn" @click="goPage('token')">Token</div>

      <div class="btn" @click="goPage('paper')">WhitePaper</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const goPage = (val) => {
  if (val == "Rewards") {
    router.push({ path: "/missing" })
  } else if (val == 'map') {
    window.open('https://docs.tokyostupidgames.io/', "_blank")
  } else if (val == 'token') {
    window.open('https://docs.tokyostupidgames.io/token/tokenomics', "_blank")
  } else if (val == 'paper') {
    window.open('https://docs.tokyostupidgames.io/', "_blank")
  }
}
</script>

<style lang="scss" scoped>
.more {
  margin-top: 60px;
  padding: 0 32px;

  .title {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 52px;

    color: #ffffff;
  }

  .btn {
    margin-right: 16px;
    margin-bottom: 12px;
    border: 1px solid #3f3f3f;
    border-radius: 65px;
    padding: 0 24px 24px;
    // display: flex;
    // align-items: center;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 56px;
    height: 56px;

    text-align: center;

    color: #ffffff;

    &::after {
      // margin-left: 8px;
      content: "";
      display: inline-block;
      width: 32px;
      height: 32px;
      background: url("../../../assets/link.png") no-repeat 100% 100%;
    }
  }
}

.flex-right {
  text-align: right;
}

// 小屏样式
@media (max-width: 576px) {
  .flex-right {
    text-align: left;
  }

  .more {
    .title {
      font-size: 24px;
      line-height: 32px;
    }

    .btn {
      margin-right: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      line-height: 50px;
      height: 50px;
      padding: 0 12px;
      background-color: rgba(45, 16, 57, 0.3);

      &::after {
        margin-left: 8px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
