<template>
  <div class="full">
    <div class="title base-border">Collection’s Full Item List</div>

    <div v-for="(item, index) in props.imgData" :key="index" class="type-item">
      <div class="title-box" v-if="item.cardList.length > 0">
        <img :src="item.typeImage" class="item-type__image" />
        <span :class="'color-' + index">{{ item.typeName }}</span>
      </div>
      <div class="card-list">
        <div v-for="(imgItem, imgIndex) in item.cardList" :key="imgIndex" class="p-1">
          <div class="img-box mb-3">
            <img :src="imgItem.image" class="card-list__img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

import card1 from "@/assets/game-card1-full.png";

const props = defineProps({
  imgData: Object,
});
</script>

<style lang="scss" scoped>
.full {
  padding: 40px;

  background-color: #1f0c27;
  border-radius: 32px;
  margin-top: 60px;
  text-align: center;
  padding: 20px 0;

  .title {
    // margin: 0 auto;
    margin-bottom: 40px;

    display: inline-block;

    font-weight: 600;
    font-size: 32px;
    line-height: 42px;

    color: #ffffff;
    // text-transform: uppercase;
  }

  .type-item {
    color: #fff;
    font-size: 24px;
    font-weight: 700;

    .title-box {
      margin: 24px;
    }

    .item-type__image {
      width: 120px;
    }

    .card-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      .img-box {
        border-radius: 16px;
        background: #36253d;
        padding: 16px;
        width: 186px;
      }

      .card-list__img {
        // width: 100%;
        width: 154px;
        height: 215px;
        object-fit: contain;
      }
    }
  }
}

.color-0 {
  color: #f9f2a1;
}

.color-1 {
  color: #fdf3ed;
}

.color-2 {
  color: #fe383b;
}

.color-3 {
  color: #fff011;
}

@media (max-width: 576px) {
  .full {
    .title {
      display: inline-block;
      font-weight: 600;
      font-size: 20px;
      color: #ffffff;
    }

    .type-item {
      .card-list {
        .img-box {
          width: 147px;
        }

        .card-list__img {
          // width: 100%;
          width: 115px;
          height: 160px;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
