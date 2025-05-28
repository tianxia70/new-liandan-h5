<template>
<div class="withdraw-address"> 
  <van-cell-group inset v-if="openCfg?.openWithdrawAddressBinding">
    <van-field
      is-link
      readonly
      :label="$t('钱包地址')"
      :placeholder="$t('请选择钱包地址')"
      @click="showAddressDialog = true"
    />

    <div class="address-selinfo" v-if="selBlockChain?.address">
      <img class="img" :src="selBlockChain?.img" v-if="selBlockChain?.img">
      <div class="flex-shrink pl-10">
        <div class="title">{{ selBlockChain?.coin + '-' + selBlockChain?.blockchainName }}</div>
        <div class="desc text-warp" @click="copyText(selBlockChain.address)">{{ selBlockChain.address }} <van-icon class="iconfont primary-color ml-5" class-prefix='icon' name='copy' size="16"/></div>
      </div>
    </div>
  </van-cell-group>
  <van-cell-group inset v-else>
    <div class="withdraw-input">
      <div class="primary-color w-150">{{ $t('提现地址') }}</div>
      <van-field v-model="addressVal" type="number" :placeholder="$t('请输入提现地址')" clearable />
    </div>
  </van-cell-group>

  <div class="pt-20">
    <van-cell-group inset>
      <div class="withdraw-input">
        <div class="primary-color w-150">{{ $t('提现金额') }}($)</div>
        <van-field v-model="amount" type="number" :placeholder="$t('请输入提现金额')" clearable />
      </div>
    </van-cell-group>
  </div>

  <div class="py-20">
    <van-cell-group inset>
      <div class="withdraw-input2">
        <div class="w-full flex justify-between pb-15">
          <div>{{ $t('手续费') }}</div>
          <div>{{preciseMul(withdrawFee, 100)}}%</div>
        </div>
        <div class="w-full flex justify-between">
          <div>{{ $t('实际到账') }}</div>
          <div class="money">{{ arrivalAmount }} $</div>
        </div>
      </div>
    </van-cell-group>
  </div>

  <div class="py-30">

    <van-button block round type="primary" :loading="isLoading"  @click="handleSubmit">
      {{ $t('提交') }}
    </van-button>
  </div>
<van-action-sheet v-model:show="showAddressDialog" :actions="addressOpt" @select="onSelect">
  <div v-if="addressOpt.length == 0" class="p-30 py-60 flex justify-center ">{{ $t('没有钱包地址') }}<div class="btn btn-link" @click="navigateTo('/bindAccount')">{{ $t('前往添加') }}</div> </div>
  <template #action="{action, index}">
    <div class="action-item w-full flex justify-between ">
      {{ action.coin + '-' + action.blockchainName }}
      <div class="flex items-center desc-color">
        <div class="desc-color mr-5">{{hideChainNum(action.address)}}</div>
        <van-icon name="checked" size="20" class="primary-color" v-if="action.selcted"/>
        <van-icon name="circle" size="20" v-else/>
      </div>
    </div>
  </template>
</van-action-sheet>

<PasswordDialog v-model="showPwd" @done="tixianDone"/>
</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
import { navigateTo, navigateBack, hideChainNum, preciseSub, preciseMul, copyText } from '@/utils'
import {useRouter} from "vue-router"
import PasswordDialog from '@/components/password-dialog/index.vue'

import { apiWithdrawFee, apiWithdrawLimitConfig, apiWithdrawOpen, apiWithdrawApply } from '@/api/wallet'
import { showToast, showSuccessToast, showLoadingToast, closeToast } from 'vant';

import { useUserStore, useWalletStore } from '@/store'

const userStore = useUserStore()
const walletStore = useWalletStore()

const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const showAddressDialog = ref(false)
const isLoading = ref(false)
const amount = ref()
const openCfg = ref({})
const upValue = ref([])
const addressVal = ref('')

const showPwd = ref(false)
const withdrawFee = ref(0)
const selBlockChain = ref({})
const withdrawCfg = ref({
    "withdrawAmountMin": 1,
    "withdrawAmountMax": 999999999999
})

const userInfo = computed(() => {
  return userStore.getUser
})
const balance = computed(() => {
return walletStore.balance || {}
})

// 实际到账
const arrivalAmount = computed(() => {
  return preciseSub(amount.value, preciseMul(amount.value, withdrawFee.value)) || 0
})

const addressList = ref([])
const content_type = ref('')
const addressOpt = ref([])
// const addressOpt = computed(() => {
//   return addressList.value.map((item, index) => {
//         return {
//           ...item,
//           color: (content_type.value == item.key || (content_type.value =='' && item.key == '')) ? primaryColor : ''
//         }
//       })
// })

onMounted(() => {
  getCfg()
})

function getCfg() {
  if(userInfo.value?.withdrawAddress) {
    selBlockChain.value = {
      coin: userInfo.value?.withdrawCoinType || '',
      blockchainName: userInfo.value?.withdrawChainName || '',
      address: userInfo.value?.withdrawAddress || '',
      // img: userInfo.value?.img || '',
      selcted: true
    }
    addressOpt.value = [{
      ...selBlockChain.value
    }]
  }

  // 提现汇率
  apiWithdrawFee({}).then(res => {
    withdrawFee.value = res?.withdraw_fee || 0
  })

  // 提现配置
  apiWithdrawLimitConfig({}).then(res => {
    withdrawCfg.value = {
      ...withdrawCfg.value,
      ...res
    }
  })

  // 获取提现配置信息
  apiWithdrawOpen({}).then(res => {
    openCfg.value = {...res}
    if(!res?.openWithdrawAddressBinding || res?.openWithdrawAddressBinding == 0) {
      addressVal.value = res?.existWithdrawAddress || ''
    }
  })
}


function onSelect(event) {
  content_type.value = event.key
  // finished.value = false
  showAddressDialog.value = false
}

function handleSubmit() {
  if (!amount.value || amount.value == '' || Number(amount.value) <= 0) {
    showToast(t('请输入提现金额'));
    return
  }
  // if (Number(amount.value) < rechargeCfg.value.rechargeAmountMin) {
  //   showToast(t('充值价值不得小于最小限额') + rechargeCfg.value.rechargeAmountMin + ' USDT')
  //   return
  // }

  // if (Number(amount.value) > balance.value?.usdtMoney) {
  //   showToast(t('充值价值不得大于最大限额') + balance.value?.usdtMoney + ' USDT')
  //   return
  // }

  if(openCfg.value?.openWithdrawAddressBinding) {
    if(!selBlockChain.value?.address) {
      showToast(t('请选择钱包地址'));
      return
    }
  } else {
    if(!addressVal.value) {
      showToast(t('请输入提现地址'));
      return
    }

  }

  showPwd.value = true
  return

}

function tixianDone(pwd) {

  isLoading.value = true
  showLoadingToast({
    duration: 0,
  // message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  // apiWithdrawOpen({}).then(res => {
  //   if(res?.session_token) {
       const params = {
        'from': openCfg.value?.openWithdrawAddressBinding ? selBlockChain.value?.address : addressVal.value,
        'channel': 'USDT',
        'safeword': pwd,
        'session_token': openCfg.value?.session_token || '',
        'amount': amount.value,
        // 'blockchain_name': selBlockChain.value?.blockchainName,
        // 'coin': selBlockChain.value?.coin,
        // 'channel_address': selBlockChain.value?.address,
        'remark': ''
      }
      apiWithdrawApply(params).then(res => {
        showSuccessToast(t('提交成功'));
        amount.value = 0
        // upImg.value = ''
        
		    walletStore.getWalletBalance()
        setTimeout(() => {
          router.push('/submitCompleted?path=withdrawRecord')
        }, 2000)
      }).finally(() => {
        isLoading.value = false
        closeToast()
      })
    // }
  // }).catch(() => {
  //   isLoading.value = false
  //   closeToast()
  // })
}

</script>
<style lang="scss" scoped>
.withdraw-address {
  transition: all 0.3s;

  .address-selinfo {
    padding: 10px 20px;
    display: flex;

    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      color: var(--ex-primary-font-color2);
    }

    .desc {
      padding-top: 5px;
    }
  }

  :deep(.van-popup) {
    padding: 20px 0;
    .van-action-sheet__item {
      padding: 5px var(--van-padding-md);
    }
  }
  .action-item {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
  }


  .amount-list {
    padding: 20px 0;

    .amount-item {
      background-color: #4a43ec1a;
      height: 70px;
      width: 100%;
      padding: 14px;
      font-size: 18px;
      color: $primary-color;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      &.active {
        color: var(--ex-primary-font-color4);
        background-color: $primary-color;
      }
    }
  }

  .withdraw-input {
    padding: 10px 20px;
    align-items: center;
    display: flex;

    :deep(.van-field__control) {
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }

    
  }
  
  .withdraw-input2 {
    padding: 10px 20px;

    .money {
      font-size: 18px;
      font-weight: bold;
      color: $primary-color;
    }
  }
}  
</style>