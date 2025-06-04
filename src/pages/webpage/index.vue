<template>
<div class="page-container webpage-container">
  <van-nav-bar class="page-navbar" left-arrow :title="title"  @click-left="navigateBack">

  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="p-20 web-text-cont">
       <van-image v-if="sectionType == 1" class="w-full" :src="item.imageUrl" v-for="item in infoList"/>

       <div v-else-if="webpageCont" v-html="webpageCont"></div>

        <EmptyComp v-else />
    </div>
  </div>
</div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from "vue-i18n"
import EmptyComp from '@/components/empty/index.vue'
import {useRouter, useRoute} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { useUserStore, useAppStore } from '@/store'

const { t } = useI18n();
const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例
const route = useRoute()
const sectionType = ref(0)
const webpageCont = ref('')
const imagesList = ref([])
const infoList = ref([])
const infoData = ref({})

// 
const sectionArr = computed(() => {
  return appStore.sectionArr || []
})

const title = computed(() => {
  if(sectionType.value == 1) {
    return t('证书')
  } else if(sectionType.value == 2) {
    return t('最新事件')
  } else if(sectionType.value == 3) {
    return t('关于我们')
  } else if(sectionType.value == 4) {
    return t('服务条款')
  }
})

onMounted(() => {
  // console.log('route.query.conts', route.query)
  setTimeout(() => {
    let conts = [...sectionArr.value]
    // console.log('conts', conts)
    // let conts = null
    if((!conts || conts?.length == 0) && route?.query?.conts) {
      conts = JSON.parse(route.query.conts) || []
    }

    if(conts?.length) {
      sectionType.value = conts[0]?.sectionType
      
      // infoData.value = {...conts}
      if(sectionType.value == 1) {
        // const imgs = cont.imageUrl.split(';')
        infoList.value = [...conts]
        console.log('infoList', infoList.value)
        // imagesList.value = [...imgs]
      } else {
        webpageCont.value = conts[0]?.content || ''
      }
    }
  }, 500)
})


</script>
<style lang="scss" scoped>
.webpage-container {

  .web-text-cont {
    width: 100%;
    overflow-x: hidden;
    word-wrap: break-word;
    white-space: normal;

    :deep(img) {
      max-width: 100%;
    }

    :deep(code) {
      word-wrap: break-word;
      white-space: normal;
    }
  }
}
</style>