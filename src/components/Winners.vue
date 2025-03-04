<template>
  <div class="winner-box">
    <div class="winner">
      <div class="title base-border">LIVE WINNERS</div>

      <a-table :dataSource="winnerList" :columns="columns" :bordered="false" :pagination="false" :customRow="customCell"
        :customHeaderRow="customHeaderCell" :scroll="{ y: scrollYHeight }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'item'">
            <div class="d-flex align-items-center">
              <img :src="record.gachaCard?.image" width="40" alt="" />
              <div style="margin-left: 15px;">
                <div class="item-desc d-none d-md-block">
                  {{ record.gachaCard?.name }}
                </div>
                <div class="item-desc d-none d-md-block color-gray">
                  {{ record.rarity }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'rarityType'">
            <div class="d-flex align-items-center">
              <div>
                <div class="item-desc">
                  {{ record.rarity }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'price'">
            <div class="d-flex align-items-center">
              <div>
                <div class="item-desc">
                  {{ record.rarity }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'winner'">
            <div class="d-flex align-items-center">
              <img v-if="record.playerAvatar == ''" :src="morAvantar" width="40" class="d-none d-md-block"
                style="margin-right: 15px" />
              <img v-else :src="record.playerAvatar" width="40" class="d-none d-md-block" style="margin-right: 15px" />
              <div>
                <div class="item-desc">
                  {{ record.playerName }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'time'">
            <span class="time-color">{{ formatTimestamp(record.createTime) }}</span>
          </template>
        </template>
      </a-table>

      <div v-if="showBottomBtn" class="right-btn">
        <div @click="goPage" class="round-btn">
          See all <img src="../assets/link.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import useWindow from "@/hooks/useWindow";
import { customHeaderCell, customCell } from "@/utils";
import axios from "@/utils/axios";
import morAvantar from "@/assets/avatar.svg"

import item1 from "@/assets/item1.png";
import item2 from "@/assets/item2.png";
import item3 from "@/assets/item3.png";

const { isLargeWindow } = useWindow();
const columns = ref([
  {
    title: "ITEM",
    dataIndex: "item",
    key: "item",
    width: "42%",
  },
  {
    title: "RARITY",
    dataIndex: "rarityType",
    key: "rarityType",
    width: "10%",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    width: "10%",
  },
  {
    title: "WINNER",
    key: "winner",
    dataIndex: "winner",
    width: "19%",
  },
  {
    title: "TIME",
    key: "time",
    dataIndex: "time",
    width: "18%",
  },
]);

onMounted(() => {
  winnerInit()
})

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回值范围是 0 到 11，所以加 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const winnerList = ref([])

const winnerInit = async () => {
  const res = await axios.get('/tsg/publicinfo/allDrawCardHistory', {
    params: {
      pageNum: 1,
      pageSize: 10
    }
  })

  if (res.data.code == 200) {
    winnerList.value = res.data.data.data
  }
}

watch(
  isLargeWindow,
  (newVal) => {
    if (newVal) {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
          width: "42%",
        },
        {
          title: "RARITY",
          dataIndex: "rarityType",
          key: "rarityType",
          width: "10%",
        },
        {
          title: "PRICE",
          dataIndex: "price",
          key: "price",
          width: "10%",
        },
        {
          title: "WINNER",
          key: "winner",
          dataIndex: "winner",
          width: "19%",
        },
        {
          title: "TIME",
          key: "time",
          dataIndex: "time",
          width: "18%",
        },
      ];
    } else {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
        },
        {
          title: "RARITY",
          dataIndex: "rarityType",
          key: "rarityType",
        },

        {
          title: "WINNER",
          key: "winner",
          dataIndex: "winner",
        },
      ];
    }
  },
  {
    immediate: true,
  }
);

defineProps({
  tableList: {
    type: Array,
    default: () => {
      return [
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item1,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item2,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item3,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item1,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item1,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
        {
          id: Math.random(),
          itemName: "2022 Panini NBA Hoops Jam-...",
          itemType: "GACHA",
          itemImg: item1,
          rarityType: "SSR",
          price: "300 USDC",
          winner: "Suyanne",
          time: "02/17/2025 09:19:29",
        },
      ];
    },
  },
  showBottomBtn: {
    type: Boolean,
    default: true,
  },
  scrollYHeight: {
    type: Number,
    default: 400,
  },
});

const router = useRouter();
const goPage = () => {
  router.push({
    name: "liveWinners",
  });
};
</script>

<style lang="scss" scoped>
.winner-box {
  margin: 32px 0;
}

.color-gray {
  color: #cccccc;
}

.time-color {
  color: #8b94a3;
}

.winner {
  margin: 0;
  padding: 40px;
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

  //   表格样式
  thead {
    font-size: 16px;
    border-color: #000000;
    // background: #1e1e1e;
  }

  thead tr {
    height: 35px;
    font-size: 14px;
    text-align: center;
    line-height: 80px;
    border-color: #000000;
  }

  thead th {
    background: none;
    height: 35px;
    padding: 0;
  }

  tbody td {
    height: 80px;
    font-size: 14px;
    text-align: center;
    line-height: 80px;
    border-color: #000000;
    background: #1e1e1e;
  }

  .table_body {
    height: 550px;
    overflow: auto;
  }

  .flex-box {
    height: 80px;
    display: flex;
    align-items: center;
    line-height: 20px;
    text-align: left;

    img {
      margin-right: 16px;
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }

    .item-name {
      font-size: 14px;
      font-weight: 600;
    }

    .item-type {
      font-size: 12px;
      font-weight: 400;
      color: #cccccc;
    }

    .user-icon {
      width: 32px;
      height: 32px;
    }
  }

  .right-btn {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .round-btn {
    font-size: 0.8rem;
    padding: 6px 10px;
    display: inline-block;
    border-radius: 20px;
    border: 1px solid #fff;
    cursor: pointer;
  }
}

@media (max-width: 576px) {
  .winner {
    .title {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }
}
</style>
