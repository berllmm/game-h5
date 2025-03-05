<template>
  <div class="game-item">
    <img :src="game.imageUrlList[0]" class="game-img" />
    <div class="game-item-info">
      <div class="game-name">{{ game.name }}</div>
      <div class="game-desc">
        <div>
          <span>
            <img src="../../../assets/event-clock.svg" alt="" />
            <span class="fb"> Time left: </span>
            <span> {{ formatTimestamp(game.endTime) }} </span>
          </span>
        </div>
        <div>
          <span>
            <img src="../../../assets/event-candy.svg" alt="" />

            <span class="fb"> {{ game.candy }} </span>
            <span>/ticket </span>
          </span>
        </div>
      </div>
      <div @click="goPage(game.id)" class="btn base-round-border">Play</div>
    </div>
  </div>
</template>
<script setup>
import game1 from "@/assets/game1.gif";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  game: Object,
  default: () => {
    return {
      id: 1,
      gameName: "DRAGON BALL FIGURE COLLECTION",
      timeLeft: "x days x hours",
      ticketValue: 100,
      gameImageUrl: game1,
    };
  },
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回值范围是 0 到 11，所以加 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const goPage = (uid) => {
  router.push({
    name: "gameDetail",
    query: { id: uid },
  });
};
</script>

<style lang="scss" scoped>
.game-item {
  border-radius: 24px;
  padding: 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(30, 88, 252, 0.1) 0%,
    rgba(164, 39, 235, 0.1) 20%,
    rgba(217, 20, 228, 0.1) 40%,
    rgba(225, 15, 163, 0.1) 60%,
    rgba(241, 4, 25, 0.1) 100%
  );

  .game-img {
    width: 100%;
    border-radius: 12px;
  }

  &-info {
    text-align: left;
    color: #fff;

    .game-name {
      margin-top: 24px;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 31px;
      text-transform: uppercase;
      color: #ffffff;
      display: -webkit-box;
      /* 使用 Webkit box 模式来限制文本显示 */
      -webkit-box-orient: vertical;
      /* 设置文本排列方向为垂直 */
      -webkit-line-clamp: 2;
      /* 限制显示两行文本 */
      overflow: hidden;
      /* 隐藏超出内容 */
      text-overflow: ellipsis;
      /* 超出部分显示省略号 */
      width: 100%;
      /* 容器宽度，确保省略号效果正确 */
      height: 72px;
    }

    .game-desc {
      font-size: 16px;
    }

    .fb {
      font-weight: 600;
    }

    .btn {
      margin-top: 24px;
      width: 100%;
      line-height: 34px;
      box-sizing: border-box;
      background-image: linear-gradient(to right, #1f0c27, #1f0c27),
        linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
    }
  }
}

@media (max-width: 576px) {
  .game-item-info {
    .game-name {
      margin-top: 16px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      height: 36px;
      line-height: 18px;
    }
    .game-desc {
      font-size: 10px;
    }
  }
}
</style>
