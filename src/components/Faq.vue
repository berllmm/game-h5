<template>
  <div class="faq-box">
    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <div class="faq d-none d-sm-block">
      <div class="title base-border">FAQ</div>

      <div v-for="(item, index) in listData" :key="item.id" class="item bo-bottom">
        <div class="flex">
          <span>{{ item.questionValue }}</span>
          <img @click="handleChangeIndex(index)" v-show="currentIndex !== index" src="../assets/plus.svg" alt="" />
          <img @click="handleChangeIndex(index)" v-show="currentIndex === index" src="../assets/reduce.svg" alt="" />
        </div>

        <Transition name="fade">
          <div v-show="currentIndex === index" class="answer" v-html="item.answerValue">
          </div>
        </Transition>
      </div>
    </div>

    <!-- 在小屏幕（<576px）上显示 -->
    <div class="faq faq-small d-block d-sm-none">
      <div class="title base-border">FAQ</div>

      <div v-for="(item, index) in listData" :key="item.id" class="item bo-bottom">
        <div class="flex">
          <span>{{ item.questionValue }}</span>
          <img @click="handleChangeIndex(index)" v-show="currentIndex !== index" src="../assets/plus.svg" alt="" />
          <img @click="handleChangeIndex(index)" v-show="currentIndex === index" src="../assets/reduce.svg" alt="" />
        </div>

        <Transition name="fade">
          <div v-show="currentIndex === index" class="answer" v-html="item.answerValue">
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
    answerValue: `
      <p>CANDY Points are the in-game currency (non-token) used within Tokyo Stupid Games. Users can acquire CANDY Points by purchasing them or by completing missions through the reward program. CANDY Points can be exchanged for game tickets, which are used to play games.</p>
      <p>In the <span style="font-weight:bold;">GACHA game</span>, players can purchase tickets with CANDY Points, and use those tickets to spin the gacha and earn RWA NFTs. Additionally, the earned RWA NFTs can be burned, allowing players to convert them back into CANDY Points. This mechanism allows players to increase their points or acquire other valuable items based on their achievements and progress in the game.</p>
      <p>CANDY Points are valued at 0.001 USD per point, and offer a higher redemption rate compared to SOL or USDC, making it more advantageous for players to enjoy the game.</p>
      <p>In this way, CANDY Points serve as a vital currency for progressing through the game and are a means for players to acquire valuable items and rewards.</p>
    `,
  },
  {
    id: 1,
    questionValue: "What is the CANDY Points System?",
    answerValue: `
    <p>The CANDY Points System is a flexible and interactive feature that allows users to earn CANDY Points by completing in-game missions, participating in special tasks, and inviting friends.<p>
    <p>These points can be used to play various games, including online gachas.<p>
    <p>Designed for all types of players, from casual gamers to leaderboard contenders, this system ensures that everyone can enjoy and engage in their own way.<p>
    `,
  },
  {
    id: 2,
    questionValue: "How to Earn CANDY Points",
    answerValue: `
    <b>Daily Missions</b>
    <p>Earn CANDY Points through simple daily tasks such as logging in, completing mini-challenges, and engaging with the community.</p>
    <b>Supreme Missions</b>
    <p>For players seeking bigger rewards, Supreme Missions offer high-difficulty challenges with larger point payouts.</p>
    <b>Referral Program</b>
    <p>Invite your friends to join TSG and earn CANDY Points for both you and your referrals. The more friends you bring in, the more points you accumulate!</p>
    `,
  },
  {
    id: 3,
    questionValue: "How to Use CANDY Points",
    answerValue: `
    <b>Gacha</b>
    <p>Use your CANDY Points in TSG’s online gacha system!</p>
    <p>Try your luck to win luxurious prizes, including Real-World Assets (RWAs) with tangible value. With each roll, you have a chance to score rare and exciting items.</p>
    `,
  },
  {
    id: 4,
    questionValue: "Why the CANDY Points System Matters",
    answerValue: `
    <p>The introduction of the CANDY Points System is a significant step toward building a sustainable and value-driven ecosystem.</p>
    <p>By providing multiple earning opportunities, we enhance the gaming experience while giving players the freedom to shape their own journey.</p>
    <p>Additionally, there is potential for CANDY Points to be converted into TSG Tokens in the future, making this system even more valuable.</p>
    <p>Not only are you earning rewards today, but you could also be positioning yourself for long-term gains.</p>
    `,
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

<style>
p {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 5px;
  color: #ffffff;
}
</style>

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
