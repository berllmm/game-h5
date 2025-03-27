import MATSURI_SSR_SR_LASTONE from '/video/MATSURI/MATSURI_black.mp4'
import MATSURI_R_L from '/video/MATSURI/MATSURI_silver.mp4'
import MATSURI_NR from '/video/MATSURI/MATSURI_blue.mp4'

import TOKYO_SSR_SR_LASTONE from '/video/TOKYO/TOKYO_black.mp4'
import TOKYO_R_L from '/video/TOKYO/TOKYO_silver.mp4'
import TOKYO_NR from '/video/TOKYO/TOKYO_blue.mp4'

import SEA_SSR_SR_LASTONE from '/video/SEA/SEA_black.mp4'
import SEA_R_L from '/video/SEA/SEA_silver.mp4'
import SEA_NR from '/video/SEA/SEA_blue.mp4'

export function videoList(val) {
    if (val == 'Dragon Ball Figure Collection') {
        return {
            SSR: MATSURI_SSR_SR_LASTONE,
            SR: MATSURI_SSR_SR_LASTONE,
            R: MATSURI_R_L,
            L: MATSURI_R_L,
            NR: MATSURI_NR,
            LASTONE: MATSURI_SSR_SR_LASTONE,
        }
    } else if (val == 'Be@RBRICK COLLECTION') {
        return {
            SSR: TOKYO_SSR_SR_LASTONE,
            SR: TOKYO_SSR_SR_LASTONE,
            R: TOKYO_R_L,
            L: TOKYO_R_L,
            NR: TOKYO_NR,
            LASTONE: TOKYO_SSR_SR_LASTONE,
        }

    } else if (val == 'The Great story of 《ONE PIECE》') {
        return {
            SSR: SEA_SSR_SR_LASTONE,
            SR: SEA_SSR_SR_LASTONE,
            R: SEA_R_L,
            L: SEA_R_L,
            NR: SEA_NR,
            LASTONE: SEA_SSR_SR_LASTONE,
        }
    }
}