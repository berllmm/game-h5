<template>
  <div>
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
          <div @click="goPage" class="round-btn">
            <span>Edit profile</span>
            <img src="../assets/edit.svg" class="edit" />
          </div>

          <img @click="shareLink()" src="../assets/share.svg" class="share" />
        </div>
      </div>
      <div class="content">
        <!-- tabs -->
        <div class="tabs">
          <div @click="handleSwitch('1')" class="tabs-item" :class="activeKey === '1' ? 'active' : ''">
            Tier
          </div>
          <div @click="handleSwitch('2')" class="tabs-item" :class="activeKey === '2' ? 'active' : ''">
            Collection
          </div>
          <div @click="handleSwitch('3')" class="tabs-item" :class="activeKey === '3' ? 'active' : ''">
            Activity
          </div>
          <div @click="handleSwitch('4')" class="tabs-item" :class="activeKey === '4' ? 'active' : ''">
            Shipping Inventory
          </div>
          <div @click="handleSwitch('5')" class="tabs-item" :class="activeKey === '5' ? 'active' : ''">
            Shipping History
          </div>
        </div>

        <!-- tab内容 -->
        <UserInfoTier :activeKey="activeKey" :userInfo="userInfo" v-show="activeKey === '1'" />
        <UserInfoCollection :activeKey="activeKey" v-show="activeKey === '2'" />
        <UserInfoActivity :activeKey="activeKey" v-show="activeKey === '3'" />
        <UserInfoInventory :activeKey="activeKey" v-show="activeKey === '4'" />
        <UserInfoShipping :activeKey="activeKey" v-show="activeKey === '5'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserInfoTier from "@/components/UserInfoTier.vue";
import UserInfoCollection from "@/components/UserInfoCollection.vue";
import UserInfoActivity from "@/components/UserInfoActivity.vue";
import UserInfoShipping from "@/components/UserInfoShipping.vue";
import UserInfoInventory from "@/components/UserInfoInventory.vue";
import { playerInfo } from "../utils/counter";
import morAvantar from "@/assets/avatar.svg"
import axios from "@/utils/axios";

const router = useRouter();
const route = useRoute();

const userInfo = ref({})

onMounted(async () => {
  if (route.query && route.query.type) {
    activeKey.value = route.query.type;
  }
  await InfoInit()

  activeKey.value = '1'
});

const shareLink = () => {
  window.open('https://x.com/intent/post?url=https%3A%2F%2Ftokyostupidgames.io%2Fuser%2Fshipping', "_blank")
}

const InfoInit = async () => {
  const prizeRes = await axios.post("/tsg/player/playerInfo");
  if (prizeRes.data.code == 200) {
    userInfo.value = prizeRes.data.data
    playerInfo().changeList(userInfo.value)
  }
}

const imageSrc = computed(() => {
  return userInfo.value?.avatarUrl || morAvantar;
});

const activeKey = ref("0");
const handleSwitch = (key) => {
  activeKey.value = key;
};

const goPage = () => {
  router.push("/account-setting");
};
</script>

<style lang="scss" scoped>
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

  .content {
    .tabs {
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
        min-height: 90px;
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

    .content {
      .tabs {
        font-size: 14px;
        display: flex;
        width: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        &-item {
          padding: 6px 18px;
          flex-grow: 0;
          flex-shrink: 0;
          min-height: 70px;

          &:nth-child(4),
          &:nth-child(5) {
            // width: 160px;
            width: 180px;
          }
        }
      }
    }
  }
}
</style>
