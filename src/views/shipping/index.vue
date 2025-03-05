<template>
  <div class="shipping modal-border">
    <div class="title base-border">SHIPPING INFORMATION</div>

    <div class="content-box">
      <div class="row">
        <div class="left col-12 col-md-6">
          <a-form
            :model="formState"
            name="horizontal_login"
            autocomplete="off"
            class="content-box__form"
          >
            <div class="form-title">CONTACT</div>

            <!-- email -->
            <div class="row">
              <div class="col-12">
                <a-form-item name="email">
                  <a-input :status="isEmail ? 'error' : ''" @change="changeInput('email')"
                    v-model:value="formState.email" placeholder="Email *">
                  </a-input>
                </a-form-item>
              </div>
            </div>

            <div class="form-title">Delivery</div>

            <!-- country -->
            <div class="row">
              <div class="col-12">
                <a-form-item name="country">
                  <a-select @change="changeInput('country')" :status="isCountry ? 'error' : ''" v-model:value="formState.country" placeholder="Country/Region *"
                    custom-class="custom-select" @select="changeSelect">
                    <a-select-option v-for="item in countries" :value="item.name">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>

              <div class="col-6">
                <a-form-item name="Name">
                  <a-input v-model:value="formState.name" :status="isName ? 'error' : ''" @change="changeInput('name')"
                    :placeholder="formState.addressType == 0 ? '例：山田 太郎 *' : 'Name *'">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-6">
                <a-form-item name="Phone">
                  <a-input v-model:value="formState.phone" :status="isPhone ? 'error' : ''" @change="changeInput('phone')"
                    :placeholder="formState.addressType == 0 ? '例：03-3333-3333 *' : 'Phone *'">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-6">
                <a-form-item name="RegionCode">
                  <a-input
                    style="color: #fff"
                    v-model:value="formState.regionCode"
                    disabled
                    placeholder="Region Code *"
                  >
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-6">
                <a-form-item name="Post Code">
                  <a-input v-model:value="formState.postcode" :status="isPostcode ? 'error' : ''" @change="changeInput('postcode')"
                    :placeholder="formState.addressType == 0 ? '例：170-0013 *' : 'Postal Code *'">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-12" v-if="formState.addressType !== 0">
                <a-form-item name="city">
                  <a-input v-model:value="formState.city" :status="isCity ? 'error' : ''" @change="changeInput('city')" placeholder="City *">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-12" v-if="formState.addressType == 0">
                <a-form-item name="prefecture">
                  <a-input v-model:value="formState.prefecture" :status="isPrefecture ? 'error' : ''" @change="changeInput('prefecture')" placeholder="例：都道府県(東京都) *">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-12">
                <a-form-item name="address">
                  <a-input v-model:value="formState.address" :status="isAddress ? 'error' : ''" @change="changeInput('address')"
                    :placeholder="formState.addressType == 0 ? '例：豊島区東池袋1-34-5 *' : 'Address *'">
                  </a-input>
                </a-form-item>
              </div>

              <div class="col-12">
                <a-form-item name="address2">
                  <a-input
                    v-model:value="formState.address2"
                    :placeholder="
                      formState.addressType == 0
                        ? '例：いちご東池袋ビル9F'
                        : 'Address2'
                    "
                  >
                  </a-input>
                </a-form-item>
              </div>

              <div class="form-title" :style="isCheckpay?'color:#ff4d4f;':''">Payment Method *</div>

              <div class="form-title__desc">
                Which currency would you like to take to pay for your logistic?
              </div>

              <div class="col-12 mt-2">
                <a-form-item name="payment">
                  <a-radio-group @change="changeInput('payment')" v-model:value="payment">
                    <a-radio value="usdc">
                      <img src="../../assets/payment1.png" alt="" />
                    </a-radio>
                    <a-radio value="sol"><img src="../../assets/payment2.png" alt="" /></a-radio>
                  </a-radio-group>
                </a-form-item>
              </div>
            </div>
          </a-form>
        </div>
        <div class="right col-12 col-md-6">
          <div class="form-title">POSTAGE CONTENT</div>
          <a-table
            :dataSource="dataSource"
            :columns="columns"
            :bordered="false"
            :pagination="false"
            :customRow="customCell"
            :customHeaderRow="customHeaderCell"
            :scroll="{ y: 400 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'item'">
                <div class="d-flex align-items-center">
                  <img
                    :src="record.image"
                    alt=""
                    width="60"
                    style="margin-right: 15px; border-radius: 6px"
                  />
                  <span class="item-desc d-md-block">{{
                    record.name
                  }}</span>
                </div>
              </template>
              <template v-if="column.key === 'rarity'">
                <div class="align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">{{
                    record.rarity
                  }}</span>
                </div>
              </template>
              <template v-if="column.key === 'quantity'">
                <div class="align-items-center" style="text-align: center;">
                  <span class="item-desc d-md-block">1</span>
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <div class="footer-btns">
      <div @click="handleSubmit" class="btn1 base-round-border">Submit</div>
      <div @click="handleBack" class="btn2">Cancel</div>
    </div>

    <!-- confirm弹窗 -->
    <Modal v-model="showModal" :width="width">
      <div class="confirm-box">
        <div class="confirm-title">Confirm your order</div>
        <div class="confirm-desc">
          Please recheck your information before continuing the order process
        </div>

        <div class="confirm-content">
          <div class="confirm-content-title">ORDER SUMMARY</div>
          <div class="confirm-content-item">
            <span class="label">Email:</span>
            <span class="value">{{ formState.email }}</span>
          </div>
          <div class="confirm-content-item">
            <span class="label">Name:</span>
            <span class="value">{{ formState.name }}</span>
          </div>
          <div class="confirm-content-item">
            <span class="label">Phone:</span>
            <span class="value">{{ formState.phone }}</span>
          </div>
          <div class="confirm-content-item">
            <span class="label">Address:</span>
            <span class="value">{{ formState.address }}</span>
          </div>
          <div class="confirm-content-item">
            <span class="label">Shipping fee:</span>
            <span class="value fw-bolder">{{ payFee.currencyNum }} USDC</span>
          </div>
        </div>

        <div class="confirm-desc">
          After confirming the information,
          <span class="fw-bolder" v-if="payFee.currencyCode == 'usdc'"
            >{{ payFee.currencyNum }} USDC</span
          >
          <span class="fw-bolder" v-else>{{ payFee.currencyNum }} Sol</span>
          will be deducted from your wallet.
        </div>

        <div class="footer-btn__modal">
          <div @click="handleConfirm" class="btn1 base-round-border">
            Confirm
          </div>
          <div @click="handleCancel" class="btn2">Cancel</div>
        </div>
      </div>
    </Modal>

    <!-- 结果弹窗 -->
    <Modal v-model="showResult" width="400px">
      <!-- Error -->

      <div class="result-box">
        <div v-if="isSuccess">
          <div class="result-title">Success</div>
          <img src="../../assets/result-success.svg" class="result-img" />
          <div class="result-tips">
            Payment for your shipping order was executed successfully, track
            your package delivery process in
            <span class="blue-text">Shipping Inventory</span>
          </div>
        </div>
        <div v-else>
          <div class="result-title">Error</div>
          <img src="../../assets/result-err.svg" class="result-img" />
          <div class="result-tips">
            You don’t have enough USDC balance in your wallet, please increase
            your wallet balance, then try again.
          </div>
        </div>
        <div v-if="!isSuccess" class="footer-btn__modal footer-btn__modal2">
          <div @click="closeResultModal" class="btn1 base-round-border">
            Try Again
          </div>
          <div @click="closeResultModal" class="btn2">Cancel</div>
        </div>
      </div>

      <!-- Success -->
    </Modal>
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import { customHeaderCell, customCell } from "@/utils";
import { useRouter } from "vue-router";
import countries from "@/utils/countries.json";
import axios from "@/utils/axios";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { selectWallet, selectConnection } from "@/utils/burn";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { transferTokens } from "@metaplex-foundation/mpl-toolbox";
import bs58 from "bs58";
import { playerInfo, useUmiWallet } from "../../utils/counter";

const router = useRouter();

const formState = reactive({
  email: "",
  country: "Country/Region",
  name: "",
  phone: "",
  postcode: "",
  regionCode: "",
  city: "",
  prefecture: "",
  address: "",
  address2: "",
  company: "", // 公司
  division: "", // 部门
  addressType: 1, // 0 国内 1 国外
});

const payment = ref(1);
const payFee = ref({});

// 确认弹窗
const showModal = ref(false);
const width = computed(() => {
  if (window.innerWidth < 768) return "100%";
  return "500px";
});

const isEmail = ref(false)
const isCountry = ref(false)
const isName = ref(false)
const isPhone = ref(false)
const isPostcode = ref(false)
const isRegioncode = ref(false)
const isCity = ref(false)
const isPrefecture = ref(false)
const isAddress = ref(false)
const isCheckpay = ref(false)

const handleSubmit = async () => {
  let re = /^\w+(?:\.\w+){0,1}@[a-zA-Z0-9]{2,14}(?:\.[a-z]{2,4}){1,2}$/;
  console.log(payment.value);
  
  if (formState.email == "") {
    isEmail.value = true
    return
  }
  if (!re.test(formState.email)) {
    isEmail.value = true
    return
  }
  if (formState.country == "Country/Region") {
    isCountry.value = true
    return
  }
  if (formState.name == "") {
    isName.value = true
    return
  }
  if (formState.phone == "") {
    isPhone.value = true
    return
  }
  if (formState.postcode == "") {
    isPostcode.value = true
    return
  }
  if (formState.regionCode == "") {
    isRegioncode.value = true
    return
  }
  if (formState.city == "" && formState.addressType == 1) {
    isCity.value = true
    return
  }
  if (formState.prefecture == "" && formState.addressType == 0) {
    isPrefecture.value = true
    return
  }
  if (formState.address == "") {
    isAddress.value = true
    return
  }
  if (payment.value !== 'usdc' && payment.value !== 'sol') {
    isCheckpay.value = true
    return
  }

  const res = await axios.post("/tsg/player/upShippingAddress", formState);
  if (res.data.code == 200) {
    let getOrderType = ''
    let getOrderList = []
    dataSource.value.forEach(item => {
      getOrderList.push(item.id)
    })
    if (payment.value == 'usdc') {
      getOrderType = 'usdc'
    } else {
      getOrderType = "sol";
    }
    const payRes = await axios.post("/tsg/pay/reqWalletPayCreateOrder", {
      type: 2,
      baseCurrencyCode: "usd",
      baseCurrencyAmount: 0,
      currencyCode: getOrderType,
      cardIdList: getOrderList,
      regionName: formState.regionCode,
    });
    if (payRes.data.code == 200) {
      payFee.value = payRes.data.data.order;
      showModal.value = true;
    }
  }
};

const changeInput = (val) => {
  if(val == 'email'){
    isEmail.value = false
  }else if (val == 'country'){
    isCountry.value = false
  }else if (val == 'name'){
    isName.value = false
  }else if (val == 'phone'){
    isPhone.value = false
  }else if (val == 'postcode'){
    isPostcode.value = false
  }else if (val == 'city'){
    isCity.value = false
  }else if (val == 'prefecture'){
    isPrefecture.value = false
  }else if (val == 'address'){
    isAddress.value = false
  }else if (val == 'payment'){
    isCheckpay.value = false
  }

}

const handleBack = () => {
  router.push("sell");
  //   router.back()//按需选择
};
const handleCancel = () => {
  showModal.value = false;
  showResult.value = true;
};
// 结果弹窗
const isSuccess = ref(true);
const showResult = ref(false);
const toWallet = new PublicKey("86QWt6CRdUVNUgbzBnhES7C1PVFzkceodcYVryGWC7pY");
const usdMintAddress = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

const handleConfirm = async () => {
  var transferLamports;

  if (payFee.value.currencyCode == "sol") {
    transferLamports = 1000000000 * payFee.value.currencyNum; // 1 SOL (1 SOL = 1,000,000,000 lamports)
  } else {
    transferLamports = payFee.value.currencyNum * 10 ** 6; // 1 SOL (1 USDC = 1,000,000 lamports)
  }

  if (localStorage.getItem("local") == "Wallet") {
    const res = await axios.get("/tsg/pay/reqWalletPayWeb2", {
      params: {
        gameOrderId: payFee.value.gameOrderId,
        lamports: transferLamports,
        currencyCode: payFee.value.currencyCode,
      },
    });
  } else {
    const connection = selectConnection(localStorage.getItem("local"));
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    const wallet = selectWallet(localStorage.getItem("local"));
    const fromAddress = new PublicKey(playerInfo().user.account);
    if (payFee.value.currencyCode == "sol") {
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: fromAddress,
      }).add(
        SystemProgram.transfer({
          fromPubkey: fromAddress,
          toPubkey: toWallet,
          lamports: transferLamports,
        })
      );
      const signatures = await wallet.signAndSendTransaction(transaction);
      const res = await axios.get("/tsg/pay/reqWalletPay", {
        params: {
          gameOrderId: payFee.value.gameOrderId,
          transactionId: signatures.signature,
        },
      });
    } else {
      const umi = useUmiWallet().umi;
      const sourceTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        usdMintAddress,
        fromAddress
      );
      const destinationTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        usdMintAddress,
        toWallet
      );
      const tx = await transferTokens(umi, {
        source: sourceTokenAccount,
        destination: destinationTokenAccount,
        authority: fromAddress,
        amount: payFee.value.currencyNum * 10 ** 6,
      }).sendAndConfirm(umi);
      const res = await axios.get("/tsg/pay/reqWalletPay", {
        params: {
          gameOrderId: payFee.value.gameOrderId,
          transactionId: bs58.encode(tx.signature),
        },
      });
    }
  }

  showModal.value = false;
  showResult.value = true;

  goPage();
};

const goPage = () => {
  const resultList = JSON.parse(localStorage.getItem("redeem"));
  localStorage.setItem("sellList", "");

  if (resultList.length == 0) {
    // 去背包
    router.push({ path: "/user-info" });
  } else {
    router.push({ path: "/result" });
  }
};

const closeResultModal = () => {
  showModal.value = false;
  showResult.value = false;
};

const dataSource = ref([]);

const columns = ref([
  {
    title: "ITEM",
    dataIndex: "item",
    key: "item",
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
]);

onMounted(() => {
  shippingInit();
});

const shippingInit = () => {
  dataSource.value = JSON.parse(localStorage.getItem("sellList"));
};

const changeSelect = (value) => {
  formState.country = value;
  const index = countries.findIndex((item) => item.name == value);
  formState.regionCode = countries[index].code;
  if (value == "Japan") {
    formState.addressType = 0;
    formState.city = "Japan";
  } else {
    formState.addressType = 1;
    formState.city = "";
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  margin: 60px 0;
  color: #fff;
  text-align: center;

  .title {
    margin-bottom: 20px;
    display: inline-block;
    color: #fff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  .form-title {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #fff;
  }

  .form-title__desc {
    font-size: 16px;
    color: #717680;
  }

  .content-box__form {
    text-align: left;
  }

  .footer-btns {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;

    .btn1 {
      width: 100%;
      margin-right: 16px;
      padding: 0 64px;
      font-weight: 600;
      color: #ffffff;
      font-size: 20px;
      display: inline-block;
      cursor: pointer;
      background-image: linear-gradient(to right, #1f0c27, #1f0c27),
        linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
    }

    .btn2 {
      width: 100%;
      padding: 0 64px;
      height: 48px;
      line-height: 48px;
      display: inline-block;
      border-radius: 48px;
      border: 1px solid #3f3f3f;
      cursor: pointer;
    }
  }
}

//   弹窗1样式
.confirm-box {
  color: #fff;

  .confirm-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }

  .confirm-desc {
    margin: 24px 0;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .confirm-content {
    padding: 24px;
    border-radius: 24px;
    background-color: #36253d;
    color: #fff;

    .confirm-content-title {
      font-size: 16px;
      font-weight: 600;
    }

    .confirm-content-item {
      margin-top: 24px;
      display: flex;
      align-items: center;
      font-size: 14px;

      .label {
        font-weight: 600;
        min-width: 100px;
      }
    }
  }
}

// 弹窗2 样式
.result-box {
  color: #fff;
  text-align: center;

  .result-title {
    font-size: 24px;
    font-weight: 600;
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
}

.footer-btn__modal {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;

  .btn1 {
    margin-right: 16px;
    padding: 0 64px;
    font-weight: 600;
    color: #ffffff;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
    background-image: linear-gradient(to right, #1f0c27, #1f0c27),
      linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
  }

  .btn2 {
    padding: 0 64px;
    height: 48px;
    line-height: 48px;
    display: inline-block;
    border-radius: 48px;
    border: 1px solid #3f3f3f;
    cursor: pointer;
  }
}

.footer-btn__modal2 {
  text-align: center;

  .btn1 {
    font-size: 20px;
    padding: 0 20px;
    width: 140px;
    cursor: pointer;
  }

  .btn2 {
    font-size: 20px;
    padding: 0 20px;
    width: 140px;
    cursor: pointer;
  }
}

@media (max-width: 576px) {
  .shipping {
    margin: 12px 24px;

    .title {
      font-size: 16px;
    }

    .footer-btns {
      display: block;

      .btn1 {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }

  .confirm-box {
    .footer-btn__modal {
      display: block;
      text-align: center;

      .btn1 {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.ant-input,
.ant-select {
  background: #1f0c27;
  color: #fff;
}

.ant-input::placeholder {
  color: #717680;
}

// 单选框样式
.ant-radio-wrapper-in-form-item {
  border: 1px solid #3f3f3f;
  height: 56px;
  line-height: 56px;
  border-radius: 16px;
  padding: 0 16px;
  margin-right: 4px;
}

@media (max-width: 576px) {
  .ant-radio-wrapper-in-form-item {
    margin-bottom: 8px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
