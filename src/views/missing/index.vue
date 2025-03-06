<template>
  <div class="missing-content">
    <div class="base-title base-border">
      <img @click="handleBack" src="../../assets/arrow-left.svg" class="back-icon" />
      Missions and rewards
    </div>

    <div class="wrap">
      <div class="left">
        <div class="user-box">
          <img :src="userAvatar" class="avatar-icon" />

          <div @click="goPage" class="edit-box">
            <span>{{ userInfo.playerName }}</span>
            <img src="../../assets/edit.svg" style="margin-left: 8px" />
          </div>
        </div>
        <div class="total-box d-flex justify-content-between">
          <div class="candy-number">
            <div>Total rewards balance</div>
            <div class="d-flex align-item-center justify-content-center">
              <img src="../../assets/candy.svg" alt="" />
              <span class="fs-24">{{ cutApart(myRank.selfCandy) }}</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="rank-number">
            <div>Your rank</div>
            <div class="d-flex align-item-center justify-content-center">
              <img src="../../assets/rank.svg" alt="" />
              <span class="fs-24">{{ myRank.selfRank }}</span>
            </div>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="right">
        <div class="tab-box">
          <div class="tab-header">
            <div @click="switchTab('Rewards')" class="header-btn" :class="activeTab === 'Rewards' ? 'active' : ''">
              Rewards
            </div>
            <div @click="switchTab('Leaderboard')" class="header-btn"
              :class="activeTab === 'Leaderboard' ? 'active' : ''">
              Leaderboard
            </div>
          </div>

          <!-- rewards Tab -->
          <div v-show="activeTab === 'Rewards'" class="tab-content">
            <div class="tab-item-title">DAILY MISSIONS</div>

            <div v-for="(item, index) in dailyQuest" :key="index" class="detail-item">
              <!-- web端 -->
              <div class="web-style d-flex align-items-center justify-content-between">
                <div>{{ item.questDesc }}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <img src="../../assets/candy.svg" alt="" />
                  <span class="detail-item-number">+{{ item.questAwardCandy }}</span>
                  <div v-if="item.questState !== 0 && item.questState !== 1" class="right-btn disabled">Completed</div>
                  <div v-else class="right-btn" @click="verify(item.questId, item.questState, item.platform)">Verity
                  </div>
                </div>
              </div>
              <!-- 手机端 -->
              <div class="h5-style">
                <div class="text-box">
                  <div>{{ item.questDesc }}</div>
                  <div>
                    <img src="../../assets/candy.svg" alt="" />
                    <span class="detail-item-number">+{{ item.questAwardCandy }}</span>
                  </div>
                </div>
                <div v-if="item.questState !== 0 && item.questState !== 1" class="right-btn disabled">Completed</div>
                <div v-else class="right-btn" @click="verify(item.questId, item.questState, item.platform)">Verity</div>
              </div>
            </div>

            <div class="tab-item-title">SUPREME MISSION</div>

            <!-- supremeMissionsList -->
            <div v-for="(item, index) in superQuest" :key="index" class="detail-item">
              <!-- web端 -->
              <div class="web-style d-flex align-items-center justify-content-between">
                <div>{{ item.questDesc }}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <img src="../../assets/candy.svg" alt="" />
                  <span class="detail-item-number">+{{ item.questAwardCandy }}</span>
                  <div v-if="item.questState !== 0 && item.questState !== 1" class="right-btn disabled">Completed</div>
                  <div v-else class="right-btn" @click="verify(item.questId, item.questState, item.platform)">Verity
                  </div>
                </div>
              </div>
              <!-- 手机端 -->
              <div class="h5-style">
                <div class="text-box">
                  <div>{{ item.questDesc }}</div>
                  <div>
                    <img src="../../assets/candy.svg" alt="" />
                    <span class="detail-item-number">+{{ item.questAwardCandy }}</span>
                  </div>
                </div>
                <div v-if="item.questState !== 0 && item.questState !== 1" class="right-btn disabled">Completed</div>
                <div v-else class="right-btn" @click="verify(item.questId, item.questState, item.platform)">Verity</div>
              </div>
            </div>
          </div>

          <!-- leaderboard Tab -->
          <div v-show="activeTab === 'Leaderboard'" class="tab-content">
            <div class="table-wrap">
              <a-table :dataSource="rank" :columns="columns" :bordered="false" :pagination="false"
                :customRow="customCell" :customHeaderRow="customHeaderCell" :scroll="{ y: 400 }">
                <template #bodyCell="{ column, record, index }">
                  <template v-if="column.key === 'index'">
                    <div class="d-flex align-items-center">
                      <span class="item-desc">{{ index + 1 }}</span>
                    </div>
                  </template>

                  <template v-if="column.key === 'username'">
                    <div class="d-flex align-items-center">
                      <img :src="record.avatarUrl == '' ? userImg : record.avatarUrl" class="me-2 d-md-block" width="40"
                        height="40" style="border-radius: 50%;" />
                      <span class="item-desc">{{ record.playerName }}</span>
                    </div>
                  </template>

                  <template v-if="column.key === 'points'">
                    <div class="d-flex align-items-center">
                      <img src="../../assets/candy.svg" class="me-2 d-md-block" />
                      <span class="item-desc">{{ cutApart(record.todayCandyScore) }}</span>
                    </div>
                  </template>

                  <template v-if="column.key === 'totalPoints'">
                    <div class="d-flex align-items-center">
                      <img src="../../assets/candy.svg" class="me-2 d-md-block" />
                      <span class="item-desc">{{ cutApart(record.candyScore) }}</span>
                    </div>
                  </template>
                </template>

                <template #summary>
                  <a-table-summary fixed>
                    <a-table-summary-row>
                      <a-table-summary-cell :index="0">{{ myRank.selfRank }}</a-table-summary-cell>
                      <a-table-summary-cell :index="1">
                        <div class="d-flex align-items-center">
                          <img :src="userAvatar" class="me-2 d-md-block" width="40" height="40"
                            style="border-radius: 50%;" />
                          <span class="item-desc"> {{ userInfo.playerName }} </span>
                        </div>
                      </a-table-summary-cell>
                      <a-table-summary-cell :index="2">
                        <div class="d-flex align-items-center">
                          <img src="../../assets/candy.svg" class="me-2 d-md-block" />
                          <span class="item-desc">{{ cutApart(myRank.selfTodayCandy) }}</span>
                        </div>
                      </a-table-summary-cell>
                      <a-table-summary-cell :index="3">
                        <div class="d-flex align-items-center">
                          <img src="../../assets/candy.svg" class="me-2 d-md-block" />
                          <span class="item-desc">{{ cutApart(myRank.selfCandy) }}</span>
                        </div>
                      </a-table-summary-cell>
                    </a-table-summary-row>
                  </a-table-summary>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-model="showPopup">
    <div class="tip-txet" @click.stop>
      <p class="tip-title">
        LINK DISCORD, COMPLETE TASKS, <br />AND GET CANDY POINTS
      </p>
      <div class="tip-conent">
        <p class="title">
          <span class="fontCircle">1</span> Connect your Discord account
        </p>
        <p class="explain">
          Link your account to the Tokyo Stupid Games Discord.
        </p>
      </div>
      <div class="tip-conent">
        <p class="title">
          <span class="fontCircle">2</span> Complete tasks
        </p>
        <p class="explain">
          Link your account to the Tokyo Stupid Games Discord.
        </p>
      </div>
      <div class="tip-conent">
        <p class="title">
          <span class="fontCircle">3</span> Earn Candy points on the
          official website
        </p>
        <p class="explain">
          Return to the official website and click "verify" to claim your
          Candy point rewards.
        </p>
      </div>
      <div class="tip-btn">
        <button @click="toBind" v-if="linktip">
          <svg t="1728612992761" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2527" width="40" height="40">
            <path
              d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z"
              p-id="2528" fill="#ffffff"></path>
          </svg>LINK DISCORD
        </button>
        <button @click="toDisocrd" v-else>
          <svg t="1728612992761" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2527" width="40" height="40">
            <path
              d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z"
              p-id="2528" fill="#ffffff"></path>
          </svg>DISCORD
        </button>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { customHeaderCell, customCell } from "@/utils";
import axios from "@/utils/axios";
import userImg from '../../assets/avatar.svg'
import { cutApart } from "../../utils/burn";
import useWindow from "@/hooks/useWindow";
import Modal from "@/components/Modal.vue";

const { isLargeWindow } = useWindow();

const router = useRouter();

const activeTab = ref("Rewards");
const switchTab = (tabName) => {
  activeTab.value = tabName;
};

const columns = ref([
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: '10%',
  },
  {
    title: "USER",
    dataIndex: "username",
    key: "username",
    width: '30%',
  },
  {
    title: "24h POINTS",
    dataIndex: "points",
    key: "points",
    width: '30%',
  },
  {
    title: "TOTAL POINTS",
    key: "totalPoints",
    dataIndex: "totalPoints",
    width: '30%',
  },
]);

onMounted(async () => {
  initTable()
  await rewardsInit()
  await rankData()
  await getUserInfo()
})

const initTable = () => {
  if (isLargeWindow.value) {
    columns.value = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: '10%',
      },
      {
        title: "USER",
        dataIndex: "username",
        key: "username",
        width: '30%',
      },
      {
        title: "24h POINTS",
        dataIndex: "points",
        key: "points",
        width: '30%',
      },
      {
        title: "TOTAL POINTS",
        key: "totalPoints",
        dataIndex: "totalPoints",
        width: '30%',
      },
    ]
  } else {
    columns.value = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: 50,
      },
      {
        title: "USER",
        dataIndex: "username",
        key: "username",
        width: 200,
      },
      {
        title: "24h POINTS",
        dataIndex: "points",
        key: "points",
        width: 200,
      },
      {
        title: "TOTAL POINTS",
        key: "totalPoints",
        dataIndex: "totalPoints",
        width: 200,
      },
    ]
  }
}

const dailyQuest = ref([])
const superQuest = ref([])
const myRank = ref({})
const rank = ref([])
const userAvatar = ref('')
const userInfo = ref({})
const showPopup = ref(false)
const linktip = ref(false);

const rewardsInit = async () => {
  const result = await axios.post("/tsg/quest/list");
  const quests = result.data.data.questInfoList;
  dailyQuest.value = quests.filter((quest) => quest.questType === 1);
  const superlist = quests.filter((quest) => quest.questType === 2);
  superQuest.value = superlist.filter((quest) => quest.questId != 1002);
}

const rankData = async () => {
  const result = await axios.post("/tsg/rank/candy");
  myRank.value = result.data.data;
  rank.value = result.data.data.rankPlayerInfoList;

  if (myRank.value.avatarUrl == '') {
    userAvatar.value = userImg
  } else {
    userAvatar.value = myRank.value.avatarUrl
  }
}

const getUserInfo = async () => {
  const result = await axios.post("/tsg/player/playerInfo");
  userInfo.value = result.data.data
  console.log(userInfo.value);

}

const verify = async (id, flished, platform) => {

  if (flished != "3") {
    const data = JSON.stringify({
      questId: id,
    });
    const result = await axios.post("/tsg/quest/award", data);
    if (result.code !== 200) {
      if (userInfo.value.discordUserName == '') {
        linktip.value = true
      } else {
        linktip.value = false
      }

      showPopup.value = true
    } else {

      window.location.reload();
    }

  }
};

const handleBack = () => {
  router.back();
};

const goPage = () => {
  router.push({
    name: "accountSetting",
  });
};

const toBind = () => {
  const discordAuthUrl =
    "https://discord.com/oauth2/authorize?client_id=1274989322009055254&response_type=code&redirect_uri=https%3A%2F%2Ftokyostupidgames.io&scope=identify+guilds";
  window.location.href = discordAuthUrl;
};

const toDisocrd = () => {
  window.open("https://discord.gg/tsg", "_blank");
};
</script>

<style lang="scss" scoped>
.missing-content {
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
        border-bottom: 1px solid #3f3f3f;

        .avatar-icon {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          margin-bottom: 24px;
        }

        .edit-box {
          font-size: 24px;
          font-weight: 600;
          cursor: pointer;
        }
      }

      .total-box {
        padding: 40px 0;
        font-size: 16px;
        font-weight: 400;

        .line {
          width: 1px;
          height: 50px;
          background: #3f3f3f;
        }

        .fs-24 {
          margin-left: 8px;
          font-size: 24px;
          font-weight: 600;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 40px;

      .tab-box {
        .tab-header {
          display: flex;
          justify-content: space-between;
          border-radius: 48px;
          background-color: #212121;

          .header-btn {
            flex: 1;
            border-radius: 48px;
            line-height: 48px;
            cursor: pointer;

            &.active {
              background-color: #3b3b3b;
              border: 1px solid transparent;
              background-clip: padding-box, border-box;
              background-origin: padding-box, border-box;
              background-image: linear-gradient(to right, #3b3b3b, #3b3b3b),
                linear-gradient(90deg,
                  #1e58fc,
                  #a427eb,
                  #d914e4,
                  #e10fa3,
                  #f10419);
            }
          }
        }

        .tab-content {
          width: 740px;
          text-align: left;

          .tab-item-title {
            font-size: 20px;
            font-weight: 600;
            margin-top: 32px;
            margin-bottom: 24px;
          }

          .detail-item {
            padding-bottom: 24px;
            margin-top: 24px;
            border-bottom: 1px solid #3f3f3f;

            &-number {
              margin: 0 8px;
            }

            .right-btn {
              box-sizing: border-box;
              height: 40px;
              width: 114px;
              text-align: center;
              //   padding: 0 35px;
              line-height: 40px;
              font-size: 16px;
              font-weight: 600;
              border-radius: 40px;
              border: 1px solid #3f3f3f;
              cursor: pointer;
            }

            .disabled {
              color: #3f3f3f;
              cursor: no-drop;
            }

            .web-style {
              flex: 1;
            }

            .h5-style {
              display: none;
            }
          }
        }

        .table-wrap {
          margin-top: 32px;
        }
      }
    }
  }
}

.tip-txet {

  .close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ebebeb;
    position: absolute;
    top: 20px;
    right: 20px;
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      width: 80%;
      height: 80%;
      filter: invert(100%);
    }

    &:hover {
      background-color: #000;

      img {
        filter: invert(0);
      }
    }
  }
}

.tip-title {
  font-family: "Figtree-bold";
  text-align: center;
  font-size: 32px;
  color: #fff;
  margin-bottom: 50px;
  line-height: 1.4;
}

.tip-conent {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;

  .title {
    font-size: 18px;
    color: #fff;

    .fontCircle {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 50%;
      color: #000;
      width: 14px;
      height: 14px;
      font-size: 12px;
      margin-right: 5px;
      line-height: 1;
      vertical-align: middle;
      position: relative;
      top: -1.5px;
    }
  }

  .explain {
    font-weight: lighter;
    font-size: 13px;
    margin-top: 5px;
    color: #fff;
  }
}

.tip-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.tip-btn>button {
  width: auto;
  height: auto;
  text-align: center;
  padding: 20px 40px;
  color: #fff;
  font-size: 26px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);

  .icon {
    width: 46px;
    margin-right: 8px;
  }
}

// .tip-btn>button:hover {
//   color: #000;
//   background-color: #fff;
//   border: 1px #000 solid;

//   .icon path {
//     fill: #000;
//   }
// }

@media (max-width: 576px) {
  .missing-content {
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
        // display: flex;
        // flex-direction: column;
      }

      .right {
        margin-left: 0;

        .tab-box {
          .tab-content {
            width: auto;

            .detail-item {
              .web-style {
                display: none !important;

                flex: 1;
              }

              .h5-style {
                flex: 1;
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
    }
  }
}

:deep(.ant-table-summary) {
  margin-top: 24px;
  background-color: #1f0c27;
  color: #fff;
}
</style>
