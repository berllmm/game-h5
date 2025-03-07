<template>
  <!-- :row-selection="rowSelection" -->
  <div>
    <!-- <a-table :dataSource="dataSource" :columns="columns" :bordered="false" :pagination="false" :customRow="customCell"
      :customHeaderRow="customHeaderCell"> -->
    <a-table :dataSource="dataSource" :columns="columns" :bordered="false" :pagination="false" :customRow="customCell"
      :customHeaderRow="customHeaderCell" :scroll="{ x: 580, y: 400 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="d-flex align-items-center">
            <img :src="record.gachaCard?.image" alt="" width="60" style="margin-right: 15px;" />
            <span class="product-name" style="white-space:normal;"> {{ record.gachaCard?.name }}</span>
          </div>
        </template>
        <template v-if="column.key === 'rarity'">
          <div class="align-items-center" style="text-align: center;">
            <span class="item-desc d-md-block"> {{ record.gachaCard?.rarity }}</span>
          </div>
        </template>
        <template v-if="column.key === 'time'">
          <div class="align-items-center" style="text-align: center;">
            <span class="item-desc d-md-block"> {{ backTime(record.createTime) }}</span>
          </div>
        </template>
        <template v-if="column.key === 'type'">
          <div class="align-items-center" style="text-align: center;">
            <span class="item-desc d-md-block" v-if="record.historyType == 'burnSol' && record.state == 0">Buyback in
              progress</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'burnSol' && record.state == 1">Buyback
              done</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'burnCandy' && record.state == 0">Candy in
              progress</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'burnCandy' && record.state == 1">Candy
              exchange
              successful</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'shipping' && record.state == 0">Logistics in
              progress</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'shipping' && record.state == 1">Logistics
              done</span>

            <span class="item-desc d-md-block"
              v-if="record.historyType == 'shippingWallet' && record.state == 0">Minting</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'shippingWallet' && record.state == 1">Mint
              success</span>

            <span class="item-desc d-md-block" v-if="record.historyType == 'gacha'">Gacha</span>
          </div>
        </template>
      </template>
    </a-table>
    <div class="pagebox" v-if="isPage">
      <div @click="prePage()">
        <svg t="1736405798737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4367" id="mx_n_1736405798737" width="24" height="24">
          <path
            d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
            fill="#ffffff" p-id="4368"></path>
        </svg>
      </div>
      <div>{{ page }} / {{ size }}</div>
      <div @click="nextPage()">
        <svg t="1736405798737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4367" id="mx_n_1736405798737" width="24" height="24">
          <path
            d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
            fill="#ffffff" p-id="4368"></path>
        </svg>
      </div>
      <div class="nextpage">
        <input type="text" v-model="pageText" @keydown.enter="goPageText">
        <button @click="goPageText">GO</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { customHeaderCell, customCell } from "@/utils";
import axios from "@/utils/axios";
import { ref, watch } from "vue";
import useWindow from "@/hooks/useWindow";

const props = defineProps({
  activeKey: String
})

const dataList = ref([])
const page = ref(1)
const size = ref(0)
const pageNum = ref(10)
const pageText = ref(1)
const isPage = ref(false)

const activeInit = async () => {
  const res = await axios.get("/tsg/player/cardHistory");

  if (res.data.code == 200) {
    dataList.value = res.data.data.history

    if (dataList.value.length > 10) {
      isPage.value = true
    }

    pageText.value = page.value

    dataList.value = dataList.value.filter(item => item.historyType !== 'shipping')

    size.value = Math.ceil(dataList.value.length / pageNum.value)

    dataSource.value = dataList.value.slice((page.value - 1) * pageNum.value, (pageNum.value * page.value))
  }
}
const prePage = () => {
  if (page.value <= 1) {
    return
  }
  page.value--
  activeInit()
}

const backTime = (value) => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // 返回格式化后的字符串  
  return year + '-' + month + '-' + day;
}

const nextPage = () => {
  if (page.value >= size.value) {
    return
  }
  page.value++
  activeInit()
}

const goPageText = () => {
  if (pageText.value > size.value || pageText.value < 1) {
    return pageText.value = 0
  }
  page.value = pageText.value
  activeInit()
}

watch(
  () => props.activeKey,
  (newVal, oldVal) => {
    if (newVal == '3') {
      activeInit()
    }
  }
)

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: "45%",
    align: "center",
  },
  {
    title: "RARITY",
    dataIndex: "rarity",
    key: "rarity",
    align: "center",
  },
  {
    title: "TIME",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "TYPE",
    key: "type",
    dataIndex: "type",
    align: "center",
  },
];

const { isLargeWindow } = useWindow();

watch(
  isLargeWindow,
  (newVal) => {
    if (newVal) {
      columns.value = [
        {
          title: "NAME",
          dataIndex: "name",
          key: "name",
          width: "45%",
          align: "center",
        },
        {
          title: "RARITY",
          dataIndex: "rarity",
          key: "rarity",
          align: "center",
        },
        {
          title: "TIME",
          dataIndex: "time",
          key: "time",
          align: "center",
        },
        {
          title: "TYPE",
          key: "type",
          dataIndex: "type",
          align: "center",
        },
      ];
    } else {
      columns.value = [
        {
          title: "NAME",
          dataIndex: "name",
          key: "name",
          align: "center",
          width: 280,
        },
        {
          title: "RARITY",
          dataIndex: "rarity",
          key: "rarity",
          align: "center",
          width: 100
        },
        {
          title: "TIME",
          dataIndex: "time",
          key: "time",
          align: "center",
          width: 100
        },
        {
          title: "TYPE",
          key: "type",
          dataIndex: "type",
          align: "center",
          width: 120
        },
      ];
    }
  },
  {
    immediate: true,
  }
);

const dataSource = ref([])
</script>

<style lang="scss">
.ant-table-wrapper .ant-table-thead>tr>th {
  background: #1e1e1e;
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

.pagebox>div {
  margin: 0px 10px;
}

.pagebox>div:nth-child(1) {


  cursor: pointer;
}

.pagebox>div:nth-child(1) svg {
  transform: rotateY(180deg);
}

.pagebox>div:nth-child(3) {
  cursor: pointer;
}

.pagebox>div:nth-child(1):hover svg,
.pagebox>div:nth-child(3):hover svg {
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

@media (max-width: 738px) {}
</style>
