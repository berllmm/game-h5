<template>
    <!-- width（≥576px ） -->

    <div id="carouselExample" class="carousel slide banner d-none d-sm-block">
        <div class="carousel-inner">
            <div class="carousel-item active" v-for="(item, index) in bannerList" :key="index">
                <img :src="item.image" class="d-block w-100" />
                <div class="carousel-item__text">
                    <div class="round-text">{{ item.name }}</div>
                    <div class="round-btn" v-if="item.close" @click="openPage(item.id)">
                        <i></i><span>Auction ended</span>
                    </div>
                    <div class="round-btn" v-else @click="openPage(item.id)">
                        <i class="active"></i><span>Auction Live</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- check button -->
        <!-- width（≥576px ） -->
        <img @click="handlePrev" class="btn-perv d-none d-sm-block cursor" src="../assets/banner-left.svg" alt="" />
        <img @click="handleNext" class="btn-next d-none d-sm-block cursor" src="../assets/banner-right.svg" alt="" />
    </div>

    <!-- width（<576px） -->
    <div id="carouselExample2" class="carousel slide banner d-block d-sm-none">
        <div class="carousel-inner">
            <div class="carousel-item small-img-box" v-for="(item, index) in bannerList" :key="index">
                <img :src="item.image" class="d-block w-100" />
                <div class="carousel-item__text--sm">
                    <div class="round-btn" v-if="item.close" @click="openPage(item.id)">
                        <i></i><span>Auction ended</span>
                    </div>
                    <div class="round-btn" v-else @click="openPage(item.id)">
                        <i class="active"></i><span>Auction Live</span>
                    </div>
                    <div class="round-text">{{ item.name }}</div>
                </div>
            </div>
        </div>
        <!-- Tip -->
        <!-- <div class="carousel-indicators d-block d-sm-none">
            <button type="button" data-bs-target="#carouselExample2" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExample2" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExample2" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExample2" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";
import axios from "@/utils/axios";
import { useRouter } from "vue-router";

const bannerList = ref([]);

let carousel = null;
const init = async () => {
    const res = await axios.get("/tsg/publicinfo/sellPoolList");
    console.log(res);

    if (res.data.code == 200) {
        bannerList.value = res.data.data.allPoolList.slice(0, 4)
    }

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
};

const handlePrev = () => {
    carousel && carousel.prev();
};

const handleNext = () => {
    carousel && carousel.next();
};

const router = useRouter()
const openPage = (index) => {
    router.push({
        name: "marketcard",
        query: { id: index },
    });
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
        background-image: linear-gradient(to right,
                #1e58fc,
                #a427eb,
                #d914e4,
                #e10fa3,
                #f10419);
    }
}

.carousel-item {
    position: relative;
    width: 100%;
    height: 420px;

    img.w-100 {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .carousel-item__text {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: #fff;
        font-size: 1.5rem;

        div.round-text {
            text-align: left;
            margin-bottom: 15px;
            font-size: 48px;
        }

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
        width: 198px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 20px;
        border: 1px solid #fff;
        cursor: pointer;

        i {
            display: inline-block;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: #9945ff;

            &.active {
                background-color: greenyellow;
            }
        }

        span {
            margin-left: 10px;
            font-size: 20px;
        }
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
.small-img-box>img {
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

    .carousel-item {
        display: block;
    }

    .carousel-inner {
        border-radius: 0 !important;
    }

    .carousel-item img.w-100 {
        border-radius: 0;
    }

    .carousel-item .carousel-item__text--sm {
        left: 18px;
    }

    .carousel-item .round-btn {
        width: 163px;
        height: 36px;
        background-color: #36253d;
        border: 0px;
        border-radius: 9px;

        span {
            font-size: 14px;
        }
    }

    .round-text {
        text-align: left;
        margin-top: 18px;
    }
}
</style>
