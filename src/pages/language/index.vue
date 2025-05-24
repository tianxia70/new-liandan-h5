<template>
<div class="page-container language-container">
    <van-nav-bar
        :title="$t('语言设置')"
        left-arrow
        @click-left="onClickLeft"
    />

  <div class="page-body page-scroll">
    <div class="lang-box">
      <div v-for="(item,index) in lang" :key="index" class="lang-padding border-b-grey" @click="handleSetLang(item.key)">
        <div class="lang-title">{{ item.title }}</div>
        <div class="lang-flex"></div>
        <van-icon class="check" name="success" v-if="item.key==$i18n.locale"/>
        <!-- <img v-if="item.key==$i18n.locale" src="../../assets/image/public/checked.png"
             style="width: 20px;height: 20px;"/> -->
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { setStorage } from '@/utils'
import { useI18n } from 'vue-i18n'
import { i18n, vantLocales } from '@/i18n';

const { locale } = useI18n()
const router = useRouter(); // 获取路由实例

const lang = ref([
  // {title: 'Afrikaans', key: 'af'},
  // {title: 'عربي', key: 'arb'},
  {title: '简体中文', key: 'zh-CN'},
  // {title: '繁体中文', key: 'zh-TW'},
  {title: 'English', key: 'en-US'},
  // {title: 'España', key: 'es'},
  // {title: 'France', key: 'fr'},
  // {title: 'Ελλάδα', key: 'el'},
  // {title: '한국어', key: 'ko-KR'},
  // {title: 'Italia', key: 'it-IT'},
  // {title: '日本', key: 'ja-JP'},
  // {title: 'Português', key: 'pt-PT'},
  // {title: 'Türkiye', key: 'tr-TR'},
  // {title: 'Tiếng Việt', key: 'vi-VN'},
])

function handleSetLang(lang) {
  if(lang == locale.value) return
  // 设置i18n.locale 组件库会按照上面的配置使用对应的文案文件
  localStorage.setItem('h5Lang', lang)
  locale.value = lang
  vantLocales(lang); // 配置国际化
  // this.$i18n.locale = lang
  // this.setLanguage(lang)
  onClickLeft()
}

function onClickLeft() {
  // console.log(this.$i18n.locale)
  router.go(-1)
}

</script>
<style lang="scss" scoped>
.language-container {
.lang-box {

  .lang-padding {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 2px;
    box-sizing: border-box;
    // border-bottom: 1px solid #ddd;
  }

  .check {
    color: $primary-color;
    font-size: 28px;
  }
}
}
</style>
