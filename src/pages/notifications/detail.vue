<template>
<div class="page-container notifiydetail-container">
  <van-nav-bar class="page-navbar" left-arrow  @click-left="navigateBack">

  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="p-20">
       <!-- <van-image v-if="infoData.id == 1" class="w-full" :src="item" v-for="item in imagesList"/> -->

       <div v-if="webpageCont" v-html="webpageCont"></div>

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

const { t } = useI18n();
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例
const route = useRoute()
const webpageCont = ref('')
const imagesList = ref([])
const infoData = ref({})

onMounted(() => {
  if(route?.query?.detail) {
    const detail = JSON.parse(route.query.detail) || {}
    if(detail?.id) {
      infoData.value = {...detail}
      webpageCont.value = detail.content || ''
    }

    userStore.getNotifiyUnread()
  }
})


</script>
<style lang="scss" scoped>
.notifiydetail-container {

}
</style>