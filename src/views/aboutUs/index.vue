<template>
    <div class="user-info-content">
        <div class="title">
            <div class="base-border">CONTACT US</div>
        </div>
        <div class="online-block online-made">
            <div class="made-texts">
                <div>
                    <div class="made-titles" v-for="(item, index) in messageText" :key="'online' + index">
                        <div class="title-left" v-if="item.type == 1">
                            <div class="title-img">
                                <img src="@/assets/wwallet.png" alt="">
                            </div>
                            <div class="title-box">
                                <div class="title-text">
                                    <p>{{ item.content }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="title-right" v-if="item.type == 0">
                            <div class="title-box">
                                <div class="title-text">
                                    <p>{{ item.content }}</p>
                                </div>
                            </div>
                            <!-- <div class="title-img">
                                <img :src="userImage" alt="">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="made-button">
                <textarea v-model="userText" placeholder="TYPE HERE" @keydown="sendMessage($event)"></textarea>
                <button @click="submit">
                    <img src="../../assets/Send.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import axios from "@/utils/axios";
import VueCookie from 'vue-cookie';
import userImg from "../../assets/avatar.svg"
import { playerInfo } from '../../utils/counter';

onMounted(() => {
    goChat()
})

const messageText = ref([])
const userImage = ref('')
const getInterval = ref(null)
const userText = ref('')

const goChat = async () => {
    userImage.value = playerInfo().user.avatarUrl

    if (!userImage.value) {
        userImage.value = userImg
    }

    const res = await axios.get('/tsg/player/chatMessage')

    if (res.data.code == 200) {
        messageText.value = res.data.data.msgList

        await nextTick()

        const madeBox = document.querySelector('.made-texts')

        madeBox.scrollTop = (madeBox.scrollHeight - madeBox.clientHeight)

    }
}

const submit = async () => {
    if (userText.value == '') {
        return
    }

    const res = await axios.post('/tsg/player/sendChatMessage', {
        message: userText.value
    })

    if (res.data.code == 200) {

        userText.value = ''

        goChat()

        getInterval.value = setInterval(() => {
            goChat()
        }, 10000)
    }
}

const oldKey = ref('')

const sendMessage = (event) => {

    if (oldKey.value == 'Shift' & event.key == 'Enter') {
        oldKey.value = 0

    } else if (event.key == 'Enter' & oldKey.value !== 'Shift') {
        oldKey.value = ''

        submit()
    } else {
        oldKey.value = event.key
        if (event.key == 'Shift') {
            setTimeout(() => {
                oldKey.value = ''
            }, 2000)
        }
    }
}
</script>

<style scoped>
.user-info-content {
    margin: 32px 0;
    background-color: #1f0c27;
    border-radius: 32px;
    padding: 40px;
    border: 1px solid rgba(63, 63, 63, 1)
}
.user-info-content div.title {
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-info-content div.base-border {
    display: inline-block;
    margin-bottom: 40px;
    font-size: 40px;
    font-weight: 600;
    border-image: linear-gradient(to right, #1e58fc, #a427eb, #d914e4, #e10fa3, #f10419) 2;
    border-width: 2px;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right: none;
    color: #fff;
}

.online-made {
    width: 100%;
    height: calc(100% - 100px);
    border: 1px solid rgba(63, 63, 63, 1);
    border-radius: 12px;
    overflow: hidden;
}

.made-texts {
    width: 100%;
    height: 800px;
    padding: 10px 0;
    overflow-x: hidden;
}

.made-texts>div {
    width: 100%;
    height: auto;
    padding: 10px 25px;
}

.made-titles {
    width: 100%;
    margin-top: 10px;
    padding-right: 10px;
}

.made-titles:first-child {
    margin-top: 0;
}

.title-left {
    display: flex;
}

.title-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ccc;
}

.title-img>img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.title-left>div.title-box {
    max-width: 40%;
    width: auto;
    height: auto;
    margin-left: 10px;
}

.title-text {
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 7px 16px;
    box-sizing: border-box;
    border-radius: 24px;
    margin-bottom: 10px;
}

.title-left .title-text {
    background: rgba(54, 37, 61, 1);
}

.title-right .title-text {
    background: rgba(48, 82, 250, 1);
}

.title-text p {
    text-align: left;
    font-size: 16px;
    color: #fff;
    word-wrap: break-word;
    margin: 0;
    line-height: 1.4;
}

.title-right {
    display: flex;
    justify-content: right;
}

.title-right .title-box {
    /* margin-right: 10px; */
}

.title-right .title-text {
    margin-left: 0;
}

.made-button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    background-color: #000;
}

.made-button textarea {
    width: 95%;
    height: 100%;
    border-radius: 0;
    padding: 5px 15px;
    border: 0px;
    font-size: 16px;
    overflow: hidden;
    resize: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    box-sizing: border-box;
    border-right: 0;
    color: #fff;
    background: rgba(54, 37, 61, 1);

}

.made-button textarea:focus {
    outline: none;
}

.made-button textarea::placeholder {
    color: rgba(113, 118, 128, 1);
    text-align: left;
}

.made-button button {
    width: 5%;
    height: 100%;
    border: 0px;
    border-left: 0px;
    background-color: rgba(54, 37, 61, 1);
    color: #000;
    font-size: 18px;
    border-radius: 0;
    margin: 0;
    box-sizing: border-box;
    cursor: pointer;
}

.made-button button>img {
    width: 24px;
    height: 24px;
}

/* .made-button button:hover {
    background-color: #ffff00;
    color: #000;
} */

@media screen and (max-width:768px) {
    .user-info-content {
        padding: 10px 15px;
    }

    .made-texts>div {
        padding: 10px;
    }

    .title-left>div.title-box {
        max-width: 70%;
    }
    .title-right>div.title-box{
        max-width: 70%;
    }
    .made-button textarea {
        width: 80%;
    }
    .made-button button{
        width: 20%;
    }
}
</style>