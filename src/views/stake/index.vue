<template>
  <div class="user-info-content">
    <div class="userInfo">
      <div class="header">
        <div class="header-left">
          <img :src="imageSrc" class="avatar" />
          <div class="detailInfo">
            <div class="name">{{ userInfo.playerName }}</div>
            <div class="id">UID:{{ userInfo.playerId }}</div>
          </div>
        </div>
        <div class="header-right">
        </div>
      </div>
      <div class="content">
        <!-- tabs标题 -->
        <div v-if="isTest" class="stake">
          <div @click="handleSwitch('1')" class="stake-item" :class="stakeKey === '1' ? 'active' : ''">
            Stake
          </div>
          <div @click="handleSwitch('2')" class="stake-item" :class="stakeKey === '2' ? 'active' : ''">
            History
          </div>
        </div>

        <div v-if="isTest" class="stakebox">
          <div class="stake-token" v-if="stakeKey == '1' && isPc">
            <div class="token-left">
              <div class="flex-lfet">
                <span>Stake your TSG token</span>
                <div class="tip-box">
                  <img src="../../assets/Group.svg" @click="openTip" alt="">
                  <div class="left-tip" v-if="isTip">
                    <p>-APR (25%)</p>
                    <p>-Staking 100,000 TSG tokens annually will earn a reward of 25,000 Candy.</p>
                    <p>-The minimum amount of TSG tokens required for staking is 1,500.</p>
                  </div>
                </div>
              </div>
              <div class="bottom-left">
                <p>* You have <span>{{ cutA.cutApart(usdcAccount) }}</span> TSG tokens available for staking.</p>
                <div class="left-btn">
                  <button @click="stakingToken">STAKE</button>
                  <button v-if="InfoList.stakingToken" @click="unstakingToken">UNSTAKE</button>
                </div>
              </div>
            </div>
            <div class="token-right">
              <div class="flex-right">
                <p>Your Candy balance: {{ cutA.cutApart(userInfo.candy) }}</p>
                <p>Yesterday's earnings: <span>+ {{ InfoList.yesterdayCandy }}</span></p>
              </div>
              <div class="bottom-right">Staked: <span>{{ cutA.cutApart(InfoList.stakingToken?.tokenNum) }} TSG</span>
              </div>
            </div>
          </div>
          <div class="stake-token" v-if="stakeKey == '1' && !isPc">
            <div class="token-flex">
              <div class="flex-lfet">Stake your TSG token <img @click="openTip" src="../../assets/Group.svg" alt="">
              </div>
              <div class="flex-right">
                <p>Your Candy balance: {{ cutA.cutApart(userInfo.candy) }}</p>
                <p>Yesterday's earnings: <span>+{{ InfoList.yesterdayCandy }}</span></p>
              </div>
            </div>
            <div class="token-bottom">

              <div class="bottom-right">Staked: <span>{{ cutA.cutApart(InfoList.stakingToken?.tokenNum) }} TSG</span>
              </div>
              <div class="bottom-left">
                <p>* You have <span>{{ cutA.cutApart(usdcAccount) }}</span> TSG tokens available for staking.</p>
                <div class="left-btn">
                  <button @click="stakingToken">STAKE</button>
                  <button v-if="InfoList.stakingToken" @click="unstakingToken">UNSTAKE</button>
                </div>
              </div>
            </div>
          </div>
          <div class="stake-table" v-if="stakeKey == '2'">
            <a-table :dataSource="dataSource" :columns="columns" :bordered="false" :pagination="false"
              :customRow="customCell" :customHeaderRow="customHeaderCell" :scroll="{ y: 1200 }">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                  <div class="align-items-center" style="text-align: center;">
                    <span class="item-desc d-md-block" v-if="record.type == 1"> Staked</span>
                    <span class="item-desc d-md-block" v-if="record.type == 2"> Unstaked</span>
                    <span class="item-desc d-md-block" v-if="record.type == 3"> Earing</span>
                  </div>
                </template>
                <template v-if="column.key === 'time'">
                  <div class="align-items-center" style="text-align: center;">
                    <span class="item-desc d-md-block"> {{ backTime(record.createTime) }}</span>
                  </div>
                </template>
                <template v-if="column.key === 'detail'">
                  <div class="align-items-center" style="text-align: center;">
                    <span class="item-desc d-md-block" v-if="record.type == 1" style="color:#00ff00;">+{{
                      record.tokenNum }} {{
                        record.tokenName }}</span>
                    <span class="item-desc d-md-block" v-if="record.type == 2" style="color:#F10419;">-{{
                      record.tokenNum }} {{
                        record.tokenName }}</span>
                    <span class="item-desc d-md-block" v-if="record.type == 3" style="color:#00ff00;">+ {{
                      record.candyNum
                    }} {{ record.tokenName
                      }}</span>
                  </div>
                </template>
              </template>
            </a-table>
            <div class="pagebox" v-if="isPage">
              <div @click="prePage()">
                <svg t="1736405798737" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4367" id="mx_n_1736405798737" width="24" height="24">
                  <path
                    d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
                    fill="#ffffff" p-id="4368"></path>
                </svg>
              </div>
              <div>{{ page }} / {{ size }}</div>
              <div @click="nextPage()">
                <svg t="1736405798737" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4367" id="mx_n_1736405798737" width="24" height="24">
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
        </div>

        <Modal v-model="errorTip" width="400px">
          <div class="results-box">
            <div>
              <img src="../../assets/tip_error.svg" class="result-img" />
              <div class="result-title">Error</div>
              <div class="result-tips">
                Your wallet does not have enough TSG tokens to meet the minimum staking requirement.
              </div>
            </div>
          </div>
        </Modal>

        <Modal v-model="stakeTip" width="720px">
          <div class="results-box">
            <div>
              <div class="result-input">
                <span>amount</span>
                <div>
                  <input type="text" v-model="stakePrize">
                  <img src="../../assets/changepen.svg" alt="">
                </div>
              </div>
              <div class="result-text" v-if="isStake">
                How many TSG tokens would you like to stake?
              </div>
              <div class="result-text" v-else>
                How many TSG tokens would you like to unstake?
              </div>
              <div class="result-press">
                <div v-if="isStake" class="press-active" :style="`width:${complatePrize(stakePrize)}%;`"></div>
                <div v-else class="press-active" :style="`width:${complateUnstake(stakePrize)}%;`"></div>
              </div>
              <div class="result-number">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <div class="footer-btn__modal footer-btn__modal2">
              <div @click="hanldeClose" class="btn2">Cancel</div>
              <div v-if="isStake" @click="hanldeGetStake" class="btn1">Continue</div>
              <div v-else @click="hanldeUnStake" class="btn1">Continue</div>
            </div>
          </div>
        </Modal>

        <Modal v-model="showSuccess" width="600px">
          <div class="results-box">
            <div>
              <img src="../../assets/result-success.svg" class="result-img" />
              <div class="result-tips">
                {{ successText }}
              </div>
              <div class="result-tips-tip" v-if="isUnstake">
                *Please wait a few seconds. The TSG tokens will be transferred to your wallet address.
              </div>
            </div>
          </div>
        </Modal>

        <Modal v-model="showTip" width="500px">
          <div class="results-box">
            <div>
              <img src="../../assets/tip_error.svg" class="result-img" />
              <div class="result-tips-tip">
                <p>-APR (25%)</p>
                <p>-Staking 100,000 TSG tokens annually will earn a reward of 25,000 Candy.</p>
                <p>-The minimum amount of TSG tokens required for staking is 1,500.</p>
              </div>
            </div>
          </div>
        </Modal>

        <Modal v-model="stakemintip" width="400px">
          <div class="results-box">
            <div>
              <img src="../../assets/tip_error.svg" class="result-img" />
              <div class="result-title">Error</div>
              <div class="result-tips">
                {{ minText }}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { playerInfo, useUmiWallet } from "@/utils/counter";
import * as cutA from "@/utils/burn";
import axios from "@/utils/axios";
import currency from "currency.js";
import Modal from "@/components/Modal.vue";
import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { transferTokens } from "@metaplex-foundation/mpl-toolbox";
import useWindow from "@/hooks/useWindow";
import { customHeaderCell, customCell } from "@/utils";
import { useChangePrize } from "../../utils/counter";
import morAvantar from "@/assets/avatar.svg"

const columns = ref([
  {
    title: 'TYPE',
    key: 'type',
    align: 'center',
  }, {
    title: 'TIME',
    key: 'time',
    align: 'center',
  }, {
    title: 'DETAIL',
    key: 'detail',
    align: 'center',
  }
])

const dataSource = ref([])

const isTest = ref(true)
const userInfo = ref({})
const errorTip = ref(false)
const stakeTip = ref(false)
const nextPrize = ref(0);
const stakeKey = ref('1')
const usdcAccount = ref(0)
const stakePrize = ref(0)
const orderList = ref({})
const InfoList = ref({})
const showSuccess = ref(false)
const isStake = ref(true)
const isPc = ref(true)
const isTip = ref(false)
const showTip = ref(false)
const stakemintip = ref(false)
const minText = ref('')
const successText = ref('')

const page = ref(1)
const size = ref(0)
const pageNum = ref(10)
const pageText = ref(1)
const isPage = ref(false)

onMounted(async () => {
  await tierInit()
});

const imageSrc = computed(() => {
  return userInfo.value?.avatarUrl || morAvantar;
});

const tierInit = async () => {
  const prizeRes = await axios.post("/tsg/player/playerInfo");
  if (prizeRes.data.code == 200) {
    userInfo.value = prizeRes.data.data;
    playerInfo().changeList(userInfo.value);
    if (useChangePrize().prize) {
      useChangePrize().changePrize();
    }
  }

  if (userInfo.value.vipExp < 3000000) {
    const numNow = currency(userInfo.value.vipExp).divide(3000000).value;
    userInfo.value.expChange = currency(33.33).multiply(numNow).value + "%";
    nextPrize.value = currency(3000000).subtract(userInfo.value.vipExp);
  } else if (
    userInfo.value.vipExp > 3000000 &&
    userInfo.value.vipExp < 15000000
  ) {
    const numNow = currency(userInfo.value.vipExp).divide(15000000).value;
    userInfo.value.expChange =
      currency(33.33).multiply(numNow).add(33.33).value + "%";
    nextPrize.value = currency(15000000).subtract(userInfo.value.vipExp);
  } else if (userInfo.value.vipExp >= 90000000) {
    userInfo.value.expChange = "100%";
    nextPrize.value = 0;
  } else {
    const numNow = currency(userInfo.value.vipExp).divide(90000000).value;
    userInfo.value.expChange =
      currency(33.33).multiply(numNow).add(66.66).value + "%";
    nextPrize.value = currency(90000000).subtract(userInfo.value.vipExp);
  }

  isPc.value = useWindow().isLargeWindow.value
  getUserToken()
};

const TSGMintAddress = new PublicKey(
  "HuWxLYJ3favQ6e3zK5559zk9Qd2T38gGHK5fS1Wcpump"
);
const toWallet = new PublicKey("86QWt6CRdUVNUgbzBnhES7C1PVFzkceodcYVryGWC7pY");

const getUserToken = async () => {
  const res = await axios.get('/tsg/player/stakingTokenInfo')
  if (res.data.code == 200) {
    InfoList.value = res.data.data
  }
  const connection = cutA.selectConnection(localStorage.getItem("local"));
  const publicKey = userInfo.value.walletAddress;
  const walletAddress = new PublicKey(publicKey);
  const usdcPrize = await connection.getParsedTokenAccountsByOwner(
    walletAddress,
    {
      mint: TSGMintAddress,
    }
  );

  if (usdcPrize.value.length > 0) {
    usdcAccount.value = usdcPrize.value[0].account.data.parsed.info.tokenAmount.uiAmount;
  } else {
    usdcAccount.value = 0
  }
}

const prePage = () => {
  if (page.value <= 1) {
    return
  }
  page.value--
  getHistory()
}

const nextPage = () => {
  if (page.value >= size.value) {
    return
  }
  page.value++
  getHistory()
}

const goPageText = () => {
  if (pageText.value > size.value || pageText.value < 1) {
    return pageText.value = 0
  }
  page.value = pageText.value
  getHistory()
}

const complatePrize = (val) => {
  const num = val / usdcAccount.value * 100
  return num
}

const complateUnstake = (val) => {
  const num = val / InfoList.value.stakingToken?.tokenNum * 100
  return num
}

const stakingToken = async () => {
  if (usdcAccount.value == 0) {
    errorTip.value = true
    return
  }
  isStake.value = true
  stakeTip.value = true
}

const hanldeGetStake = async () => {
  if (stakePrize.value < 1500) {
    minText.value = 'The minimum staking amount is 1500 TSG.'
    stakemintip.value = true
    return
  }

  if (stakePrize.value > usdcAccount.value) {
    minText.value = 'You don’t have enough TSG tokens to stake. Please double check the TSG token balance in your wallet.'
    stakemintip.value = true
    return
  }

  const res = await axios.post("/tsg/pay/reqWalletPayCreateOrder", {
    type: 3,
    baseCurrencyCode: "usd",
    baseCurrencyAmount: stakePrize.value,
    currencyCode: 'tsg',
    stakingDay: 1
  });
  if (res.data.code == 200) {
    orderList.value = res.data.data.order
    const typeCode = 'tsg'
    const transferLamports = orderList.value.currencyNum * 10 ** 6;
    if (localStorage.getItem('local') == 'Wallet') {
      const res = await axios.get("/tsg/pay/reqWalletPayWeb2", {
        params: {
          gameOrderId: orderList.value.gameOrderId,
          lamports: transferLamports,
          currencyCode: typeCode,
        },
      });
    } else {
      const fromAddress = new PublicKey(userInfo.value.walletAddress);
      const userMint = TSGMintAddress
      const umi = useUmiWallet().umi;
      const sourceTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        userMint,
        fromAddress
      );
      const destinationTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        userMint,
        toWallet
      );

      const tx = await transferTokens(umi, {
        source: sourceTokenAccount,
        destination: destinationTokenAccount,
        authority: fromAddress,
        amount: transferLamports,
      }).sendAndConfirm(umi);

      const res = await axios.get("/tsg/pay/reqWalletPay", {
        params: {
          gameOrderId: orderList.value.gameOrderId,
          transactionId: bs58.encode(tx.signature),
        },
      });
    }
    isStake.value = true
    successText.value = 'Staking successful'
    showSuccess.value = true
    stakeTip.value = false
    stakePrize.value = 0
    orderList.value = 0
    reqWallet()
  }
}

const hanldeClose = () => {
  isStake.value = true
  stakeTip.value = false
  isUnstake.value = false
  showSuccess.value = false
  orderList.value = {}
  stakePrize.value = 0
}

const unstakingToken = () => {
  if (InfoList.value.stakingToken?.tokenNum == 0) {
    minText.value = 'You don’t have enough TSG tokens to unstake. Please double check the TSG token balance in your wallet.'
    stakemintip.value = true
    return
  }
  isStake.value = false
  stakeTip.value = true
}

const isUnstake = ref(false)

const hanldeUnStake = async () => {
  if (stakePrize.value > InfoList.value.stakingToken?.tokenNum) {
    minText.value = 'Unstaking failed. You haven’t staked enough TSG. Please re-enter the amount.'
    stakemintip.value = true
    return
  }
  const res = await axios.post('/tsg/player/stakingTokenOver', {
    id: '',
    tokenNum: stakePrize.value
  })
  if (res.data.code == 200) {
    isStake.value = true
    successText.value = 'Unstake Successful'
    isUnstake.value = true
    showSuccess.value = true
    stakeTip.value = false
    stakePrize.value = 0
    reqToken()
  }
}

const isPay = ref(false);

const reqWallet = async () => {
  const res = await axios.get("/tsg/pay/reqWalletPayState");
  if (res.data.code == 200) {
    res.data.data ? (isPay.value = true) : (isPay.value = false);
    if (isPay.value) {
      await getUserToken();
    } else {
      setTimeout(() => {
        reqWallet();
      }, 3000);
    }
  }
};

const reqToken = async () => {

  const res = await axios.get("/tsg/player/stakingTokenOverState");
  if (res.data.code == 200) {
    res.data.data ? (isPay.value = true) : (isPay.value = false);

    if (isPay.value) {
      await getUserToken();
    } else {
      setTimeout(() => {
        reqWallet();
      }, 3000);
    }
  }
}

const openTip = () => {
  if (isPc.value) {
    isTip.value = !isTip.value
  } else {
    showTip.value = true
  }
}

const handleSwitch = (val) => {
  stakeKey.value = val
  if (val == 1) {
    getUserToken()
  } else {
    getHistory()
  }
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


// type 1 质押  2 解除质押 3 candy收益 
const getHistory = async () => {
  const res = await axios.get('/tsg/player/stakingTokenLog', {
    params: {
      pageNum: page.value,
      pageSize: pageNum.value
    }
  })
  if (res.data.code == 200) {
    dataSource.value = res.data.data.list

    if (res.data.data.total > 10) {
      isPage.value = true
    } else {
      isPage.value = false
    }
    pageText.value = page.value
    size.value = Math.ceil(res.data.data.total / pageNum.value)
  }
}



</script>

<style lang="scss" scoped>
.user-info-content {
  margin-top: 60px;
  background-color: #1f0c27;
  border-radius: 32px;
  padding: 40px;
  position: relative;
}

@media (max-width: 576px) {
  .user-info-content {
    margin-top: 0;
    border-radius: 0;
    padding: 0 0 32px;
  }
}

.userInfo {
  color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;

      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 24px;
      }

      .detailInfo {
        color: #fff;

        .name {
          margin-bottom: 16px;
          font-weight: 600;
          font-size: 24px;
          line-height: 20px;
        }

        .id {
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
        }
      }
    }

    .header-right {
      display: flex;
      justify-content: flex-end;

      .round-btn {
        display: flex;
        align-items: center;
        margin-right: 24px;
        border: 1px solid #3f3f3f;
        padding: 0 22px;
        border-radius: 32px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;

        .edit {
          margin-left: 24px;
          width: 24px;
          height: 24px;
        }
      }

      .share {
        cursor: pointer;
      }
    }
  }

}

@media (max-width: 738px) {
  .userInfo {
    .header {
      display: block;

      .header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        .avatar {
          width: 60px;
          height: 60px;
          margin-right: 0;
          margin-bottom: 24px;
        }

        .detailInfo {
          .name {
            font-size: 16px;
          }

          .id {
            font-size: 12px;
          }
        }
      }

      .header-right {
        margin-top: 32px;
        justify-content: center;

        .round-btn {
          margin-right: 12px;
          padding: 0 12px;
          height: 36px;
          line-height: 36px;
          font-size: 12px;

          .edit {
            margin-left: 12px;
            width: 12px;
            height: 12px;
          }
        }

        .share {
          width: 40px;

        }
      }
    }
  }
}

.stake {
  margin-top: 40px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #fff;

  &-item {
    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 36px;
    min-height: 60px;
    border-bottom: 1px solid #3f3f3f;
    cursor: pointer;
  }

  .active {
    font-weight: 600;
    border-image: linear-gradient(to right, blue, red) 4;
    border-width: 1px;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right: none;
  }
}

.stakebox {

  .stake-token {
    display: flex;
    width: 100%;
    height: 290px;
    // border: 1px solid #3f3f3f;
    border-radius: 32px;
    padding: 20px 36px;
    background-image: url(../../assets/wbsite_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .token-flex {
      display: flex;
      justify-content: space-between;

      .flex-lfet {
        position: relative;
        display: flex;
        align-items: center;

        span {
          font-size: 32px;
          font-weight: 600;
          color: #fff;
        }

        .tip-box {
          position: relative;
          width: 26px;
          height: 26px;
          margin-left: 15px;

          img {
            width: 26px;
            height: 26px;
            cursor: pointer;
          }

          .left-tip {
            position: absolute;
            width: 534px;
            height: 138.5px;
            bottom: 26px;
            left: 26px;
            background-image: url(../../assets/popup_tips.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 23px 16px 40px 15px;

            p {
              margin: 0;
              font-size: 15px;
              font-family: 'IBM Plex Sans Regular';
              line-height: 1.6;
            }
          }
        }


      }

      .flex-right {
        p {
          margin: 0;
          padding: 0;

          &:nth-child(1) {
            font-size: 32px;
            font-weight: 700;
            line-height: 42px;
            color: #fff;
            text-align: right;
          }

          &:nth-child(2) {
            font-size: 28px;
            font-weight: 700;
            line-height: 42px;
            color: #fff;
            text-align: right;

            span {
              font-size: 28px;
              font-weight: 700;
              color: rgba(0, 255, 0, 1);
            }
          }
        }
      }
    }

    .token-bottom {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .bottom-left {

        P {
          font-size: 20px;
          color: #fff;
          font-weight: 400;

          span {
            color: rgba(241, 4, 25, 1);
          }
        }

        .left-btn {
          margin-top: 20px;

          button {
            width: 271px;
            height: 48px;
            line-height: 48px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            border-radius: 126px;
            border: 1px solid #fff;
            background-color: transparent;
            cursor: pointer;
            border: 1px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);

            &:nth-child(2) {
              margin-left: 20px;
            }
          }
        }
      }

      .bottom-right {
        font-size: 48px;
        font-weight: 700;
        line-height: 42px;
        color: #fff;

        span {
          font-size: 48px;
          font-weight: 700;
          line-height: 42px;
          color: rgba(0, 255, 0, 1);
        }
      }
    }

    .token-left {
      width: 60%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-between;

      .flex-lfet {
        position: relative;
        display: flex;
        align-items: center;

        span {
          font-size: 32px;
          font-weight: 600;
          color: #fff;
        }

        .tip-box {
          position: relative;
          width: 26px;
          height: 26px;
          margin-left: 15px;

          img {
            width: 26px;
            height: 26px;
            cursor: pointer;
          }

          .left-tip {
            position: absolute;
            width: 534px;
            height: 138.5px;
            bottom: 26px;
            left: 26px;
            background-image: url(../../assets/popup_tips.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 23px 16px 40px 15px;

            p {
              margin: 0;
              font-size: 15px;
              font-family: 'IBM Plex Sans Regular';
              line-height: 1.6;
            }
          }
        }


      }

      .bottom-left {

        P {
          font-size: 20px;
          color: #fff;
          font-weight: 400;
          font-family: 'IBM Plex Sans Regular';

          span {
            color: rgba(241, 4, 25, 1);
          }
        }

        .left-btn {
          margin-top: 20px;

          button {
            width: 271px;
            height: 48px;
            line-height: 48px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            border-radius: 126px;
            border: 1px solid #fff;
            background-color: transparent;
            cursor: pointer;
            border: 1px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);

            &:nth-child(2) {
              margin-left: 20px;
            }
          }
        }
      }

    }

    .token-right {
      width: 40%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-between;

      .flex-right {
        p {
          margin: 0;
          padding: 0;

          &:nth-child(1) {
            font-size: 24px;
            font-weight: 700;
            line-height: 24px;
            color: #fff;
            text-align: left;
          }

          &:nth-child(2) {
            font-size: 20px;
            font-weight: 700;
            line-height: 40px;
            color: #fff;
            text-align: left;

            span {
              font-size: 20px;
              font-weight: 700;
              color: rgba(0, 255, 0, 1);
            }
          }
        }
      }

      .bottom-right {
        font-size: 48px;
        font-weight: 700;
        line-height: 42px;
        color: #fff;

        span {
          font-size: 48px;
          font-weight: 700;
          line-height: 42px;
          color: rgba(0, 255, 0, 1);
        }
      }
    }
  }
}

// 弹窗2 样式
.results-box {
  color: #fff;
  text-align: center;

  .result-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
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
    letter-spacing: 0.8px;
  }

  .result-tips-tip {
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.8px;
    text-align: left;
  }

  .blue-text {
    color: #3052fa;
    font-weight: 600;
  }

  .footer-btn__modal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 25px;

    .btn1 {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-left: 16px;
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
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      display: inline-block;
      border-radius: 48px;
      border: 1px solid #3f3f3f;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      cursor: pointer;
    }
  }

  .result-input {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: 500;
      color: rgba(140, 128, 145, 1);
    }

    div {
      position: relative;
      width: 200px;
      height: 48px;
      margin-left: 15px;
      border-radius: 126px;
      border: 1px solid rgba(63, 63, 63, 1);
      overflow: hidden;
      text-align: left;

      input {
        width: calc(100% - 39px);
        height: 100%;
        font-size: 32px;
        border-radius: 126px;
        background-color: transparent;
        color: #fff;
        border: 0;
        text-align: center;

        &:focus {
          outline: none;
        }
      }

      img {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }
    }
  }

  .result-text {
    margin-top: 50px;
    text-align: center;
    font-size: 24px;
    line-height: 20px;
    font-weight: 400;
    line-height: 1.6;
  }

  .result-press {
    position: relative;
    width: 100%;
    height: 16px;
    border-radius: 34px;
    margin-top: 35px;
    overflow: hidden;
    background: rgba(54, 37, 61, 1);

    .press-active {
      position: absolute;
      width: 0%;
      height: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 34px;
      background: linear-gradient(90deg, #1E58FC -3.41%, #A427EB 33.84%, #D914E4 50.67%, #E10FA3 74.1%, #F10419 104.15%);
    }
  }

  .result-number {
    margin-top: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
      color: #fff;
      font-weight: 400;
    }
  }
}

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


@media (max-width: 738px) {
  .tier {
    margin: 0 16px;

    .number-box {
      padding-bottom: 20px;

      .value {
        font-size: 24px;
      }
    }

    .tips-box {
      margin-top: 20px;

      .title1 {
        font-size: 16px;
        margin-bottom: 12px;
      }

      .title2 {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .stakebox {
    padding: 20px 24px;

    .stake-token {
      display: block;
      background-image: url(../../assets/sp_bg.png);
      padding: 0;
      width: 100%;
      height: auto;
      background-size: 100% 100%;
      padding: 19px 21px 29px;

      .token-flex {
        display: block;

        .flex-lfet {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          text-align: center;

          img {
            width: 16px;
            height: 16px;
            margin-left: 10px;
          }
        }

        .flex-right {
          margin-top: 20px;

          p:nth-child(1) {
            font-size: 24px;
            text-align: center;
          }

          p:nth-child(2) {
            font-size: 20px;
            text-align: center;

            span {
              font-size: 20px;
            }
          }
        }
      }

      .token-bottom {
        display: block;
        margin-top: 70px;

        .bottom-left {
          margin-top: 37px;

          p {
            font-size: 13px;
            text-align: center;
          }

          .left-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 25px;

            button {
              width: 126px;
              height: 36px;
              line-height: 36px;
              font-size: 14px;
            }
          }
        }

        .bottom-right {
          font-size: 32px;
          text-align: center;
          width: 100%;

          span {
            font-size: 32px;
          }
        }
      }
    }
  }
}
</style>