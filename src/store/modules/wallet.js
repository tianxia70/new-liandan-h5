import { defineStore } from "pinia"
import { apiWalletGetUsdt, apiGetBlockChaneList } from '@/api/wallet'
import router from '@/router/router'

const balanceOpt = {
    "rebate": 0,  // 退税
    "money": 0,
    "frozenMoney": 0, // 冻结的钱
    "signBonus": 0,   // 签署奖金
    "sellerSignBonusRatio": "",   // 卖方签约奖金比例
    "rechargeAmount": "",   // 充值金额
    "usdtMoney": 0,   // usdt钱
    "usdtFrozenMoney": 0    // usdt冻结资金
}

export const useWalletStore = defineStore('wallet', {
  // persist: {
  //   storage: localStorage
  // },
  state: () => ({
    balance: { ...balanceOpt },
    blockchainList: []
  }),
  getters: {
    
  },
  actions: {
    getWalletBalance() {
      return new Promise((resolve, reject) => {
        apiWalletGetUsdt().then(res => {
          if(res?.usdtMoney >= 0) {
            this.balance = { ...res }
          }
        }).catch(() => {
          reject({})
        })
      })
    },
    getChannelBlockchainList() {
      return new Promise((resolve, reject) => {
        if(this.blockchainList?.length == 0) {
          apiGetBlockChaneList({}).then(res => {
            if(res?.length) {
              this.blockchainList = [...res]
              resolve(JSON.parse(JSON.stringify(res)))
            }else {
              resolve([])
            }
          }).catch(() => {
              resolve([])
          })
        } else {
          resolve(this.blockchainList)
        }
      })

    }
  }
})