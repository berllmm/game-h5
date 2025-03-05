<template>
  <!-- 在中等屏幕（≥576px ）上显示 -->

  <div id="carouselExample" class="carousel slide banner d-none d-sm-block">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="bannerList[0].url" class="d-block w-100" />
        <div class="carousel-item__text">
          <div>{{ bannerList[0].title }}</div>
          <div class="round-btn" @click="openPage(1)">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="bannerList[1].url" class="d-block w-100" />
        <div class="carousel-item__text">
          <div>{{ bannerList[1].title }}</div>
          <div class="round-btn" @click="openPage(2)">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="bannerList[2].url" class="d-block w-100" />
        <div class="carousel-item__text">
          <div>{{ bannerList[2].title }}</div>
          <div class="round-btn" @click="openPage(3)">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="bannerList[3].url" class="d-block w-100" />
        <div class="carousel-item__text">
          <div>{{ bannerList[3].title }}</div>
          <div class="round-btn" @click="openPage(4)">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 切换按钮 -->
    <!-- 在中等屏幕（≥576px ）上显示 -->
    <img
      @click="handlePrev"
      class="btn-perv d-none d-sm-block cursor"
      src="../assets/banner-left.svg"
      alt=""
    />
    <img
      @click="handleNext"
      class="btn-next d-none d-sm-block cursor"
      src="../assets/banner-right.svg"
      alt=""
    />
    <!-- 指示器 -->
    <div class="carousel-indicators d-none d-sm-block">
      <button
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide-to="3"
        aria-label="Slide 4"
      ></button>
    </div>
  </div>

  <!-- 在小屏幕（<576px）上显示 -->
  <div id="carouselExample2" class="carousel slide banner d-block d-sm-none">
    <div class="carousel-inner">
      <div class="carousel-item active small-img-box">
        <img :src="bannerList[0].url" class="d-block w-100" />
        <div class="carousel-item__text--sm">
          <div>{{ bannerList[0].title }}</div>
          <div class="round-btn">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item small-img-box">
        <img :src="bannerList[1].url" class="d-block w-100" />
        <div class="carousel-item__text--sm">
          <div>{{ bannerList[1].title }}</div>
          <div class="round-btn">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item small-img-box">
        <img :src="bannerList[2].url" class="d-block w-100" />
        <div class="carousel-item__text--sm">
          <div>{{ bannerList[2].title }}</div>
          <div class="round-btn">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="carousel-item small-img-box">
        <img :src="bannerList[3].url" class="d-block w-100" />
        <div class="carousel-item__text--sm">
          <div>{{ bannerList[3].title }}</div>
          <div class="round-btn">
            Learn More <img src="../assets/link.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 指示器 -->
    <div class="carousel-indicators d-block d-sm-none">
      <button
        type="button"
        data-bs-target="#carouselExample2"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample2"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample2"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExample2"
        data-bs-slide-to="3"
        aria-label="Slide 4"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";

import banner_1 from "@/assets/banner_1.png";
import banner_2 from "@/assets/banner_2.png";
import banner_3 from "@/assets/banner_3.png";
import banner_4 from "@/assets/banner_4.png";

const bannerList = ref([
  {
    url: banner_2,
    title: "EVENT #1",
    id: Math.random(),
  },
  {
    url: banner_3,
    title: "EVENT #2",
    id: Math.random(),
  },

  {
    url: banner_1,
    title: "EVENT #3",
    id: Math.random(),
  },
  {
    url: banner_4,
    title: "EVENT #4",
    id: Math.random(),
  },
]);

let carousel = null;
const init = () => {
  const innerWidth = window.innerWidth;
  const myCarouselElement =
    innerWidth > 576
      ? document.querySelector("#carouselExample")
      : document.querySelector("#carouselExample2");

  carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 4000,
    touch: true,
  });

  carousel.cycle();

  console.log("carousel", carousel);
};

const handlePrev = () => {
  carousel && carousel.prev();
};

const handleNext = () => {
  carousel && carousel.next();
};

const openPage = (index) => {
  if (index == 1) {
    window.open("https://docs.tokyostupidgames.io/games/gacha", "_blank");
  } else if (index == 2) {
    window.open(
      "https://docs.tokyostupidgames.io/rewards/candy-point",
      "_blank"
    );
  } else if (index == 3) {
    window.open("https://docs.tokyostupidgames.io/token/what-is-tsg", "_blank");
  } else if (index == 4) {
    window.open("https://docs.tokyostupidgames.io/prizes/burn", "_blank");
  }
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.banner {
  margin: 2% 0;
}

// RESET
.carousel-control-prev,
.carousel-control-next {
  opacity: 1;
}
.carousel-inner {
  border-radius: 32px !important;
}

.btn-perv {
  position: absolute;
  right: 96px;
  bottom: 24px;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.btn-next {
  position: absolute;
  right: 24px;
  bottom: 24px;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
.carousel-indicators {
  text-align: center;
  bottom: -40px;
  button {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
  }
  .active {
    width: 32px;
    height: 8px;
    border-radius: 8px;
    background-image: linear-gradient(
      to right,
      #1e58fc,
      #a427eb,
      #d914e4,
      #e10fa3,
      #f10419
    );
  }
}

.carousel-item {
  position: relative;

  .carousel-item__text {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    font-size: 1.5rem;
    &--sm {
      width: 100%;
      position: absolute;
      text-align: center;
      bottom: 10px;
      left: 0;
      color: #fff;
      font-size: 1.5rem;
      z-index: 999;
    }
  }
  .round-btn {
    font-size: 0.8rem;
    padding: 6px 10px;
    display: inline-block;
    border-radius: 20px;
    border: 1px solid #fff;
    cursor: pointer;
  }
}
// .small-img-box {
//   position: relative;
//   &::after {
//     content: "";
//     position: absolute;
//     display: block;
//     width: 412px;
//     height: 400px;
//     left: 0;
//     top: 0;

//     border-radius: 16px;
//     background-image: linear-gradient(45deg, black, transparent);
//     z-index: 1111;
//   }
// }
.small-img-box > img {
  height: 342px;
  object-fit: cover;
  border-radius: 16px;
}

@media (max-width: 576px) {
  .banner {
    margin-top: 32px;
  }
  .carousel-indicators {
    bottom: -40px;
    text-align: center;
  }
}
</style>
