<template>
<div class="page-container bindaccount-container">
<van-nav-bar class="page-navbar" :title="$t('新增钱包地址')" left-arrow  @click-left="navigateBack"></van-nav-bar>
<div class="page-body page-scroll">
  <van-form>
    <div class="p-20"> 
    <van-cell-group inset>
      <div class="py-10">
        <van-field v-model="selBlockChain.label" is-link readonly name="picker"
          :label="$t('钱包协议')"
          :placeholder="$t('请选择钱包协议')"
          @click="showAddressDialog = true"
        />
      </div>
    </van-cell-group>
    </div>
    <div class="p-20"> 
    <van-cell-group inset>
      <div class="py-10">
        <van-field v-model="address" :label="$t('钱包地址')" type="textarea" :placeholder="$t('请输入钱包地址')" clearable />
      </div>
    </van-cell-group>
    </div>
  </van-form>


  <div class="p-20 pt-30">

    <van-button block round type="primary" :loading="isLoading" @click="onSubmit"> 
      {{ $t('提交') }}
    </van-button>
  </div>
<van-action-sheet v-model:show="showAddressDialog" :actions="addressOpt" @select="onSelect">
  <template #action="{action, index}">
    <div class="action-item w-full flex justify-between ">
      <div></div>
      <div>{{ action.label }}</div>
      
      <div class="flex items-center desc-color">
        <!-- <div class="desc-color mr-5">{{hideChainNum(action.address)}}</div> -->
        <van-icon name="checked" size="20" class="primary-color" v-if="action.selcted"/>
        <van-icon name="circle" size="20" v-else/>
      </div>
    </div>
    <!-- {{ index }} -->
  </template>
</van-action-sheet>
</div>
</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
import { navigateTo, navigateBack } from '@/utils'
import { primaryColor } from '@/utils/theme'
import {useRouter} from "vue-router"
import { useUserStore, useWalletStore } from '@/store'
import { apiBindWithdrawAddress } from '@/api/wallet'
import { showSuccessToast, showToast } from 'vant';

const walletStore = useWalletStore()
const userStore = useUserStore()

const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const showAddressDialog = ref(false)
const isLoading = ref(false)
const selTab = ref(1)
const address = ref('')
const upValue = ref([])

const addressList = ref([])
const contentType = ref(addressList.value[0])

const selBlockChain = ref({})
const addressOpt = computed(() => {
  return addressList.value.map((item, index) => {
    return {
      ...item,
      label: item.coin + '-' + item.blockchainName,
      selcted: selBlockChain.value?.id == item.id ? true : false
      // color: (selBlockChain.value == item.key || (selBlockChain.value =='' && item.key == '')) ? primaryColor : ''
    }
  })
})

onMounted(async () => {
  addressList.value = await walletStore.getChannelBlockchainList()
})


function onSelect(event) {
  selBlockChain.value = { ...event }
  showAddressDialog.value = false
}

function onSubmit() {

  if(!selBlockChain.value?.coin || selBlockChain.value?.coin?.trim() == '') {
    showToast(t('请选择钱包协议'))
    return
  }
  if(!address.value || address.value.trim() == '') {
    showToast(t('请输入钱包地址'))
    return
  }

  const params = {
    blockchain_name: selBlockChain.value.blockchainName,
    coin: selBlockChain.value.coin,
    channel_address: address.value,
  }

  // console.log('submit', params, selBlockChain.value);
  apiBindWithdrawAddress(params).then(res => {
    showSuccessToast(t('添加成功'))
    userStore.getUserInfo()
    setTimeout(() => {
      router.go(-1)
    }, 2000)
    // router.go(-1)
  })
}

</script>
<style lang="scss" scoped>
.bindaccount-container {

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

  :deep(.van-field__control) {
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
}
</style>