// stores/counter.js
import { defineStore } from 'pinia';
import VueCookie from "vue-cookie";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        loginVisible: false,
    }),
    actions: {
        openVisible() {
            this.loginVisible = true
        },
        closeVisible() {
            this.loginVisible = false
        }
    },
});

export const userLogin = defineStore('login', {
    state: () => ({
        isLogin: VueCookie.get("token") ? true : false,
    }),
    actions: {
        changeIsLogin() {
            this.isLogin = !this.isLogin
        }
    },
});

export const useUmiWallet = defineStore('umi', {
    state: () => ({
        umi: null,
    }),
    actions: {
        changeUmi(val) {
            this.umi = val
        }
    },
});

export const useChangePrize = defineStore('prize', {
    state: () => ({
        prize: false,
    }),
    actions: {
        changePrize() {
            this.prize = !this.prize
        }
    },
});

export const useSell = defineStore('sell', {
    state: () => ({
        list: [],
    }),
    actions: {
        changeList(val) {
            this.list = val
        }
    },
});

export const playerInfo = defineStore('userInfo', {
    state: () => ({
        user: {},
    }),
    actions: {
        changeList(val) {
            this.user = val
        }
    },
});

export const userPay = defineStore('solanaPay', {
    state: () => ({
        isPay: false,
    }),
    actions: {
        changePay() {
            this.isPay = !this.isPay
        }
    },
});

export const userPayNow = defineStore('paynow', {
    state: () => ({
        isPay: true,
    }),
    actions: {
        truePay() {
            this.isPay = true
        },
        falsePay() {
            this.isPay = false
        }
    },
});

export const userDetailLogin = defineStore('nextLogin', {
    state: () => ({
        isLogin: false,
    }),
    actions: {
        truePay() {
            this.isLogin = !this.isLogin
        }
    },
});

export const userSol = defineStore('sol', {
    state: () => ({
        sol: '',
    }),
    actions: {
        changeSol(val) {
            this.sol = val
        }
    },
});

export const Loginbox = defineStore('loginbox', {
    state: () => ({
        isLogin: false,
    }),
    actions: {
        changLogin() {
            this.isLogin = !this.isLogin
        }
    },
});
