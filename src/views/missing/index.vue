<template>
  <div class="missing-content">
    <div class="base-title base-border">
      <img
        @click="handleBack"
        src="../../assets/arrow-left.svg"
        class="back-icon"
      />
      Missions and rewards
    </div>

    <div class="wrap">
      <div class="left">
        <div class="user-box">
          <img src="../../assets/avatar.svg" class="avatar-icon" />

          <div @click="goPage" class="edit-box">
            <span>Player678</span>
            <img src="../../assets/edit.svg" style="margin-left: 8px" />
          </div>
        </div>
        <div class="total-box d-flex justify-content-between">
          <div class="candy-number">
            <div>Total rewards balance</div>
            <div class="d-flex align-item-center justify-content-center">
              <img src="../../assets/candy.svg" alt="" />
              <span class="fs-24">6868</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="rank-number">
            <div>Your rank</div>
            <div class="d-flex align-item-center justify-content-center">
              <img src="../../assets/rank.svg" alt="" />
              <span class="fs-24">41</span>
            </div>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="right">
        <div class="tab-box">
          <div class="tab-header">
            <div
              @click="switchTab('Rewards')"
              class="header-btn"
              :class="activeTab === 'Rewards' ? 'active' : ''"
            >
              Rewards
            </div>
            <div
              @click="switchTab('Leaderboard')"
              class="header-btn"
              :class="activeTab === 'Leaderboard' ? 'active' : ''"
            >
              Leaderboard
            </div>
          </div>

          <!-- rewards Tab -->
          <div v-if="activeTab === 'Rewards'" class="tab-content">
            <div class="tab-item-title">DAILY MISSIONS</div>

            <div
              v-for="(item, index) in dailyMissionsList"
              :key="index"
              class="detail-item"
            >
              <!-- web端 -->
              <div
                class="web-style d-flex align-items-center justify-content-between"
              >
                <div>{{ item.name }}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <img src="../../assets/candy.svg" alt="" />
                  <span class="detail-item-number">+{{ item.candy }}</span>
                  <div v-if="!item.verified" class="right-btn">Verity</div>
                  <div v-else class="right-btn disabled">Completed</div>
                </div>
              </div>
              <!-- 手机端 -->
              <div class="h5-style">
                <div class="text-box">
                  <div>{{ item.name }}</div>
                  <div>
                    <img src="../../assets/candy.svg" alt="" />
                    <span class="detail-item-number">+{{ item.candy }}</span>
                  </div>
                </div>
                <div v-if="!item.verified" class="right-btn">Verity</div>
                <div v-else class="right-btn disabled">Completed</div>
              </div>
            </div>

            <div class="tab-item-title">SUPREME MISSION</div>

            <!-- supremeMissionsList -->
            <div
              v-for="(item, index) in supremeMissionsList"
              :key="index"
              class="detail-item"
            >
              <!-- web端 -->
              <div
                class="web-style d-flex align-items-center justify-content-between"
              >
                <div>{{ item.name }}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <img src="../../assets/candy.svg" alt="" />
                  <span class="detail-item-number">+{{ item.candy }}</span>
                  <div v-if="!item.verified" class="right-btn">Verity</div>
                  <div v-else class="right-btn disabled">Completed</div>
                </div>
              </div>
              <!-- 手机端 -->
              <div class="h5-style">
                <div class="text-box">
                  <div>{{ item.name }}</div>
                  <div>
                    <img src="../../assets/candy.svg" alt="" />
                    <span class="detail-item-number">+{{ item.candy }}</span>
                  </div>
                </div>
                <div v-if="!item.verified" class="right-btn">Verity</div>
                <div v-else class="right-btn disabled">Completed</div>
              </div>
            </div>
          </div>

          <!-- leaderboard Tab -->
          <div v-if="activeTab === 'Leaderboard'" class="tab-content">
            <div class="table-wrap">
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
                  <template v-if="column.key === 'username'">
                    <div class="d-flex align-items-center">
                      <img
                        src="../../assets/avatar.svg"
                        class="me-2 d-none d-md-block"
                        style="width: 40px"
                      />
                      <span class="item-desc">{{ record.username }}</span>
                    </div>
                  </template>

                  <template v-if="column.key === 'points'">
                    <div class="d-flex align-items-center">
                      <img
                        src="../../assets/candy.svg"
                        class="me-2 d-none d-md-block"
                      />
                      <span class="item-desc">{{ record.points }}</span>
                    </div>
                  </template>

                  <template v-if="column.key === 'totalPoints'">
                    <div class="d-flex align-items-center">
                      <img
                        src="../../assets/candy.svg"
                        class="me-2 d-none d-md-block"
                      />
                      <span class="item-desc">{{ record.totalPoints }}</span>
                    </div>
                  </template>
                </template>

                <template #summary>
                  <a-table-summary fixed>
                    <a-table-summary-row>
                      <a-table-summary-cell>41</a-table-summary-cell>
                      <a-table-summary-cell>
                        <div class="d-flex align-items-center">
                          <img
                            src="../../assets/avatar.svg"
                            class="me-2 d-none d-md-block"
                            style="width: 40px"
                          />
                          <span class="item-desc"> You </span>
                        </div></a-table-summary-cell
                      >
                      <a-table-summary-cell>
                        <div class="d-flex align-items-center">
                          <img
                            src="../../assets/candy.svg"
                            class="me-2 d-none d-md-block"
                          />
                          <span class="item-desc">100</span>
                        </div>
                      </a-table-summary-cell>
                      <a-table-summary-cell>
                        <div class="d-flex align-items-center">
                          <img
                            src="../../assets/candy.svg"
                            class="me-2 d-none d-md-block"
                          />
                          <span class="item-desc">10000</span>
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
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { customHeaderCell, customCell } from "@/utils";

const router = useRouter();

const activeTab = ref("Rewards");
const switchTab = (tabName) => {
  activeTab.value = tabName;
};

const dailyMissionsList = ref([
  {
    name: "Daily mission 1",
    candy: 100,
    verified: false,
  },
  {
    name: "Daily mission 2",
    candy: 100,
    verified: true,
  },
]);

const supremeMissionsList = ref([
  {
    name: "Supreme mission 1",
    candy: 100,
    verified: false,
  },
  {
    name: "Supreme mission 2",
    candy: 500,
    verified: true,
  },
  {
    name: "Supreme mission 3",
    candy: 500,
    verified: true,
  },
]);

const columns = ref([
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
  },
  {
    title: "24h POINTS",
    dataIndex: "points",
    key: "points",
  },
  {
    title: "TOTAL POINTS",
    key: "totalPoints",
    dataIndex: "totalPoints",
  },
]);

const dataSource = [
  {
    index: "1",
    username: "User17z",
    points: "100",
    totalPoints: "123412",
  },
  {
    index: "2",
    username: "User17z",
    points: "100",
    totalPoints: "123412",
  },
  {
    index: "3",
    username: "User17z",
    points: "100",
    totalPoints: "123412",
  },
  {
    index: "4",
    username: "User17z",
    points: "100",
    totalPoints: "123412",
  },
  {
    index: "5",
    username: "User17z",
    points: "100",
    totalPoints: "123412",
  },
];

const handleBack = () => {
  router.back();
};

const goPage = () => {
  router.push({
    name: "accountSetting",
  });
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
          margin-bottom: 24px;
        }
        .edit-box {
          font-size: 24px;
          font-weight: 600;
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

            &.active {
              background-color: #3b3b3b;
              border: 1px solid transparent;
              background-clip: padding-box, border-box;
              background-origin: padding-box, border-box;
              background-image: linear-gradient(to right, #3b3b3b, #3b3b3b),
                linear-gradient(
                  90deg,
                  #1e58fc,
                  #a427eb,
                  #d914e4,
                  #e10fa3,
                  #f10419
                );
            }
          }
        }
        .tab-content {
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
            }
            .disabled {
              color: #3f3f3f;
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
