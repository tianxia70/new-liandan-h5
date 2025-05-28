import axios from 'axios'
import { showNotify } from 'vant'
import { i18n } from "@/i18n";
import Config from "@/config";
import { closeToast, showLoadingToast, showToast } from 'vant'
import { useUserStore } from '@/store'
import router from '@/router/router'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置 环境的接口地址
const BASE_URL = process.env.NODE_ENV === 'production' ? Config.baseUrl.pro : Config.baseUrl.dev
// 创建
const request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 超时时间
//   withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
})

// 拦截请求
request.interceptors.request.use(config => {
    if (config.loading) {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
        });
    }
    // headers
    if (config.url === 'public/uploadimg!execute.action') {
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    if (!config.params) { // 放在哪里
        config.params = {}
    }
    // if(config.method == 'post' && config.params) {
    //     config.data = { ...config.params }
    // }
    if (localStorage.getItem('token')) {
        config.headers['token'] = localStorage.getItem('token')
    }
    if (i18n.global.locale == 'en-US') {
        config.headers['lang'] = 'en'
    } else {
        config.headers['lang'] = i18n.global.locale
    }

    return config
}, error => {
    Promise.reject(error)
})

/**
 * 烤猫, [7/27/2022 9:08 PM]
 * 0 成功
 1 直接显示
 105 直接提示“当前还需交易“ + 返回的金额值 + ”,才可提币"
 401 是需要实名认证，问客户”未实名认证，是否认证？"
 403 无登录信息，跳转登录页面
 506 "帐户异常需要进行C3认证，请联系在线客服。"
 */

// 拦截响应
request.interceptors.response.use(res => { // 200开头的
        if (res.config.loading) {
            closeToast()
        }
        const {errCode, data, msg} = res.data
        const userStore = useUserStore()
        switch (Number(errCode) * 1) {
            case 200000:
                // return res.config?.isKefu ? res.data : Promise.resolve(data || {})
                return res.data
            case 1:
                // console.log('i18n.t(msg)', i18n.global.t('asd') || '1111', msg)
                showNotify({type: 'danger', message: i18n.global.t(msg) || msg});
                return Promise.reject(res.data || res.msg)
            case 400003:
                // localStorage.removeItem('token')
                // router.replace('/login')
                userStore.layout()
                // window.location = '/#/login'
                return
            case 403:
                // localStorage.removeItem('token')
                // router.replace('/login')
                userStore.layout()
                // window.location = '/#/login'
                return
            default:
                showNotify({type: 'danger', message: i18n.global.t('errorCode.'+errCode)  || msg});
                return Promise.reject(res.data || res.msg)
        }
    }, error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = 'request error';
                    break
                // case 401:
                //     error.message = '未授权，请登录';
                //     break
                // case 403:
                //     error.message = '拒绝访问';
                //     break
                // case 404:
                //     error.message = `请求地址不存在: ${error.response.config.url}`;
                //     break
                // case 408:
                //     error.message = '请求超时';
                //     break
                // case 500:
                //     error.message = '服务器内部错误';
                //     break
                // case 501:
                //     error.message = '服务未实现';
                //     break
                // case 502:
                //     error.message = '网关错误';
                //     break
                // case 503:
                //     error.message = '服务不可用';
                //     break
                // case 504:
                //     error.message = '网关超时';
                //     break
                // case 505:
                //     error.message = 'HTTP版本不受支持';
                //     break
                default:
                    error.message = showNotify({
                        // icon: 'none',
                        // message: i18n.t(msg)
                        // message: '网络波动请刷新页面'
                        message: 'request error'
                    });
                    Promise.reject(error.message)
                    break
            }
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(error)
    }
)
export default request
