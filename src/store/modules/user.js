import { defineStore } from "pinia"
import { apiUserInfo } from '@/api/login'
import { apiUserLevelList, apiNotifiyUnread, apiBulletin } from '@/api/user'
import router from '@/router/router'

// import { setStorage } from '@/utils'
// import { getStorage, setStorage, getBrowserLang } from '@/utils'
// import { i18n } from '@/i18n'
// console.log('i18n.language', i18n.locale)
const userOpt = { id: 0  }
export const useUserStore = defineStore('user', {
	persist: {
		paths: ['token', 'user', 'language']
	},
	state: () => ({
		user: {...userOpt},
		token: '',
		showBalance: false,
		unReadNum: 0,
		language: '',
		vipList: [],
	}),
	getters: {
		getToken(state) {
			return state.token || ''
		},
		getUser(state) {
			return state.user || {}
		},
		getCurVip(state) {
			const curVip = state.vipList.find(item => item?.level == state.user?.userLevel)
			if(curVip?.level) {
				return {...curVip}
			}
			return {}
		}
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
							console.log('noticeList', this.noticeList)
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
		},
		getUserInfo(token) {
			return new Promise((resolve, reject) => {
				apiUserInfo({}).then(res => {
					if(res.usercode) {
						if(token) {
							this.token = token
						}
						this.user = {...res}
						resolve({...res})
					}else {
						reject({})
					}
				}).catch(() => {
					reject({})
				})

				this.getNotifiyUnread()
			})
		},
		getVipList() {
			apiUserLevelList().then(res => {
				if(res?.length) {
					this.vipList = [...res]
				}
			})
		},

		// 获取未读消息数量
		getNotifiyUnread() {
			apiNotifiyUnread({}).then(res => {
				this.unReadNum = res?.count ? Number(res.count) : 0
			})
		},
		setUser(user) {
			if(user && user?.usercode) {
				this.user = {...user}
			}
		},
		layout() {
      localStorage.removeItem('token')
			this.token = ''
			this.user = {...userOpt}
			router.replace('/welcome')
		}
	}
})