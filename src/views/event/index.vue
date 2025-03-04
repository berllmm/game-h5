<template>
  <!-- todo 修改为弹窗展示 兼容h5样式 -->
  <div class="event">
    <div class="title base-border">EVENTS</div>

    <div class="content">
      <div class="left">
        <div
          class="item"
          :class="activeIndex === index ? 'active' : ''"
          v-for="(item, index) in 4"
          :key="index"
        >
          <span @click="handleSwitch(index)">EVENT #{{ index }} NAME</span>
        </div>
      </div>
      <div class="right">
        <img src="../../assets/banner_3.png" class="img" />
        <div class="right-title">EVENT NAME</div>
        <div class="tips">
          <div class="mr-32 flex-box">
            <span class="label">
              <img src="../../assets/event-clock.svg" class="icon" />
              <span>End in:</span>
            </span>
            <span class="value">5 days 8 hours</span>
          </div>
          <div class="flex-box">
            <span class="label">
              <img src="../../assets/event-gift.svg" class="icon" />
              <span>Reward:</span>
            </span>
            <span class="value">10,000 candies</span>
          </div>
        </div>

        <div class="text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const activeIndex = ref(0);
const handleSwitch = (index) => {
  activeIndex.value = index;
};
</script>

<style lang="scss" scoped>
.event {
  text-align: center;

  .title {
    display: inline-block;
    margin-bottom: 46px;

    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;

    color: #ffffff;
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 24px;
    color: #fff;
    .left {
      display: flex;
      flex-direction: column;
      .item {
        height: 68px;
        line-height: 68px;
        padding: 0 24px;
        border-radius: 24px 0 0 24px;
        font-size: 24px;
      }
      .active {
        background: #36253d;
      }
    }
    .right {
      text-align: left;
      flex: 1;
      //   padding: 24px;
      padding: 24px 80px;
      border-radius: 0 32px 32px 32px;
      background: #36253d;
      .img {
        width: 100%;
      }
      .right-title {
        margin: 24px 0;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 24px;
        /* identical to box height, or 100% */
        display: flex;
        align-items: center;
        letter-spacing: 0.8px;

        color: #ffffff;
      }
      .tips {
        display: flex;
        align-items: center;
        .label {
          //   display: inline-block;
          display: inline-flex;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          .icon {
            margin-right: 6px;
          }
        }
        .value {
          font-style: 16px;
        }
      }
      .flex-box {
        display: flex;
        align-items: center;
      }
      .mr-32 {
        margin-right: 32px;
        margin-top: 24px;
        margin-bottom: 24px;
      }
      .text {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        display: flex;
        align-items: center;
        letter-spacing: 0.8px;

        color: #ffffff;
      }
    }
  }
}
</style>
