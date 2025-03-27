<template>
    <div class="all">
        <div class="title base-border">MARKETPLACE</div>
        <div class="game-list container">
            <div class="row">
                <div v-for="(market, index) in games" :key="index" class="col-6 col-sm-6 col-md-4 mb-5 market-item">
                    <div class="item-box" @click="goCard(market)">
                        <img :src="market.image" alt="">
                        <div class="flex-title">
                            <p>{{ market.name }}</p>
                            <p v-if="market.close"><i></i>Auction Ended</p>
                            <p v-else><i class="success"></i>Auction Live</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "@/utils/axios";
import { useRouter } from "vue-router";

const router = useRouter()

const games = ref([]);

onMounted(() => {
    getGamesInit();
});

const getGamesInit = async () => {
    const res = await axios.get("/tsg/publicinfo/sellPoolList");
    if (res.data.code == 200) {
        games.value = res.data.data.allPoolList
    }
};

const goCard = (item) => {
    router.push({
        name: "marketcard",
        query: { id: item.id },
    });
}
</script>

<style lang="scss" scoped>
.all {
    text-align: center;

    .title {
        margin: 60px 0;
        display: inline-block;
        font-style: normal;
        font-weight: 600;
        font-size: 40px;
        line-height: 52px;

        color: #ffffff;
    }

    .game-list {
        margin: 0 auto;

        .market-item {

            .item-box {
                position: relative;
                width: 100%;
                height: 587px;
                background-color: #fff;
                border-radius: 24px;
                cursor: pointer;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .flex-title {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                    width: calc(100% - 20px);
                    height: auto;
                    background-color: rgba(0, 0, 0, .6);
                    padding: 15px 9px;
                    box-sizing: border-box;
                    border-radius: 8px;

                    p:nth-child(1) {
                        font-size: 24px;
                        text-align: left;
                        color: #fff;
                        margin: 0;
                    }

                    p:nth-child(2) {
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        text-align: left;
                        font-family: 'IBM Plex Sans Regular';
                        color: #fff;
                        margin: 0;

                        i {
                            display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background-color: #9945ff;
                            margin-right: 10px;

                            &.success {
                                background-color: greenyellow;
                            }
                        }
                    }
                }
            }


        }
    }
}

@media (max-width: 576px) {
    .all {
        .game-item {
            padding: 8px;
        }

        .title {
            margin: 16px 0;
            font-size: 20px;
        }
    }

    .all .game-list .market-item .item-box {
        height: 270px;
    }

    .all .game-list .market-item .item-box .flex-title p:nth-child(1) {
        font-size: 18px;
    }

    .row>* {
        padding: 0 4px;
    }
}
</style>