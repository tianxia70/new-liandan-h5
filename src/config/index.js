
export const DEFAULT_THEME = 'green'

export const APP_NAME = 'DEV_TITLE'
const ENV_DEV = 'xin.ebvsjbv.site' // dev
//获取当前域名
const ENV_PRO = window.location.hostname
// 当是app时，使用app的域名
const ENV_APP = 'www.mhuiwo.com'

let base_url = ''
let host_url = ''
if (process.env.NODE_ENV === 'development') {
    host_url = 'https://xin.ebvsjbv.site'
    base_url = 'https://' + ENV_DEV

} else {
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
        host_url = 'https://' + ENV_PRO
        base_url = 'https://' + ENV_PRO
    } else {
        host_url = 'https://' + ENV_APP
        base_url = 'https://' + ENV_APP
    }
}

export const HOST_URL = host_url
export const BASE_WAP_URL = base_url
export default {
    /**
     * @description Request api base url.
     */
    baseUrl: {
        dev:  HOST_URL,
        // dev: "https://ld.ebvsjbv.site/wap/",
        // dev: "https://www.lifestylepopit.com/wap/",
        // pro: "https://ld.ebvsjbv.site/wap/",
        // pro: "https://www.lifestylepopit.com/wap/",
        pro: HOST_URL,
        // pro: "/wap/",
    },

    /**
     * @description Index page name.
     */
    homePage: "index",

    /**
     * @description Public image base url.
     */
    imageBaseUrl: "",

    /**
     * @description Cookie's expire date, default 7 days.
     */
    cookieExpires: 7,
}

