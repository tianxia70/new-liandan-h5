// 引入必要的库
import {createI18n} from 'vue-i18n'
import {Locale} from 'vant'
// 引入工具函数
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
// import zhTW from 'vant/lib/locale/lang/zh-TW';
// import viVN from 'vant/lib/locale/lang/vi-VN';
// import ptBR from 'vant/lib/locale/lang/pt-BR';
// import arSA from 'vant/lib/locale/lang/ar-SA';
// import trTR from 'vant/lib/locale/lang/tr-TR';
// import elGR from 'vant/lib/locale/lang/el-GR';
// import esES from 'vant/lib/locale/lang/es-ES';
// import itIT from 'vant/lib/locale/lang/it-IT';
// import jaJP from 'vant/lib/locale/lang/ja-JP';
// import frFR from 'vant/lib/locale/lang/fr-FR';
// // 韩语
// import koKR from 'vant/lib/locale/lang/ko-KR';


// 引入项目中需要用到的中英文文案配置js
import enLocale from './locales/en-US' //英语
import cnLocale from './locales/zh-CN' //中文
// import twLocale from './locales/zh-TW' //中文
// import trLocale from './locales/tr-TR' //土耳其
// import elLocale from './locales/el' //希腊
// import esLocale from './locales/es' //西班牙
// import itLocale from './locales/it-IT' //意大利
// import jaLocale from './locales/ja-JP' //日本
// import frLocale from './locales/fr' //法国
// import afLocale from './locales/af' //南非
// import ptLocale from './locales/pt-PT' //葡萄牙
// import arbLocale from './locales/arb' //阿拉伯
// // 越南语
// import viLocale from './locales/vi-VN'
// // 韩语
// import koLocale from './locales/ko-KR'


// 获取当前语言（初始化时localStorage里没有存语言，默认为浏览器当前的语言）
const lang = localStorage.getItem('h5Lang') || 'en-US'


// 组合element ui 和 项目自身的文案文件
const messages = {
    'en-US': {
        ...enUS,
        ...enLocale
    },
    'zh-CN': {
        ...zhCN,
        ...cnLocale
    },

}

// 使用vue-i18n库
export const i18n = createI18n({
    locale: lang,
    messages
})

// i18n.global.locale = lang

// console.log('lang', i18n.global.locale)
// 更新vant组件库本身的语言变化，支持国际化
export function vantLocales(lang) {
    if (lang === 'en-US') {
        Locale.use(lang, enUS); // 英语
    } else if (lang === 'zh-CN') {
        Locale.use(lang, zhCN); // 简体中文
    // } else if (lang === 'tr-TR') {
    //     Locale.use(lang, trTR); // 土耳其语
    // } else if (lang === 'el') {
    //     Locale.use(lang, elGR); // 希腊语
    // } else if (lang === 'es') {
    //     Locale.use(lang, esES); // 西班牙语
    // } else if (lang === 'it-IT') {
    //     Locale.use(lang, itIT); // 意大利语
    // } else if (lang === 'ja-JP') {
    //     Locale.use(lang, jaJP); // 日语
    // } else if (lang === 'fr') {
    //     Locale.use(lang, frFR); // 法语
    // } else if (lang === 'pt-PT' || lang === 'pt-BR') {
    //     Locale.use(lang, ptBR); // 葡萄牙语
    // } else if (lang === 'ar-SA') {
    //     Locale.use(lang, arSA); // 阿拉伯语
    // } else if (lang === 'vi-VN') {
    //     Locale.use(lang, viVN); // 越南语
    } else {
        Locale.use(lang, enUS); // 默认使用英语
    }
}

export default {i18n, vantLocales}
