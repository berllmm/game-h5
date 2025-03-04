<template>
  <div class="winner-box">
    <winners
      :tableList="tableList"
      :showBottomBtn="false"
      :scrollYHeight="600"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import winners from "@/components/winners.vue";

import item1 from "@/assets/item1.png";
import item2 from "@/assets/item2.png";
import item3 from "@/assets/item3.png";

const tableList = ref([
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item1,

    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item2,
    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item3,

    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item2,
    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item3,

    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
  {
    id: Math.random(),
    itemName: "2022 Panini NBA Hoops Jam-...",
    itemType: "GACHA",
    itemImg: item2,
    rarityType: "SSR",
    price: "300 USDC",
    winner: "Bob",
    time: "02/17/2025 09:19:29",
  },
]);
</script>

<style lang="scss" scoped>
:deep(.winner) {
  text-align: center;
}
:deep(.winner-small .table_body) {
  height: 100%;
}

@media (max-width: 576px) {
  :deep(.winner) {
    margin: 0 8px;
    padding: 16px;
  }
}
</style>
