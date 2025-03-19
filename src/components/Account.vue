<template>
  <div class="userInfo-box">
    <div class="user-name">
      <!-- ../assets/avatar.svg -->
      <img :src="imageSrc" width="80" height="80" style="border-radius: 50%;" />
      <span class="user-name__text">{{ props.playerList?.playerName }}</span>
      <img @click="goUser()" style="cursor:pointer;" :src="expImage" alt="" />
    </div>

    <div class="first-modal">
      <div @click="handleShowWallet" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-wallet.svg" alt="" />
          <div class="detail-box">
            <div>wallet</div>
            <div class="desc-info">{{ walletAddress }}</div>
          </div>
        </div>
        <div class="right">{{ cutApartNumber(solPrize) }} SOL</div>
      </div>
      <div @click="handleShowCandy" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-candy.svg" alt="" />
          <div class="detail-box">
            <div>Candy balance</div>
          </div>
        </div>
        <div class="right">
          <div class="candy-btn d-flex align-items-center">
            <span>{{ cutApart(props.playerList?.candy) }} </span>

            <img src="../assets/plus-mini.svg" style="margin-left: 8px" />
          </div>
        </div>
      </div>
    </div>

    <div class="second-modal">
      <div @click="goPage('userInfo')" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-nft.svg" alt="" />
          <div class="detail-box">
            <div>My NFTs</div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div @click="goPage('missing')" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-miss.svg" alt="" />
          <div class="detail-box">
            <div>Missions & Rewards</div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div @click="goPage('stake')" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/stake-icon.svg" alt="" />
          <div class="detail-box">
            <div>Staking</div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div @click="goPage('accountSetting')" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-setting.svg" alt="" />
          <div class="detail-box">
            <div>Setting</div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div @click="goPage('discord')" class="money-item d-flex justify-content-between align-items-center">
        <div class="left d-flex justify-content-between align-items-center">
          <img src="../assets/header-warnning.svg" alt="" />
          <div class="detail-box">
            <div>Support (Go to our Discord)</div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="footer-box">
      <span @click="closeLogin">Logout</span>
      <img @click="closeLogin" src="../assets/log-out.svg" alt="" />
    </div>
  </div>

  <!-- wallets List -->
  <div>
    <Modal v-model="showWallet" width="720px">
      <div class="wallets">
        <div class="title base-border">WALLETS</div>

        <!-- Wallet 1 -->
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
                <div class="desc-info">{{ walletAddress }}</div>
              </div>
            </div>
            <div class="right">{{ cutApartNumber(solPrize) }} SOL</div>
          </div>
        </div>
      </div>
    </Modal>
  </div>

  <!-- add wallet modal -->

  <div>
    <Modal v-model="showAddWalletModal" width="440px">
      <div class="add-wallet-box">
        <div class="wallet-box__title">Add Wallet</div>
        <div class="wallet-box__desc">
          Change your wallet on the extension and choose the corresponding:
        </div>
        <img src="../assets/button-soft-p.svg" class="mb-24" />
        <img src="../assets/button-soft-s.svg" class="mb-24" />
        <img src="../assets/button-soft-b.svg" class="mb-24" />

        <div class="wallet-box__desc">
          Link an email for more login methods (Unavailable if your account
          already linked to an email)
        </div>

        <div class="footer-login-btn">
          <img src="../assets/mail.svg" alt="" />
          <span> Login using email </span>
        </div>
      </div>
    </Modal>
  </div>

  <!-- 钱包弹窗 -->
  <Modal v-model="showCandy" width="500px">
    <Candy />
  </Modal>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import Candy from "@/components/Candy.vue";
import morAvantar from "@/assets/avatar.svg"
import { cutApart, cutApartNumber } from "../utils/burn";
import { playerInfo, userLogin, userSol } from "../utils/counter";
import Tier from "../assets/Tier.png"
import silver from "../assets/SILVER.png"
import gold from "../assets/GOLD.png"
import diamond from "../assets/DIAMOND.png"

const emits = defineEmits(["closeAccount"]);

const props = defineProps({
  playerList: Object,
  SolanaPrize: String
})

const solPrize = ref('')
const expImage = ref('')

onMounted(() => {
  solPrize.value = userSol().sol
  const info = playerInfo().user
  if (info.vipExp < 3000000) {
    expImage.value = Tier
  } else if (info.vipExp > 3000000 && info.vipExp < 15000000) {
    expImage.value = silver
  } else if (info.vipExp > 15000000 && info.vipExp < 90000000) {
    expImage.value = gold
  } else {
    expImage.value = diamond
  }
})

const imageSrc = computed(() => {
  return props.playerList?.avatarUrl || morAvantar;
});

const walletAddress = computed(
  () => {
    const list = props.playerList?.walletAddress.slice(0, 4) + '...' + props.playerList?.walletAddress.slice(-4)

    return list
  }
)

const goUser = () => {
  emits("closeAccount");
  router.push({path:'/user-info'})
}

// 是否展示钱包列表
const showWallet = ref(false);
const handleShowWallet = () => {

  showWallet.value = true;

  // emits("closeAccount");
};

// 是否展示添加钱包弹窗
const showAddWalletModal = ref(false);
const handleShowAddWalletModal = () => {
  showAddWalletModal.value = true;
  showWallet.value = false;
};

// 是否展示candy弹窗
const showCandy = ref(false);
const handleShowCandy = () => {
  showCandy.value = true;
  showWallet.value = false;
};

const router = useRouter();
const goPage = (name) => {
  if (name == 'discord') {
    window.open('https://discord.com/invite/tsg', "_blank")
    return
  }
  emits("closeAccount");
  router.push({ name });
};

const closeLogin = () => {
  userLogin().changeIsLogin()
}
</script>

<style lang="scss" scoped>
.userInfo-box {
  position: absolute;
  top: 80px;
  right: 40px;
  padding: 40px;
  background: #1f0c27;
  border-radius: 32px;
  border: 1px solid #3f3f3f;
  z-index: 1055;
  text-align: left;

  .user-name {
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__text {
      font-weight: 600;
      font-size: 24px;
    }
  }

  .first-modal {
    padding-bottom: 40px;
    border-bottom: 1px solid #3f3f3f;
  }

  .money-item {
    margin-bottom: 16px;
    color: #fff;
    width: 360px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;

    .detail-box {
      margin-left: 8px;
    }

    .desc-info {
      font-size: 16px;
      color: #606060;
    }

    .candy-btn {
      padding: 14px 12px;
      border-radius: 48px;
      background-color: #212121;
    }

    .left>img {
      width: 48px;
    }
  }

  .second-modal {
    margin-top: 40px;
  }

  .footer-box {
    text-align: center;
    font-size: 14px;
    color: #606060;
    cursor: pointer;

    img {
      margin-left: 8px;
    }
  }
}

@media (max-width: 576px) {
  .userInfo-box {
    position: relative;
    top: 0;
    right: 0;
    border: none;
    padding: 0;

    .first-modal {
      margin-bottom: 24px;
      padding-bottom: 0;
    }

    .second-modal {
      margin-top: 24px;
    }

    .money-item {
      width: 100%;
      font-size: 16px;

      .left>img {
        width: 32px;
      }
    }
  }
}
</style>

<style lang="scss">
// 钱包列表样式
.wallets {
  text-align: center;

  .title {
    margin-bottom: 20px;
    display: inline-block;
    color: #fff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  .wallets-item {
    margin-top: 40px;
    color: #fff;
    padding-bottom: 40px;

    .fs-20 {
      font-size: 20px;
      font-weight: 600;
      margin-right: 16px;
    }

    .fs-16 {
      font-size: 16px;
      font-weight: 400;
    }

    .bg {
      display: inline-block;
      padding: 8px;
      border-radius: 28px;
      background-color: #36253d;
      letter-spacing: 1px;
    }

    .color-blue {
      display: inline-block;
      margin-left: 4px;
      color: #3052fa;
      cursor: pointer;
    }

    .money-item {
      margin-top: 24px;
      margin-bottom: 16px;
      color: #fff;
      width: 100%;
      line-height: 20px;
      font-size: 20px;
      font-weight: 400;
      text-align: left;

      .detail-box {
        margin-left: 8px;
        color: #606060;
      }

      .desc-info {
        font-size: 16px;
        color: #fff;
      }

      .candy-btn {
        padding: 14px 12px;
        border-radius: 48px;
        background-color: #212121;
      }

      .left>img {
        width: 48px;
      }
    }
  }

  .wallets-item-border {
    border-bottom: 1px solid #3f3f3f;
  }

  .add-btn {
    padding: 14px 16px;
    border-radius: 48px;
    border: 1px solid #3f3f3f;
    max-width: 180px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 600;

    img {
      margin-left: 8px;
    }
  }
}

@media (max-width: 576px) {
  .wallets {
    padding-bottom: 200px;

    .title {
      font-size: 24px;
      margin-bottom: 0;
    }

    .wallets-item {
      .fs-20 {
        font-size: 16px;
      }

      .fs-16 {
        font-size: 12px;
      }

      .money-item {
        font-size: 16px;
        margin-bottom: 0;
      }
    }

    .add-btn {
      color: #fff;
    }
  }
}

// 新增钱包样式
.add-wallet-box {
  color: #fff;
  text-align: center;

  .wallet-box__title {
    font-size: 24px;
    font-weight: 600;
  }

  .wallet-box__desc {
    margin-top: 40px;
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: 400;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

  .footer-login-btn {
    padding: 18px 0;
    border-radius: 48px;
    border: 1px solid #3f3f3f;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
