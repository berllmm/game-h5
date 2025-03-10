import { Connection, clusterApiUrl, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import currency from 'currency.js';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { useUmiWallet } from '@/utils/counter.js'

export function selectWallet(val) {
    if (val == 'Phantom') {
        return window.solana
    } else if (val == 'Backpack') {
        return window.backpack.solana
    } else if (val == 'Solflare') {
        return window.solflare
    } else if (val == 'Wallet') {
        return new Connection('https://claribel-82n8ij-fast-mainnet.helius-rpc.com', 'confirmed');
    }
}

export function selectConnection(val) {

    return new Connection('https://claribel-82n8ij-fast-mainnet.helius-rpc.com', 'confirmed');
}

export function cutApart(val) {
    let rust = currency(val).format({
        symbol: '', decimal: '.',
        separator: ','
    }).split('.')[0]

    return rust
}

export function cutApartNumber(val) {
    let rust = currency(val, { precision: 3 }).format(
        {
            symbol: '',
            decimal: '.',
            separator: ','
        })

    return rust
}

export function cutApartNumberTwo(val) {
    let rust = currency(val, { precision: 2 }).format(
        {
            symbol: '',
            decimal: '.',
            separator: ','
        })

    return rust
}

export function initWalletUmi() {
    const wallet = selectWallet(localStorage.getItem('local'))
    const umiWallet = useUmiWallet()

    const umi = createUmi('https://claribel-82n8ij-fast-mainnet.helius-rpc.com')
        .use(walletAdapterIdentity(wallet))
        .use(dasApi())
        .use(mplTokenMetadata())
        .use(mplBubblegum())

    umiWallet.changeUmi(umi)

}