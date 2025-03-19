<template>
  <div class="footer">
    <div class="left">
      <img src="../assets/footer-logo.svg" alt="" />
    </div>

    <div class="right">
      <div class="d-none d-sm-block">
        <div class="links mr-40">
          <div class="link-item me-3" @click="openPage('about')">ABOUT</div>
          <div class="link-item me-3" @click="openPage('doc')">DOCS</div>
          <div class="link-item me-3" @click="openPage('tirms')">TERMS OF USE</div>
          <div class="link-item" @click="openPage('policy')">PRIVACY POLICY</div>
        </div>
      </div>

      <div class="softs">
        <img @click="goPage('x')" src="../assets/footer-x.svg" class="me-2" />
        <img @click="goPage('discord')" src="../assets/footer-p.svg" class="me-2" />
        <img @click="goPage('telegram')" src="../assets/footer-f.svg" alt="" />
      </div>
    </div>
  </div>

  <div class="d-block d-sm-none">
    <div class="links links-box">
      <div class="link-item" @click="openPage('about')">ABOUT</div>
      <div class="link-item" @click="openPage('doc')">DOCS</div>
      <div class="link-item" @click="openPage('tirms')">TERMS OF USE</div>
      <div class="link-item" @click="openPage('policy')">PRIVACY POLICY</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const openPage = (val) => {
  if (val == 'about') {
    router.push({ path: '/about' })
  } else if (val == 'doc') {
    window.open("https://docs.tokyostupidgames.io/", "_blank");
  } else if (val == 'tirms') {
    window.open("https://docs.tokyostupidgames.io/legal/terms-of-use", "_blank");
  } else if (val == 'policy') {
    window.open("https://docs.tokyostupidgames.io/legal/privacy-policy", "_blank");
  }
}

const goPage = (val) => {
  if (val == 'x') {
    window.open('https://x.com/TokyoStupidGame', "_blank")
  } else if (val == 'discord') {
    window.open('https://discord.com/invite/tsg', "_blank")
  } else if (val == 'telegram') {
    window.open('https://t.me/+PbSXDC3vLfowZmVl', "_blank")
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 76px;
  text-align: center;
  line-height: 76px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;
    align-items: center;
  }
}

.links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(96, 96, 96, 1);
  font-size: 12px;
}

.link-item {
  cursor: pointer;
}

.mr-40 {
  margin-right: 40px;
}

.softs img {
  cursor: pointer;
}

.links-box {
  padding: 24px 32px;
}
</style>
