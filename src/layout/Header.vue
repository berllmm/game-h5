<template>
  <div class="header">
    <!-- 左侧按钮 -->
    <div class="img-box w-172">
      <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
      <img @click="handleShowPanel" src="../assets/menu.svg" class="d-none d-sm-block" style="cursor: pointer;" alt=""
        ref="targetElement2" />
      <!-- 在小屏幕（<576px）上显示 -->
      <img @click="handleShowPanel" src="../assets/menu.svg" class="d-block d-sm-none" style="cursor: pointer;" alt=""
        data-bs-toggle="offcanvas" href="#offcanvasExample" ref="targetElement3" />

      <!-- 在中等屏幕（≥576px 且 <992px）上显示 面板信息-->
      <Transition class="d-none d-sm-block" name="fade">
        <div v-if="showPanel" class="panel" ref="targetElement">
          <!-- 用户信息 -->

          <login v-if="!isLogin" />

          <div v-else class="user-box">
            <img v-if="userList.avatarUrl == ''" src="../assets/avatar.svg" width="68" height="68"
              style="border-radius: 50%;" alt="" />
            <img v-else :src="userList.avatarUrl" alt="" width="68" height="68" style="border-radius: 50%;" />
            <div>
              <div class="userName">{{ userList.playerName }}</div>
              <div class="userId">UID:{{ userList.playerId }}</div>
            </div>
          </div>

          <div class="menu-box">
            <div @click="goPage('allGames')" class="menu-item border-bo">
              GACHA GAMES
            </div>
            <div @click="goPage('market')" class="menu-item border-bo">
              MARKETPLACE
            </div>
            <div @click="goPage('liveWinners')" class="menu-item border-bo">
              LIVE WINNERS HISTORY
            </div>
            <div @click="goPage('faq')" class="menu-item">FAQ</div>
          </div>
          <div class="desc d-flex align-items-center">
            <div @click="goPage('about')" class="d-flex align-items-center" style="margin-right: 24px;cursor: pointer;">
              <img src="../assets/u-aboutUs.svg" style="margin-right: 4px" />
              <span>ABOUT US</span>
            </div>
            <div @click="goPage('aboutUs')" class="d-flex align-items-center" style="cursor: pointer;">
              <img src="../assets/u-contactUs.svg" style="margin-right: 4px" />
              <span>CONTACT US</span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- 在小屏幕（<576px）上显示 面板信息-->
      <div class="offcanvas offcanvas-start d-block d-sm-none left-panel w-100" tabindex="-1" id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header flex-center">
          <img @click="showPanel = false" src="../assets/close.svg" data-bs-dismiss="offcanvas" aria-label="Close" />

          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            TOKYO STUPID GAMES
          </h5>
          <div></div>
        </div>
        <div class="offcanvas-body">
          <div v-if="showPanel" class="panel-small">
            <!-- 用户信息 -->

            <div v-if="!isLogin" ref="loginElement">
              <login />
            </div>

            <div v-else class="user-box">
              <img v-if="userList.avatarUrl == ''" width="60" height="60" style="border-radius: 50%;"
                src="../assets/avatar.svg" alt="" />
              <img v-else :src="userList.avatarUrl" width="60" height="60" style="border-radius: 50%;" alt="" />
              <div>
                <div class="userName">{{ userList.playerName }}</div>
                <div class="userId">UID:{{ userList.playerId }}</div>
              </div>
            </div>

            <div class="menu-box" data-bs-toggle="offcanvas" href="#offcanvasExample">
              <div @click="goPage('allGames')" class="menu-item border-bo">
                GACHA GAMES
              </div>
              <div @click="goPage('market')" class="menu-item border-bo">
                MARKETPLACE
              </div>
              <div @click="goPage('liveWinners')" class="menu-item border-bo">
                LIVE WINNERS HISTORY
              </div>
              <div @click="goPage('faq')" class="menu-item">FAQ</div>
            </div>
            <!-- <div
              @click="goPage('about')"
              class="desc"
              
            >
              ABOUT US
            </div> -->
            <div class="desc d-flex align-items-center">
              <div @click="goPage('about')" class="d-flex align-items-center"
                style="margin-right: 24px;cursor: pointer;" data-bs-dismiss="offcanvas" aria-label="Close">
                <img src="../assets/u-aboutUs.svg" style="margin-right: 4px" />
                <span>ABOUT US</span>
              </div>
              <div @click="goPage('aboutUs')" class="d-flex align-items-center" style="cursor: pointer;">
                <img src="../assets/u-contactUs.svg" style="margin-right: 4px" />
                <span>CONTACT US</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <span class="title">TOKYO $TUPID GAMES</span> -->
    <img @click="goHome()" src="../assets/header.svg" class="header-title" />

    <!-- 右侧按钮 -->
    <div class="w-172 d-flex justify-content-end">
      <div class="d-none d-sm-block right-box">
        <!-- 登录按钮 -->
        <login v-if="!isLogin" />
        <!-- 个人账户信息 -->
        <div v-else class="userInfo">
          <!-- 钱包余额 -->
          <div @click="showWallet = true" class="d-none d-lg-block">
            <div class="userInfo-item" @click="">
              <img src="../assets//header-wallet.svg" class="userInfo-item__img" />
              <span class="userInfo-item__text">{{
                cutApartNumber(SolanaPrize)
              }}</span>
              <img src="../assets/header-plus.svg" alt="" />
            </div>
          </div>
          <!-- candy数量 -->
          <div @click="showCandy = true" class="d-none d-lg-block">
            <div class="userInfo-item" @click="">
              <img src="../assets//header-candy.svg" class="userInfo-item__img" />
              <span class="userInfo-item__text">{{
                cutApart(userList.candy)
              }}</span>
              <img src="../assets/header-plus.svg" alt="" />
            </div>
          </div>
          <!-- 用户头像 -->
          <img @click="handleShowUserInfo" class="userImg" width="48" height="48" style="border-radius: 50%;"
            v-if="userList.avatarUrl == ''" src="../assets/header-avatar.svg" alt="" />
          <img @click="handleShowUserInfo" class="userImg" width="48" height="48" style="border-radius: 50%;" v-else
            :src="userList.avatarUrl" alt="" />

          <!-- 个人信息弹窗  弹窗面板展示-->
          <Account v-if="showUserInfoModal" :playerList="userList" @closeAccount="handleClose" />
        </div>
      </div>

      <!-- 用户头像 小屏显示 -->
      <img v-if="isLogin && userList.avatarUrl == ''" width="42" height="42" style="border-radius: 50%;"
        @click="handleShowUserInfo" src="../assets/header-avatar.svg" class="d-block d-sm-none" />
      <img v-if="isLogin && userList.avatarUrl !== ''" width="42" height="42" style="border-radius: 50%;"
        @click="handleShowUserInfo" :src="userList.avatarUrl" class="d-block d-sm-none" />

      <!-- 个人信息弹窗 底部抽屉展示 -->
      <div v-if="showUserInfoModal" class="drawer d-block d-sm-none" :class="{ open: showUserInfoModal }">
        <div class="drawer-content userInfo-box-small">
          <div class="drawer-header">
            <div class="modal-header flex-end">
              <img @click="handleClose" src="../assets/simpleClose.svg" alt="" />
            </div>
          </div>
          <div class="drawer-body">
            <Account :playerList="userList" :SolanaPrize="SolanaPrize" @closeAccount="handleClose" />
          </div>
        </div>
      </div>

      <!-- 蒙层 -->
      <div v-if="showUserInfoModal || showPanel" class="overlay" @click="handleClose"></div>

      <!-- wallets 列表 -->
      <div>
        <Modal v-model="showWallet" width="720px">
          <div class="wallets">
            <div class="title base-border">WALLETS</div>

            <!-- 钱包1 -->
            <div class="wallets-item wallets-item-border">
              <div class="d-flex align-item-center justify-content-between">
                <span class="fs-20">
                  Wallet 1
                  <span class="fs-16 bg">Current wallet</span>
                </span>

                <span class="fs-16 color-blue" @click="closeLogin">
                  <img src="../assets/disconnect.svg" />
                  Disconnect Wallet
                </span>
              </div>

              <div class="money-item d-flex justify-content-between align-items-center">
                <div class="left d-flex justify-content-between align-items-center">
                  <img src="../assets/header-wallet.svg" alt="" />
                  <div class="detail-box">
                    <div>External Wallet</div>
                    <div class="desc-info">1554....com</div>
                  </div>
                </div>
                <div class="right">0.000 SOL</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <!-- 钱包弹窗 -->
      <Modal v-model="showCandy" width="500px">
        <Candy />
      </Modal>
    </div>
  </div>

  <Modal v-model="marketBox" width="500px">
    <div class="results-box">
      <div>
        <div class="result-title">Coming Soon</div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import login from "@/components/login.vue";
import Account from "@/components/Account.vue";
import { useRouter } from "vue-router";
import VueCookie from "vue-cookie";
import Candy from "@/components/Candy.vue";
import { selectConnection, selectWallet, cutApart } from "@/utils/burn";
import { cutApartNumber, initWalletUmi } from "../utils/burn";
import { playerInfo, useChangePrize, userLogin, userPay, userPayNow, userSol } from "../utils/counter";
import axios from "@/utils/axios";
import { PublicKey } from '@solana/web3.js';
import Modal from "@/components/Modal.vue";


const router = useRouter();
const marketBox = ref(false)

const goPage = (path) => {
  showPanel.value = false;
  if (path == 'faq') {
    window.open('https://docs.tokyostupidgames.io/help/faq', "_blank")
    return
  }
  if (path == 'market') {
    marketBox.value = true
    return
  }

  router.push({ name: `${path}` });
};

// 是否展示面板
const showPanel = ref(false);
const handleShowPanel = () => {
  showPanel.value = !showPanel.value;
};

const targetElement = ref(null);
const targetElement2 = ref(null);
const targetElement3 = ref(null);
const loginElement = ref(null);
// 点击区域外事件处理函数
const handleClickOutside = (event) => {
  if (
    targetElement.value &&
    !targetElement.value.contains(event.target) &&
    targetElement2.value &&
    !targetElement2.value.contains(event.target) &&
    targetElement3.value &&
    !targetElement3.value.contains(event.target) &&
    loginElement.value &&
    !loginElement.value.contains(event.target)
  ) {
    console.log("点击了区域外");
    // showPanel.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  const token = VueCookie.get("token");
  if (token) {
    getLoginInit();
  }
});

onUnmounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// 是否已经登录(后续可以使用pinia管理该值)
const isLogin = ref(userLogin().isLogin);

// 展示个人信息弹窗
const showUserInfoModal = ref(false);
const handleShowUserInfo = () => {
  showUserInfoModal.value = !showUserInfoModal.value;
};
const handleClose = () => {
  showUserInfoModal.value = false;
  showPanel.value = false;
};

const code = ref("");
const state = ref("");

const getLoginInit = async () => {
  if (localStorage.getItem("local") !== "Wallet") {
    const wallet = selectWallet(localStorage.getItem("local"));
    await wallet.connect();
    // wallet.on('accountChanged', changeAddress)
  }

  await initWalletUmi();

  await getPrize();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  code.value = params.get("code");
  state.value = params.get("state");

  if (code.value && !state.value) {
    await bindDiscord(code.value);
  }
  if (code.value && state.value) {
    const localState = localStorage.getItem("state");
    if (state.value == localState) {
      await bindTwitter(code.value);
    }
  }
  await getWalletPrize();
};

const SolanaPrize = ref("");

const getWalletPrize = async () => {
  const publicKey = userList.value.account;
  const walletAddress = new PublicKey(publicKey);
  const connection = selectConnection(localStorage.getItem("local"));
  const res = await connection.getBalance(walletAddress);
  SolanaPrize.value = (res / 1000000000).toFixed(5);
  userSol().changeSol(SolanaPrize.value)
}

const bindDiscord = async (val) => {
  const params = {
    code: val,
  };

  const result = await axios.get("/tsg/player/bindDiscord", { params });

  if (result.data.code === 200) {
    await reqWallet();
  }
};

const bindTwitter = async (val) => {
  const params = {
    code: val,
    code_verifier: localStorage.getItem("verifierlin"),
  };
  const result = await axios.get("/tsg/player/bindTwitter", { params });
  if (result.data.code === 200) {
    await reqWallet();
  }
};

const isPay = ref(false);

const reqWallet = async () => {
  const res = await axios.get("/tsg/pay/reqWalletPayState");
  if (res.data.code == 200) {
    res.data.data ? (isPay.value = true) : (isPay.value = false);

    if (isPay.value) {
      if (userPay().isPay) {
        userPay().changePay();
      }
      userPayNow().truePay();
      await getPrize();
      await getWalletPrize();
    } else {
      userPayNow().falsePay();
      setTimeout(() => {
        reqWallet();
      }, 3000);
    }
  }
};

const userList = ref([]);

const getPrize = async () => {
  const prizeRes = await axios.post("/tsg/player/playerInfo");
  if (prizeRes.data.code == 200) {
    userList.value = prizeRes.data.data;
    playerInfo().changeList(userList.value);
    if (useChangePrize().prize) {
      useChangePrize().changePrize();
    }
  }
};

const closeLogin = () => {
  VueCookie.delete("token");
  router.push({ path: "/" }).then(() => {
    window.location.reload();
  });
};

const goHome = () => {
  router.push({ path: "/" });
};

watch(
  () => userLogin().isLogin,
  (newVal, oldVal) => {
    console.log(newVal);
    isLogin.value = newVal;

    if (isLogin.value) {
      getLoginInit();
    } else {
      closeLogin();
    }
  }
);

watch(
  () => useChangePrize().prize,
  (newVal, oldVal) => {
    if (newVal) {
      getPrize();
    }
  }
);

watch(
  () => userPay().isPay,
  (newVal, oldVal) => {
    if (newVal) {
      reqWallet();
    }
  }
);

const showCandy = ref(false);

const showWallet = ref(false);
</script>

<style lang="scss" scoped>
.header {
  height: 76px;
  text-align: center;
  line-height: 76px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .img-box {
    position: relative;

    .panel {
      position: absolute;
      top: 80px;
      padding: 40px;
      width: 390px;
      min-height: 544px;
      background: #1f0c27;
      border-radius: 32px;
      border: 1px solid #3f3f3f;
      text-align: left;
      z-index: 1050;

      .user-box {
        display: flex;
        align-items: center;
        color: #fff;

        img {
          margin-right: 24px;
        }

        .userName {
          margin-bottom: 16px;
          font-size: 24px;
          font-weight: 600;
          line-height: 20px;
        }

        .userId {
          font-size: 16px;
          line-height: 20px;
        }
      }

      .menu-box {
        margin-top: 40px;
        font-size: 24px;
        color: #fff;
        line-height: 36px;

        .menu-item {
          padding-bottom: 16px;
          padding-top: 16px;
          cursor: pointer;
        }

        .border-bo {
          border-bottom: 1px solid #3f3f3f;
        }
      }

      .desc {
        margin-top: 40px;
        font-size: 14px;
        // color: #606060;
        color: #fff;
      }
    }

    .left-panel {
      background: #1f0c27;
      color: #fff;

      .flex-center {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    // 小屏样式
    .panel-small {
      text-align: left;

      .user-box {
        display: flex;
        align-items: center;
        color: #fff;

        img {
          margin-right: 24px;
        }

        .userName {
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: 600;
          line-height: 20px;
        }

        .userId {
          font-size: 14px;
          line-height: 20px;
        }
      }

      .menu-box {
        margin-top: 40px;
        font-size: 14px;
        color: #fff;
        line-height: 20px;

        .menu-item {
          padding-bottom: 16px;
          padding-top: 16px;
        }

        .border-bo {
          border-bottom: 1px solid #3f3f3f;
        }
      }

      .desc {
        margin-top: 40px;
        font-size: 14px;
        // color: #606060;
        color: #fff;
      }
    }
  }

  .title {
    color: #fff;
    font-size: 18px;
    line-height: 24px;
  }

  .right-box {
    position: relative;
  }

  .userInfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-item {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 8px;
      position: relative;
      background-color: #212121;
      border-radius: 65px;
      height: 48px;
      padding-left: 48px;
      padding-right: 16px;
      text-align: center;
      color: #fff;
      line-height: 48px;

      &__img {
        position: absolute;
        left: 0;
        top: 0;
      }

      &__text {
        margin: 0 8px;
        font-weight: 400;
        font-size: 20px;

        color: #ffffff;
      }
    }

    .userImg {
      cursor: pointer;
    }
  }

  .header-title {
    cursor: pointer;
  }
}

// 底部抽屉样式
// 小屏样式
.userInfo-box-small {
  background: #1f0c27;
  border: 1px solid #3f3f3f;
  border-radius: 32px 32px 0 0;
  padding: 24px;
  min-height: 650px;

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .modal-header {
    border: none;
  }

  .title {
    margin-bottom: 40px;
    color: #fff;
    font-weight: 600;
    margin-top: 16px;
    font-size: 16px;
    text-align: center;
  }
}

.results-box {
  color: #fff;
  text-align: center;

  div {
    padding: 60px 0;
  }

  .result-title {
    font-size: 24px;
    font-weight: 600;
  }
}


@media (max-width: 576px) {
  .w-172 {
    width: 72px;
  }

  .header-title {
    width: 200px;
    cursor: pointer;
  }
}

@media (min-width: 576px) {
  .w-172 {
    width: 172px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
