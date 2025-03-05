<template>
  <!-- 区域1 -->
  <div class="info-box">
    <!-- 在小屏幕（<576px）上显示 -->
    <div class="d-block d-sm-none small-info">
      <div class="product">
        <img src="../../../assets/project.png" class="logo" />

        <div class="text-box">
          <div class="title">
            Aggregation platform for tokyo IP brands RWA WEB 3.0 Games
          </div>
          <div class="desc">
            An innovative Game-Fi platform that seamlessly integrates Web3
            gaming with the vibrant cultural and intellectual property ecosystem
            of Tokyo.
          </div>
        </div>
        <img src="../../../assets/Buton-1.png" class="launch-icon" />

        <div class="community">
          <span>Join the community</span>

          <div>
            <img src="../../../assets/ic_round-play-arrow-1.png" alt="" />
            <img src="../../../assets/ic_round-play-arrow-2.png" alt="" />
            <img src="../../../assets/ic_round-play-arrow-3.png" alt="" />
          </div>
        </div>
      </div>
      <img src="../../../assets/user.png" class="icon1" />
      <img src="../../../assets/user.png" class="icon2" />
    </div>

    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <div class="d-none d-sm-block info">
      <div class="product flex-box">
        <div class="left">
          <div class="text-box">
            <div class="title fs-1">
              Aggregation platform for tokyo IP brands RWA WEB 3.0 Games
            </div>
            <div class="desc">
              An innovative Game-Fi platform that seamlessly integrates Web3
              gaming with the vibrant cultural and intellectual property
              ecosystem of Tokyo.
            </div>
          </div>
          <img src="../../../assets/Buton-1.png" class="launch-icon" />

          <div class="community">
            <span>Join the community</span>

            <div>
              <img src="../../../assets/ic_round-play-arrow-1.png" alt="" />
              <img src="../../../assets/ic_round-play-arrow-2.png" alt="" />
              <img src="../../../assets/ic_round-play-arrow-3.png" alt="" />
            </div>
          </div>
        </div>

        <img src="../../../assets/project.png" class="logo" />
      </div>
      <img src="../../../assets/user.png" class="icon1" />
      <img src="../../../assets/user.png" class="icon2" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
// 区域1样式

// 小屏样式
.small-info {
  position: relative;
  padding: 24px;
  .product {
    .logo {
      width: 100%;
      margin-bottom: 16px;
    }
  }
  .text-box {
    .title {
      margin-bottom: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 42px;
      text-transform: uppercase;

      color: #ffffff;
    }
    .desc {
      margin-bottom: 32px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #afafaf;
    }
  }
  .launch-icon {
    width: 156px;
  }
  .community {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #ffffff;
    }
    div {
      margin-left: 24px;
      img {
        width: 24px;
        &:nth-child(2) {
          margin: 0 12px;
        }
      }
    }
  }
  .icon1 {
    position: absolute;
    right: 16px;
    width: 48px;
    top: 760px;
    transform: rotate(15deg);
  }

  .icon2 {
    position: absolute;
    left: 16px;
    width: 52px;
    top: 860px;
    transform: rotate(-30deg);
  }
}

// 大屏样式
.info {
  margin-top: 60px;
  padding: 32px;
  .flex-box {
    display: flex;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .product {
    .logo {
      width: 35%;
      min-width: 300px;
      height: auto;
      aspect-ratio: 491 / 462;
      overflow: hidden;
      object-fit: contain;
      // width: 490px;
      // height: 462px;
    }
  }
  .text-box {
    .title {
      margin-bottom: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 56px;
      line-height: 72px;
      text-transform: uppercase;

      color: #ffffff;
    }
    .desc {
      margin-bottom: 32px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;

      color: #afafaf;
    }
  }
  .launch-icon {
    width: 207px;
  }
  .community {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      color: #ffffff;
    }
    div {
      margin-left: 32px;
      img {
        width: 32px;
        &:nth-child(2) {
          margin: 0 12px;
        }
      }
    }
  }
  .icon1 {
    position: absolute;
    right: 16px;
    width: 80px;
    top: 640px;
    transform: rotate(15deg);
  }

  .icon2 {
    position: absolute;
    left: 16px;
    width: 80px;
    top: 760px;
    transform: rotate(-30deg);
  }
}
</style>
