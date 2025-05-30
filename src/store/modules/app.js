import { defineStore } from "pinia"
import { apiBulletin } from '@/api/user'

export const useAppStore = defineStore('app', {
  state: () => ({
    noticeList: [],
    isShowNotice: true
  }),
  getters: {
  },
  actions: {
    // setLanguage: (language) => {
    // 	this.language = language
    // 	setStorage('lang', language)
    // },
    getNoticeList() {
      
      return new Promise((resolve, reject) => {
        if(this.noticeList?.length == 0) {
          apiBulletin({}).then(res => {
            if(res?.length) {
              this.noticeList = [...res]
              // console.log('noticeList', this.noticeList)
              resolve(JSON.parse(JSON.stringify(res)))
            }else {
              resolve([])
            }
          }).catch(() => {
              resolve([])
          })
        } else {
          resolve(this.noticeList)
        }
      })
    }
  }
})