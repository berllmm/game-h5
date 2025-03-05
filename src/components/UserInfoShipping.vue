<template>
  <div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :bordered="false"
      :pagination="false"
      :customRow="customCell"
      :customHeaderRow="customHeaderCell"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'orderNo'">
          <span>{{ record.id }}</span>
        </template>

        <template v-if="column.key === 'information'">
          <div>
            <span> Name:{{ record.shippingAddress?.name }} </span>
            <span style="margin-left: 10px">
              Phone:{{ record.shippingAddress?.phone }}
            </span>
          </div>
          <div class="row">
            <div class="col-12 text-truncate">
              Address:{{ record.shippingAddress?.address }}
            </div>
          </div>
        </template>
        <template v-if="column.key === 'content'">
          <span
            @click="showDetail(record)"
            style="color: #3052fa; cursor: pointer"
            >Detail</span
          >
        </template>

        <template v-if="column.key === 'status'">
          <span v-if="record.historyType == 'shipping' && record.state == 0"
            >Logistics in progress</span
          >
          <span v-if="record.historyType == 'shipping' && record.state == 1"
            >Logistics done</span
          >
        </template>
      </template>
    </a-table>

    <div class="pagebox" v-if="isPage">
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
      <div>{{ page }} / {{ size }}</div>
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
        <input type="text" v-model="pageText" @keydown.enter="goPageText" />
        <button @click="goPageText">GO</button>
      </div>
    </div>

    <!-- 订单详情弹窗 -->
    <Modal v-model="showContentModal">
      <div class="order-content-title">Order No. {{ currentOrder.id }}</div>
      <a-table
        :dataSource="currentOrderList"
        :columns="columns2"
        :bordered="false"
        :pagination="false"
        :customRow="customCell"
        :customHeaderRow="customHeaderCell"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'item'">
            <img
              :src="record.image"
              alt=""
              width="60"
              style="margin-right: 15px"
            />
            <span class="item-desc">{{ record.name }}</span>
          </template>
          <template v-if="column.key === 'rarity'">
            <span class="item-desc">{{ record.rarity }}</span>
          </template>
          <template v-if="column.key === 'quantity'">
            <span class="item-desc">1</span>
          </template>
        </template>
      </a-table>
    </Modal>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import Modal from "@/components/Modal.vue";
import axios from "@/utils/axios";
import { customHeaderCell, customCell } from "@/utils";

const props = defineProps({
  activeKey: String,
});

const columns = [
  {
    title: "ORDER NO.",
    dataIndex: "orderNo",
    key: "orderNo",
    ellipsis: true,
    // width: "60%",
  },
  {
    title: "SHIPPING INFORMATION",
    dataIndex: "information",

    key: "information",
    width: "50%",
    ellipsis: true,
  },
  {
    title: "POSTAGE CONTENT",
    dataIndex: "content",
    key: "content",
    ellipsis: true,
    align: "center",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
    ellipsis: true,
    align: "center",
  },
];

const dataSource = ref([]);

const showContentModal = ref(false);
const currentOrder = ref([]);
const currentOrderList = ref([]);

const showDetail = (record) => {
  currentOrderList.value = [];
  currentOrder.value = record;
  console.log(record);

  currentOrderList.value.push(record.gachaCard);
  showContentModal.value = true;
};

const columns2 = [
  {
    title: "ITEM",
    dataIndex: "item",
    key: "item",
    ellipsis: true,
  },
  {
    title: "RARITY",
    dataIndex: "rarity",

    key: "rarity",
    ellipsis: true,
    width: 80,
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
    ellipsis: true,
    width: 120,
  },
];

const dataSource2 = ref([
  {
    key: "1",
    item: "2022 Panini NBA Hoops Jam-...",
    rarity: "SSR",
    quantity: 1,
  },
  {
    key: "2",
    item: "2022 Panini NBA Hoops Jam-...",
    rarity: "SSR",
    quantity: 1,
  },
  {
    key: "3",
    item: "2022 Panini NBA Hoops Jam-...",
    rarity: "SSR",
    quantity: 1,
  },
]);

const userTrueList = ref([]);
const isPage = ref(false);
const size = ref(0);
const page = ref(1);
const pageNum = ref(10);
const pageText = ref(10);

const shipingInit = async () => {
  const shipRes = await axios.get("/tsg/player/cardHistory");

  if (shipRes.data.code == 200) {
    userTrueList.value = shipRes.data.data.history.filter(
      (item) => item.historyType == "shipping"
    );

    if (userTrueList.value.length < 10) {
      isPage.value = false;
      dataSource.value = userTrueList.value;
    } else {
      isPage.value = true;
      pageText.value = page.value;
      size.value = Math.ceil(userTrueList.value.length / pageNum.value);
      dataSource.value = userTrueList.value.slice(
        (page.value - 1) * pageNum.value,
        pageNum.value * page.value
      );
    }
  }
};

function removeFalsePayFreight(arr) {
  return arr.filter((item) => item.payFreight !== false);
}

const prePage = () => {
  if (page.value <= 1) {
    return;
  }
  page.value--;
  shipingInit();
};

const nextPage = () => {
  if (page.value >= size.value) {
    return;
  }
  page.value++;
  shipingInit();
};

const goPageText = () => {
  if (pageText.value > size.value || pageText.value < 1) {
    return (pageText.value = 0);
  }
  page.value = pageText.value;
  shipingInit();
};

watch(
  () => props.activeKey,
  (newVal, oldVal) => {
    if (newVal == "4") {
      shipingInit();
    }
  }
);
</script>

<style lang="scss">
.ant-table-wrapper .ant-table-thead > tr > th {
  background: #1e1e1e !important;
  color: #fff;
  border-bottom: 1px solid #3f3f3f;
}

.ant-table-wrapper .ant-table-tbody > tr > td {
  background: #1f0c27 !important;
  color: #fff;
  border-bottom: 1px solid #3f3f3f;
}
</style>
<style lang="scss" scoped>
.pagebox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagebox > div {
  margin: 0px 10px;
}

.pagebox > div:nth-child(1) {
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
  padding: 2px 5px;
  border: 1px solid #fff;
  background-color: transparent;
  cursor: pointer;
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

@media (max-width: 738px) {
  .product-name {
    display: none;
  }

  .item-desc {
    display: none;
  }
}
</style>
