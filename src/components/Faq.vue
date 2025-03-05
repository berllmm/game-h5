<template>
  <div class="faq-box">
    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <div class="faq d-none d-sm-block">
      <div class="title base-border">FAQ</div>

      <div
        v-for="(item, index) in listData"
        :key="item.id"
        class="item bo-bottom"
      >
        <div class="flex">
          <span>{{ item.questionValue }}</span>
          <img
            @click="handleChangeIndex(index)"
            v-show="currentIndex !== index"
            src="../assets/plus.svg"
            alt=""
          />
          <img
            @click="handleChangeIndex(index)"
            v-show="currentIndex === index"
            src="../assets/reduce.svg"
            alt=""
          />
        </div>

        <Transition name="fade">
          <div v-show="currentIndex === index" class="answer">
            {{ item.answerValue }}
          </div>
        </Transition>
      </div>
    </div>

    <!-- 在小屏幕（<576px）上显示 -->
    <div class="faq faq-small d-block d-sm-none">
      <div class="title base-border">FAQ</div>

      <div
        v-for="(item, index) in listData"
        :key="item.id"
        class="item bo-bottom"
      >
        <div class="flex">
          <span>{{ item.questionValue }}</span>
          <img
            @click="handleChangeIndex(index)"
            v-show="currentIndex !== index"
            src="../assets/plus.svg"
            alt=""
          />
          <img
            @click="handleChangeIndex(index)"
            v-show="currentIndex === index"
            src="../assets/reduce.svg"
            alt=""
          />
        </div>

        <Transition name="fade">
          <div v-show="currentIndex === index" class="answer">
            {{ item.answerValue }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const listData = ref([
  {
    id: 0,
    questionValue: "WHAT ARE CANDY POINTS?",
    answerValue: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
          elit, laoreet quis nisl non, commodo dignissim est. Aenean tempor
          scelerisque sem ac tincidunt. Quisque vel sem posuere, varius orci sit
          amet, finibus lacus. Suspendisse vitae libero vestibulum, fringilla
          leo sed, congue mauris. Cras tempor non orci in dignissim. Vivamus
          mollis metus tortor, sit amet mollis lacus ullamcorper at.
          Pellentesque et convallis ipsum. Pellentesque imperdiet diam quis
          sagittis placerat. Donec in laoreet velit. Interdum et malesuada fames
          ac ante ipsum primis in faucibus. Duis ligula lacus, efficitur non
          mattis pulvinar, semper nec lectus. Praesent quis euismod magna.
          Suspendisse eu nisi vitae ex tempus hendrerit. Nunc feugiat neque
          blandit lacus dignissim dictum. Nullam varius tincidunt ante. Vivamus
          elit orci, dapibus id dictum cursus, fermentum a felis.`,
  },
  {
    id: 1,
    questionValue: "CAN I SELL MY NFTS?",
    answerValue: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
          elit, laoreet quis nisl non, commodo dignissim est. Aenean tempor
          scelerisque sem ac tincidunt. `,
  },
  {
    id: 2,
    questionValue: "HOW DO I EXCHANGE NFTS FOR REAL WORLD ASSETS?",
    answerValue: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
          elit, laoreet quis nisl non, commodo dignissim est. Aenean tempor
          scelerisque sem ac tincidunt. Quisque vel sem posuere, varius orci sit
          amet, finibus lacus. Suspendisse vitae libero vestibulum, fringilla
          leo sed, congue mauris`,
  },
  {
    id: 3,
    questionValue: "HOW DO I CREATE A NEW COLLECTION?",
    answerValue: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
          elit, laoreet quis nisl non, commodo dignissim est. Aenean tempor
          scelerisque sem ac tincidunt. Quisque vel sem posuere, varius orci sit
          amet, finibus lacus. Suspendisse vitae libero vestibulum, fringilla
          leo sed, congue mauris`,
  },
]);

const currentIndex = ref(-1);

const handleChangeIndex = (index) => {
  if (currentIndex.value === index) {
    currentIndex.value = -1;
  } else {
    currentIndex.value = index;
  }
};
</script>

<style lang="scss" scoped>
.faq-box {
  margin: 60px 0 50px;
}
.faq {
  margin: 0;
  padding: 40px;
  //   height: 466px;
  background: rgba(45, 16, 57, 0.3);
  border: 1px solid #3f3f3f;
  border-radius: 32px;

  color: #fff;
  .title {
    display: inline-block;
    margin-bottom: 40px;
    font-size: 40px;
    font-weight: 600;

    // border-image: linear-gradient(to right, blue, red) 4;
    // border-width: 4px;
    // border-style: solid;
    // border-top: none;
    // border-left: none;
    // border-right: none;
  }

  .item {
    // margin-bottom: 16px;
    padding-bottom: 16px;
    padding-top: 16px;
    font-size: 24px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        cursor: pointer;
      }
    }
    .answer {
      margin-top: 16px;
      margin-left: 24px;
      font-family: "IBM Plex Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }
  }
  .bo-bottom {
    border-bottom: 1px solid rgba(63, 63, 63, 1);
  }
}

.faq-small {
  // margin: 0 32px;
  margin: 0;
  // padding: 40px;
  padding: 16px;
  //   height: 466px;
  background: rgba(45, 16, 57, 0.3);
  border: 1px solid #3f3f3f;
  border-radius: 32px;

  color: #fff;
  .title {
    display: inline-block;
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;

    border-image: linear-gradient(to right, blue, red) 4;
    border-width: 4px;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .item {
    // margin-bottom: 16px;
    padding-bottom: 16px;
    padding-top: 16px;
    font-size: 14px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        cursor: pointer;
      }
    }
    img {
      width: 24px;
      height: 24px;
    }
    .answer {
      margin-top: 8px;
      margin-left: 0;
      font-family: "IBM Plex Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
    }
  }
  .bo-bottom {
    border-bottom: 1px solid rgba(63, 63, 63, 1);
  }
  .icon {
    margin-left: 16px;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 576px) {
  .aq-box {
    margin: 32px 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
