<template>
  <div class="about">
    <img src="../../../assets/about.png" alt="" />
    <div class="title">
      <img src="../../../assets/title.png" alt="" />
    </div>
    <div class="desc fs-6">
      Tokyo Stupid Games (TSG) is an innovative Game-Fi platform that seamlessly
      integrates Web3 gaming with the vibrant cultural and intellectual property
      ecosystem of Tokyo. By leveraging advanced blockchain technology and
      authentic Tokyo brands, TSG creates a unique user experience where players
      can earn real-world asset (RWA) NFTs through casual gaming.
    </div>

    <div class="card-info">
      <img src="../../../assets/card1.png" class="card-item" />
      <img src="../../../assets/card-center.svg" class="card-line" />
      <img src="../../../assets/card2.png" class="card-item" />
      <img src="../../../assets/card-center.svg" class="card-line" />
      <img src="../../../assets/card3.png" class="card-item" />
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.about {
  padding: 0 32px;
  text-align: center;
  .title {
    margin-top: 16px;

    text-align: center;
    img {
      //   width: 600px;
      width: 60%;
    }
  }
  .desc {
    margin: 40px 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #afafaf;
  }

  .card-info {
    padding: 0 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-item {
      width: 28%;
      border-radius: 28px;
    }
    .card-line {
      width: 5%;
    }
  }
}

@media (max-width: 576px) {
  .about {
    .title {
      img {
        width: 100%;
      }
    }
  }
}
</style>
