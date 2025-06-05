<template>
<div class="page-container protocol-container">
  <van-nav-bar class="page-navbar" left-arrow :title="title"  @click-left="navigateBack">

  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="p-20 web-text-cont">

      <div v-if="proCont" v-html="proCont"></div>

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
import { useAppStore } from '@/store'

const { t } = useI18n();
const appStore = useAppStore()
const router = useRouter(); // 获取路由实例
const route = useRoute()
const selType = ref(0)

// 
// const protocolList = computed(() => {
//   return userStore.protocolList || []
// })

const title = computed(() => {
  if(selType.value == 1) {
    return t('用户服务协议')
  } else if(selType.value == 2) {
    return t('隐私政策')
  }
})

const proCont = computed(() => {
  const item = appStore.protocolList.find(item => item.type == selType.value)
  return item?.content || ''
})

onMounted(() => {
  console.log('route.query.conts', route.query)
  selType.value = route?.query?.type || 0
})


</script>
<style lang="scss" scoped>
.protocol-container {

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