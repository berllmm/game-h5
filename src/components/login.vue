<template>
  <div>
    <!-- 触发登录按钮 -->
    <img class="loginbtn" src="../assets/login.svg" @click="showLogin = true" />

    <!-- 大屏：模态框 -->
    <div v-if="showLogin && !showVerificationModal" class="d-none d-sm-block">
      <div class="modal" :class="{ 'd-block': showLogin }" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content login-box">
            <div class="modal-header flex-end">
              <img @click="handleClose" src="../assets/simpleClose.svg" alt="" />
            </div>
            <!-- <div class="title">TOKYO STUPID GAME$</div> -->
            <div class="title">
              <img src="../assets/title.png" class="title-img" />
            </div>
            <div class="modal-body form-box">
              <!-- by email -->
              <div class="email-form base-form">
                <div class="base-form__title">Login using email</div>
                <input class="form-control email-input" v-model="emial" type="text" placeholder="Enter your email "
                  aria-label="default input example" />

                <div @click="handleNext" class="round-btn base-round-border">
                  Continue
                </div>

                <div class="flex-center">
                  <div class="google-btn" @click="loginGoogle()">
                    <img src="../assets/google.svg" alt="" />
                    Sign in with Google
                  </div>
                </div>
              </div>

              <div class="line column">
                <div class="line-item"></div>
                <span>OR</span>
                <div class="line-item"></div>
              </div>

              <!-- by web3 -->
              <div class="web3-form base-form">
                <div class="base-form__title">
                  Choose your web3 wallet to log in
                </div>
                <div class="d-flex flex-column">
                  <img @click="loginWallet('Phantom')" src="../assets/button-soft-p.svg" alt="" />
                  <img @click="loginWallet('Solflare')" src="../assets/button-soft-s.svg" alt="" />
                  <img @click="loginWallet('Backpack')" src="../assets/button-soft-b.svg" alt="" />
                  <img @click="loginWallet('magicEden')" src="../assets/button-soft-m.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="footer">
              By logging in I agree with
              <span style="color: #3052fa">
                <a href="https://docs.tokyostupidgames.io/legal/terms-of-use" target="_blank">Terms</a> & <a
                  href="https://docs.tokyostupidgames.io/legal/privacy-policy" target="_blank">Privacy Policy</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 小屏：底部抽屉 -->
    <div v-if="!showVerificationModal" class="drawer d-block d-sm-none" :class="{ open: showLogin }">
      <div class="drawer-content login-box-small">
        <div class="drawer-header">
          <div class="modal-header flex-end">
            <img @click="handleClose" src="../assets/simpleClose.svg" alt="" />
          </div>
          <!-- <div class="title">TOKYO STUPID GAME$</div> -->
          <div class="title">
            <img src="../assets/title.png" class="title-img" />
          </div>
        </div>
        <div class="drawer-body">
          <!-- by email -->
          <div class="email-form base-form">
            <div class="base-form__title">Login using email</div>
            <input class="form-control email-input" v-model="emial" type="text" placeholder="Enter your email "
              aria-label="default input example" />

            <div @click="handleNext" class="round-btn base-round-border">
              Continue
            </div>

            <div class="flex-center">
              <div class="google-btn" @click="loginGoogle()">
                <img src="../assets/google.svg" alt="" />
                Sign in with Google
              </div>
            </div>
          </div>

          <div class="line">
            <div class="line-item"></div>
            <span>OR</span>
            <div class="line-item"></div>
          </div>

          <!-- by web3 -->
          <div class="web3-form base-form">
            <div class="base-form__title">
              Choose your web3 wallet to log in
            </div>

            <div class="d-flex justify-content-between">
              <img @click="loginWallet('Phantom')" src="../assets/button-soft-mini-p.svg" alt="" />
              <img @click="loginWallet('Solflare')" src="../assets/button-soft-mini-s.svg" alt="" />
              <img @click="loginWallet('Backpack')" src="../assets/button-soft-mini-b.svg" alt="" />
              <img @click="loginWallet('magicEden')" src="../assets/button-soft-mini-m.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="footer">
          By logging in I agree with Terms & Privacy Policy
        </div>
      </div>
    </div>

    <!-- 蒙层 -->
    <div v-if="showLogin" class="overlay" @click="handleClose"></div>

    <!-- 安全验证弹框 -->
    <div v-show="showVerificationModal" class="verification-modal">
      <div class="d-flex align-items-center justify-content-end">
        <img @click="handleCancel" src="../assets/simpleClose.svg" alt="" />
      </div>
      <div class="modal-title">Security verification</div>
      <!-- 第一步验证 -->
      <div v-show="!showCodeModal">
        <div class="content"></div>
        <div @click="handleVerify" class="base-round-border m-40">Verify</div>
      </div>
      <!-- 第二步验证 -->
      <div v-show="showCodeModal">
        <div class="tips">Please enter the code we’ve sent to your email</div>
        <VerificationCodeInput :digits="digits" />
        <div @click="handleSubmit" style="cursor: pointer;" class="base-round-border m-40">Submit</div>
        <div class="blue-text" @click="againEmail">{{ resendCode }}</div>
      </div>
    </div>

    <Modal v-model="emailTip" width="400px">
      <div class="results-box">
        <div>
          <img v-if="emailSuccess" src="../assets/result-success.svg" class="result-img" />
          <img v-else src="../assets/result-err.svg" class="result-img" />
          <div class="result-tips">
            {{ emialText }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { googleAuthCodeLogin } from "vue3-google-login";
import axios from "@/utils/axios";
import VerificationCodeInput from "@/components/VerificationCodeInput.vue";
import { initWalletUmi } from "../utils/burn";
import VueCookie from "vue-cookie";
import { userDetailLogin, userLogin } from "../utils/counter";
import Modal from "@/components/Modal.vue";

// import bs58 from "bs58";
import bs58 from 'bs58'

const userLogins = userLogin()

const digits = ref(Array(6).fill(""));

const showLogin = ref(false);
const handleClose = () => {
  showLogin.value = false;
  showVerificationModal.value = false;
  showCodeModal.value = false;
};

const emial = ref('')

// 安全验证弹框
const showVerificationModal = ref(false);
const handleNext = async () => {
  const res = await axios.get("/tsg/login/emailLogin", {
    params: {
      email: emial.value,
      code: 0,
    },
  });

  if (res.data.code == 200) {
    showVerificationModal.value = true;
    showCodeModal.value = true;
  }
};
const handleCancel = () => {
  showVerificationModal.value = false;
};

// 验证码表单
const showCodeModal = ref(false);
const handleVerify = () => {
  showCodeModal.value = true;
};
const handleSubmit = async () => {
  const findNumber = digits.value.findIndex(item => item == '')
  if (findNumber !== -1) {
    return alert('The verification code cannot be empty')
  }
  let list = ''
  digits.value.forEach(item => {
    list += item
  })
  const res = await axios.get("/tsg/login/emailLogin", {
    params: {
      email: emial.value,
      code: Number(list),
    },
  });
  if (res.data.code == 200) {
    VueCookie.set("token", res.data.data.token, { expires: "1D" });
    localStorage.setItem('local', 'Wallet')
    initWalletUmi()
    userLogins.changeIsLogin()
    handleClose();
  } else {
    emailSuccess.value = false
    emialText.value = 'Code is error'
    emailTip.value = true
  }
};

const userAddress = ref('')

const loginWallet = async (val) => {
  localStorage.setItem('local', val)

  if (val == 'Phantom') {
    if (window.solana && window.solana.isPhantom) {
      // window.solana.on('accountChanged', changeAddress);
      try {
        const response = await window.solana.connect();
        const wallet = window.solana
        userAddress.value = response.publicKey.toString()
        onSignMessage(wallet)
      } catch (err) {
        console.error('Connection failed:', err);
      }
    } else {
      window.location.href = 'https://phantom.app/ul/browse/https%3A%2F%2tokyostupidgames.io?ref=https%3A%2F%2tokyostupidgames.io'
    }
  } else if (val == 'Backpack') {
    if (window.backpack && window.backpack.solana.isBackpack) {
      // window.backpack.solana.on('accountChanged', changeAddress)
      await window.backpack.connect()
      const wallet = window.backpack.solana;
      userAddress.value = wallet.publicKey.toString()
      onSignMessage(wallet)

    } else {
      window.location.href = 'https://backpack.app/ul/browse/https%3A%2F%2tokyostupidgames.io?ref=https%3A%2F%2tokyostupidgames.io'
    }
  } else if (val == 'Solflare') {
    if (window.solflare && window.solflare.isSolflare) {
      // window.solflare.on('accountChanged', changeAddress)
      await window.solflare.connect()
      const wallet = window.solflare;

      userAddress.value = wallet.publicKey.toString()
      onSignMessage(wallet)

    } else {
      window.location.href = 'https://solflare.com/ul/v1/browse/https%3A%2F%2tokyostupidgames.io?ref=https%3A%2F%2tokyostupidgames.io'
    }
  } else if (val == 'magicEden') {
    if ('magicEden' in window) {
      // window.magicEden?.solana.on("accountChanged", changeAddress);

      await window.magicEden?.solana.connect()
      const wallet = window.magicEden?.solana;

      userAddress.value = wallet.publicKey.toString()
      onSignMessage(wallet)


    } else {
      window.location.href = 'https://wallet.magiceden.io/'
    }
  }
}

const onSignMessage = async (wallet) => {

  if (showLogin.value) {

    const newData = new Date();
    const text = `tokyostupidgames.io wants you to sign in with your Solana account: ${userAddress.value
      }/n
  Welcome to TOKYO STUPID GAMES. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. signing is safe, gas-less transaction that does not in any way give TOKYO STUPID GAMES permission to perform any transactions with your wallet.

  URL: https://tokyostupidgames.io/
  Version: 1.0
  Chain ID: mainnet
  Issued At: ${dateTime(newData)}
  Request ID: C19865515b6b5-ec998-2i2i-99093ddel32w34`;
    const encoder = new TextEncoder();
    const message = encoder.encode(text);

    const sign = await wallet.signMessage(message);

    let signaBs58

    if (localStorage.getItem('local') == 'Wallet') {
      signaBs58 = bs58.encode(sign);
    } else {
      signaBs58 = bs58.encode(sign.signature);
    }

    const res = await axios.get("/tsg/login/qb", {
      params: {
        account: userAddress.value,
        pwd: signaBs58,
        signContent: text,
      },
    });
    if (res.data.code == 200) {
      VueCookie.set("token", res.data.data.token, { expires: "1D" });
      userLogins.changeIsLogin()
      initWalletUmi()
      handleClose()

    }
  }

};

const dateTime = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份需要加1且补零
  const day = date.getDate().toString().padStart(2, "0"); // 补零
  const hours = date.getHours().toString().padStart(2, "0"); // 补零
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 补零
  const seconds = date.getSeconds().toString().padStart(2, "0"); // 补零

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const loginGoogle = async () => {
  const res = await googleAuthCodeLogin();

  const reslogin = await axios.get("/tsg/login/googleLogin", {
    params: {
      code: res.code,
    },
  });
  if (reslogin.data.code) {
    VueCookie.set("token", reslogin.data.data.token, { expires: "1D" });
    localStorage.setItem('local', 'Wallet')
    userLogins.changeIsLogin()
    handleClose()
  }
}

const emailTip = ref(false)
const Countdown = ref(0)
const CountFunction = ref(null)
const resendCode = ref('Resend code')
const emailSuccess = ref(true)
const emialText = ref('')

const againEmail = async () => {
  if (Countdown.value > 0) {
    return
  }

  const res = await axios.get("/tsg/login/emailLogin", {
    params: {
      email: emial.value,
      code: 0,
    },
  });

  if (res.data.code == 200) {
    emailTip.value = true
    emailSuccess.value = true
    emialText.value = 'Resend successfully'
    Countdown.value = 60
    CountFunction.value = setInterval(() => {
      Countdown.value--
      if (Countdown.value <= 0) {
        isButton.value = true
        resendCode.value = `Resend code`
        clearInterval(CountFunction.value)
      } else {
        resendCode.value = `re-send in ${Countdown.value} s`
      }
    }, 1000)
  }
}

watch(
  () => userDetailLogin().isLogin,
  (newVal, oldVal) => {
    if (newVal) {
      showLogin.value = true
      userDetailLogin().truePay()
    }
  }

)
</script>

<style lang="scss" scoped>
.loginbtn {
  cursor: pointer;
}

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

  .result-center span {
    font-size: 24px;
    font-weight: 700;
  }

  .result-center span:nth-child(2) {
    padding: 0 10px;
  }

  .result-img {
    margin: 40px 0;
    width: 120px;
    height: 120px;
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

// 大屏样式
.login-box {
  background: #1f0c27;
  border: 1px solid #3f3f3f;
  border-radius: 32px;
  padding: 24px;
  width: 800px;
  height: auto;
  margin: 120px auto;

  .flex-end {
    display: flex;
    justify-content: flex-end;

    img {
      cursor: pointer;
    }
  }

  .modal-header {
    border: none;
    padding: 0;
  }

  .title {
    color: #fff;
    font-weight: 600;
    margin-top: 16px;
    font-size: 24px;
    text-align: center;
  }

  .title-img {
    width: 400px;
  }

  .form-box {
    display: flex;
    justify-content: space-between;
  }

  .email-form {
    margin-right: 40px;
  }

  .web3-form {
    margin-left: 40px;

    img {
      margin-top: 24px;
      cursor: pointer;
    }
  }

  .base-form {
    flex: 1;

    &__title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 12px;
      text-align: center;

      color: #ffffff;
    }

    .email-input {
      margin: 24px 0;
      background-color: #200d2b;
      border-color: #3f3f3f;
      color: #717680;
      height: 48px;
      box-sizing: border-box;
      font-size: 18px;
      color: #fff;

      &::placeholder {
        color: #717680;
      }

      &:focus {
        outline: none;
        border-color: #3f3f3f;
      }
    }

    .round-btn {
      height: 48px;
      line-height: 48px;
      cursor: pointer;
    }

    .flex-center {
      display: flex;
      justify-content: center;
    }

    .google-btn {

      img {
        margin-right: 16px;
      }

      display: inline-block;
      margin: 0 auto;
      margin-top: 24px;
      border: 1px solid #3f3f3f;
      text-align: center;
      border-radius: 65px;
      padding: 0 24px;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      width: 100%;
    }
  }

  .footer {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 12px;

    text-align: center;

    color: #606060;
  }
}

// 小屏样式
.login-box-small {
  background: #1f0c27;
  border: 1px solid #3f3f3f;
  border-radius: 32px 32px 0 0;
  padding: 24px;
  min-height: 628px;

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
    font-size: 16px;
    text-align: center;
  }

  .title-img {
    width: 68%;
  }

  .form-box {
    display: flex;
    justify-content: space-between;
  }

  .email-form {
    margin-bottom: 32px;
  }

  .web3-form {
    img {
      margin-top: 24px;
      height: 40px;
    }
  }

  .base-form {
    flex: 1;

    &__title {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      text-align: center;

      color: #ffffff;
    }

    .email-input {
      margin: 24px 0;
      background-color: #200d2b;
      border-color: #3f3f3f;
      color: #717680;
      height: 48px;

      &::placeholder {
        color: #717680;
      }

      &:focus {
        outline: none;
        border-color: #3f3f3f;
      }
    }

    .round-btn {
      height: 48px;
      line-height: 48px;
    }

    .flex-center {
      display: flex;
      justify-content: center;
    }

    .google-btn {
      img {
        margin-right: 16px;
      }

      display: inline-block;
      margin: 0 auto;
      margin-top: 24px;
      border: 1px solid #3f3f3f;
      text-align: center;
      border-radius: 65px;
      padding: 0 24px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;

      height: 48px;
      line-height: 48px;
    }
  }

  .footer {
    margin-top: 40px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;

    text-align: center;

    color: #606060;
  }
}

// 分割线
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  &-item {
    height: 1px;
    width: 1px;
    background: #3f3f3f;
    flex: 1;
  }

  span {
    margin: 12px;
    color: #3f3f3f;
    font-size: 14px;
  }
}

.column {
  flex-direction: column;
}

// /* 模态框样式 */
// .modal {
//   background-color: rgba(0, 0, 0, 0.5);
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// /* 底部抽屉样式 */
// .drawer {
//   position: fixed;
//   bottom: -100%;
//   left: 0;
//   width: 100%;
//   //   background-color: white;
//   transition: bottom 0.3s ease;
//   z-index: 1050;
// }

// .drawer.open {
//   bottom: 0;
// }

// .drawer-content {
//   padding: 24px 40px;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
//   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
// }

// /* 蒙层样式 */
// .overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1040;
// }

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 100vw;
  }
}

// 安全验证弹框
.verification-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 490px;
    height: 430px;
  padding: 24px;
  z-index: 9999;
  border-radius: 32px;
  background: #1f0c27;
  border: 1px solid #3f3f3f;

  .modal-title {
    margin-bottom: 20px;
    font-size: 24px;

    font-weight: 600;
    color: #fff;
    text-align: center;
  }

  .content {
    margin: 0 auto;
    width: 320px;
    height: 320px;
    background: #36253d;
    border-radius: 16px;
    border: 1px solid #3f3f3f;
  }

  .tips {
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    font-weight: 400;
  }

  .blue-text {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #3052fa;
    text-align: center;
    cursor: pointer;
    line-height: 70px;
  }
}

.m-40 {
  margin: 40px 0px 0px 0px;
}
</style>
