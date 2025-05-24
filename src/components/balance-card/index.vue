<template>
<div class="total-Balance">
  <div class="title">{{ title || $t('钱包余额') }}</div>
  <div class="money">${{ moneyNum }}</div>
</div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from "vue-i18n";
import { smartToFixed } from '@/utils'
import { useWalletStore } from '@/store'

const walletStore = useWalletStore()
const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  money: {
    type: Number || String,
    default:  'none'
  }
})
const balance = computed(() => {
	return walletStore.balance || {}
})

const moneyNum = computed(() => {
  if(props.money != 'none') {
    return smartToFixed(props.money)
  }
  return smartToFixed(balance.value?.usdtMoney || 0)
})

</script>
<style lang="scss" scoped>
  
  .total-Balance {
    padding: 36px 28px;
    color: #fff;
    border-radius: 14px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: var(--theme-balance-bg);
    margin-bottom: 20px;

    .title {
      font-size: 28px;
      padding-bottom: 10px;
    }
    .money {
      font-size: 18px;
    }
  }
</style>