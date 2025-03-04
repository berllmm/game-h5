<template>
  <div class="all">
    <div class="title base-border">ALL GAMES</div>
    <div class="game-list container">
      <div class="row">
        <div v-for="game in games" :key="game.id" class="col-12 col-sm-6 col-md-4 mb-4">
          <GameItem :game="game"> </GameItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import GameItem from "./components/GameItem.vue";
import axios from '@/utils/axios'

const games = ref([]);

onMounted(
  () => {
    getGamesInit()
  }
)

const getGamesInit = async () => {
  const res = await axios.get('/tsg/publicinfo/gachalist')


  if (res.data.code == 200) {
    games.value = res.data.data.allPoolList
  }
}
</script>

<style lang="scss" scoped>
.all {
  text-align: center;

  .title {
    margin: 60px 0;
    display: inline-block;
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 52px;

    color: #ffffff;
  }

  .game-list {
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .all {
    .title {
      margin: 16px 0;
    }
  }
}
</style>
