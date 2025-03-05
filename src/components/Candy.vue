<template>
  <div>
    <div class="candy-box">
      <div class="candy-box-header">
        <div class="candy-info">
          <div class="candy-info__title">Candy balance</div>
          <div class="candy-info__num">
            <img src="../assets/candy.svg" alt="" />
            <span>{{ cutApart(userInfo.candy) }}</span>
          </div>
          <img src="../assets/gold.svg" alt="" />
        </div>
      </div>
      <div class="candy-box-content">
        <div class="candy-info__title">Buy candies with USDC</div>
        <div class="candy-info__desc">
          Candies may be used to purchase tickets in the GACHA GAMES
        </div>
      </div>
      <div class="candy-list">
        <div v-for="(item, index) in candyNumList" :key="index"
          class="candy-list__item d-flex align-items-center justify-content-between">
          <div class="left d-flex align-items-center">
            <img src="../assets/candy.svg" class="candy-icon" />
            <div>
              <div class="fs-24">{{ item.candyNum }}</div>
              <div class="fs-16">{{ cutApart(item.candyPrice) }} USDC</div>
            </div>
          </div>
          <div class="right" @click="getOrder(item)">Buy</div>
        </div>
      </div>
    </div>

    <a-spin :spinning="spinning">
      <Modal v-model="showCandy" width="500px">
        <div class="wallet-box">
          <p class="wallet-title">BUY</p>
          <div class="wallet-tag wallet-candy">
            <span>{{ cutApart(candyType.candyNum) }}</span>
            <div>
              <img src="../assets/candy.svg" alt="" />
              <span>Candy</span>
            </div>
          </div>
          <div class="wallet-tag wallet-select">
            <span>{{ cutApartNumber(contactList.value) }}</span>
            <div>
              <div class="selected" @click="toggleDropdown">
                <div class="selected-img">
                  <i v-if="contactList.type == 'Sol'" class="solimg"></i>
                  <i v-if="contactList.type == 'USDC'" class="usdcimg"></i>
                  <i v-if="contactList.type == 'TSG'" class="tsgimg"></i>
                </div>
                <span>{{ contactList.type }}</span>
                <div :class="isDropdownOpen ? 'selected-tag active' : 'selected-tag'">
                  <svg t="1736418704184" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5394" width="22" height="22">
                    <path
                      d="M512 784c-8.5 0-16.6-3.4-22.6-9.4l-480-480c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L512 706.7l457.4-457.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-480 480c-6.1 6-14.2 9.4-22.7 9.4z"
                      fill="#ffffff" p-id="5395"></path>
                  </svg>
                </div>
              </div>
              <ul v-if="isDropdownOpen" class="dropdown-list">
                <li v-for="(country, index) in selectList" :key="index" @click="selectCountry(country)"
                  class="dropdown-item">
                  <div class="selected-img">
                    <i v-if="country.type == 'Sol'" class="solimg"></i>
                    <i v-if="country.type == 'USDC'" class="usdcimg"></i>
                    <i v-if="country.type == 'TSG'" class="tsgimg"></i>
                  </div>
                  <span>{{ country.type }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="wallet-tip error" v-if="!isUSDC">
            <p>You don't have enough USDC in your wallet, please top up.</p>
          </div>
          <div class="wallet-tip error" v-if="!isSolana">
            <p>You don't have enough Sol in your wallet, please top up.</p>
          </div>
          <div class="wallet-tip error" v-if="!isTSG">
            <p>You don't have enough TSG in your wallet, please top up.</p>
          </div>
          <div class="wallet-tipbox">
            <span class="wallet-tip" v-if="isTip == 1">You get {{ cutApart(candyType.candy) }} CANDY for
              {{ cutApartNumber(candyOrder.currencyNum) }} Sol</span>
            <span class="wallet-tip" v-if="isTip == 2">You get {{ cutApart(candyType.candy) }} CANDY for
              {{ cutApartNumber(candyOrder.currencyNum) }} USDC</span>
            <span class="wallet-tip" v-if="isTip == 3">You get {{ cutApart(candyType.candy) }} CANDY for
              {{ cutApartNumber(candyOrder.currencyNum) }} TSG</span>
          </div>
          <!-- <div class="wallet-updata">
          <p>Quote updates in {{ updataTime }}s</p>
        </div> -->
          <div class="wallet-buy">
            <button @click="walletConect">Continue</button>
          </div>
        </div>
      </Modal>
    </a-spin>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { playerInfo } from "../utils/counter";
import { cutApart, cutApartNumber } from "../utils/burn";
import Modal from "@/components/Modal.vue";
import axios from "@/utils/axios";

const candyNumList = ref([
  {
    candyNum: "50,000",
    candyPrice: 50,
  },
  {
    candyNum: "100,000",
    candyPrice: 100,
  },
  {
    candyNum: "500,000",
    candyPrice: 500,
  },
  {
    candyNum: "1,000,000",
    candyPrice: 1000,
  },
  {
    candyNum: "5,000,000",
    candyPrice: 5000,
  },
  {
    candyNum: "10,000,000",
    candyPrice: 10000,
  },
  {
    candyNum: "50,000,000",
    candyPrice: 50000,
  },
]);

const selectList = ref([
  {
    type: 'USDC',
  },
  {
    type: 'Sol'
  },
  {
    type: 'TSG'
  }
])

onMounted(() => {
  getPrizeInit()
})

const userInfo = ref({})
const showCandy = ref(false)
const candyType = ref({})
const contactList = ref({})
const isDropdownOpen = ref(false)
const candyOrder = ref({})
const spinning = ref(false)

const getPrizeInit = () => {
  userInfo.value = playerInfo().user
}

const getOrder = (item) => {
  showCandy.value = true
  candyType.value = item;
  contactList.value = {
    type: 'USDC',
    value: candyType.value.candyPrice
  }

  getUserPay()
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCountry = (country) => {
  isDropdownOpen.value = false;
  contactList.value.type = country.type

  getUserPay()
}

const getUserPay = async () => {
  spinning.value = true

  const res = await axios.post("/tsg/pay/reqWalletPayCreateOrder", {
    type: 1,
    baseCurrencyCode: "usd",
    baseCurrencyAmount: candyType.value.candyPrice,
    currencyCode: contactList.value.type.toLowerCase(),
  });
  console.log(res);
  if (res.data.code == 200) {
    candyOrder.value = res.data.data.order;
    contactList.value.value = candyOrder.value.currencyNum

    console.log(contactList.value);
    spinning.value = false
  }

}
</script>

<style lang="scss">
.candy-box {
  text-align: center;
  color: #fff;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
  }

  .candy-box-header {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 166px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      /* 黑色，50%透明度 */
    }

    background: url("../assets/candy-bg.jpg") no-repeat 100% 100%;

    .candy-info {
      padding: 24px;
      position: relative;
      z-index: 99;

      &__title {
        font-size: 16px;
        font-weight: 400;
      }

      &__num {
        margin: 8px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        font-weight: 600;

        img {
          margin-right: 8px;
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  .candy-box-content {
    padding: 40px 24px 24px;
    border-bottom: 1px solid #3f3f3f;

    .candy-info__title {
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 600;
    }

    .candy-info__desc {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .candy-list {
    margin-top: 24px;
    // height: 300px;
    max-height: 500px;
    overflow: auto;

    .candy-list__item {
      margin-top: 24px;
      color: #fff;

      .candy-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }

      .fs-24 {
        font-size: 24px;
      }

      .fs-16 {
        font-size: 16px;
        color: #606060;
      }

      .right {
        font-size: 16px;
        font-weight: 600;
        padding: 10px 42.5px;
        border-radius: 48px;
        border: 1px solid #3f3f3f;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 576px) {
  .candy-box {
    .candy-list {
      text-align: left;

      .candy-list__item {
        margin-top: 8px;

        .fs-24 {
          font-size: 16px;
          line-height: 20px;
        }

        .fs-16 {
          font-size: 12px;
          line-height: 20px;
          color: #606060;
        }
      }
    }
  }
}
</style>

<style scoped>
.wallet-title p {
  font-size: 16px;

  font-weight: bold;
  text-align: left;
  color: #c2c2bd;
}

.wallet-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 63px;
  border: 1px solid #323232;
  background-color: transparent;
  border-radius: 12px;
  margin-top: 25px;
  padding-left: 20px;
  box-sizing: border-box;
}

.wallet-tag>span {
  color: #fff;
  font-size: 20px;
  line-height: 63px;
  user-select: none;
}

.wallet-tag>div {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  width: auto;
  height: 100%;
}

.wallet-tag.wallet-select>div {
  width: 35%;
}

.wallet-tag>div>img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: contain;
}

.wallet-tip p {
  font-size: 14px;
  line-height: 1.4;
  padding-left: 5px;
}

.wallet-tip.error p {
  color: red;
}

.wallet-tag.wallet-candy {
  border: 0;
  background-color: transparent;
}

.wallet-candy>div>img {
  width: 41px;
  height: 41px;
  border-radius: 50%;
  object-fit: contain;

}

.wallet-tag>div>span {
  display: inline-block;
  width: 45px;
  font-size: 15px;
  color: #fff;
  text-align: left;
  margin-left: 5px;
}

.wallet-select {
  /* cursor: pointer; */
}

.wallet-select.active {
  border: 1px solid #ffff00;
}

.wallet-tipbox span.wallet-tip {
  font-size: 16px;
}

div.wallet-tipbox {
  margin-top: 25px;
  text-align: center;
}

.wallet-updata {
  margin-top: 25px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}

.wallet-buy {
  width: 100%;
  height: auto;
  margin-top: 45px;
  padding-bottom: 15px;
  /* border-bottom: 2px solid #252525; */
}

.wallet-buy button {
  width: 100%;
  height: 54px;
  background-color: #ffff00;
  color: #000;
  border-radius: 27px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  user-select: none;
}

.wallet-buy button:hover {
  background-color: #fff;
}

.wallet-tips {
  margin-top: 15px;
  text-align: center;
}

.wallet-tips img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.wallet-tips p {
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
}

.wallet-moon {
  width: 100%;
  height: auto;
  padding-top: 15px;
}

.wallet-moon>button {
  width: 100%;
  height: 54px;
  color: #141414;
  background-color: #ffff00;
  border: 1px solid #323232;
  border-radius: 27px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

.wallet-moon button:hover {
  background-color: #fff;
  color: #000;
}

.wallet-text {
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
}

.selected {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 15px 5px;
  background-color: transparent;
  border-radius: 8px;
  cursor: pointer;
}

.selected.error {
  border: 1px solid red;
}

.selected-img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}

.selected-img i {
  background-repeat: no-repeat;
  background-size: contain;
}

.selected-img i.solimg {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(../assets/solana.png);
}

.selected-img i.usdcimg {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(../assets/tips.png);
}

.selected-img i.tsgimg {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(../assets/tsg.jpg);
}

.table-item.selected-img i {
  --s: 1
}

.selected-tag {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.selected-tag.active {
  transform: rotateZ(180deg) translateY(50%);
}

.selected span {
  color: #fff;
  font-size: 16px;
}

.selected img {
  margin-right: 10px;
}

.dropdown-list {
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
  top: 100%;
  left: 0;
  padding: 0;
}

.dropdown-item {
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #000;
}

.dropdown-item span {
  margin-left: 10px;
  color: #000;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown-item img {
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  .buybox {
    display: block;
    overflow-x: hidden;
  }

  .buy {
    max-width: 100%;
    position: relative;
    top: 0;
    right: 0;
  }

  .wallet-box {
    top: 5%;
    transform: translateX(-50%);
  }

  .buy::before {
    left: 0;
  }

  .wallet-tag.wallet-select>div {
    width: 40%;
  }
}
</style>
