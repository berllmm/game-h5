<template>
  <div class="setting-content">
    <div class="base-title base-border">
      <img @click="goIn" src="../../assets/arrow-left.svg" class="back-icon" />
      Account Setting
    </div>

    <div class="wrap">
      <div class="left">
        <div class="user-box">
          <div class="avatar-box">
            <img :src="userImage" class="avatar-icon" />
            <div class="progress-box" v-if="isProgress">
              <a-progress type="circle" style="color: #fff;" :percent="progressNumber" :size="160" />
            </div>
          </div>
          <div class="user-updata">
            <label for="profile-image" class="file-upload-btn">Update profile image</label>
            <input type="file" id="profile-image" name="profile-image" @change="handleFileChange" accept="image/*">
          </div>
        </div>
      </div>
      <div class="right">
        <a-form :model="formState" name="horizontal_login" autocomplete="off" class="content-box__form">
          <div class="form-title">Username</div>

          <!-- email -->
          <div class="row">
            <div class="col-12">
              <a-form-item name="userName">
                <a-input v-model:value="user.playerName" placeholder="userName *">
                </a-input>
              </a-form-item>
            </div>
          </div>
        </a-form>

        <!-- 钱包列表 -->
        <div class="form-title mb-24">Linked wallets</div>
        <div v-for="(item, index) in walletList" :key="index"
          class="wallets-item d-flex align-items-center justify-content-between">
          <div class="wallet-item-text">
            <img src="../../assets/header-wallet.svg" alt="" />
            <span style="white-space: normal;">{{ item.walletName }}</span>
          </div>
          <div class="wallet-item-btn" @click="closeDisconnect">Disconnect</div>
        </div>
        <!-- 账号列表 -->
        <div class="form-title mb-24">Linked accounts</div>

        <div v-for="(item, index) in accountList" :key="index"
          class="account-item d-flex align-items-center justify-content-between">
          <div class="account-item-text d-flex align-items-center">
            <img :src="item.accountIMG" alt="" />
            <span class="name-box">
              {{ item.accountName }}
            </span>
          </div>
          <div v-if="!item.isLInked" class="account-item-btn" @click="linkWallet(item.tag)"
            :class="!item.isLInked ? 'account-item-btn-border' : ''">
            Link
          </div>
          <div v-if="item.isLInked" class="account-item-btn" @click="unLink(item.tag)">Unlink</div>
        </div>

        <div class="footer-btn" @click="apply">Apply changes</div>
      </div>
    </div>
  </div>

  <Modal v-model="showModal" width="400px">
    <div class="results-box">
      <div>
        <div class="result-title">{{ tip }}</div>
        <img v-if="tipVisible" src="../../assets/result-success.svg" class="result-img" />
        <img v-else src="../../assets/result-err.svg" class="result-img" />
        <div class="result-tips">
          {{ tipText }}
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import * as Bytescale from "@bytescale/sdk";
import img1 from "@/assets/ic_round-play-arrow-1.png";
import img2 from "@/assets/ic_round-play-arrow-2.png";
import img3 from "@/assets/ic_round-play-arrow-3.png";
import { playerInfo, useChangePrize } from "../../utils/counter";
import axios from "@/utils/axios";
import moren from '../../assets/avatar.svg'
import Modal from "@/components/Modal.vue";
import { useRouter } from "vue-router";
import VueCookie from "vue-cookie";

const fileList = ref([]);
const tipVisible = ref(true)
const showModal = ref(false)

const walletList = ref([]);

const accountList = ref([
  {
    accountName: "X Account",
    accountIMG: img1,
    isLInked: false,
  },
  {
    accountName: "Discord Account",
    accountIMG: img2,
    isLInked: false,
  },
  {
    accountName: "Telegram Account @abkalm",
    accountIMG: img3,
    isLInked: true,
  },
]);

const formState = reactive({
  userName: "Player678",
});

const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_kW15bb56eKyZReN3E35ig1tMTJwm",
});

onMounted(() => {
  infoInit()
})

const user = ref({})
const userImage = ref('')
const tipText = ref('')
const router = useRouter()

const goIn = () => {
  router.back()
}

const infoInit = async () => {
  const result = await axios.post("/tsg/player/playerInfo");
  if (result.data.code == 200) {
    user.value = result.data.data
    walletList.value = []
    localStorage.setItem('oldName', user.value.playerName)
    walletList.value.push({
      walletName: user.value.walletAddress
    })
    userImage.value = user.value.avatarUrl == '' ? moren : user.value.avatarUrl
    accountList.value = [
      {
        accountName: `X Account @${user.value.twitterUserName}`,
        accountIMG: img1,
        tag: 'x',
        name: user.value.twitterUserName,
        isLInked: user.value.twitterUserId == '' ? false : true,
      },
      {
        accountName: `Discord Account @${user.value.discordUserName}`,
        accountIMG: img2,
        tag: 'discord',
        name: user.value.discordUserName,
        isLInked: user.value.discordUserId == '' ? false : true,
      },
      {
        accountName: `Telegram Account @${user.value.telegramUserName}`,
        accountIMG: img3,
        tag: 'telegram',
        name: user.value.telegramUserName,
        isLInked: user.value.telegramUserId == '' ? false : true,
      },
    ]
  }

}

const linkWallet = (val) => {
  if (val == 'x') {
    bindX()
  } else if (val == 'discord') {
    toBind()
  } else if (val == 'telegram') {
    bindTelegram()
  }
}

const unLink = (val) => {
  if (val == 'x') {
    toUnBindX()
  } else if (val == 'discord') {
    toUnBind()
  } else if (val == 'telegram') {
    toUnBindtelegram()
  }
}

// 绑定discord
const toBind = () => {
  const discordAuthUrl =
    "https://discord.com/oauth2/authorize?client_id=1274989322009055254&response_type=code&redirect_uri=https%3A%2F%2Ftokyostupidgames.io&scope=identify+guilds";
  window.location.href = discordAuthUrl;
};

//解绑discord
const toUnBind = async () => {
  const result = await axios.get("/tsg/player/unbindDiscord");
  if (result.data.code === 200) {
    window.location.reload();
  }
};

// 绑定X
const clientId = ref("NlVRWi05ZkFYVzVTX3RkWnBsdkY6MTpjaQ");
const scope = ref("tweet.read%20users.read%20follows.read%20offline.access");
// 替换线上地址
const redirectUri = ref("https://tokyostupidgames.io");
const bindX = async () => {
  const e = 16;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));

  const encoder = new TextEncoder();
  const data = encoder.encode(n);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const base64String = btoa(String.fromCharCode(...hashArray)); // Convert bytes to base64 string
  const base64Url = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const pathAddress = base64Url;

  localStorage.setItem("verifierlin", n);
  localStorage.setItem("verifier", pathAddress);

  const stateAddress = randomString(16);

  localStorage.setItem("state", stateAddress);

  window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId.value}&redirect_uri=${redirectUri.value}&scope=${scope.value}&state=${stateAddress}&code_challenge=${pathAddress}&code_challenge_method=S256`;
};

// 创建随机字段
const randomString = (e) => {
  e = e;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));

  return n;
};

//解绑X
const toUnBindX = async () => {
  const result = await axios.get("/tsg/player/unbindTwitter");
  if (result.data.code === 200) {
    window.location.reload();
  }
};

//解绑绑定telegram
const toUnBindtelegram = async () => {
  const result = await axios.get("/tsg/player/unbindTelegram");
  if (result.data.code === 200) {
    window.location.reload();
  }
};

// 绑定telegram
const bindTelegram = async () => {
  const user = await getTelegram()

  const params = {
    data: JSON.stringify(user),
  };


  const result = await axios.get("/tsg/player/bindTelegram", { params });
  if (result.data.code === 200) {
    window.location.reload();
  }
};

const getTelegram = () => {
  window.Telegram.Login.auth(
    {
      bot_id: "7326724747:AAHpilLpNQ2aQHGp4U8-OgCrbryJPWSfydg",
      request_access: "write",
      embed: 1,
    },
    (data) => {
      if (!data) {
        //失败逻辑 提示用户取消授权
        return;
      }

      // 成功逻辑
      this.$emit("callback", data);
    }
  );
}

const progressNumber = ref(0)
const isProgress = ref(false)

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userImage.value = e.target.result;
      user.value.avatarUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    const { fileUrl, filePath } = await uploadManager.upload({
      data: file, onProgress: ({ progress }) => {
        isProgress.value = true
        progressNumber.value = progress
      }
    });
    isProgress.value = false
    userImage.value = fileUrl;
    user.value.avatarUrl = fileUrl
  } else {
    alert('Please select a valid image file.')
  }
};

//更改
const apply = async () => {
  const oldname = localStorage.getItem('oldName')
  const name = oldname == user.value.playerName ? '' : user.value.playerName

  const params = {
    avatarUrl: user.value.avatarUrl,
    playerName: name,
    userName: '',
    email: "",
    address: "",
  }
  const result = await axios.post("/tsg/player/updatePlayerInfo", params);
  if (result.data.code === 1) {
    showModal.value = true
    tipVisible.value = false
    tipText.value = 'Someone is already using this name, please change it again.'
    return;
  }
  infoInit()
  useChangePrize().changePrize()
  showModal.value = true
  tipVisible.value = true
  tipText.value = 'successful'
};

const closeDisconnect = () => {

  VueCookie.delete("token");
  router.push({ path: "/" }).then(() => {
    window.location.reload()
  })
}
</script>

<style lang="scss" scoped>
.setting-content {
  margin-top: 60px;
  background-color: #1f0c27;
  border-radius: 32px;
  padding: 40px;
  text-align: center;
  color: #fff;

  .base-title {
    text-transform: uppercase;
  }

  .back-icon {
    display: none;
  }

  .wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    // 左侧样式
    .left {
      width: 340px;

      .user-box {
        padding-bottom: 40px;

        .avatar-box {
          position: relative;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 24px;

          .avatar-icon {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .progress-box {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .4);
          }
        }

        .edit-box {
          font-size: 24px;
          font-weight: 600;
        }

        .user-updata {
          position: relative;

          .file-upload-btn {
            display: inline-block;
            font-size: 16px;
            font-weight: 600;
            border: 1px solid #3f3f3f;
            border-radius: 40px;
            line-height: 40px;
            height: 40px;
            color: #fff;
            width: 195px;
            cursor: pointer;
          }

          input {
            display: none;
          }
        }
      }

      .upload-btn {
        font-size: 16px;
        font-weight: 600;
        border: 1px solid #3f3f3f;
        border-radius: 40px;
        line-height: 40px;
        height: 40px;
        color: #fff;
        width: 195px;
      }
    }

    .right {
      flex: 1;
      margin-left: 40px;

      .form-title {
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #fff;
      }

      .wallets-item {
        margin-bottom: 24px;

        .wallet-item-btn {
          cursor: pointer;
        }
      }

      .account-item {
        margin-bottom: 24px;

        &-btn {
          font-size: 16px;
          font-weight: 500;
          width: 114px;
          line-height: 40px;
          text-align: center;
          border-radius: 40px;
          cursor: pointer;
        }

        &-btn-border {
          border: 1px solid #3f3f3f;
          font-weight: 600;
        }

        .name-box {
          margin-left: 8px;
          display: inline-block;
          text-align: left;
        }
      }

      .mb-24 {
        margin-bottom: 24px;
      }

      .footer-btn {
        margin-top: 40px;
        margin-left: 120px;
        border-radius: 40px;
        border: 1px solid #3f3f3f;
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
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
      // margin-right: 16px;
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
  .setting-content {
    margin-top: 0;
    background-color: #1f0c27;
    border-radius: 0;
    padding: 0;
    position: relative;

    .back-icon {
      display: inline-block;
      position: absolute;
      left: 16px;
      top: 16px;
    }

    .base-title {
      display: block;
      background: #36253d;
      height: 64px;
      line-height: 64px;
      font-size: 20px;
      border: none;
      text-transform: none;
    }

    .wrap {
      display: block;
      padding: 32px 24px;

      .left {
        width: 100%;
        display: flex;
        flex-direction: column;

        .user-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .avatar-box {
            position: relative;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 24px;

            .avatar-icon {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .progress-box {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, .4);
            }
          }
        }
      }

      .right {
        margin-left: 0;

        .account-item {
          .name-box {
            margin-left: 8px;
            max-width: 200px;
            display: inline-block;
            text-align: left;
          }
        }

        .footer-btn {
          margin: 24px auto;
        }
      }
    }
  }
}

.setting-content .wrap .right .wallets-item {
  display: flex;
}

.setting-content .wrap .right .wallets-item>div {
  width: 75%;
}

.setting-content .wrap .right .wallets-item .wallet-item-text span {
  width: calc(100% - 48px);
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
}

.setting-content .wrap .right .wallets-item .wallet-item-btn {
  width: 23%;
}

.setting-content .wrap .right .wallets-item .wallet-item-text {
  display: flex;
  align-items: center;
}

.setting-content .wrap .right .wallets-item .wallet-item-text span {
  white-space: normal;
}


:deep(.ant-upload-list) {
  display: none;
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
</style>
