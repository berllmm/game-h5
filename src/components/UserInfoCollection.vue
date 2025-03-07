<template>
  <div class="account-result-box">
    <Result :userList="userList" :showTitle="false" />
  </div>
</template>

<script setup>
import Result from "@/components/Results.vue";
import axios from "@/utils/axios";
import { ref, watch } from "vue";

const props = defineProps({
  activeKey: String
})

const userTrueList = ref([])
const userList = ref([])

const userInit = async () => {
  const res = await axios.get("/tsg/player/getCardNftList");

  if (res.data.code == 200) {
    userTrueList.value = res.data.data;
    userList.value = await removeFalsePayFreight(userTrueList.value)     // payFreight
  }
}

function removeFalsePayFreight(arr) {
  return arr.filter(item => item.payFreight !== true);
}

watch(
  () => props.activeKey,
  (newVal, oldVal) => {
    if (newVal == '2') {
      userInit()
    }
  }
)
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .account-result-box {
    padding: 0 16px;
  }
}
</style>
