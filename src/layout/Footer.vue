<template>
  <div class="footer">
    <div class="left">
      <img src="../assets/footer-logo.svg" alt="" />
    </div>

    <div class="right">
      <div class="d-none d-sm-block">
        <div class="links mr-40">
          <div class="link-item me-3">ABOUT</div>
          <div class="link-item me-3">DOCS</div>
          <div class="link-item me-3">TERMS OF USE</div>
          <div class="link-item">PRIVACY POLICY</div>
        </div>
      </div>

      <div class="softs">
        <img src="../assets/footer-x.svg" class="me-2" />
        <img src="../assets/footer-p.svg" class="me-2" />
        <img src="../assets/footer-f.svg" alt="" />
      </div>
    </div>
  </div>

  <div class="d-block d-sm-none">
    <div class="links links-box">
      <div class="link-item">ABOUT</div>
      <div class="link-item">DOCS</div>
      <div class="link-item">TERMS OF USE</div>
      <div class="link-item">PRIVACY POLICY</div>
    </div>
  </div>
</template>

<script setup></script>

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
.mr-40 {
  margin-right: 40px;
}

.links-box {
  padding: 24px 32px;
}
</style>
