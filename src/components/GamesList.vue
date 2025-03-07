<template>
  <div class="game-box">
    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <!-- 向右切换按钮 -->
    <img
      @click="handleScroll"
      src="../assets/banner-right.svg"
      class="cursor right-icon d-none d-sm-block"
    />
    <div class="game d-none d-sm-block">
      <div class="title base-border">GACHA GAMES</div>

      <div class="item-box" ref="scrollContainer">
        <div
          @click="goDetailPage(item.id)"
          :class="index == 2 ? 'item' : 'item me-4'"
          v-for="(item, index) in gameList"
          :key="index"
        >
          <img :src="item.imageUrlList[0]" alt="" />
          <span class="game-desc">{{ item.name }}</span>
        </div>
      </div>

      <div class="right-btn">
        <div class="round-btn" @click="goPage">
          All games <img src="../assets/link.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- 在小屏幕（<576px）上显示 -->
    <div class="game game-small d-block d-sm-none">
      <div class="title base-border">GACHA GAMES</div>

      <div class="item-box">
        <div
          @click="goDetailPage(item.id)"
          :class="index == 2 ? 'item' : 'item me-4'"
          v-for="(item, index) in gameList"
          :key="index"
        >
          <img :src="item.imageUrlList[0]" alt="" />
          <span class="game-desc">{{ item.name }}</span>
        </div>
      </div>

      <div class="right-btn">
        <div class="round-btn" @click="goPage">
          All games <img src="../assets/link.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/utils/axios";

const router = useRouter();
const goPage = () => {
  router.push({
    name: "allGames",
  });
};
const goDetailPage = (uid) => {
  router.push({
    name: "gameDetail",
    query: { id: uid },
  });
};

onMounted(() => {
  getGamesInit();
});

const gameList = ref([]);

const getGamesInit = async () => {
  const res = await axios.get("/tsg/publicinfo/gachalist");

  gameList.value = res.data.data.allPoolList.slice(0, 3);
};

const scrollContainer = ref();
const handleScroll = () => {
  scrollContainer.value.scrollBy({
    left: 200,
    behavior: "smooth", // 平滑滚动
  });
};
</script>

<style lang="scss" scoped>
.game-box {
  margin: 76px 0 60px;
  position: relative;
  .right-icon {
    position: absolute;
    right: 18px;
    // top: 230px;
    top: 290px;
    z-index: 9;
  }
}

.game {
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
    border-radius: 12px;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        30deg,
        rgb(30, 88, 252) 0%,
        #a427eb 35%,
        #d914e4 50%,
        #e10fa3 100%
      );
      opacity: 0.1;
      /* 只影响背景图像 */
    }

    img {
      // width: 357px;
      width: 100%;
      border-radius: 12px;
    }

    .game-desc {
      padding: 16px;
      font-weight: 600;
      font-size: 20px;
    }
  }

  .right-btn {
    padding-top: 40px;
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

.game-small {
  padding: 16px;
  .title {
    display: inline-block;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .item {
    img {
      width: 240px;
    }

    .game-desc {
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
  .game-box {
    margin: 48px 0 32px;
  }
}
</style>
