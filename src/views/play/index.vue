<template>
  <div class="play">
    <video @ended="handleEnd" :muted="isMuted" width="100%" class="video-box" autoplay preload="auto" ref="videoPlayer">
      <source src="../../assets/game.mp4" type="video/webm" />
    </video>

    <div class="right-btns">
      <div @click="handleSkip" class="skip">Skip</div>
      <img @click="toggleMute" v-show="isMuted" src="../../assets/mute.svg" alt="" />
      <img @click="toggleMute" v-show="!isMuted" src="../../assets/mute.svg" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import bg1 from "../../assets/bg.png";
import bg2 from "../../assets/play-bg.png";
import { useRouter } from "vue-router";
const router = useRouter();

const isMuted = ref(false);

const toggleMute = () => {
  isMuted.value = !isMuted.value;
};
const handleEnd = () => {
  console.log("播放结束,弹出结果");

  handleSkip();
};

const videoPlayer = ref(null);
const handleSkip = () => {
  videoPlayer.value.pause();

  router.push("result");
};

onMounted(() => {
  document.querySelector(".main").classList.add("main-bg2");
  document.querySelector(".header").style = "display:none;"
  document.querySelector(".footer").style = "display:none;"
});

onUnmounted(() => {
  document.querySelector(".main").classList.remove("main-bg2");
  document.querySelector(".header").style = ""
  document.querySelector(".footer").style = ""
});
</script>

<style lang="scss" scoped>
.play {
  padding-top: 80px;

  // background-image: url("../../assets/play-bg.png");
  // background-size: 100% 100%;
  // background: url("../../assets/play-bg.png") 100% 100% cover;
  height: calc(100vh - 152px);

  .video-box {
    height: 80%;
  }

  .right-btns {
    margin-top: 60px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .skip {
      margin-right: 16px;
      //   width: 180px;
      padding: 0 40px;
      height: 48px;
      border: 1px solid #ffffff;
      color: #ffffff;
      border-radius: 48px;
      line-height: 48px;
      text-align: center;
    }
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

  .btn1 {
    margin-right: 16px;
    padding: 0 16px;
    font-weight: 600;
    color: #ffffff;
    font-size: 20px;
    display: inline-block;
    background-image: linear-gradient(to right, #1f0c27, #1f0c27),
      linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
  }

  .btn2 {
    padding: 0 16px;
    height: 48px;
    line-height: 48px;
    display: inline-block;
    border-radius: 48px;
    border: 1px solid #3f3f3f;
  }
}
</style>
