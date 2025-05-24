<template>
<div class="page-container withdraw-container"> 
  <van-nav-bar class="page-navbar" :title="$t('提现')" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body withdraw-page-body page-scroll">
    <div class="p-20 pb-50">
      <BalanceCard />

      <div class="pb-20">
        <van-row gutter="20">
          <van-col span="12">
            <van-button block :type="seltab == 1 ? 'primary' : 'default'" @click="handleTab(1)">{{ $t('选择钱包地址') }}</van-button>
          </van-col>
          <van-col span="12">
            <van-button block :type="seltab == 2 ? 'primary' : 'default'" @click="handleTab(2)">{{ $t('提现记录') }}</van-button>
          </van-col>
        </van-row>

        <div class="tab-panel" v-if="seltab == 1">
          <WithdrawAddress />
        </div>
        <div class="tab-panel" v-if="seltab == 2">
          <WithdrawHistory />
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { smartToFixed, navigateBack } from '@/utils'
import {useRouter} from "vue-router"

import BalanceCard from '@/components/balance-card/index.vue'
import WithdrawAddress from './components/withdraw-address.vue'
import WithdrawHistory from './components/withdraw-history.vue'


const seltab = ref(1)
const router = useRouter(); // 获取路由实例

const handleTab = (tab) => {
  seltab.value = tab
}


</script>
<style lang="scss" scoped>
.withdraw-container {
  

  .total-Balance {
    padding: 36px 28px;
    color: #fff;
    border-radius: 14px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: var(--theme-balance-bg);

    .title {
      font-size: 28px;
      padding-bottom: 10px;
    }
    .money {
      font-size: 18px;
    }
  }

  .tab-panel {
    padding: 20px 0;
  }
}  
</style>