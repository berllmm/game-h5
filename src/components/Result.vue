<template>
  <div class="result">
    <div v-if="showTitle" class="title base-border">RESULTS</div>

    <div class="table-info">
      <div class="row">
        <div class="col-12" :class="showRightPanel ? 'col-sm-9 col-md-9' : 'col-sm-12 col-md-12'">
          <a-table :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }" :dataSource="userList" :columns="columns" :bordered="false" :pagination="false" :customRow="customCell"
            :customHeaderRow="customHeaderCell" :scroll="{ y: 400 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'item'">
                <div class="d-flex align-items-center">
                  <img :src="record.image" alt="" width="60" style="margin-right: 15px" />
                  <!-- d-none d-md-block -->
                  <span class="item-desc" style="text-align: left;">{{ record.name }}</span>
                </div>
              </template>
              <template v-if="column.key === 'rarity'">
                <div class=" align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">{{
                    record.rarity
                  }}</span>
                </div>
              </template>
              <template v-if="column.key === 'usdcPrice'">
                <div class=" align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">{{
                    cutApart(record.usd)
                  }}</span>
                </div>
              </template>
              <template v-if="column.key === 'candyPrice'">
                <div class=" align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">{{
                    cutApart(record.candy)
                  }}</span>
                </div>
              </template>
              <template v-if="column.key === 'quantity'">
                <div class=" align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">1</span>
                </div>
              </template>
            </template>
          </a-table>
        </div>

        <div v-show="showRightPanel" class="col-12 col-sm-3 col-md-3 border-1">
          <div class="select-box">
            <div class="select-title">
              <div class="left">SELECTED LIST</div>
              <div @click="handleClear" class="right">Clear all</div>
            </div>
            <div class="select-desc">
              Sell for SOL/ Exchanging for candies/ Burn and ship to your
              address
            </div>
          </div>

          <div class="item-list">
            <div v-for="item in state.selectedRows" :key="item.key" class="item-box">
              <div class="left">
                <img :src="item.image" class="img" width="60" />
                <div class="text-box">
                  <div class="item-name">{{ item.name }}</div>
                  <!-- <a-input-number v-model:value="item.quantity" :controls="false" :min="0">
                    <template #addonBefore>
                      <span class="p-2" @click="
                        item.quantity > 0
                          ? item.quantity--
                          : (item.quantity = 0)
                        ">-</span>
                    </template>
                    <template #addonAfter>
                      <span class="p-2" @click="item.quantity++">+</span>
                    </template>
                  </a-input-number> -->
                </div>
              </div>
              <div class="right">
                <img @click="handleDelete(item.key)" src="../assets/x.svg" alt="" />
              </div>
            </div>
          </div>

          <div @click="goSell" class="footer-btn">Continue</div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>
<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { customHeaderCell, customCell } from "@/utils";
import useWindow from "@/hooks/useWindow";
import { useSell } from "../utils/counter";
import { cutApart } from "../utils/burn";

const router = useRouter();

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  userList: Object,
});

const columns = ref([]);

const { isLargeWindow } = useWindow();

watch(
  isLargeWindow,
  (newVal) => {
    if (newVal) {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
          // ellipsis: true,
          width: "30%",
          align: "center",
        },
        {
          title: "RARITY",
          dataIndex: "rarity",
          key: "rarity",
          align: "center",
          // ellipsis: true,
          // width: 110,
        },
        {
          title: "USDC PRICE",
          dataIndex: "usdcPrice",
          key: "usdcPrice",
          align: "center",
          // width: 110,
        },
        {
          title: "CANDY PRICE",
          key: "candyPrice",
          dataIndex: "candyPrice",
          align: "center",
          // width: 130,
        },
        {
          title: "QUANTITY",
          key: "quantity",
          dataIndex: "quantity",
          align: "center",
          // width: 110,
        },
      ];
    } else {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
          width: 240,
          align: "center",
        },
        {
          title: "RARITY",
          dataIndex: "rarity",
          key: "rarity",
          align: "center",
          width: 120
        },

        {
          title: "QUANTITY",
          key: "quantity",
          dataIndex: "quantity",
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

const state = reactive({
  selectedRowKeys: [],
  selectedRows: [], // Check here to configure the default column
  loading: false,
});

const showRightPanel = computed(() => {
  return state.selectedRows.length > 0;
});
// 切换选中
const onSelectChange = (selectedRowKeys, selectedRows) => {
  state.selectedRowKeys = selectedRowKeys;
  state.selectedRows = JSON.parse(JSON.stringify(selectedRows));
};

const handleDelete = (key) => {
  state.selectedRows = state.selectedRows.filter((item) => {
    return item.key !== key;
  });
  state.selectedRowKeys = state.selectedRowKeys.filter((item) => {
    return item !== key;
  });
};

const handleClear = () => {
  state.selectedRows = [];
  state.selectedRowKeys = [];
};

// 售卖/交换 弹窗
const showSellModal = ref(false);
const handleShowSellModal = () => {
  showSellModal.value = true;
};
const goSell = () => {
  useSell().changeList(state.selectedRows);
  localStorage.setItem("sellList", JSON.stringify(state.selectedRows));
  router.push({
    name: "sell",
  });
};
</script>

<style lang="scss" scoped>
.result {
  text-align: center;

  .title {
    margin-bottom: 20px;
    display: inline-block;
    color: #fff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  .table-info {
    table {
      min-width: 400px;
    }

    // 右侧面板样式
    .select-box {
      .select-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
          color: #fff;
        }

        .right {
          font-size: 12px;
          color: #3052fa;
        }
      }

      .select-desc {
        text-align: left;
        padding: 8px 0 16px;
        font-size: 12px;
        color: #fff;
      }
    }

    .border-1 {
      border: 1px solid #3f3f3f;
      border-radius: 16px;
      padding: 16px;

      display: flex;
      flex-direction: column;
    }

    .item-list {
      flex: 1;
      max-height: 310px;
      overflow-x: hidden;
      //   overflow: auto;
    }

    .item-box {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-top: 1px solid #3f3f3f;

      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .img {
          margin-right: 6px;
        }

        .text-box {
          text-align: left;

          .item-name {
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            text-align: left;
            margin-bottom: 8px;
          }
        }
      }
    }

    .footer-btn {
      display: inline-block;
      border: 1px solid #3f3f3f;
      border-radius: 18px;
      padding: 0 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      line-height: 36px;
      cursor: pointer;
    }
  }
}

@media (max-width: 576px) {
  .result {
    // height: 80vh;
    overflow: auto;

    .select-box {
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss">
.ant-table-wrapper .ant-table-thead>tr>th {
  background: #1e1e1e !important;
  color: #fff;
  border-bottom: 1px solid #3f3f3f;
}

.ant-table-wrapper .ant-table-tbody>tr>td {
  background: #1f0c27 !important;
  color: #fff;
  border-bottom: 1px solid #3f3f3f;
}

.ant-input-number-input-wrap {
  background-color: #1f0c27;
}

.ant-input-number .ant-input-number-input {
  color: #fff;
  text-align: center;
}

.ant-input-number-group .ant-input-number-group-addon {
  color: #fff;
}

.ant-input-number-group-addon {
  padding: 0 !important;
}

.ant-input-number-group-addon:nth-of-type(1) {
  border-radius: 16px 0 0 16px !important;
}

.ant-input-number-group-addon:nth-of-type(3) {
  border-radius: 0 16px 16px 0 !important;
}

.ant-input-number .ant-input-number-input {
  width: 50px;
  margin-top: -3px;
}

.ant-input-number {
  box-sizing: border-box;
  //   height: 22px;
  //   line-height: 24px;
  //   border-left: none;
  //   border-right: none;
}

.ant-input-number-input-wrap {
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
}

.ant-input-number-input-wrap input {
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
}

@media (max-width: 576px) {
  .ant-table-wrapper table {
    min-width: 400px;
  }
}
</style>
