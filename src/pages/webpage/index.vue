<template>
<div class="page-container webpage-container">
  <van-nav-bar class="page-navbar" left-arrow  @click-left="navigateBack">

  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="p-20">
       <van-image v-if="infoData.id == 1" class="w-full" :src="item" v-for="item in imagesList"/>

       <div v-else-if="webpageCont" v-html="webpageCont"></div>

    </div>
  </div>
</div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from "vue-i18n"
import {useRouter, useRoute} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { useUserStore } from '@/store'
import { showSuccessToast, showToast } from 'vant';

const { t } = useI18n();
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例
const route = useRoute()
const webpageCont = ref('')
const imagesList = ref([])
const infoData = ref({})

onMounted(() => {
  console.log('routeroute', route)
  if(route?.query?.cont) {
    const cont = JSON.parse(route.query.cont) || {}
    if(cont?.id) {
      infoData.value = {...cont}
      if(cont.id == 1) {
        const imgs = cont.imageUrl.split(';')
        imagesList.value = [...imgs]
      } else {
        webpageCont.value = cont.content || ''
      }
    }
  }
})


</script>
<style lang="scss" scoped>
.webpage-container {

}
</style>