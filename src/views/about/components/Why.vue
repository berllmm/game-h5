<template>
  <div class="why">
    <img src="../../../assets/why.png" alt="" />

    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <div class="d-none d-sm-block">
      <div class="flex-box">
        <div class="title">
          <div>Join Us in Shaping</div>
          <div>the Future of Gaming!</div>
        </div>
        <div class="desc">
          More than just a gaming platform; it’s an evolving ecosystem where
          players can explore, enjoy, and earn within the vibrant culture of
          Tokyo.
        </div>
      </div>
    </div>

    <!-- 在小屏幕（<576px）上显示 -->
    <div class="d-block d-sm-none">
      <div class="flex-box-small">
        <div class="title">
          <div>Join Us in Shaping</div>
          <div>the Future of Gaming!</div>
        </div>
        <div class="desc mt-12">
          More than just a gaming platform; it’s an evolving ecosystem where
          players can explore, enjoy, and earn within the vibrant culture of
          Tokyo.
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="row">
      <div
        class="card-item col-12"
        v-for="(item, index) in listData"
        :key="index"
      >
        <!-- 第一种形式展示 -->
        <div class="type1-box">
          <div class="left">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="right">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="desc">
              {{ item.descValue }}
            </div>
          </div>
        </div>
      </div>

      <div class="card-item col-12">
        <div class="type2-box">
          <img src="../../../assets/example1.png" alt="" />
          <img src="../../../assets/example2.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import icon1 from "@/assets/icon1.svg";
import icon2 from "@/assets/icon2.svg";
import icon3 from "@/assets/icon3.svg";

const listData = ref([
  {
    imgUrl: icon1,
    title: "Wbe3 Integration",
    descValue:
      "Our platform offers an exciting blend of casual gaming and blockchain rewards, ensuring that players have fun while earning real value.",
  },
  {
    imgUrl: icon2,
    title: "Cultural Connection",
    descValue:
      "TSG serves as a bridge between global audiences and the distinct cultural landscape of Tokyo while engaging players in globally recognized gaming.",
  },
  {
    imgUrl: icon3,
    title: "Community Driven",
    descValue:
      "TSG fosters a community-centric environment where players can engage, create, and shape their gaming experiences.",
  },
]);
</script>

<style lang="scss" scoped>
.why {
  padding: 0 32px;
  margin-top: 32px;
  // 大屏样式

  .flex-box {
    margin-top: 12px;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-weight: 600;
      font-size: 40px;
      line-height: 52px;
      color: #ffffff;
    }
    .desc {
      max-width: 50%;

      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      text-align: right;

      color: #f5f7fa;
    }
  }
}
// 小屏样式
.flex-box-small {
  margin-top: 12px;
  margin-bottom: 32px;

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;

    color: #ffffff;
  }
  .desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;

    color: #f5f7fa;
  }
}

.type1-box {
  margin-bottom: 16px;
  padding: 32px 24px;
  border-radius: 26px;

  background-image: linear-gradient(
    to right,
    rgba(30, 88, 252, 0.1) 0%,
    rgba(164, 39, 235, 0.1) 20%,
    rgba(217, 20, 228, 0.1) 40%,
    rgba(225, 15, 163, 0.1) 60%,
    rgba(241, 4, 25, 0.1) 100%
  );

  display: flex;
  justify-content: space-between;
  .left {
    margin-right: 24px;
  }
  .right {
    .title {
      display: inline-block;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;

      background: linear-gradient(
        to right,
        #1e58fc 0%,
        #a427eb 33.84%,
        #d914e4 50.67%,
        #e10fa3 74.1%,
        #f10419 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .desc {
      margin-top: 24px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;

      color: #f5f7fa;
    }
  }
}

.type2-box {
  margin-bottom: 16px;
  height: calc(100% - 16px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 49%;
    height: 100%;
  }
}

// 小屏样式重定义
@media (max-width: 576px) {
  .type1-box {
    .left {
      img {
        width: 60px;
        height: 60px;
      }
    }
    .right {
      .title {
        display: inline-block;
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;

        background: linear-gradient(
          to right,
          #1e58fc 0%,
          #a427eb 33.84%,
          #d914e4 50.67%,
          #e10fa3 74.1%,
          #f10419 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
      .desc {
        margin-top: 12px;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;

        color: #f5f7fa;
      }
    }
  }
}

@media (min-width: 576px) {
  .card-item {
    width: 49%;
  }
}

.mt-12 {
  margin-top: 12px;
}
</style>
