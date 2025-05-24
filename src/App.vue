
<template>
  <div class="app-containner">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { useUserStore } from '@/store'
import { useWalletStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
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
    getAppCfg()
  }
})

onMounted(() => {
  getAppCfg()
  getUserInfo()
})

function getUserInfo() {
  console.log('route', route)
  if(token.value) {
    userStore.getUserInfo()
  } else {
    // 如果没有登录，除了不需要登录的路由，其他全部跳转登录
    if(!route?.meta?.noAuth){
      router.replace('/welcome')
    }
  }
}

function getAppCfg() {

	if(token.value) {
		userStore.getVipList()
		walletStore.getWalletBalance()
	}
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
