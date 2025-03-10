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
    questionValue: "What is an RWA NFT?",
    answerValue: `
      <p>An RWA NFT (Real World Asset NFT) is an NFT linked to a physical item. In Tokyo Stupid Games, players can burn (destroy) their NFTs to obtain real-world items. Additionally, NFTs can be converted into CANDY points or exchanged for SOL to acquire rarer items.</p>
    `,
  },
  {
    id: 1,
    questionValue: "How to play Tokyo Stupid Games?",
    answerValue: `
    <p>To play Tokyo Stupid Games, follow these steps:<p>
    <p>1.<b>Purchase CANDY</b><p>
    <p style="margin-left:15px;">CANDY can be bought from the Tokyo Stupid Games website and used for gameplay (e.g., gacha).<p>
    <p>2.<b>Exchange CANDY for tickets</b><p>
    <p style="margin-left:15px;">Use CANDY to acquire tickets and play games (e.g., gacha).<p>
    <p style="margin-left:15px;">CANDY can also be earned through reward programs (by completing tasks or participating in campaigns).<p>
    <p>3.<b>Play the game (gacha, etc.)</b><p>
    <p style="margin-left:15px;">Choose the amount of CANDY to spend<p>
    <p style="margin-left:15px;">Press the "Play" button<p>
    <p style="margin-left:15px;"><b>Win an item!</b><p>
    <p style="margin-left:15px;">Acquired items are added to the inventory<p>
    <p style="margin-left:15px;">High-rarity NFTs can be exchanged for real-world items as RWA NFTs!<p>
    `,
  },
  {
    id: 2,
    questionValue: "What is the $TSG token?",
    answerValue: `
    <p>$TSG is the utility token within the Tokyo Stupid Games ecosystem. It is used for gameplay, marketplace transactions, purchasing exclusive items, participating in events, and maximizing value for players and collectors.</p>
    <p>Unlike ordinary in-game currency, $TSG aims to build a sustainable economic system utilizing Web3 principles.</p>
    <p>Use in GACHA – Spend $TSG to play gacha and win RWA NFTs or in-game items</p>
    <p>Marketplace – Trade NFTs and items with other users</p>
    <p>Exclusive perks & event participation – Access real-world events and special benefits</p>
    <p>Liquidity & exchangeability – Convert to CANDY points or SOL</p>
    <p>More details on the $TSG token:<a href="https://docs.tokyostupidgames.io/token" target="blank">https://docs.tokyostupidgames.io/token</p>
    `,
  },
  {
    id: 3,
    questionValue: "Can I withdraw my collected items?",
    answerValue: `
    <p>Yes! All items are securely stored and can be withdrawn anytime worldwide (except in restricted regions). Your inventory is viewable on the Tokyo Stupid Games website, and you can exchange NFTs for real-world items through the burn process.</p>
    <p></p>
    <p>Burn Process:</p>
    <p>1.Submit a burn request</p>
    <p>2.Enter shipping details</p>
    <p>3.Pay shipping fees</p>
    <p>4.Receive tracking information after shipment is processed</p>
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
  font-family: 'IBM Plex Sans';
}

b {
  font-family: 'IBM Plex Sans';
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
