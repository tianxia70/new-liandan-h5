<template>
<div class="page-container vipLevel-container">
  <van-nav-bar class="page-navbar" title="VIP Levels" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body vipLevel-page-body page-scroll">
    <div class="p-20 pb-50">
      <div class="vip-box">
        <div :class="`levels-item vip-bg${index + 1}`" v-for="(item, index) in vipList" :key="item.id" @click="handleBuy(item)">
          <img class="vip-img" v-if="item.iconImg" :src="item.iconImg" alt="" >
          <div class="level-header flex justify-between items-center">
            <div class="header-body flex-shrink flex items-center">
              <span class="vip-icon iconfont icon-vip"></span>
              <div class="flex-shrink name">{{ item.title || '' }}</div>
            </div>
            <div class="current-btn" v-if="userInfo.userLevel == item.level">
              <van-button plain type="primary" round size="mini">current</van-button>
              
              <!-- <span class="iconfont icon-right"></span> -->
            </div>
          </div>
          <div class="level-body">
            <div class="item"> ・{{ $t('每日任务数') }} <span>{{ item.activationNum || 0 }}</span></div>
            <div class="item"> ・{{ $t('限制金额') }} <span>${{ smartToFixed(item.grabOrderLimitAmount || 0) }}</span></div>
            <div class="item"> ・{{ $t('订单佣金比例') }} <span>{{ smartToFixed(item.commissionRation * 100) + '%'}}</span></div>
            <div class="item"><span class="money">${{ smartToFixed(item.price || 0) }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<PasswordDialog v-model="showPwd" @done="handleDone"/>
</template>
<script setup>
import { navigateTo, navigateBack, smartToFixed } from '@/utils'
import { computed, ref, reactive } from 'vue'
import PasswordDialog from '@/components/password-dialog/index.vue'
import {useRouter} from "vue-router"
import { useUserStore, useWalletStore } from '@/store'
import { apiUserLevelBuy } from '@/api/user'
import { showToast, showConfirmDialog, showLoadingToast, closeToast, showSuccessToast } from 'vant'
const userStore = useUserStore()

const router = useRouter(); // 获取路由实例
const showPwd = ref(false)
const selVip = ref({})
const userInfo = computed(() => {
  return userStore.getUser
})
const vipList = computed(() => {
  return userStore.vipList || []
})

const curVip = computed(() => {
  return userStore.getCurVip
})

function handleBuy(item) {
  const curLevel = curVip.value?.level || 0

  // if(curVip.value?)
  if(item?.level) {
    if(curLevel >= item.level) {
      showToast('只能购买比当前VIP更高的等级')
      return
    }


    showConfirmDialog({
      title: '提示',
      message: '确认购买 '+item?.title+'?',
    }).then(() => {
      showPwd.value = true
      selVip.value = {...item}
    })
    .catch(() => {
    });
  }
}

function handleDone(pwd) {
  showLoadingToast({
    duration: 0,
  // message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  apiUserLevelBuy({
    id: selVip.value.id,
    safeword: pwd
  }).then(res => {
    showToast($('购买成功'))
    userStore.getVipList()
    userStore.getUserInfo()

  }).finally(() => {
    closeToast()
  })
}

</script>
<style lang="scss" scoped>
@import url(./style.scss);

.vipLevel-container {
  transition: all 0.3s;

  .vip-box {

    .levels-item{
      margin-bottom: 20px;
      height: auto;

      .current-btn {
      }

      .level-body {
        height: auto;

        .money {
          color: $primary-color;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  
}

</style>