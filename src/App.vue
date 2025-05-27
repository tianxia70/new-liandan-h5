
<template>
  <div class="app-containner">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { useUserStore, useWalletStore } from '@/store'
import { primaryColor } from '@/utils/theme'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
// console.log('locale', locale.value)
import request from "@/request/kefuRequest";
import default_customer from "@/assets/img/default_customer.png"

import headImg1 from "@/assets/img/avatar/1.png"
import headImg2 from "@/assets/img/avatar/2.png"
import headImg3 from "@/assets/img/avatar/3.png"
import headImg4 from "@/assets/img/avatar/4.png"
import headImg5 from "@/assets/img/avatar/5.png"
import headImg6 from "@/assets/img/avatar/6.png"
import headImg7 from "@/assets/img/avatar/7.png"
import headImg8 from "@/assets/img/avatar/8.png"
import headImg9 from "@/assets/img/avatar/9.png"
import headImg10 from "@/assets/img/avatar/10.png"
import headImg11 from "@/assets/img/avatar/11.png"
import headImg12 from "@/assets/img/avatar/12.png"
import headImg13 from "@/assets/img/avatar/13.png"
import headImg14 from "@/assets/img/avatar/14.png"
import headImg15 from "@/assets/img/avatar/15.png"
import headImg16 from "@/assets/img/avatar/16.png"
import headImg17 from "@/assets/img/avatar/17.png"
import headImg18 from "@/assets/img/avatar/18.png"
import headImg19 from "@/assets/img/avatar/19.png"
import headImg20 from "@/assets/img/avatar/20.png"
import headImg21 from "@/assets/img/avatar/21.png"

const sellerHeadImgObj = {
  1: headImg1,
  2: headImg2,
  3: headImg3,
  4: headImg4,
  5: headImg5,
  6: headImg6,
  7: headImg7,
  8: headImg8,
  9: headImg9,
  10: headImg10,
  11: headImg11,
  12: headImg12,
  13: headImg13,
  14: headImg14,
  15: headImg15,
  16: headImg16,
  17: headImg17,
  18: headImg18,
  19: headImg19,
  20: headImg20,
  21: headImg21,
}

const ImUrl = ref('')
const getImageUrlIm = (file) => {
  return new URL(file, import.meta.url).href;
}

function getHeadImgByIndex(index) {
  return getImageUrlIm(sellerHeadImgObj[index + ""])
}
let mp3, play
audioInit()

const userStore = useUserStore()
const walletStore = useWalletStore()
const route = useRoute()
const router = useRouter()
// const usdt = computed(() => {
// 	return walletStore.usdt || 0
// })
const token = computed(() => {
  return userStore.getToken
})

watch(() => token.value, (val) => {
  if(val) {
    // console.log('token')
    getAppCfg()
  } else {
    // token不存在的时候 重置聊天
    getAppCfg()
  }
})

onMounted(async() => {
  getAppCfg()
  getUserInfo()
})

function getUserInfo() {
  if(token.value) {
    userStore.getUserInfo()
  } else {
    // 如果没有登录，除了不需要登录的路由，其他全部跳转登录
    if(!route?.meta?.noAuth){
      router.replace('/welcome')
    }
  }
}

async function getAppCfg() {

	if(token.value) {
		userStore.getVipList()
		walletStore.getWalletBalance()
	}
  chatRemove()
  setTimeout(async () => {

    ImUrl.value="https://lt.xhduh.com/"
    await chatInit(ImUrl)
  }, 2000)
}

function audioInit() {
  play = function () {
    if (mp3) {
      mp3.play().catch(function () { })
    }
  }

  mp3 = new Audio()
  mp3.src = "https://imgtest1.s3.amazonaws.com/audio/service.mp3"
}

let chatIsInit = false
function chatRemove() {//移除全部聊天窗口
  const im_create_iframe = window.im_create_iframe
  im_create_iframe && im_create_iframe.remove()
  chatIsInit = false
}

function loadJs(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);

        script.onload = () => {
            resolve();
        }
        script.onerror = () => {
            reject();
        }
    })
}

/**
 * 数字千位符格式化
 * eg:
 * 17267737 -> 17,267,737
 */
function priceFormat(num, float){
    if (float === undefined) float = 2
    if (float === 0) {
        return Math.floor(Number(num)).toLocaleString();
    } else if (float && Number(num)) {
        const numStr = _toFixed(num, float);
        const numPre = numStr.slice(0, numStr.indexOf('.'));
        const numRi = numStr.slice(numStr.indexOf('.') + 1);
        const intStr = numPre.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        const floatStr = numRi ? `.${numRi}` : '';
        return `${intStr}${floatStr}`;
    } else {
        return '0.00';
    }
}

// 不要四舍五入 直接截取
function _toFixed(num, decimal){
    num = num.toString();
    let index = num.indexOf('.');
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}

async function chatInit(ImUrl) {//只允许会员登录后才能用聊天系统，因此用户没有登录，不需要初始化
  // if (window.im_create_iframe) return
  if (chatIsInit) {
    return
  }
  const title = t('在线客服')
  chatIsInit = true
  const extData = {
    routerConfig: [
      {
        router: "client",
        params: {
          userType: token.value ? 5 : 1,//1:游客，5：会员，
          lang: locale.value == 'en-US' ? 'en' : locale.value,
        },
        other: {
          iconStatus: false,
          callApi: request,
          fileUpload: async function (fileInfo) {
            // 创建 Blob 对象
            let blob = new Blob([fileInfo.buffer], { type: fileInfo.fileType });
            // 你可以在 iframe 中使用这个 Blob 对象
            const file = new File([blob], fileInfo.fileName, { type: fileInfo.fileType });
            const formData = new FormData()
            formData.append("file", file)
            formData.append("moduleName", "user")

            return await request({
              url: `api/user/uploadimg`,
              method: "post",
              isKefu: true,
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data", // 指定请求头为文件上传类型
                // token: getToken()
              }
            })
          },
          imDataConfig: {
            color: primaryColor,//颜色，你们自己配置，要跟网站的主颜色一致
            name: title || "chat",//聊天窗口标题
            default_customer: getImageUrlIm(default_customer),//默认客服头像
            logo: getImageUrlIm(default_customer),//默认客服头像
            // default_visitor:"",//默认游客头像
            // floatLogoRight: "20",//浮动图标右边距
            // floatLogoBottom: "20",//浮动图标底部边距
            // width: "44",//宽
            // height: "44",//高度
            // borderRadius: "100"//圆色
          },
          play() {
            console.log("播放声音")
            play && play()
          },
          getGoosInfoById(json) {
            return new Promise((resolve) => {
              request({
                url: `api/user/buyer/goods/info?sellerGoodsId=${json.id}`,
                method: "post"
              }).then(({data}) => {
                resolve({
                  goodsImg:data.imgUrl1,
                  currencySymbol:user_store.currentCurrency,//剩下这几个参数帮我加上
                  goodsPrice:priceFormat(data.discountPrice || data.sellingPrice),
                  goodsName:data.name
                })
              })
            })
          }
        }
      }
    ],
    autoInit: false
  }
  if (!window.im_create_iframe) {
    // await loadJs(`https:${ImUrl.value}/im_create_iframe.js?id=${Math.random()}`)
    await loadJs(`${ImUrl.value}im_create_iframe.js?id=${Math.random()}`)
    // await loadJs(`http://localhost:3333/im_create_iframe.js?id=${Math.random()}`)
  }
  console.log('加载客服: ', token.value)
  await im_create_iframe.init(extData)
}
</script>

<style scoped lang="scss">
.app-containner {
  width: 100vw;
  height: 100vh;
  position: relative;
  max-width: 550px;
  margin: 0 auto;
  // color: $primary-color;
}
</style>
