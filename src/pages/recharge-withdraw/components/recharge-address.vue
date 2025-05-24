<template>
<div class="recharge-address"> 
    <van-cell-group inset>
      <van-field
        is-link
        readonly
        :label="$t('钱包地址')"
        :placeholder="$t('请选择钱包地址')"
        @click="showAddressDialog = true"
      />

      <div class="address-selinfo" v-if="selBlockChain?.id">
        <img class="img" :src="selBlockChain.img" alt="">
        <div class="flex-shrink pl-10">
          <div class="title">{{ selBlockChain.coin + '-' + selBlockChain.blockchainName }}</div>
          <!-- hideChainNum(selBlockChain.address) -->
          <div class="desc text-warp" @click="copyText(selBlockChain.address)">{{ selBlockChain.address }} <van-icon class="iconfont primary-color ml-5" class-prefix='icon' name='copy' size="16"/></div>
        </div>
      </div>
    </van-cell-group>

  <div class="amount-list">
    <van-row gutter="12">
      <van-col span="8" v-for="(item, index) in moneyList" :key="index">
        <div :class="`amount-item ${item == selAmount && 'active'}`" @click="handleAmount(item)">${{ item }}</div>
      </van-col>
    </van-row>
  </div>

  <div>
    <van-cell-group inset>
      <div class="recharge-input">
        <div class="primary-color">{{ $t('充值金额') }}($)</div>
        <van-field v-model="amount" type="number" :placeholder="$t('请输入充值金额')" clearable />
      </div>
    </van-cell-group>
  </div>

  <div class="py-20">
    <van-cell-group inset>
      <!-- <div class="p-20">
        <div class="primary-color">{{ $t('上传图片（上传支付详情截图）') }}</div>
      </div> -->
      <div class="recharge-input">
        <div class="primary-color">{{ $t('上传图片（上传支付详情截图）') }}</div>
        <van-field name="uploader" >
          <template #input>
            <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" multiple preview-size="120px"/>
            <!-- <van-uploader v-model="fileList" /> -->
          </template>
        </van-field>
      </div>
    </van-cell-group>
  </div>

  <div class="py-30">

    <van-button block round type="primary" native-type="submit" @click="handleSubmit">
      {{ $t('提交') }}
    </van-button>
  </div>
<van-action-sheet v-model:show="showAddressDialog" :actions="addressOpt" @select="onSelect">
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
</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
import { copyText, navigateBack, hideChainNum } from '@/utils'
import {useRouter} from "vue-router"
import { useUserStore, useWalletStore } from '@/store'
import { uploadImg } from '@/api/user'
import { apiRechargeFee, apiRechargeLimitConfig, apiRechargeOpen, apiRechargeApply } from '@/api/wallet'
import { showToast, showSuccessToast } from 'vant';

const walletStore = useWalletStore()

const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const showAddressDialog = ref(false)
const moneyList = ref([200, 500, 1000, 2000, 5000, 10000])
const selAmount = ref(moneyList.value[1])
const amount = ref(selAmount.value)
const fileList = ref([])
const upImg = ref('')
const isLoading = ref(false)
const addressList = ref([])
const rechargeCfg = ref({
    "rechargeAmountMin": 1,
    "rechargeAmountMax": 999999999999
})

const selBlockChain = ref({})
const addressOpt = computed(() => {
  return addressList.value.map((item, index) => {
    return {
      ...item,
      selcted: selBlockChain.value?.id == item.id ? true : false
      // color: (selBlockChain.value == item.key || (selBlockChain.value =='' && item.key == '')) ? primaryColor : ''
    }
  })
})

onMounted(async () => {
  getFee()
  addressList.value = await walletStore.getChannelBlockchainList()
  
})

function getFee() {
  apiRechargeFee({}).then(res => {

  })
  apiRechargeLimitConfig({}).then(res => {
    rechargeCfg.value = {
      ...rechargeCfg.value,
      ...res
    }
  })
}

function afterRead(file) {
  console.log(file)
  file.status = 'uploading';
  file.message = t('上传中...');
  uploadImg(file.file).then(res => {
    if(res?.url) {
      upImg.value = res.url || ''
      file.status = 'done';
      return
    }
    file.status = 'failed';
    file.message = t('上传失败');
  }).catch((err) => {
    file.status = 'failed';
    file.message = t('上传失败');
    // this.fileList = []
  })
}

function handleAmount(money) {
  selAmount.value = money
  amount.value = money
}

function onSelect(event) {
  // console.log('event', event)
  selBlockChain.value = { ...event }
  // finished.value = false
  showAddressDialog.value = false
}

function handleSubmit() {
  if (amount.value === '') {
    showToast(t('请输入充值金额'));
    return
  }
  if (Number(amount.value) < rechargeCfg.value.rechargeAmountMin) {
    showToast(t('充值价值不得小于最小限额') + rechargeCfg.value.rechargeAmountMin + ' USDT')
    return
  }
  if (Number(amount.value) > rechargeCfg.value.rechargeAmountMax) {
    showToast(t('充值价值不得大于最大限额') + rechargeCfg.value.rechargeAmountMax + ' USDT')
    return
  }
  // if (upImg.value === '') {
  //   showToast(t('请上传图片'));
  //   return
  // }

  if(!selBlockChain.value?.address) {
    showToast(t('请选择钱包地址'));
    return
  }
 

  isLoading.value = true
  apiRechargeOpen({}).then(res => {
    if(res?.session_token) {
       const params = {
        'session_token': res.session_token,
        'amount': amount.value,
        // 'bankName': '',
        'from': 'h5',
        'blockchain_name': selBlockChain.value?.blockchainName,
        'img': upImg.value || '',
        'coin': selBlockChain.value?.coin,
        'channel_address': selBlockChain.value?.address,
        'tx': '123',
        'remark': ''
      }
      apiRechargeApply(params).then(res => {
        showSuccessToast(t('提交成功'));
        amount.value = 0
        fileList.value = []
        upImg.value = ''
        setTimeout(() => {
          router.push('/submitCompleted?path=rechargeRecord')
        }, 2000)
      }).finally(() => {
        isLoading.value = false
      })
    }
  }).catch(() => {
    isLoading.value = false
  })
  
}

</script>
<style lang="scss" scoped>
.recharge-address {
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

  .recharge-input {
    padding: 10px;
    align-items: center;
    display: flex;

    :deep(.van-field__control) {
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }
  }
}  
</style>