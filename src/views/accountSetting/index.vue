<template>
  <div class="setting-content">
    <div class="base-title base-border">
      <img src="../../assets/arrow-left.svg" class="back-icon" />
      Account Setting
    </div>

    <div class="wrap">
      <div class="left">
        <div class="user-box">
          <img src="../../assets/avatar.svg" class="avatar-icon" />

          <a-upload
            v-model:file-list="fileList"
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <div class="upload-btn">Update profile image</div>
          </a-upload>
        </div>
      </div>
      <div class="right">
        <a-form
          :model="formState"
          name="horizontal_login"
          autocomplete="off"
          class="content-box__form"
        >
          <div class="form-title">Username</div>

          <!-- email -->
          <div class="row">
            <div class="col-12">
              <a-form-item name="userName">
                <a-input
                  v-model:value="formState.userName"
                  placeholder="userName *"
                >
                </a-input>
              </a-form-item>
            </div>
          </div>
        </a-form>

        <!-- 钱包列表 -->
        <div class="form-title mb-24">Linked wallets</div>
        <div
          v-for="(item, index) in walletList"
          :key="index"
          class="wallets-item d-flex align-items-center justify-content-between"
        >
          <div class="wallet-item-text">
            <img src="../../assets/header-wallet.svg" alt="" />
            {{ item.walletName }}
          </div>
          <div class="wallet-item-btn">Disconnect</div>
        </div>
        <!-- 账号列表 -->
        <div class="form-title mb-24">Linked accounts</div>

        <div
          v-for="(item, index) in accountList"
          :key="index"
          class="account-item d-flex align-items-center justify-content-between"
        >
          <div class="account-item-text d-flex align-items-center">
            <img :src="item.accountIMG" alt="" />
            <span class="name-box">
              {{ item.accountName }}
            </span>
          </div>
          <div
            v-if="!item.isLInked"
            class="account-item-btn"
            :class="!item.isLInked ? 'account-item-btn-border' : ''"
          >
            Link
          </div>
          <div v-if="item.isLInked" class="account-item-btn">Unlink</div>
        </div>

        <div class="footer-btn">Apply changes</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import img1 from "@/assets/ic_round-play-arrow-1.png";
import img2 from "@/assets/ic_round-play-arrow-2.png";
import img3 from "@/assets/ic_round-play-arrow-3.png";

const fileList = ref([]);

const walletList = ref([
  {
    walletName: "xxxxxxxxxxxxx",
    id: Math.random(),
  },
  {
    walletName: "xxxxxxxxxxxxx",
    id: Math.random(),
  },
  {
    walletName: "xxxxxxxxxxxxx",
    id: Math.random(),
  },
]);

const accountList = ref([
  {
    accountName: "X Account",
    accountIMG: img1,
    id: Math.random(),
    isLInked: false,
  },
  {
    accountName: "Discord Account",
    accountIMG: img2,
    id: Math.random(),
    isLInked: false,
  },
  {
    accountName: "Telegram Account @abkalm",
    accountIMG: img3,
    id: Math.random(),
    isLInked: true,
  },
]);

const formState = reactive({
  userName: "Player678",
});
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
        .avatar-icon {
          width: 160px;
          height: 160px;
          margin-bottom: 24px;
        }
        .edit-box {
          font-size: 24px;
          font-weight: 600;
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
      }
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

          .avatar-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 24px;
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
