<template>
<div class="page-container account-container">
  <van-nav-bar class="page-navbar" :title="$t('我的账户')" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body page-scroll">
   
      <div class="p-20">
        <div class="list-item" v-if="userInfo?.withdrawAddress">
          <div class="flex justify-between item-center">
            <div class="title">{{ userInfo?.withdrawCoinType + '-' + userInfo?.withdrawChainName }}</div>

            <!-- <div class="close" @click="handleDel(item)">
              <van-icon name="cross" />
            </div> -->
          </div>
          <div class="address">
            {{ userInfo.withdrawAddress || '' }}
          </div>
        </div>
      </div>

    <div class="p-20">

      <van-button block type="primary" native-type="submit" @click="bindAddress">
            {{ $t('新增钱包地址') }}
        </van-button>
    </div>
  </div>

</div>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
import { useTheme } from '@/utils/theme'
// const { theme, setTheme } = useTheme()
import {useRouter} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { showConfirmDialog, showToast } from 'vant';
// import { apiWithdrawOpen } from '@/api/wallet'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { t } = useI18n();
const router = useRouter(); // 获取路由实例

const userInfo = computed(() => {
  return userStore.getUser
})

onMounted(() => {

})


function handleDel(item) {
  showConfirmDialog({
    title: '提示',
    message: '确认删除吗？'
  }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
}

function bindAddress() {
  if(userInfo.value?.withdrawAddress) {
    showToast('最多可添加一个钱包地址')
    return
  }
  navigateTo('/bindAccount')
}

</script>
<style lang="scss" scoped>
.account-container {
  
  .list-item {
    padding: 16px;
    box-shadow: 0 0 14px #092c4c1a;
    border-radius: 14px;
    margin-bottom: 20px;


    .title {
      padding-right: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    .close {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    
    .address {
      padding-top: 10px;

    }
  }
}
</style>