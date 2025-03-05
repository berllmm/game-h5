<template>
  <div class="portal">
    <img src="../../../assets/portal.png" alt="" />
    <div class="title fs-1">A portal into a dynamic world!</div>

    <div class="row">
      <div
        class="card-item col-12"
        v-for="(item, index) in listData"
        :key="index"
      >
        <div class="info">
          <img src="../../../assets/circle.svg" alt="" />
          <span class="info-title">{{ item.title }}</span>
        </div>
        <div class="card-item__desc">{{ item.descValue }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const listData = ref([
  {
    title: "Wbe3 Integration",
    descValue:
      "Experience the cutting-edge of blockchain technology, ensuring ownership, authenticity, and transparency within the gaming ecosystem.",
  },
  {
    title: "Real World Asset (RWA) NFTs",
    descValue:
      "Engage with exclusive digital and physical rewards linked to authentic Tokyo brands and cultural experiences, enriching the gaming experience with real-world value.",
  },
  {
    title: "Casual Gaming",
    descValue:
      "Enjoy simple, accessible games that invite players from all walks of life to participate, regardless of their gaming experience.",
  },
  {
    title: "Cultural Engagement",
    descValue:
      "Immerse yourself in the iconic culture of Tokyo through partnerships with local brands and events, making each game a unique cultural experience.",
  },
]);
</script>

<style lang="scss" scoped>
.portal {
  padding: 0 32px;
  margin-top: 60px;
  .title {
    margin-top: 12px;
    margin-bottom: 60px;

    font-weight: 600;
    font-size: 40px;
    line-height: 52px;
    /* identical to box height, or 130% */

    color: #ffffff;
  }

  .card-item {
    padding: 32px 24px;
    margin-bottom: 16px;
    background: rgba(45, 16, 57, 0.3);
    border: 1px solid rgba(63, 63, 63, 1);
    border-radius: 26px;
    color: #fff;
    .info {
      display: flex;
      align-items: center;
    }
    .info-title {
      font-size: 24px;
      line-height: 32px;
      margin-left: 24px;
    }
    .card-item__desc {
      margin-top: 24px;
      font-size: 16px;
    }
  }
  .row {
    justify-content: space-between;
  }
}

@media (max-width: 576px) {
  .portal {
    .card-item {
      width: 100%;
      .info-title {
        font-size: 20px;
        margin-left: 16px;
      }
      .card-item__desc {
        margin-top: 16px;
        font-size: 14px;
      }
    }
  }
}
@media (min-width: 576px) {
  .card-item {
    width: 49%;
  }
}
</style>
