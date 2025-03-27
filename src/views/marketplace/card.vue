<template>
    <div class="all">
        <div class="title">
            <Marketbnner />
        </div>
        <div class="box">
            <div class="tabs">
                <div @click="handleSwitch('1')" class="tabs-item" :class="activeKey === '1' ? 'active' : ''">
                    All lots
                </div>
                <div @click="handleSwitch('2')" class="tabs-item" :class="activeKey === '2' ? 'active' : ''">
                    My bids <i>{{ mywinner }}</i>
                </div>
            </div>

            <div class="game-list container" v-if="activeKey == '1'">
                <div class="row d-none d-sm-flex">
                    <div class="col-6 col-sm-6 col-md-4 mb-5 market-item market-title">
                        <div class="item">
                            <p>Welcome to auctions on tokyostupidgames.io!</p>
                            <p>{{ dataList.description }}</p>
                            <span>Learn more</span>
                        </div>
                    </div>
                    <div v-for="(market, index) in games" :key="index" class="col-6 col-sm-6 col-md-4 mb-5 market-item">
                        <div class="item">
                            <p>Ended</p>
                            <div class="item-img">
                                <img :src="market.cardList[0]?.image" alt="">
                            </div>
                            <div class="item-text">
                                <p>{{ market.cardList[0].name }}</p>
                            </div>
                            <div class="item-prize">
                                <p>WINNING BID</p>
                                <p>${{ cutApart(market.startUsd) }}</p>
                            </div>
                            <div class="item-btn">
                                <button @click="goCard(market.goodsId)">See Card</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-block d-sm-none phonebox">
                    <div class="card-title">
                        <p>Welcome to auctions on tokyostupidgames.io!</p>
                        <p>{{ dataList.description }}</p>
                        <span>Learn more</span>
                    </div>

                    <div class="card-item" v-for="(market, index) in games" :key="index">
                        <div class="item-left">
                            <img :src="market.cardList[0]?.image" alt="">
                        </div>
                        <div class="item-right">
                            <p class="ended">Ended</p>
                            <p class="text">{{ market.cardList[0].name }}</p>
                            <div class="right-box">
                                <div class="title">
                                    <p>WINNING BID</p>
                                    <p>${{ cutApart(market.startUsd) }}</p>
                                </div>
                                <div class="btn">
                                    <button @click="goCard(market.goodsId)">See Card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="game-list container" v-if="activeKey == '2'">
                <div class="row d-none d-sm-flex">
                    <div v-for="(market, index) in myList" :key="index"
                        class="col-6 col-sm-6 col-md-4 mb-5 market-item">
                        <div class="item">
                            <div class="item-img">
                                <img :src="market.goods?.cardList[0]?.image" alt="">
                            </div>
                            <div class="item-text">
                                <p>{{ market.goods?.cardList[0].name }}</p>
                            </div>
                            <div class="item-prize">
                                <p>Your Bid</p>
                                <p>${{ cutApart(market.bid?.usd) }}</p>
                            </div>
                            <div class="item-btn">
                                <button v-if="market.winner" @click="buyNow(market)">Buy Now</button>
                                <button v-else @click="goCard(market.goods?.goodsId)">See Card</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-block d-sm-none phonebox">
                    <div class="card-item" v-for="(market, index) in myList" :key="index">
                        <div class="item-left">
                            <img :src="market.goods?.cardList[0]?.image" alt="">
                        </div>
                        <div class="item-right">
                            <p class="text">{{ market.goods?.cardList[0].name }}</p>
                            <div class="right-box">
                                <div class="title">
                                    <p>Your Bid</p>
                                    <p>${{ cutApart(market.bid?.usd) }}</p>
                                </div>
                                <div class="btn">
                                    <button v-if="market.winner" @click="buyNow(market.goods)">Buy Now</button>
                                    <button v-else @click="goCard(market.goods?.goodsId)">See Card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-model="showCandy" width="500px">
        <div class="wallet-box">
            <p class="wallet-title">BUY</p>
            <div class="wallet-tag wallet-candy">
                <span>{{ contactList.name }}</span>
                <span>${{ cutApartNumberTwo(contactList.usd) }}</span>
            </div>
            <div class="wallet-tag wallet-select">
                <span v-if="contactList.type == 'USDC'">{{ cutApartNumberTwo(contactList.value) }}</span>
                <span v-else>{{ cutApartNumber(contactList.value) }}</span>
                <div>
                    <div class="selected" @click="toggleDropdown">
                        <div class="selected-img">
                            <i v-if="contactList.type == 'Sol'" class="solimg"></i>
                            <i v-if="contactList.type == 'USDC'" class="usdcimg"></i>
                            <i v-if="contactList.type == 'TSG'" class="tsgimg"></i>
                        </div>
                        <span>{{ contactList.type }}</span>
                        <div :class="isDropdownOpen ? 'selected-tag active' : 'selected-tag'
                            ">
                            <svg t="1736418704184" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5394" width="22" height="22">
                                <path
                                    d="M512 784c-8.5 0-16.6-3.4-22.6-9.4l-480-480c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L512 706.7l457.4-457.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-480 480c-6.1 6-14.2 9.4-22.7 9.4z"
                                    fill="#ffffff" p-id="5395"></path>
                            </svg>
                        </div>
                    </div>
                    <ul v-if="isDropdownOpen" class="dropdown-list">
                        <li v-for="(country, index) in selectList" :key="index" @click="selectCountry(country)"
                            class="dropdown-item">
                            <div class="selected-img">
                                <i v-if="country.type == 'Sol'" class="solimg"></i>
                                <i v-if="country.type == 'USDC'" class="usdcimg"></i>
                                <i v-if="country.type == 'TSG'" class="tsgimg"></i>
                            </div>
                            <span>{{ country.type }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="wallet-tip error" v-if="!isUSDC">
                <p>You don't have enough USDC in your wallet, please top up.</p>
            </div>
            <div class="wallet-tip error" v-if="!isSolana">
                <p>You don't have enough Sol in your wallet, please top up.</p>
            </div>
            <div class="wallet-tip error" v-if="!isTSG">
                <p>You don't have enough TSG in your wallet, please top up.</p>
            </div>
            <div class="wallet-buy">
                <button @click="walletConect">Continue</button>
            </div>
        </div>
    </Modal>
    <Modal v-model="showSuccess" width="500px">
        <div class="results-box">
            <div>
                <div class="result-title">*We will contact you through Discord within 24 hours.</div>
                <img src="../../assets/result-success.svg" class="result-img" />
                <div class="result-tips">
                    SUCCESSFUL
                </div>
            </div>
        </div>
    </Modal>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "@/utils/axios";
import { useRoute, useRouter } from "vue-router";
// import { cutApartNumber, cutApart } from "../../utils/burn";
import Marketbnner from '../../components/Marketbnner.vue';
import {
    playerInfo,
    userPay,
    userPayNow,
    useUmiWallet,
} from "@/utils/counter";
import {
    Connection,
    clusterApiUrl,
    Transaction,
    SystemProgram,
    PublicKey,
} from "@solana/web3.js";
import {
    selectWallet,
    selectConnection,
    cutApartNumberTwo,
    cutApartNumber,
    cutApart,
} from "@/utils/burn";
import {
    Token,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { transferTokens } from "@metaplex-foundation/mpl-toolbox";
import Modal from "@/components/Modal.vue";
import bs58 from "bs58";

const router = useRouter()
const route = useRoute()

const games = ref([]);
const dataList = ref({})
const myList = ref([])
const activeKey = ref('1')
const mywinner = ref('1')

onMounted(() => {
    getGamesInit();
});

const getGamesInit = async () => {
    const Uid = route.query.id
    const res = await axios.get("/tsg/publicinfo/sellInfo", {
        params: {
            sellPoolId: Uid
        }
    });

    if (res.data.code == 200) {
        dataList.value = res.data.data
        games.value = res.data.data.goodsList

        getUserInit()
    }
};

const getUserInit = async () => {
    const Uid = route.query.id
    const res = await axios.get('/tsg/player/getMyBids', {
        params: {
            sellPoolId: Uid
        }
    })
    if (res.data.code == 200) {
        myList.value = res.data.data

        mywinner.value = myList.value.filter(item => item.winner === true).length;
    }

}

const goCard = (id) => {
    router.push({
        name: "marketdetails",
        query: { id: dataList.value.id, cardId: id },
    });
}

const handleSwitch = (val) => {
    activeKey.value = val

    if (val == '1') {
        getGamesInit()
    } else {
        getUserInit()
    }
}

const buyNow = async (item) => {
    const Uid = route.query.id

    contactList.value.name = item.goods?.cardList[0].name
    contactList.value.type = 'USDC'
    contactList.value.usd = item.bid?.usd
    contactList.value.sellPoolId = Uid
    contactList.value.sellPoolGoodsID = item.goods.goodsId
    console.log(contactList.value);
    await getUserPay()
    showCandy.value = true

    // showSuccess.value = true
}

const selectList = ref([
    {
        type: "USDC",
    },
    {
        type: "Sol",
    },
    {
        type: "TSG",
    },
]);
const showCandy = ref(false);
const isDropdownOpen = ref(false)
const toWallet = new PublicKey("86QWt6CRdUVNUgbzBnhES7C1PVFzkceodcYVryGWC7pY");
const usdMintAddress = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
const TSGMintAddress = new PublicKey(
    "HuWxLYJ3favQ6e3zK5559zk9Qd2T38gGHK5fS1Wcpump"
);
const contactList = ref({
    name: '',
    type: "USDC",
    usd: 0,
    value: 0,
    sellPoolId: '',
    sellPoolGoodsID: '',
    gameOrderId: ''
})
const isTip = ref(0)
const isUSDC = ref(false)
const isSolana = ref(false)
const isTSG = ref(false)
const showSuccess = ref(false)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCountry = (country) => {
    isDropdownOpen.value = false;
    contactList.value.type = country.type;
    getUserPay()
};

const getUserPay = async () => {
    if (contactList.value.type == "Sol") {
        isTip.value = 1;
    } else if (contactList.value.type == "USDC") {
        isTip.value = 2;
    } else if (contactList.value.type == "TSG") {
        isTip.value = 3;
    }
    const res = await axios.post("/tsg/pay/reqWalletPayCreateOrder", {
        type: 4,
        baseCurrencyCode: "usd",
        baseCurrencyAmount: contactList.value.usd,
        currencyCode: contactList.value.type.toLowerCase(),
        sellPoolId: contactList.value.sellPoolId,
        sellPoolGoodsId: contactList.value.sellPoolGoodsID
    });

    if (res.data.code == 200) {
        const userInfo = playerInfo().user
        contactList.value.value = res.data.data.order.currencyNum
        contactList.value.gameOrderId = res.data.data.order.gameOrderId
        isSolana.value = true;
        isUSDC.value = true;
        isTSG.value = true;

        const connection = selectConnection(localStorage.getItem("local"));
        const publicKey = userInfo.walletAddress;
        const walletAddress = new PublicKey(publicKey);
        const solanaRes = await connection.getBalance(walletAddress);
        const solPrize = (solanaRes / 1000000000).toFixed(5);
        if (contactList.value.type == "USDC") {
            const usdcPrize = await connection.getParsedTokenAccountsByOwner(
                walletAddress,
                {
                    mint: usdMintAddress,
                }
            );
            if (usdcPrize.value.length > 0) {
                const usdcAccount =
                    usdcPrize.value[0].account.data.parsed.info.tokenAmount.uiAmount;
                if (
                    Number(usdcAccount) >= contactList.value.value &&
                    Number(solPrize) >= 0.01
                ) {
                    isUSDC.value = true;
                } else {
                    isUSDC.value = false;
                }
            } else {
                isUSDC.value = false;
            }
        } else if (contactList.value.type == "TSG") {
            const usdcPrize = await connection.getParsedTokenAccountsByOwner(
                walletAddress,
                {
                    mint: TSGMintAddress,
                }
            );
            if (usdcPrize.value.length > 0) {
                const usdcAccount =
                    usdcPrize.value[0].account.data.parsed.info.tokenAmount.uiAmount;
                if (
                    Number(usdcAccount) >= contactList.value.value &&
                    Number(solPrize) >= 0.01
                ) {
                    isTSG.value = true;
                } else {
                    isTSG.value = false;
                }
            } else {
                isTSG.value = false;
            }
        } else if (contactList.value.type == "Sol") {
            if (contactList.value.value + 0.01 <= Number(solPrize)) {
                isSolana.value = true;
            } else {
                isSolana.value = false;
            }
        }
    }
};

const walletConect = async () => {
    let typeCode = "";
    var transferLamports;
    if (contactList.value.type == "Sol") {
        typeCode = "sol";
        transferLamports = 1000000000 * contactList.value.value;
    } else if (contactList.value.type == "USDC") {
        typeCode = "usdc";
        transferLamports = contactList.value.value * 10 ** 6;
    } else if (contactList.value.type == "TSG") {
        typeCode = "tsg";
        transferLamports = contactList.value.value * 10 ** 6;
    }

    const userInfo = playerInfo().user

    if (localStorage.getItem("local") == "Wallet") {
        const res = await axios.get("/tsg/pay/reqWalletPayWeb2", {
            params: {
                gameOrderId: contactList.value.gameOrderId,
                lamports: transferLamports,
                currencyCode: typeCode,
            },
        });
        if (res.data.code == 200) {
            showCandy.value = false;
            showSuccess.value = true
            getUserInit()
        }
    } else {
        const connection = selectConnection(localStorage.getItem("local"));
        const { blockhash } = await connection.getLatestBlockhash("finalized");
        const wallet = selectWallet(localStorage.getItem("local"));
        const fromAddress = new PublicKey(userInfo.walletAddress);

        if (contactList.value.type == "Sol") {
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: fromAddress,
            }).add(
                SystemProgram.transfer({
                    fromPubkey: fromAddress,
                    toPubkey: toWallet,
                    lamports: transferLamports,
                })
            );
            const signatures = await wallet.signAndSendTransaction(transaction);
            const res = await axios.get("/tsg/pay/reqWalletPay", {
                params: {
                    gameOrderId: contactList.value.gameOrderId,
                    transactionId: signatures.signature,
                },
            });
            if (res.data.code == 200) {
                showCandy.value = false;
                showSuccess.value = true
                getUserInit()
            }
        } else {
            let userMint;
            if (contactList.value.type == "USDC") {
                userMint = usdMintAddress;
            } else {
                userMint = TSGMintAddress;
            }
            const umi = useUmiWallet().umi;
            const sourceTokenAccount = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                userMint,
                fromAddress
            );
            const destinationTokenAccount = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                userMint,
                toWallet
            );
            const tx = await transferTokens(umi, {
                source: sourceTokenAccount,
                destination: destinationTokenAccount,
                authority: fromAddress,
                amount: contactList.value.value * 10 ** 6,
            }).sendAndConfirm(umi);

            const res = await axios.get("/tsg/pay/reqWalletPay", {
                params: {
                    gameOrderId: contactList.value.gameOrderId,
                    transactionId: bs58.encode(tx.signature),
                },
            });
            if (res.data.code == 200) {
                showCandy.value = false;
                showSuccess.value = true
                getUserInit()
            }
        }
    }
};

</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: auto;
    padding: 40px;
    border-radius: 32px;
    border: 1px solid #3f3f3f;
    background-color: rgba(45, 16, 57, 0.3);

    .tabs {
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #fff;

        &-item {
            box-sizing: border-box;

            /* Auto layout */
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 12px 36px;
            min-height: 90px;
            border-bottom: 1px solid #3f3f3f;
            cursor: pointer;

            i {
                display: inline-block;
                width: 31px;
                height: 31px;
                background-color: rgba(153, 69, 255, 1);
                color: #fff;
                border-radius: 50%;
                margin-left: 15px;
            }
        }

        .active {
            font-weight: 600;
            border-image: linear-gradient(to right, blue, red) 4;
            border-width: 1px;
            border-style: solid;
            border-top: none;
            border-left: none;
            border-right: none;
        }
    }
}

.all {
    text-align: center;

    .title {
        position: relative;
        margin: 60px 0;
        width: 100%;
        height: auto;
        border-radius: 12px;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .game-list {
        margin: 0 auto;

        .row {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;

            .market-item {
                position: relative;
                width: 321px;
                height: 549px;
                padding: 18px;
                margin-right: 6.5%;

                &:nth-child(3n) {
                    margin-right: 0;
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-image: url(../../assets/card-background.svg);
                    /* 只影响背景图像 */
                    border-radius: 16px;
                    z-index: 1;
                }

                .item {
                    position: relative;
                    z-index: 10;

                    p {
                        text-align: left;
                        color: #fff;
                        font-size: 16px;
                    }

                    .item-img {
                        width: 289px;
                        height: 289px;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }

                    .item-text {
                        margin-top: 14px;

                        p {
                            font-size: 16px;
                        }
                    }

                    .item-prize {
                        margin-top: 18px;

                        p:nth-child(1) {
                            color: #BDBDBD;
                            font-size: 15px;
                            font-family: 'IBM Plex Sans Regular';
                            padding: 0;
                            margin: 0;
                        }

                        p:nth-child(2) {
                            color: #fff;
                            font-size: 24px;
                            padding: 0;
                            margin: 0;
                        }
                    }

                    .item-btn {
                        margin-top: 24px;

                        button {
                            cursor: pointer;
                            width: 100%;
                            height: 48px;
                            border-radius: 50px;
                            color: #fff;
                            font-size: 20px;
                            border: 1px solid transparent;
                            background-clip: padding-box, border-box;
                            background-origin: padding-box, border-box;
                            background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
                        }
                    }
                }

            }
        }
    }
}

.all .game-list .row .market-item.market-title {
    display: flex;
    align-items: center;
    text-align: center;

    .item {
        p:nth-child(1) {
            font-size: 24px;
            margin: 0;
            line-height: 1.4;
        }

        p:nth-child(2) {
            display: block;
            font-size: 16.57px;
            font-family: 'IBM Plex Sans Regular';
            margin: 0;
            margin-top: 20px;
            line-height: 1.4;
        }

        span {
            display: block;
            margin-top: 104px;
            font-size: 20px;
            color: #fcb455;
        }
    }
}

div.phonebox {
    margin-bottom: 20px;

    .card-title {
        margin-top: 46px;
        padding: 0 14px;
        text-align: left;

        p:nth-child(1) {
            font-size: 16px;
            text-align: left;
            color: #fff;
            margin: 0;
        }

        p:nth-child(2) {
            display: block;
            margin: 0;
            margin-top: 11px;
            font-size: 14px;
            text-align: left;
            color: #fff;
            font-family: 'IBM Plex Sans Regular';
        }

        span {
            display: block;
            margin-top: 30px;
            font-size: 17px;
            color: #fcb455;
            text-align: left;
        }
    }

    .card-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 17px;
        border-top: 1px solid #3f3f3f;
        margin-top: 20px;

        .item-left {
            width: 137px;
            height: 137px;
            border-radius: 9px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .item-right {
            width: calc(100% - 150px);

            .ended {
                font-size: 15px;
                color: #fff;
                text-align: left;
                margin: 0;
                font-family: 'IBM Plex Sans Regular';
            }

            .text {
                font-size: 17px;
                color: #fff;
                margin: 0;
                text-align: left;
            }

            .right-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    p:nth-child(1) {
                        font-size: 14px;
                        color: #fff;
                        font-weight: 400;
                        font-family: 'IBM Plex Sans Regular';
                        margin: 0;
                        text-align: left;
                    }

                    p:nth-child(2) {
                        font-size: 18px;
                        color: #fff;
                        margin: 0;
                        text-align: left;
                    }
                }

                .btn {
                    button {
                        width: 105px;
                        height: 45px;
                        color: #fff;
                        font-size: 18px;
                        border: 1px solid transparent;
                        border-radius: 10px;
                        background-clip: padding-box, border-box;
                        background-origin: padding-box, border-box;
                        background-image: linear-gradient(to right, #1f0c27, #1f0c27), linear-gradient(90deg, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419);
                    }
                }
            }
        }
    }
}

@media (max-width: 576px) {
    .box {
        padding: 10px;
    }

    .all {
        .game-item {
            padding: 8px;
        }

        .title {
            margin: 16px 0;
            font-size: 20px;
        }
    }

    .row>* {
        padding: 0 4px;
    }
}
</style>

<style scoped>
.wallet-title p {
    font-size: 16px;

    font-weight: bold;
    text-align: left;
    color: #c2c2bd;
}

.wallet-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 63px;
    border: 1px solid #323232;
    background-color: transparent;
    border-radius: 12px;
    margin-top: 25px;
    padding-left: 20px;
    box-sizing: border-box;
}

.wallet-tag>span {
    color: #fff;
    font-size: 20px;
    line-height: 63px;
    user-select: none;
}

.wallet-tag>div {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    width: auto;
    height: 100%;
}

.wallet-tag.wallet-select>div {
    width: 35%;
}

.wallet-tag>div>img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: contain;
}

.wallet-tip p {
    font-size: 14px;
    line-height: 1.4;
    padding-left: 5px;
}

.wallet-tip.error p {
    color: red;
}

.wallet-tag.wallet-candy {
    border: 0;
    background-color: transparent;
    padding-left: 0;
}

.wallet-candy>div>img {
    width: 41px;
    height: 41px;
    border-radius: 50%;
    object-fit: contain;
}

.wallet-tag>div>span {
    display: inline-block;
    width: 45px;
    font-size: 15px;
    color: #fff;
    text-align: left;
    margin-left: 5px;
}

.wallet-select {
    /* cursor: pointer; */
}

.wallet-select.active {
    border: 1px solid #ffff00;
}

.wallet-tipbox span.wallet-tip {
    font-size: 16px;
}

div.wallet-tipbox {
    margin-top: 25px;
    text-align: center;
}

.wallet-updata {
    margin-top: 25px;
    text-align: center;
    font-size: 12px;
    color: #fff;
}

.wallet-buy {
    width: 100%;
    height: auto;
    margin-top: 45px;
    padding-bottom: 15px;
    /* border-bottom: 2px solid #252525; */
}

.wallet-buy button {
    width: 100%;
    height: 54px;
    background-color: #ffff00;
    color: #000;
    border-radius: 27px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    user-select: none;
}

.wallet-buy button:hover {
    background-color: #fff;
}

.wallet-tips {
    margin-top: 15px;
    text-align: center;
}

.wallet-tips img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.wallet-tips p {
    margin-top: 15px;
    font-size: 16px;
    text-align: center;
}

.wallet-moon {
    width: 100%;
    height: auto;
    padding-top: 15px;
}

.wallet-moon>button {
    width: 100%;
    height: 54px;
    color: #141414;
    background-color: #ffff00;
    border: 1px solid #323232;
    border-radius: 27px;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
}

.wallet-moon button:hover {
    background-color: #fff;
    color: #000;
}

.wallet-text {
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
}

.selected {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 15px 5px;
    background-color: transparent;
    border-radius: 8px;
    cursor: pointer;
}

.selected.error {
    border: 1px solid red;
}

.selected-img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
}

.selected-img i {
    background-repeat: no-repeat;
    background-size: contain;
}

.selected-img i.solimg {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(../../assets/solana.png);
}

.selected-img i.usdcimg {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(../../assets/tips.png);
}

.selected-img i.tsgimg {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(../../assets/tsg.jpg);
}

.table-item.selected-img i {
    --s: 1;
}

.selected-tag {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.selected-tag.active {
    transform: rotateZ(180deg) translateY(50%);
}

.selected span {
    color: #fff;
    font-size: 16px;
}

.selected img {
    margin-right: 10px;
}

.dropdown-list {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 10;
    top: 100%;
    left: 0;
    padding: 0;
}

.dropdown-item {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #000;
}

.dropdown-item span {
    margin-left: 10px;
    color: #000;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}

.dropdown-item img {
    margin-right: 10px;
}

/* 弹窗2 样式 */
.results-box {
  color: #fff;
  text-align: center;

  .result-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .result-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }

  .result-center.change-tip {
    padding-bottom: 20px;
  }

  .result-center span {
    font-size: 24px;
    font-weight: 700;
  }

  .result-center span.change-tip {
    text-align: center;
    font-size: 18px;
  }

  .result-center span:nth-child(2) {
    padding: 0 10px;
  }

  .result-img {
    margin: 40px 0;
    width: 120px;
    height: 120px;
  }

  .result-img.change-tip {
    margin-top: 40px;
    margin-bottom: 0px;
  }

  .result-tips {
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.8px;
  }

  .blue-text {
    color: #3052fa;
    font-weight: 600;
  }

  .footer-btn__modal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 25px;

    .btn1 {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-left: 16px;
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
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      display: inline-block;
      border-radius: 48px;
      border: 1px solid #3f3f3f;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      cursor: pointer;
    }
  }

  .result-input {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: 500;
      color: rgba(140, 128, 145, 1);
    }

    div {
      position: relative;
      width: 200px;
      height: 48px;
      margin-left: 15px;
      border-radius: 126px;
      border: 1px solid rgba(63, 63, 63, 1);
      overflow: hidden;
      text-align: left;

      input {
        width: calc(100% - 39px);
        height: 100%;
        font-size: 32px;
        border-radius: 126px;
        background-color: transparent;
        color: #fff;
        border: 0;
        text-align: center;

        &:focus {
          outline: none;
        }
      }

      img {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }
    }
  }

  .result-text {
    margin-top: 50px;
    text-align: center;
    font-size: 24px;
    line-height: 20px;
    font-weight: 400;
  }

  .result-press {
    position: relative;
    width: 100%;
    height: 16px;
    border-radius: 34px;
    margin-top: 35px;
    overflow: hidden;
    background: rgba(54, 37, 61, 1);

    .press-active {
      position: absolute;
      width: 0%;
      height: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 34px;
      background: linear-gradient(90deg, #1E58FC -3.41%, #A427EB 33.84%, #D914E4 50.67%, #E10FA3 74.1%, #F10419 104.15%);
    }
  }

  .result-number {
    margin-top: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
      color: #fff;
      font-weight: 400;
    }
  }
}
</style>