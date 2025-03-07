<template>
  <div class="winner-box">
    <div class="winner">
      <div class="title base-border">LIVE WINNERS</div>

      <a-table
        :dataSource="winnerList"
        :columns="columns"
        :bordered="false"
        :pagination="false"
        :customRow="customCell"
        :customHeaderRow="customHeaderCell"
        :scroll="{ y: scrollYHeight }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'item'">
            <div class="d-flex align-items-center">
              <img :src="record.gachaCard?.image" width="40" alt="" />
              <div style="margin-left: 15px">
                <div class="item-desc d-md-block">
                  {{ record.gachaCard?.name }}
                </div>
                <div class="item-desc d-none d-md-block color-gray">
                  {{ record.rarity }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'rarityType'">
            <div class="align-items-center" style="text-align: center;">
              {{ record.rarity }}
            </div>
          </template>

          <template v-if="column.key === 'price'">
            <div class="align-items-center" style="text-align: center;">
              {{ cutApart(record.gachaCard?.usd) }} USDC
            </div>
          </template>

          <template v-if="column.key === 'winner'">
            <div class="d-flex align-items-center">
              <img
                v-if="record.playerAvatar == ''"
                :src="morAvantar"
                width="40"
                class="d-none d-md-block"
                style="border-radius: 50%; overflow: hidden; margin-right: 15px"
              />
              <img
                v-else
                :src="record.playerAvatar"
                width="40"
                height="40"
                style="border-radius: 50%; overflow: hidden; margin-right: 15px"
                class="d-none d-md-block"
              />
              <div>
                <div class="item-desc">
                  {{ record.playerName }}
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'time'">
            <div class="align-items-center" style="text-align: center;color: #8b94a3;">
              {{ formatTimestamp(record.createTime) }}
            </div>
          </template>
        </template>
      </a-table>

      <div v-if="showBottomBtn" class="right-btn">
        <div @click="goPage" class="round-btn">
          All items <img src="../assets/link.svg" alt="" />
        </div>
      </div>

      <div class="pagebox" v-if="!showBottomBtn">
        <div @click="prePage()">
          <svg
            t="1736405798737"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4367"
            id="mx_n_1736405798737"
            width="24"
            height="24"
          >
            <path
              d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
              fill="#ffffff"
              p-id="4368"
            ></path>
          </svg>
        </div>
        <div>{{ page }} / {{ total }}</div>
        <div @click="nextPage()">
          <svg
            t="1736405798737"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4367"
            id="mx_n_1736405798737"
            width="24"
            height="24"
          >
            <path
              d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
              fill="#ffffff"
              p-id="4368"
            ></path>
          </svg>
        </div>
        <div class="nextpage">
          <input type="text" v-model="page" @keydown.enter="goPageText" />
          <button @click="goPageText">GO</button>
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
import morAvantar from "@/assets/avatar.svg";

import item1 from "@/assets/item1.png";
import item2 from "@/assets/item2.png";
import item3 from "@/assets/item3.png";
import { cutApart } from "../utils/burn";

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
    align: 'center'
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    width: "18%",
    align: 'center'
  },
  {
    title: "OWNER",
    key: "winner",
    dataIndex: "winner",
    width: "19%",
    align: 'center'
  },
  {
    title: "TIME",
    key: "time",
    dataIndex: "time",
    width: "18%",
    align: 'center'
  },
]);

onMounted(() => {
  winnerInit();
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回值范围是 0 到 11，所以加 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const winnerList = ref([]);
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const winnerInit = async () => {
  const res = await axios.get("/tsg/publicinfo/allDrawCardHistory", {
    params: {
      pageNum: page.value,
      pageSize: pageSize.value,
    },
  });

  if (res.data.code == 200) {
    winnerList.value = res.data.data.data;
    total.value = Math.ceil(res.data.data.total / pageSize.value);
  }
};

const prePage = () => {
  if (page.value <= 1) {
    return;
  }
  page.value--;
  winnerInit();
};

const nextPage = () => {
  if (page.value >= total.value) {
    return;
  }
  page.value++;
  winnerInit();
};

const goPageText = () => {
  if (page.value > total.value || page.value < 1) {
    return page.value = 0
  }
  winnerInit();
};

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
          align: "center",
        },
        {
          title: "RARITY",
          dataIndex: "rarityType",
          key: "rarityType",
          width: "10%",
          align: "center",
        },
        {
          title: "PRICE",
          dataIndex: "price",
          key: "price",
          width: "13%",
          align: "center",
        },
        {
          title: "OWNER",
          key: "winner",
          dataIndex: "winner",
          width: "19%",
          align: "center",
        },
        {
          title: "TIME",
          key: "time",
          dataIndex: "time",
          width: "18%",
          align: "center",
        },
      ];
    } else {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
          align: "center",
          width:140
        },
        {
          title: "RARITY",
          dataIndex: "rarityType",
          key: "rarityType",
          align: "center",
        },

        {
          title: "OWNER",
          key: "winner",
          dataIndex: "winner",
          align: "center",
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
    // border: 1px solid #fff;
    border: 1px solid #3f3f3f;
    cursor: pointer;
  }
}

.pagebox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagebox > div {
  margin: 0px 10px;
}

.pagebox>div:nth-child(1) {
  cursor: pointer;
}

.pagebox > div:nth-child(1) svg {
  transform: rotateY(180deg);
}

.pagebox > div:nth-child(3) {
  cursor: pointer;
}

.pagebox > div:nth-child(1):hover svg,
.pagebox > div:nth-child(3):hover svg {
  fill: #ffff00;
}

.nextpage input {
  width: 40px;
  padding: 2px 5px;
  outline: none;
  text-align: center;
  color: #000;
}

.nextpage button {
  margin-left: 5px;
  color: #fff;
  padding: 2px 15px;
  border-radius: 24px;
  border: 1px solid #fff;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
}

.order-content-title {
  margin-bottom: 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  /* identical to box height, or 83% */
  text-align: center;

  color: #ffffff;
}

@media (max-width: 576px) {
  .winner {
    padding: 16px;
    .title {
      font-size: 24px;
      margin-bottom: 24px;
    }
    .right-btn {
      justify-content: center;
    }
  }
}
</style>
