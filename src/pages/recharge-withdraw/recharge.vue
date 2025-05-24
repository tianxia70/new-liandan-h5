<template>
<div class="page-container recharge-container"> 
  <van-nav-bar class="page-navbar" :title="$t('充值')" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body recharge-page-body page-scroll">
    <div class="p-20 pb-50">
      <BalanceCard />
      
      <div class="pb-20">
        <van-row gutter="20">
          <van-col span="12">
            <van-button block :type="seltab == 1 ? 'primary' : 'default'" @click="handleTab(1)">{{ $t('选择钱包地址') }}</van-button>
          </van-col>
          <van-col span="12">
            <van-button block :type="seltab == 2 ? 'primary' : 'default'" @click="handleTab(2)">{{ $t('充值记录') }}</van-button>
          </van-col>
        </van-row>

        <div class="tab-panel" v-if="seltab == 1">
          <RechargeAddress />
        </div>
        <div class="tab-panel" v-if="seltab == 2">
          <RechargeHistory />
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { navigateTo, navigateBack, smartToFixed } from '@/utils'
import {useRouter} from "vue-router"

import BalanceCard from '@/components/balance-card/index.vue'
import RechargeAddress from './components/recharge-address.vue'
import RechargeHistory from './components/recharge-history.vue'
// import { useWalletStore } from '@/store'

// const walletStore = useWalletStore()
// const balance = computed(() => {
// 	return walletStore.balance || {}
// })

const seltab = ref(1)

const handleTab = (tab) => {
  seltab.value = tab
}

onMounted(async () => {
})

</script>
<style lang="scss" scoped>
.recharge-container {
  

  .tab-panel {
    padding: 20px 0;
  }
}  
</style>