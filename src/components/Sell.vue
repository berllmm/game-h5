<template>
  <a-table :dataSource="dataSource" :columns="columns" :bordered="false" :pagination="false" :customRow="customCell"
    :customHeaderRow="customHeaderCell" :scroll="{ y: 400 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'item'">
        <div class="d-flex align-items-center">
          <img :src="record.image" alt="" width="60" style="margin-right: 15px;" />
          <span class="item-desc d-md-block" style="text-align: left;">{{ record.name }}</span>
        </div>
      </template>
      <template v-if="column.key === 'usdcPrice'">
        <div class="align-items-center" style="text-align: center;">
          <span class="item-desc d-md-block">{{ cutApart(record.usd) }}</span>
        </div>
      </template>
      <template v-if="column.key === 'candyPrice'">
        <div class="align-items-center" style="text-align: center;">
          <span class="item-desc d-md-block">{{ cutApart(record.candy) }}</span>
        </div>
      </template>
      <template v-if="column.key === 'rarity'">
        <div class="align-items-center" style="text-align: center;">
          <span class="item-desc d-md-block">{{ record.rarity }}</span>
        </div>
      </template>
      <template v-if="column.key === 'quantity'">
        <div class="align-items-center" style="text-align: center;">
          <span class="item-desc d-md-block">1</span>
        </div>
      </template>

      <template v-if="column.key === 'action'" style="text-align: center;">
        <img class="closebtn" @click="closeItem(record.id)" src="../assets/delete.svg" alt="" />
      </template>
    </template>
  </a-table>

  <div class="total-count">
    <span style="margin-right: 70px;">TOTAL</span>
    <span class="d-flex align-items-center" style="margin-right: 56px;">
      <img src="../assets/count.svg" style="margin: 0 8px" />
      {{ cutApart(allUSDC) }}
    </span>
    <span class="d-flex align-items-center">
      <img src="../assets/candy.svg"  style="margin: 0 8px"/>
      {{ cutApart(allCandy) }}
    </span>
  </div>

  <div class="btn-groups">
    <div class="btn0">
      <div class="btn me-2" @click="exchangePrize('2')">SELL for USDC on SOLANA</div>
    </div>
    <div class="btn1">
      <div class="btn me-2" @click="tansformwallet">Transfer to your wallet</div>
      <div>Withdraw the NFTs</div>
    </div>
    <div class="btn2">
      <div class="btn me-2" @click="exchangePrize('1')">EXCHANGE for Candy</div>
      <div>Lost the NFTs</div>
    </div>
    <div class="btn3">
      <div @click="goPage" class="btn">SHIP to address</div>
      <div>Burn the NFTs</div>
    </div>
  </div>

  <Modal v-model="showModal" width="400px">
    <div class="results-box">
      <div>
        <div class="result-title">{{ tip }}</div>
        <img v-if="tipVisible" src="../assets/result-success.svg" class="result-img" />
        <img v-else src="../assets/result-err.svg" class="result-img" />
        <div class="result-tips">
          {{ tipText }}
        </div>
      </div>
      <div class="footer-btn__modal footer-btn__modal2">
        <div @click="closeModal" class="btn2">Cancel</div>
      </div>
    </div>
  </Modal>

  <Modal v-model="tipModal" width="600px">
    <div class="results-box">
      <div>
        <div class="result-title">{{ tipTitle }}</div>
        <div class="result-center">
          <img v-if="!tipType" src="../assets/candy.svg" width="32" alt="">
          <span>{{ cutApart(tipPrize) }}</span>
          <span v-if="tipType">USDC</span>
        </div>
        <div class="result-tips">{{ tipFoot }}</div>
      </div>
      <div class="footer-btn__modal footer-btn__modal2">
        <div @click="okTipModal" class="btn1">Confirm</div>
        <div @click="closeTipModal" class="btn2">Cancel</div>
      </div>
    </div>
  </Modal>

  <Modal v-model="agianModal" width="500px">
    <div class="results-box">
      <div>
        <div class="result-title">{{ tipTitle }}</div>
        <img src="../assets/result-err.svg" class="result-img change-tip" />
        <div class="result-center change-tip">
          <span class="change-tip">{{ agianText }}</span>
        </div>
      </div>
      <div class="footer-btn__modal footer-btn__modal2">
        <div @click="transferPrize" class="btn1">Continue</div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import useWindow from "@/hooks/useWindow";
import { useRouter } from "vue-router";
import { customHeaderCell, customCell } from "@/utils";
import axios from "@/utils/axios";
import { playerInfo, useChangePrize, useSell } from "../utils/counter";
import { cutApart, cutApartNumber } from "../utils/burn";
import Modal from "@/components/Modal.vue";

const allUSDC = ref(0)
const allCandy = ref(0)
const tip = ref('')
const showModal = ref(false)
const tipText = ref('')
const tipVisible = ref(false)
const tipModal = ref(false)

const closeModal = () => {
  showModal.value = false
  const resultList = JSON.parse(localStorage.getItem('redeem'))

  if (resultList.length == 0) {
    router.push({ path: '/user-info' })
  } else {
    router.push({ path: '/result' })
  }
}

onMounted(() => {
  sellInit()
})

const sellInit = async () => {
  allUSDC.value = 0
  allCandy.value = 0
  dataSource.value = JSON.parse(localStorage.getItem('sellList'))
  dataSource.value.forEach(item => {
    allUSDC.value += item.usd
    allCandy.value += item.candy
  })
}

const { isLargeWindow } = useWindow();
const dataSource = ref([]);

const columns = ref([
  {
    title: "ITEM",
    dataIndex: "item",
    key: "item",
  },

  {
    title: "USDC PRICE",
    dataIndex: "usdcPrice",
    key: "usdcPrice",
  },
  {
    title: "CANDY PRICE",
    key: "candyPrice",
    dataIndex: "candyPrice",
  },
  {
    title: "RARITY",
    dataIndex: "rarity",
    key: "rarity",
  },
  {
    title: "QUANTITY",
    key: "quantity",
    dataIndex: "quantity",
  },
  {
    title: "ACTION",
    key: "action",
    dataIndex: "action",
  },
]);

watch(
  isLargeWindow,
  (newVal) => {
    if (newVal) {
      columns.value = [
        {
          title: "ITEM",
          dataIndex: "item",
          key: "item",
          width: "30%",
          align: "center",
        },

        {
          title: "USDC PRICE",
          dataIndex: "usdcPrice",
          key: "usdcPrice",
          align: "center",
        },
        {
          title: "CANDY PRICE",
          key: "candyPrice",
          dataIndex: "candyPrice",
          align: "center",
        },
        {
          title: "RARITY",
          dataIndex: "rarity",
          key: "rarity",
          align: "center",
        },
        {
          title: "QUANTITY",
          key: "quantity",
          dataIndex: "quantity",
          align: "center",
        },
        {
          title: "ACTION",
          key: "action",
          dataIndex: "action",
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
          width: 240
        },

        {
          title: "QUANTITY",
          key: "quantity",
          dataIndex: "quantity",
          align: "center",
          width:120
        },
        {
          title: "ACTION",
          key: "action",
          dataIndex: "action",
          align: "center",
          width:120
        },
      ];
    }
  },
  {
    immediate: true,
  }
);

const router = useRouter();
const goPage = () => {
  router.push("shipping");
};

const tipTitle = ref('')
const tipFoot = ref('')
const tipPrize = ref('')
const tipType = ref(false)

const exchangePrize = (val) => {
  if (val == 1) {
    tipTitle.value = 'Are you sure you want to exchange?'
    tipFoot.value = 'TIPS: Please note, transaction results irreversible'
    tipPrize.value = allCandy.value + ''
    tipType.value = false
  } else {
    tipTitle.value = 'Are you sure you want to exchange?'
    tipFoot.value = 'TIPS: Please note, transaction results irreversible'
    tipPrize.value = allUSDC.value + ''
    tipType.value = true
  }

  tipModal.value = true
}

const closeTipModal = () => {
  tipModal.value = false
}

const agianModal = ref(false)
const agianText = ref('')

const okTipModal = () => {
  console.log(tipType.value);

  if (!tipType.value) {
    tipModal.value = false
    transferPrize()
  } else {
    const index = dataSource.value.findIndex(item => item.usd == 0)
    if (index !== -1) {
      tipTitle.value = 'Error'
      agianText.value = 'The NFTs you have selected include those that cannot be exchanged for USDC. If you continue the progress, the NFTs will be burned together, do you want to continue to send the exchange request?'
      tipModal.value = false
      agianModal.value = true
    } else {
      tipModal.value = false
      transferPrize()
    }
  }
}

const closeAgainModal = () => {
  agianModal.value = false
}

const transferPrize = () => {
  agianModal.value = false
  let exchangeList = []
  let val
  if (!tipType.value) {
    val = 1
  } else {
    val = 2
  }
  dataSource.value.forEach((item) =>
    exchangeList.push({
      type: val,
      chainType: 'sol',
      currencyType: 'USDC',
      transactionId: "",
      ratio: 0,
      id: item.id,
      gachaCardId: item.id,
      value: item.usd,
      candy: item.candy,
      targetWalletAddress: playerInfo().user?.walletAddress,
    }));

  goBurn(exchangeList)
  useChangePrize().changePrize()
  clearSell()
  showModal.value = true
  if(tipType.value){
    tipText.value = 'USDC transfer successful'
  }else {
    tipText.value = 'Candy transfer successful'
  }
  tipVisible.value = true
  tip.value = 'Success'
}

const goBurn = async (list) => {
  if (localStorage.getItem('local' == 'Wallet')) {
    const res = await axios.post('/tsg/player/burnCardWeb2', {
      refundList: list,
    })
  } else {
    const res = await axios.post("/tsg/player/burnCard", {
      refundList: list,
    });
  }
}

const tansformwallet = async () => {
  let exchangeList = []
  dataSource.value.forEach((item) =>
    exchangeList.push({
      type: 4,
      chainType: 'sol',
      currencyType: 'USDC',
      transactionId: "",
      ratio: 0,
      id: item.id,
      gachaCardId: item.id,
      value: item.usd,
      candy: item.candy,
      targetWalletAddress: playerInfo().user?.walletAddress,
    }));
  if (exchangeList.length == 0) {
    return
  }
  const res = await axios.post("/tsg/player/burnCard", {
    refundList: exchangeList,
  });
  if (res.data.code == 200) {
    clearSell()
    showModal.value = true
    tipText.value = 'The NFT is being transferred to your designated wallet. Please check your wallet. (The transfer speed will depend on the current Solana network speed. Please be patient.)'
    tipVisible.value = true
    tip.value = 'Success'
  }
}

const closeItem = (val) => {
  const index = dataSource.value.findIndex(item => item.id == val)
  dataSource.value.splice(index, 1)
  localStorage.setItem('sellList', JSON.stringify(dataSource.value))
  sellInit()
}

const clearSell = () => {
  const refList = JSON.parse(localStorage.getItem('redeem'))
  const newReflist = new Set(dataSource.value.map(item => item.id))
  const raming = refList.filter(item => !newReflist.has(item.id))
  localStorage.setItem('redeem', JSON.stringify(raming))
  localStorage.setItem('sellList', '')
}
</script>

<style lang="scss" scoped>
.total-count {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.btn-groups {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;

  .btn {
    width: 100%;
    margin-bottom: 8px;
    border: 1px solid #3f3f3f;
    border-radius: 48px;
    color: #fff;
    line-height: 48px;
    padding: 0 20px;
  }
}

.closebtn {
  cursor: pointer;
}

// 弹窗2 样式
.results-box {
  color: #fff;
  text-align: center;

  .result-title {
    font-size: 24px;
    font-weight: 600;
  }

  .result-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }

  .result-center.change-tip {
    padding-bottom: 20px;
  }

  .result-center span {
    font-size: 24px;
    font-weight: 700;
  }

  .result-center span.change-tip {
    text-align: center;
    font-size: 18px;
  }

  .result-center span:nth-child(2) {
    padding: 0 10px;
  }

  .result-img {
    margin: 40px 0;
    width: 120px;
    height: 120px;
  }

  .result-img.change-tip {
    margin-top: 40px;
    margin-bottom: 0px;
  }

  .result-tips {
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 400;
  }

  .blue-text {
    color: #3052fa;
    font-weight: 600;
  }

  .footer-btn__modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn1 {
      margin-right: 16px;
      padding: 12px 24px;
      font-weight: 600;
      color: #ffffff;
      font-size: 20px;
      display: inline-block;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 48px;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #1f0c27, #1f0c27),
        linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
    }

    .btn2 {
      padding: 12px 24px;
      font-size: 20px;
      display: inline-block;
      border-radius: 48px;
      border: 1px solid #3f3f3f;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      cursor: pointer;
    }
  }


}


@media (max-width: 576px) {
  .total-count {
    font-size: 14px;
  }

  .btn-groups {
    font-size: 12px;
    display: block;

    .btn1,
    .btn2,
    .btn3 {
      margin-bottom: 16px;
    }
  }
}
</style>
