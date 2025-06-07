import router from "@/router/router";
import {i18n} from "@/i18n";
import { showToast } from "vant";

/*!
 * @author atongmu <zhounianlai@teacher.com.cn>
 * date 11/07/2019
 * description The project tool function file.
 */

export function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}


export function isNumeric(str) {
    return /^\d+$/.test(str);
}

export const navigateTo = (url) => {
	router.push(url)
}

export const redirectTo = (url) => {
    router.replace(url)
}

export const switchTab = (url) => {
	router.replace(url)
}

// export const reLaunch = (url) => {
// 	uni.reLaunch({
// 		url
// 	})
// }

export const navigateBack = () => {
    // const router = useRouter(); // 获取路由实例
	router.go(-1)
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(i18n.global.t("复制成功"));
  } catch (err) {
    // // 降级到传统方法
    // const fallbackSuccess = fallbackCopyText(text);
    // if (!fallbackSuccess) {
    //   showToast("复制失败，请手动复制");
    // }
  }
}


// 获取一个数的小数位数
export function getDecimalLength(num = 0) {
    const parts = typeof num == 'number' ? num.toString().split('.') : num.split('.');
    return parts[1] ? parts[1].length : 0;
}

// 加法
export function preciseAdd(a = 0, b = 0) {
    const maxDecimals = Math.max(getDecimalLength(a), getDecimalLength(b));
    const factor = Math.pow(10, maxDecimals);
    return (Math.round(a * factor) + Math.round(b * factor)) / factor;
}

// 减法
export function preciseSub(a = 0, b = 0) {
    const maxDecimals = Math.max(getDecimalLength(a), getDecimalLength(b));
    const factor = Math.pow(10, maxDecimals);
    return (Math.round(a * factor) - Math.round(b * factor)) / factor;
}

// 乘法
export function preciseMul(a = 0, b = 0) {
    const aDecimals = getDecimalLength(a);
    const bDecimals = getDecimalLength(b);
    const factor = Math.pow(10, aDecimals + bDecimals);
    return (Math.round(a * Math.pow(10, aDecimals)) * Math.round(b * Math.pow(10, bDecimals))) / factor;
}

// 除法
export function preciseDiv(a = 0, b = 0) {
    const aDecimals = getDecimalLength(a);
    const bDecimals = getDecimalLength(b);
    const factorA = Math.pow(10, aDecimals);
    const factorB = Math.pow(10, bDecimals);
    return (Math.round(a * factorA) / Math.round(b * factorB)) * Math.pow(10, bDecimals - aDecimals);
}

/**
 * @description 时间格式处理
 */
 export const formatData = (data) => {
    let thisData = formatTime(new Date(), "yyyy-MM-dd");
    let myData = data.substr(0, 10);
    if (thisData == myData) {
        let Time = data.substr(11, 5);
        return Time
    } else {
        if (thisData.substr(0, 4) == myData.substr(0, 4) && thisData != myData) {
            let Data = data.substr(5, 11);
            return Data
        } else {
            let Year = myData;
            return Year
        }
    }
}

/**
 * @description 时间格式转化
 * @param {String} date 日期
 * @param {String} fmt 需要的格式
 */
export const formatTime = (date, fmt) => {
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @description 验证手机号格式是否正确
 * @param {String} mobile 电话号码
 */
export const checkMobileformat = mobile => /^1[345789]\d{9}$/.test(mobile);

/**
 * @description Array clear empty item.
 * @param {Array} array
 */
export const arrayClearEmptyItem = array => {
    return array.filter(item => item);
}

/**
 * @description 判断一个日期是过去还是未来
 * @param {String} d 要判断的日期
 * @returns past => false   future => true
 */
export const judgeDateIsPastOrFuture = (d) => {
    if (!d) {
        return false;
    }
    const nowDate = new Date();
    const nowTimeStamp = nowDate.getTime();
    const date = new Date(d.replace(/-/g, "/"));
    const dateTimeStamp = date.getTime();
    return nowTimeStamp < dateTimeStamp;
}

/**
 * @description 判断一个字符串中是否有重复的项（0-9, a-z, A-Z）
 * @param {String} str 判断的目标字符串
 * @returns {Boolean} true: 有重复项   false: 无重复项
 */
export const strIsReplace = str => {
    const passwordRule = /[0-9a-zA-Z]/;
    const arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (passwordRule.test(element)) {
            if (i === arr.length - 1) {
                return false;
            }
            if (str.includes(element, i + 1)) {
                return true;
            }
        }
    }
    return false;
}
// 设置localStorage
export const setStorage = function(key, obj) {
    let json = JSON.stringify(obj)
    window.localStorage.setItem(key, json)
}

// 获取localStorage
export const getStorage = function(key) {
    const str = window.localStorage.getItem(key)
    if (!str) {
        return null
    }
    return JSON.parse(str)
}

// 移除localStorage
export const removeStorage = function(key) {
    window.localStorage.removeItem(key)
}

// 获取浏览器默认语言
export const getBrowserLang = function() {
    let browserLang = navigator.language ? navigator.language: navigator.browserLanguage
    let defaultBrowserLang = ''
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh-CN'
    } else {
        defaultBrowserLang = 'en-US'
    }
    return defaultBrowserLang
}


/**
 * @description 休眠函数
 * @param timeout 休眠时间， 设置为负数会永久休眠
 * @returns Promise<void>
 */
export const delay = (timeout) => {
    return new Promise((resolve) => {
      if (timeout < 0) return;
      setTimeout(resolve, timeout);
    });
  };

// export const enterOnlineService = async (user) => {
//     // if(window.ssq)
// console.log('window.ssq', window.ssq, user)
//     window.ssq.push('clearUser')
//     await window.ssq.push('setLoginInfo', {
//         user_id: user.usercode,
//         user_name: user.username || '',
//         language: i18n.global.locale || 'en-US',
//         phone: user.phone || '',
//         email: user.email || '',
//         description: `用户code: ${user.usercode}`
//     });
//     window.ssq?.push("chatOpen");
// }


// 处理数值的千分位和保留小数位
export function smartToFixed(num = 0, len = 2) {
	const number = Number(num);
	if (isNaN(number)) return num; // 非数字直接返回
    
	// 分离整数与小数部分
	const [integerPart, decimalPart] = number.toString().split('.');

	// 处理千分位
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
	// 无小数部分，直接返回
	if (!decimalPart) return formattedInteger; // 无小数直接返回

	// 获取小数部分的长度（去除末尾的零）
	const trimmedDecimal = decimalPart.replace(/0+$/, '');
	const finalDecimal = trimmedDecimal.length > len ? 
	// number.toFixed(len).split('.')[1] : 
    trimmedDecimal.substring(0, len) : 
	trimmedDecimal || '';
	    
	return finalDecimal ? 
			`${formattedInteger}.${finalDecimal}` : 
			formattedInteger;
}


// 区块链地址隐藏中间部分
export function hideChainNum(num){
	const numN = typeof num == 'number' ? String(num) : num
	return numN.slice(0, 4) + ' **** ' + numN.slice(-4);
}