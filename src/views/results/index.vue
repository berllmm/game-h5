<template>
  <div class="result-box modal-border">
    <BaseHeader title="Result" :showBackIcon="false" />
    <Result :userList="userList" />

    <div class="footer-btns">
      <div @click="handleAgain" class="btn1 base-round-border">Spin again</div>
      <!-- <div @click="goPage" class="btn2">My Inventory</div> -->
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
        <div class="footer-btn__modal footer-btn__modal2">
          <div @click="closeModal" class="btn2">Cancel</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import Result from "@/components/Result.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import { onMounted, ref } from "vue";
import axios from "@/utils/axios";
import { useChangePrize } from "../../utils/counter";

const router = useRouter();
const tip = ref("");
const showModal = ref(false);
const tipText = ref("");
const tipVisible = ref(false);

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  getWinnerInit();
});

const userList = ref([]);

const getWinnerInit = async () => {
  if (!localStorage.getItem("redeem") || JSON.parse(localStorage.getItem("redeem")).length == 0) {
    router.push({ path: '/' })
  }
  const refList = JSON.parse(localStorage.getItem("redeem"));
  const idList = [];
  refList.forEach((item) => {
    idList.push(item.id);
  });

  const res = await axios.post("/tsg/player/getCardInPack", {
    cardIdList: idList,
  });

  if (res.data.code == 200) {
    userList.value = res.data.data.list;
    localStorage.setItem("redeem", JSON.stringify(userList.value));
    userList.value.forEach((item, index) => {
      item.key = index;
    });

    if (userList.value.length == 0) {
      router.push({ name: "profile" });
    }
  }
};

const handleAgain = async () => {
  if (userList.value.length > 0) {
    showModal.value = true;
    tipText.value = "Please finish all NFT operations";
    tipVisible.value = false;
    tip.value = "Error";
    return;
  }

  router.push({ path: `/game-detail?id=${localStorage.getItem("gachaId")}` })
};

const goPage = () => {
  if (userList.value.length > 0) {
    showModal.value = true;
    tipText.value = "Please finish all NFT operations";
    tipVisible.value = false;
    return;
  }

  router.push({
    name: "userInfo",
    query: {
      type: 4,
    },
  });
};
</script>

<style lang="scss" scoped>
.result-box {
  // margin: 60px 110px;
  margin: 60px 0;
  position: relative;
}

.results-box {
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

@media (max-width: 576px) {
  .result-box {
    // margin: 12px 24px;
    margin: 0;
  }

  .modal-border {
    border-radius: 0;
    border: none;
    padding: 0;
    height: 100vh;
  }
}
</style>

<style lang="scss">
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

  div {
    width: 240px;
    text-align: center;
  }

  .btn1 {
    margin-right: 16px;
    padding: 0 16px;
    font-weight: 600;
    color: #ffffff;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
    background-image: linear-gradient(to right, #1f0c27, #1f0c27),
      linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);

    &.base-round-border {
      margin-right: 0;
    }
  }

  .btn2 {
    padding: 0 16px;
    height: 48px;
    line-height: 48px;
    display: inline-block;
    border-radius: 48px;
    border: 1px solid #3f3f3f;
    cursor: pointer;
  }
}

@media (max-width: 576px) {
  .footer-btns {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btn1 {
      margin-bottom: 16px;
      margin-right: 0;
      font-size: 16px;
    }

    .btn2 {
      font-size: 16px;
    }
  }
}
</style>
