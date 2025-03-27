<template>
  <div class="detail">
    <div class="row">
      <!-- 图片信息 -->
      <div class="col-12 col-sm-6 col-md-6">

        <div class="info-box" v-if="!isPC">
          <div class="title">{{ detailsList.name }}</div>
          <div class="user-box">
            <div class="left">
              <img src="../../assets/wwallet.png" class="avatar" />
              <span>Tokyo Stupid Games</span>
            </div>
            <div class="right">{{ detailsList.gener }}</div>
          </div>
        </div>
        <div class="img-box">
          <img :src="activeImage" class="big-img" />
          <div class="small-list">
            <div v-for="(item, index) in detailsList.imageUrlList" :key="index" :class="activeImage == item
              ? 'small-img__item active'
              : 'small-img__item'
              ">
              <img :src="item" @click="changeCurrentImage(item)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 文字信息 + 按钮 -->
      <div class="col-12 col-sm-6 col-md-6">
        <div class="info-box">
          <div class="title" v-if="isPC">{{ detailsList.name }}</div>
          <div class="user-box" v-if="isPC">
            <div class="left">
              <img src="../../assets/wwallet.png" class="avatar" />
              <span>Tokyo Stupid Games</span>
            </div>
            <div class="right">{{ detailsList.gener }}</div>
          </div>
          <div class="desc">
            {{ detailsList.description }}
          </div>
          <div class="time">
            <div class="time-text">
              <img src="../../assets/event-clock.svg" class="me-1" />
              <span class="fw-bolder me-1">Time left:</span>
              <span>{{ formatTimestamp(detailsList.endTime) }}</span>
            </div>
            <div class="time-bar">
              <div class="bar" :style="`width:${100 -
                ((detailsList.totalCardCount - detailsList.drawCardCount) /
                  detailsList.totalCardCount) *
                100
                }%`"></div>
            </div>
            <div class="ticket-text">
              <div class="left">
                <img src="../../assets/event-candy.svg" class="me-1" />
                <span class="fw-bolder me-1">{{ cutApart(detailsList.candy) }}</span>
                <span> /ticket</span>
              </div>
              <div class="right">
                <img src="../../assets/event-ticket.svg" class="me-1" />
                <span class="fw-bolder me-1">{{
                  detailsList.drawCardCount
                }}</span>
                <span> /{{ detailsList.totalCardCount }}</span>
              </div>
            </div>
          </div>
          <div class="select">
            <div class="select-title">Select Ticket Amount</div>
            <div class="select-box">
              <div @click="handleSwitchCurrentTicketValue(1)" class="select-item me-2"
                :class="currentTicketValue === 1 ? 'active' : ''">
                <div class="fw-bolder">Ticket x 1</div>
                <div>
                  <img src="../../assets/event-candy.svg" alt="" />
                  <span>{{ cutApart(detailsList.candy * 1) }}</span>
                </div>
              </div>
              <div @click="handleSwitchCurrentTicketValue(10)" class="select-item me-2"
                :class="currentTicketValue === 10 ? 'active' : ''">
                <div class="fw-bolder">Ticket x 10</div>
                <div>
                  <img src="../../assets/event-candy.svg" alt="" />
                  <span>{{ cutApart(detailsList.candy * 10) }}</span>
                </div>
              </div>
              <div @click="handleSwitchCurrentTicketValue(100)" class="select-item"
                :class="currentTicketValue === 100 ? 'active' : ''">
                <div class="fw-bolder">Ticket x 100</div>
                <div>
                  <img src="../../assets/event-candy.svg" alt="" />
                  <span>{{ cutApart(detailsList.candy * 100) }}</span>
                </div>
              </div>
            </div>
            <div @click="goPage('play')" class="play_btn border-item">Purchase Ticket to Play</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FullCardList :imgData="imgData" />

  <Modal v-model="tipVisible" width="400px">
    <div class="results-box">
      <div>
        <img src="../../assets/tip_error.svg" class="result-img" />
        <div class="result-title">Error</div>
        <div class="result-tips">
          {{ checkTicketTip }}
        </div>
      </div>
    </div>
  </Modal>

  <Modal v-model="loginVisible" width="400px">
    <div class="results-box">
      <div>
        <img src="../../assets/login_error.svg" class="result-img" />
        <!-- <div class="result-title">Error</div> -->
        <div class="result-tips">You must log in to continue.</div>
      </div>
      <div class="footer-btn__modal footer-btn__modal2">
        <div @click="goLogin" class="btn1">Login</div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "@/utils/axios";
import circle1 from "@/assets/circle1.png";
import circle2 from "@/assets/circle2.png";
import circle3 from "@/assets/circle3.png";
import circle4 from "@/assets/circle4.png";
import circle5 from "@/assets/circle5.png";
import FullCardList from "./components/FullCardList.vue";
import { useRoute, useRouter } from "vue-router";
import { playerInfo, useChangePrize, userDetailLogin, VideoUrl } from "../../utils/counter";
import Modal from "@/components/Modal.vue";
import { cutApart } from "../../utils/burn";
import useWindow from "@/hooks/useWindow";

const { isLargeWindow } = useWindow();

const isPC = ref(true)

const route = useRoute();

const imgData = ref([
  {
    typeName: "SUPER SUPER RARE",
    typeImage: circle1,
    cardList: [],
  },
  {
    typeName: "SUPER RARE",
    typeImage: circle2,
    cardList: [],
  },
  {
    typeName: "RARE",
    typeImage: circle3,
    cardList: [],
  },
  {
    typeName: "LESS COMMON",
    typeImage: circle4,
    cardList: [],
  },
  {
    typeName: "NORMAL RARE",
    typeImage: circle4,
    cardList: [],
  },
  {
    typeName: "LAST ONE",
    typeImage: circle5,
    cardList: [],
  },
]);

const changeCurrentImage = (img) => {
  activeImage.value = img;
};

onMounted(() => {
  isPC.value = isLargeWindow.value
  VideoUrl().changeUrl('')
  getDetailsInit();
});

const activeImage = ref('')
const detailsList = ref({})

const getDetailsInit = async () => {
  const res = await axios.get("/tsg/publicinfo/gachaInfo", {
    params: {
      gachaPoolId: route.query.id,
    },
  });
  if (res.data.code == 200) {
    detailsList.value = res.data.data
    activeImage.value = detailsList.value.imageUrlList[0]
    imgData.value = [
      {
        typeName: "SUPER SUPER RARE",
        typeImage: circle1,
        cardList: findPrize("SSR")?.cardInfoList,
      },
      {
        typeName: "SUPER RARE",
        typeImage: circle2,
        cardList: findPrize("SR")?.cardInfoList,
      },
      {
        typeName: "RARE",
        typeImage: circle3,
        cardList: findPrize("R")?.cardInfoList,
      },
      {
        typeName: "LESS COMMON",
        typeImage: circle4,
        cardList: findPrize("L")?.cardInfoList,
      },
      {
        typeName: "NORMAL RARE",
        typeImage: circle4,
        cardList: findPrize("NR")?.cardInfoList,
      },
      {
        typeName: "LAST ONE",
        typeImage: circle5,
        cardList: findPrize("LASTONE")?.cardInfoList,
      },
    ]
  }
};

const findPrize = (val) => {
  const index = detailsList.value.weightList.findIndex(
    (item) => item.rarity == val
  );
  return detailsList.value.weightList[index];
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回值范围是 0 到 11，所以加 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const checkTicketTip = ref("");
const tipVisible = ref(false);
// 当前选中的票数
const currentTicketValue = ref(1);
const handleSwitchCurrentTicketValue = (value) => {
  const index = detailsList.value.drawNumList.findIndex((item) => {
    item == value;
  });

  if (index == -1 && value < detailsList.value.drawCardCount) {
    currentTicketValue.value = value;
  } else if (index !== -1 || value > detailsList.value.drawCardCount) {
    tipVisible.value = true;
    checkTicketTip.value = `Less than ${value} cards in total`;
  }
};

const loginVisible = ref(false)
import { videoList } from "../../utils/video";

const router = useRouter();
// 跳转游戏开始界面
const goPage = async (path) => {
  if (currentTicketValue.value * detailsList.value.candy > playerInfo().user.candy) {
    checkTicketTip.value = `Your Candy balance is low, please top up.`
    tipVisible.value = true
    return
  }

  const res = await axios.get("/tsg/player/gachaDraw", {
    params: {
      gachaPoolId: detailsList.value.id,
      count: currentTicketValue.value,
    },
  });
  if (res.data.code == 200) {
    const code = res.data.data.gachaCardList;
    console.log(code);

    localStorage.setItem("gachaId", detailsList.value.id);
    localStorage.setItem("count", currentTicketValue.value);
    localStorage.setItem("redeem", JSON.stringify(code));
    useChangePrize().changePrize();

    // 定义rarity的权重映射
    const rarityWeights = {
      "LASTONE": 6,
      "SSR": 5,
      "SR": 4,
      "R": 3,
      "L": 2,
      "NR": 1
    };

    // 按照权重排序，返回权重最高的元素
    const highestRarityItem = code.sort((a, b) => rarityWeights[b.rarity] - rarityWeights[a.rarity])[0];

    console.log(highestRarityItem.rarity);

    const list = videoList(detailsList.value.name)

    if (highestRarityItem.rarity == 'SSR' || highestRarityItem.rarity == 'SR' || highestRarityItem.rarity == 'LASTONE') {
      VideoUrl().changeUrl(list.SSR)
    } else if (highestRarityItem.rarity == 'R' || highestRarityItem.rarity == 'L') {
      VideoUrl().changeUrl(list.R)
    } else if (highestRarityItem.rarity == 'NR') {
      VideoUrl().changeUrl(list.NR)
    }

    router.push(path);
  } else if (res.data.code == 401) {
    loginVisible.value = true
  } else {
    if (currentTicketValue.value > (detailsList.totalCardCount - detailsList.drawCardCount)) {
      checkTicketTip.value = `Less than ${currentTicketValue.value} cards in total`
      tipVisible.value = true
      return
    }
    checkTicketTip.value = `Your Candy balance is low, please top up.`
    tipVisible.value = true
  }
};

const goLogin = () => {
  loginVisible.value = false
  userDetailLogin().truePay()
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 40px;
  margin-top: 40px;
  background: #1f0c27;
  border-radius: 32px;

  //   图片信息样式
  .img-box {
    .big-img {
      width: 100%;
      height: 548px;
      background-color: #fff;
      border-radius: 12px;
      object-fit: contain;
    }

    .small-list {
      margin-top: 32px;
      height: 92px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .small-img__item {
        // width: 19%;
        width: 24.5%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #36253d;
        border-radius: 12px;
        color: #fff;
        cursor: pointer;

        &.active {
          // border: 1px solid #fff;
          border: 3px solid #3052fa;
        }

        // padding: 16px 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          object-fit: contain;
        }

        .tips-text {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          padding: 0 8px;
          word-break: break-all;
        }
      }
    }
  }

  //   右侧文字信息样式
  .info-box {
    .title {
      margin-bottom: 24px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 26px;
      /* identical to box height */
      // text-transform: uppercase;

      color: #ffffff;
    }

    .user-box {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      .left {
        .avatar {
          margin-right: 10px;
          width: 40px;
          height: 40px;
        }
      }
    }

    .desc {
      margin-bottom: 40px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.8px;
      font-family: 'IBM Plex Sans Regular';
      color: #ffffff;
    }

    .time {
      color: #fff;

      &-bar {
        position: relative;
        margin-top: 24px;
        height: 8px;
        background: #3f3f3f;
        border-radius: 8px;

        .bar {
          position: absolute;
          left: 0;
          top: 0;
          width: 20%;
          height: 100%;
          border-radius: 8px;
          background-image: linear-gradient(90deg,
              #1e58fc,
              #a427eb,
              #d914e4,
              #e10fa3,
              #f10419);
        }
      }

      .ticket-text {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .select {
      margin-top: 40px;
      color: #fff;

      &-title {
        margin-bottom: 16px;
        font-size: 16px;
        color: #fff;
        font-weight: 600;
      }

      .select-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .select-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border: 1px solid #3f3f3f;
        border-radius: 16px;
        cursor: pointer;
        // height: 72px;
      }

      .active {
        border-color: red;
      }

      .play_btn {
        margin-top: 16px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 20px;
        color: #ffffff;
        line-height: 48px;
        border-radius: 24px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .border-item {
    border: 1px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #1f0c27, #1f0c27),
      linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
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

  .result-center span {
    font-size: 24px;
    font-weight: 700;
  }

  .result-center span:nth-child(2) {
    padding: 0 10px;
  }

  .result-img {
    margin: 20px 0;
    width: 120px;
    height: 120px;
  }

  .result-tips {
    margin-top: 20px;
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
  .select-box {
    // display: block !important;
  }

  .select-item {
    margin-bottom: 8px;
  }

  .detail .info-box .select .select-item {
    padding: 16px 0;
  }

  .full .type-item .title-box {
    margin: 24px 0;
  }

  .detail {
    padding: 16px;

    .img-box {
      .big-img {
        height: 350px;
      }

      .small-list {
        margin-top: 8px !important;
        height: auto !important;

        .small-img__item {
          img {
            width: 56px !important;
            height: 56px !important;
          }
        }
      }

      .select-box {
        display: flex !important;
        font-size: 14px;
      }

      .info-box .select .select-item {
        padding: 14px 10px;
      }
    }
  }

  .detail .info-box .title {
    margin-top: 16px;
  }
}
</style>
