<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "@/utils/axios";
import Modal from "@/components/Modal.vue";
import { playerInfo } from "@/utils/counter";
import { PublicKey } from "@solana/web3.js";
import { selectWallet, selectConnection, cutApartNumber, cutApart, cutApartNumberTwo } from "@/utils/burn";
import bs58 from "bs58";

const router = useRouter()
const route = useRoute()
const detailList = ref({})
const activeImg = ref('')
const name = ref('')
const detailType = ref([])
const intervalId = ref(null)
const userInfo = ref({})
const maxUsd = ref(0)
const isBeforeNow = ref(false)

onMounted(() => {
    marketInit()
})

const marketInit = async () => {
    const uid = route.query.id
    const cardId = route.query.cardId
    const res = await axios.get('/tsg/publicinfo/sellGoodsInfo', {
        params: {
            sellPoolId: uid,
            sellGoodsId: cardId
        }
    })

    if (res.data.code == 200) {
        detailList.value = res.data.data
        activeImg.value = detailList.value.imageList[0]
        name.value = detailList.value.cardList[0]?.name
        detailType.value = detailList.value.cardList[0]?.attributes

        intervalId.value = setInterval(updateTime, 1000);

        if (detailList.value.endTime < Date.now()) {
            isBeforeNow.value = false
        } else {
            isBeforeNow.value = true
        }
        if (detailList.value.biddingList.length <= 0) {
            maxUsd.value = detailList.value.startUsd
        } else {
            maxUsd.value = detailList.value.biddingList.reduce((max, item) => {
                return item.usd > max ? item.usd : max;
            }, 0);
        }
    }
}

const selectImg = (val) => {
    if (activeImg.value == val) {
        return
    }
    activeImg.value = val
}

const meetVisible = ref(false)
const TSGMintAddress = new PublicKey(
    "HuWxLYJ3favQ6e3zK5559zk9Qd2T38gGHK5fS1Wcpump"
);
const usdcAccount = ref(0)
const offerbox = ref(false)
const isActive = ref(false)

const markOffer = async () => {
    userInfo.value = playerInfo().user;
    const connection = selectConnection(localStorage.getItem("local"));
    const publicKeys = userInfo.value.walletAddress;
    const walletAddress = new PublicKey(publicKeys);

    const usdcPrize = await connection.getParsedTokenAccountsByOwner(
        walletAddress,
        {
            mint: TSGMintAddress,
        }
    );
    if (usdcPrize.value.length > 0) {
        usdcAccount.value =
            usdcPrize.value[0].account.data.parsed.info.tokenAmount.uiAmount;

        if (usdcAccount.value < detailList.value.needTsgNum) {
            meetVisible.value = true
            return
        } else {
            offerbox.value = true
        }
    } else {
        meetVisible.value = true
        return
    }
}

const openHistory = () => {
    if (detailList.value.biddingList.length <= 0) {
        return
    } else {
        isActive.value = !isActive.value
    }

}

const goBuy = () => {
    window.open('https://raydium.io/swap/?inputMint=sol&outputMint=HuWxLYJ3favQ6e3zK5559zk9Qd2T38gGHK5fS1Wcpump', "_blank")
    meetVisible.value = false
}

const contactList = ref({
    type: 'Courtyard Wallet'
})

const closeBox = () => {
    offerbox.value = false
    contactList.value = {
        type: 'Courtyard Wallet'
    }
}

const offerPrize = ref(0)
const showModal = ref(false)
const prizeVisible = ref(false)

const enterOffer = async () => {
    if (Number(offerPrize.value < maxUsd.value)) {
        prizeVisible.value = true
        return
    }

    const uid = route.query.id
    const cardId = route.query.cardId
    const res = await axios.post('/tsg/player/sellPoolBidding', {
        sellPoolId: uid,
        goodsId: cardId,
        usd: offerPrize.value
    })
    if (res.data.code == 200) {
        offerbox.value = false
        showModal.value = true
        marketInit()
    }
}

const currentTimestamp = ref(Date.now());

const updateTime = () => {
    currentTimestamp.value = Date.now();
};

const countdown = computed(() => {
    const remainingTime = detailList.value.endTime - currentTimestamp.value;

    if (remainingTime <= 0) {
        return '0d 0h 0m 0s'; // 时间已结束
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value)
})

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回值范围是 0 到 11，所以加 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

</script>

<template>
    <div class="detail">
        <div class="main">
            <div class="right d-block d-sm-none phone-head">
                <div class="right-tip">
                    <img src="../../assets/detail-tip.svg" alt="">
                    <span>Vaulted and insured</span>
                </div>
                <div class="right-head">
                    <p>{{ name }}</p>
                </div>
                <div class="right-win">
                    <span>Owned by</span>
                    <img src="../../assets/user.png" alt="">
                    <span>TOKOY</span>
                </div>
            </div>
            <div class="left">
                <div class="left-img">
                    <img :src="activeImg" alt="">
                </div>
                <div class="left-list">
                    <div :class="item == activeImg ? 'active' : ''" v-for="(item, index) in detailList.imageList"
                        :key="index" @click="selectImg(item)">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="right-tip d-none d-sm-flex">
                    <img src="../../assets/detail-tip.svg" alt="">
                    <span>Vaulted and insured</span>
                </div>
                <div class="right-head d-none d-sm-block">
                    <p>{{ name }}</p>
                </div>
                <div class="right-win d-none d-sm-flex">
                    <span>Owned by</span>
                    <img src="../../assets/user.png" alt="">
                    <span>TOKYO</span>
                </div>
                <div class="right-buy">
                    <div class="buy-time">
                        <img src="../../assets/detail-time.svg" alt="">
                        <span>Listing ends in: {{ countdown }}</span>
                    </div>
                    <div class="buy-prize">
                        <div class="prize-left">
                            <p>Listed For</p>
                            <p>${{ cutApartNumberTwo(detailList.startUsd) }}</p>
                        </div>
                        <div class="prize-right">
                            <div class="prize-btn">
                                <button v-if="isBeforeNow" @click="markOffer()">Make an offer</button>
                            </div>
                        </div>
                    </div>
                    <div class="buy-offer">
                        <p>Top Offer ${{ cutApartNumberTwo(maxUsd) }}</p>
                        <div>
                            <img @click="openHistory" :class="isActive ? 'active' : ''" src="../../assets/detail-up.svg"
                                alt="">
                        </div>
                    </div>
                    <div class="buy-history" :class="isActive ? 'active' : ''">
                        <div class="history-item" v-for="(item, index) in detailList.biddingList" :key="index">
                            <p>${{ cutApartNumberTwo(item.usd) }}</p>
                            <p>Form <span>{{ item.playerName }}</span></p>
                            <p>{{ formatTimestamp(item.biddingTime) }}</p>
                        </div>
                    </div>
                </div>
                <div class="right-tag">
                    <div>
                        <img src="../../assets/detail-auth.svg" alt="">
                        <span>Authenticity Guarantee</span>
                    </div>
                    <div>
                        <img src="../../assets/detail-vaulted.svg" alt="">
                        <span>Authenticity Guarantee</span>
                    </div>
                    <div>
                        <img src="../../assets/detail-collect.svg" alt="">
                        <span>Authenticity Guarantee</span>
                    </div>
                </div>
                <p class="right-detail">Details</p>
                <div class="right-list">
                    <div class="list-item" v-for="(item, index) in detailType" :key="index">
                        <a-tooltip placement="topLeft" :title="item.attribute" arrow-point-at-center>
                            <div class="item-text">{{ item.value }}</div>
                        </a-tooltip>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="history">
            <p>Activity history</p>
            <div class="hostory-box"></div>
        </div> -->
    </div>

    <Modal v-model="offerbox" width="400px">
        <div class="offer">
            <p class="title">Make an offer</p>
            <div class="offer-card">
                <div class="card-left">
                    <img :src="activeImg" alt="">
                </div>
                <div class="card-right">
                    <p>{{ name }}</p>
                    <p>${{ cutApartNumberTwo(maxUsd) }}</p>
                </div>
            </div>
            <div class="offer-tip">
                <p>Set a price for your offer. Once the seller accepts
                    your offer, you will automatically be charged for
                    that amount in USDC.</p>
            </div>
            <div class="offer-select">
                <div class="select-prize">
                    <p>Your TSG Balance</p>
                    <p>{{ cutApart(usdcAccount) }} TSG</p>
                </div>
                <p class="offer-input">Your offer</p>
                <div class="select-input">
                    <span>$</span>
                    <input type="text" v-model="offerPrize" name="" id="">
                </div>
            </div>
            <div class="offer-btn">
                <div class="offer-enter">
                    <button @click="enterOffer">Make offer</button>
                </div>
                <div class="offer-close">
                    <button @click="closeBox">Cancel</button>
                </div>
            </div>
        </div>
    </Modal>


    <Modal v-model="meetVisible" width="400px">
        <div class="results-box">
            <div>
                <img src="../../assets/tip_error.svg" class="result-img" />
                <div class="result-tips">Not meeting the minimum requirements for participation. （>=
                    {{ cutApart(detailList.needTsgNum) }} TSG）</div>
            </div>
            <div class="footer-btn__modal footer-btn__modal2">
                <div @click="goBuy" class="btn1">Go Buy</div>
                <div @click="meetVisible = false" class="btn2">Cancel</div>
            </div>
        </div>
    </Modal>

    <Modal v-model="prizeVisible" width="400px">
        <div class="results-box">
            <div>
                <img src="../../assets/tip_error.svg" class="result-img" />
                <div class="result-tips">The amount you entered is less than the current bid</div>
            </div>
            <div class="footer-btn__modal footer-btn__modal2">
                <!-- <div @click="goBuy" class="btn1">Go Buy</div> -->
                <div @click="prizeVisible = false" class="btn3">Cancel</div>
            </div>
        </div>
    </Modal>

    <Modal v-model="showModal" width="400px">
        <div class="results-box">
            <div>
                <!-- <div class="result-title">{{ tip }}</div> -->
                <img src="../../assets/result-success.svg" class="result-img" />
                <div class="result-tips">
                    Successful
                </div>
            </div>
            <div class="footer-btn__modal footer-btn__modal2">
                <div @click="showModal = false" class="btn3">Cancel</div>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
.detail {
    margin: 60px auto;
    border: 1px solid #3f3f3f;
    border-radius: 32px;
    padding: 40px;
    background-color: #1f0c27;

    .main {
        display: flex;
        justify-content: space-between;

        .left {
            .left-img {
                width: 550px;
                height: 550px;
                border-radius: 12px;
                background-color: #36253d;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .left-list {
                margin-top: 32px;
                display: flex;
                justify-content: space-between;

                div {
                    width: 103px;
                    height: 103px;
                    border-radius: 12px;
                    padding: 10px;
                    background-color: #36253d;
                    box-sizing: border-box;
                    cursor: pointer;
                    border: 3px solid transparent;

                    &.active {
                        border: 3px solid #3052fa;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }

        .right {
            width: 47%;

            .right-tip {
                display: flex;
                align-items: center;
                width: 159px;
                height: 32px;
                justify-content: center;
                background-color: #36253d;
                border-radius: 9px;

                img {
                    width: 12px;
                    height: 12px;
                }

                span {
                    margin-left: 5px;
                    color: #c3c3c3;
                    font-size: 12px;
                    font-family: 'IBM Plex Sans Regular';
                }
            }

            .right-head {
                margin-top: 19px;

                p {
                    font-size: 22px;
                    color: #fff;
                    text-align: left;
                }
            }

            .right-win {
                margin-top: 11px;
                display: flex;
                align-items: center;

                span {
                    color: #fff;
                    font-size: 16px;
                    font-family: 'IBM Plex Sans Regular';
                }

                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                    object-fit: contain;
                    margin-left: 5px;
                }
            }

            .right-buy {
                width: 100%;
                height: auto;
                margin-top: 19px;
                border: 1px solid #3f3f3f;
                border-radius: 12px;

                .buy-time {
                    display: flex;
                    align-items: center;
                    padding: 15px 7px;
                    border-bottom: 1px solid #3f3f3f;

                    img {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                    }

                    span {
                        margin-left: 5px;
                        color: #fff;
                        font-size: 16px;
                        font-family: 'IBM Plex Sans Regular';
                    }
                }

                .buy-prize {
                    display: flex;
                    justify-content: space-between;
                    margin: 0 14px;
                    height: 121px;
                    padding: 20px 0px;
                    border-bottom: 1px solid #3f3f3f;

                    .prize-left {

                        p {
                            font-size: 15px;
                            color: #fff;
                            margin: 0;
                            padding: 0;

                            &:nth-child(2) {
                                font-family: 'IBM Plex Sans Regular';
                            }

                            &:nth-child(2) {
                                font-size: 20px;
                            }
                        }
                    }

                    .prize-right {

                        .prize-btn {
                            button {
                                width: 200px;
                                height: 33px;
                                border-radius: 10px;
                                color: #fff;
                                font-size: 16px;
                                border: 1px solid transparent;
                                background-clip: padding-box, border-box;
                                background-origin: padding-box, border-box;
                                background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
                            }
                        }

                        .prize-make {
                            button {
                                width: 200px;
                                height: 33px;
                                margin-top: 16px;
                                font-size: 16px;
                                border-radius: 10px;
                                border: 1px solid #3f3f3f;
                                background-color: transparent;
                                color: #fff;
                            }
                        }

                    }
                }

                .buy-offer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 40px;
                    padding: 0 7px;
                    display: flex;
                    align-items: center;

                    p {
                        margin: 0;
                        padding: 0;
                        color: #fff;
                        font-size: 13px;
                    }

                    div {
                        width: 31px;
                        height: 31px;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            cursor: pointer;

                            &.active {
                                transform: rotateZ(180deg);
                            }
                        }
                    }
                }

                .buy-history {
                    width: 100%;
                    height: 0;
                    padding: 0 7px;
                    box-sizing: border-box;
                    overflow-x: hidden;
                    transition: height .6s linear;

                    &.active {
                        height: 153px;
                        margin-bottom: 15px;
                    }

                    .history-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        // padding-bottom: 15px;
                        padding: 0 15px 15px;
                        border-bottom: 1px solid #3f3f3f;
                        margin-top: 10px;

                        p:nth-child(1) {
                            display: block;
                            width: 33%;
                            color: #fff;
                            font-size: 12px;
                            margin: 0;
                            text-align: left;

                            span {
                                font-family: 'IBM Plex Sans';
                            }
                        }

                        p:nth-child(2) {
                            display: block;
                            width: 33%;
                            color: #fff;
                            font-size: 12px;
                            font-family: 'IBM Plex Sans Regular';
                            margin: 0 0 0 25px;
                            text-align: center;

                            span {
                                font-family: 'IBM Plex Sans';
                            }
                        }

                        p:nth-child(3) {
                            display: block;
                            width: 33%;
                            color: #fff;
                            font-size: 12px;
                            text-align: right;
                            font-family: 'IBM Plex Sans Regular';
                            margin: 0 0 0 25px;

                            span {
                                font-family: 'IBM Plex Sans';
                            }
                        }
                    }
                }
            }

            .right-tag {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 19px;
                width: 100%;
                height: 41px;
                background-color: #36253d;
                border-radius: 8px;

                div {
                    display: flex;
                    align-items: center;

                    &:nth-child(2) {
                        margin: 0 15px;
                    }

                    img {
                        width: 11.28px;
                        height: 11.28px;
                    }

                    &:nth-child(3) img {
                        width: 10.62px;
                        height: 15.04px;
                    }

                    span {
                        color: #c3c3c3;
                        font-size: 11.28px;
                        font-family: 'IBM Plex Sans Regular';
                        margin-left: 2px;
                    }
                }
            }

            p.right-detail {
                font-size: 22px;
                color: #fff;
                margin-top: 19px;
            }

            .right-list {
                display: flex;
                align-items: flex-start;
                margin-top: 11px;
                width: 100%;
                height: 122px;
                padding: 13px 10px;
                border: 1px solid #3f3f3f;
                border-radius: 12px;

                .list-item {
                    border: 1px solid #3f3f3f;
                    border-radius: 66.77px;
                    height: auto;
                    margin: 0 15px;
                    overflow: hidden;

                    .item-text {
                        padding: 5.15px 9.5px;
                        color: #fff;
                        font-size: 10.6px;
                    }
                }
            }
        }
    }

    .history {
        margin-top: 50px;

        p {
            font-size: 22px;
            color: #fff;
        }

        .hostory-box {
            width: 100%;
            height: 110px;
            margin-top: 11px;
            border: 1px solid #3f3f3f;
            border-radius: 12px;
        }
    }
}

.offer {
    .title {
        font-size: 21.75px;
        color: #fff;
        margin: 0;
    }

    .offer-card {
        display: flex;
        align-items: center;
        padding: 17px;
        border: 1px solid #3f3f3f;
        border-radius: 17px;
        margin-top: 47px;

        .card-left {
            width: 60px;
            height: 60px;
            border-radius: 10.88px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .card-right {
            p {
                margin: 0;
                line-height: 1.8;
            }

            p:nth-child(1) {
                font-size: 15.54px;
                color: #fff;
            }

            p:nth-child(2) {
                font-size: 14px;
                color: #babdc6;
            }
        }
    }

    .offer-tip {
        margin-top: 20px;

        p {
            font-size: 15.54px;
            color: #babdc6;
            font-family: 'IBM Plex Sans Regular';
        }
    }

    .offer-select {
        margin-top: 57px;

        p {
            font-size: 17px;
            color: #fff;
        }

        .select-box {
            margin-top: 11px;
            position: relative;
            width: 100%;
            height: 43.5px;
            border: 1px solid #3f3f3f;
            border-radius: 9.32px;
        }

        .select-prize {
            display: flex;
            margin-top: 20px;
            align-items: center;
            justify-content: space-between;

            p {
                font-size: 15.54px;
                color: #8a909e;
            }
        }

        .offer-input {
            margin-top: 50px;
        }

        .select-input {
            display: flex;
            align-items: center;
            margin-top: 13px;
            width: 100%;

            span {
                font-size: 18px;
                color: #fff;
            }

            input {
                width: 100%;
                height: 52.83px;
                margin-left: 15px;
                padding: 15px 12px;
                border: 1px solid #3f3f3f;
                border-radius: 9.32px;
                color: #fff;
                font-size: 17px;
                background-color: transparent;
            }
        }
    }

    .offer-btn {
        margin-top: 42px;

        .offer-enter {
            width: 100%;

            button {
                width: 100%;
                height: 43.5px;
                border: 1px solid transparent;
                border-radius: 10px;
                color: #fff;
                background-clip: padding-box, border-box;
                background-origin: padding-box, border-box;
                background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
            }
        }

        .offer-close {
            width: 100%;
            margin-top: 12px;

            button {
                width: 100%;
                height: 43.5px;
                border: 1px solid #3f3f3f;
                border-radius: 10px;
                color: #fff;
                background-color: transparent;
            }
        }
    }
}

.results-box {
    color: #fff;
    text-align: center;

    .result-title {
        font-size: 24px;
        font-weight: 600;
    }

    .result-center {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 0;
    }

    .result-center span {
        font-size: 24px;
        font-weight: 700;
    }

    .result-center span:nth-child(2) {
        padding: 0 10px;
    }

    .result-img {
        margin: 20px 0;
        width: 120px;
        height: 120px;
    }

    .result-tips {
        margin-top: 20px;
        margin-bottom: 40px;
        font-size: 16px;
        font-weight: 400;
    }

    .blue-text {
        color: #3052fa;
        font-weight: 600;
    }

    .footer-btn__modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .btn1 {
            padding: 12px 24px;
            font-weight: 600;
            color: #ffffff;
            font-size: 20px;
            display: inline-block;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 48px;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #1f0c27, #1f0c27),
                linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
        }

        .btn2 {
            margin-left: 15px;
            padding: 12px 24px;
            font-size: 20px;
            display: inline-block;
            border-radius: 48px;
            border: 1px solid #3f3f3f;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            cursor: pointer;
        }

        .btn3 {
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
}

@media screen and (max-width:768px) {
    .detail {
        margin-top: 0;
    }

    .detail .main {
        display: block;
    }

    .detail .main .left .left-img {
        width: 100%;
        height: auto;
    }

    .detail .main .left {
        margin-top: 29px;
    }

    .detail .main .left .left-list div {
        width: 24%;
        height: 85px;
    }

    .detail .main .right {
        width: 100%;
        margin-top: 54px;
    }

    .detail .main .right.phone-head {
        width: 100%;
        margin-top: 0;
    }

    .detail .main .right .right-buy .buy-prize {
        display: block;
        height: auto;
    }

    .detail .main .right .right-buy .buy-prize .prize-right .prize-btn button {
        margin-top: 24px;
        width: 100%;
        height: 55px;
    }

    .detail .main .right .right-tag {
        display: flex;
        flex-wrap: wrap;
        height: 155px;
        padding: 22px 0;
    }

    .detail .main .right .right-tag div {
        justify-content: center;
        width: 100%;
    }

    .detail .main .right .right-tag div:nth-child(2) {
        margin: 0;
    }

    .detail .main .right .right-tag div img {
        width: 20.35px;
        height: 20.35px;
    }

    .detail .main .right .right-tag div:nth-child(3) img {
        width: 15px;
        height: 21px;
    }

    .detail .main .right .right-tag div span {
        font-size: 14px;
        margin-left: 15px;
    }
}
</style>