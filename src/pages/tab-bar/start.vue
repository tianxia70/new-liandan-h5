<template>
<div class="page-container start-container">
  <div class="header-top">
    <van-nav-bar class="page-navbar theme">
      <template #left>
        <van-icon class="iconfont" class-prefix='icon' name='more' size="18" @click="navigateTo('/me')"/>
      </template>
        <template #right>
          <van-icon class="iconfont" class-prefix='icon' name='notice' size="18" :badge="userStore?.unReadNum || ''" @click="navigateTo('/notifiy')"/>
          <!-- <van-icon name="search" size="18" /> -->
        </template>
      </van-nav-bar>
  </div>
  <div class="page-body start-page-body page-scroll">

    <div class="p-20 pb-50 pt-100">
      <div class="active-box flex justify-between items-center" v-if="curVip?.level"  @click="navigateTo('/vipLevel')">
        <div class="active-body">
          <img class="left-icon" v-if="curVip.iconImg" :src="curVip.iconImg" alt="">
          <div class="left-body">{{ curVip.title }}</div>
        </div>
        <div class="start-btn flex-row items-center">
          <van-button class="w-70" round size="small" plain type="primary">
            <div class="flex items-center">
            {{ $t('更多') }}> <van-icon class="iconfont" class-prefix='icon' name='right' size="18"/>
          </div>
        </van-button>
        </div>
      </div>

      <div class="startingbox">
        <div class="circle-two">
          <div class="circlebox">
            <div class="pb-10">
            <van-circle
              :current-rate="currentRate"
              :text="currentRate+ '%'"
              color="#fff"
              stroke-width="80"
              layer-color="#cacaca"
            />
          </div>
            <div class="tips">
              <div class="text">{{ $t('待完成') }}</div>
              <div class="text">{{ infoData?.currentCount || 0}}/{{ infoData?.totalCount || 0 }}</div>
            </div>
          </div>
          <div class="circlebox box2">
            <div class="pb-10">
            <van-circle
              :current-rate="currentRate2"
              :text="currentRate2 + '%'"
              stroke-width="80"
              layer-color="#cacaca"
            />
          </div>
            <div class="tips">
              <div class="text">{{ $t('限制') }}</div>
              <div class="text">{{ (infoData?.totalCount - infoData?.currentCount) || 0}}/{{ infoData?.totalCount || 0 }}</div>
            </div>
          </div>
        </div>

        <div class="start-detail">
          <div class="detail-item">
            <div class="flex items-center justify-between">
              <div class="title font-18">{{ $t('今日收入') }}</div>
              <div class="money font-22 primary-color">${{ smartToFixed(infoData?.profit || 0) }}</div>
            </div>
            <div class="info">{{ $t('系统会更新每日收入') }}</div>
          </div>
          <div class="detail-item">
            <div class="flex items-center justify-between">
              <div class="title font-18">{{ $t('钱包余额') }}</div>
              <div class="money font-22 primary-color">${{ smartToFixed(infoData?.balance || 0) }}</div>
            </div>
            <div class="info">{{ $t('每项任务的利润增加到资产余额中') }}</div>
          </div>

          <div class="">
            <van-button block round type="primary" :loading="isLoading" @click="handleSubmit">
              <div class="flex items-center">
                {{ $t('开始抢单') }} <van-icon class="iconfont" class-prefix='icon' name='right' size="18"/>
              </div>
            </van-button>
          </div>
        </div>

        <div class="starting-hint">
          <div class="pb-20 font-18">{{ $t('重要提示') }}</div>
          <div>{{ $t('工作时间', { time: '11.00 a.m. - 11.00 p.m.' }) }}</div>
          <div>{{ $t('如有疑问') }}</div>
        </div>
        <!-- <div class="starting-hint">
          <div class="pb-20 font-18">Important Hint</div>
          <div>Working hours:11.00 a.m. - 11.00 p.m.</div>
          <div>For inquiries, please contact our online service staff for more information!</div>
        </div> -->
      </div>
    </div>
  </div>
</div>
<van-popup v-model:show="showPop" :style="{ padding: '20px', borderRadius: '10px', width: '86vw' }" teleport="body">
  <div class="popsub-box">
    <div class="title">{{ $t('恭喜抢单成功') }}</div>
    <div class="body">
      <div class="shop-info">
        <van-image class="head-img" v-if="orderInfo?.imgUrl" width="80" height="80"
          :src="orderInfo?.imgUrl"
        />

        <div class="shop-body">
          <div class="item">
            <div>{{ $t('总金额') }}</div>
            <div class="primary-color">${{ smartToFixed(orderInfo.totalPrice) }}</div>
          </div>
          <div class="item">
            <div>{{ $t('利润') }}</div>
            <div class="primary-color">${{ smartToFixed(orderInfo.orderRate) }}</div>
          </div>
          <div class="item">
            <div>{{ $t('单价') }}</div>
            <div class="primary-color">${{ smartToFixed(orderInfo.productPrice) }}</div>
          </div>
          <div class="item">
            <div>{{ $t('数量') }}</div>
            <div class="primary-color">x{{ orderInfo.productNum }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="shop-name py-10 font-16 two-text">撒打算大大的撒</div> -->
      <div class="info-item">
        <div>{{ $t('佣金比例') }}</div>
        <!-- <div>{{ preciseMul(orderInfo.rebateRate, 100) }}%</div> -->
         <div>{{ orderInfo.rebateRate }}%</div>
      </div>
      <div class="info-item">
        <div>{{ $t('利润') }}</div>
        <div>${{ smartToFixed(orderInfo.orderRate) }}</div>
      </div>
      <div class="info-item pay-num">
        <div>{{ $t('需支付') }}</div>
        <div class="money">${{ smartToFixed(orderInfo.totalPrice) }}</div>
      </div>
    </div>
    <div class="p-10">
      <van-button block round type="primary" :loading="isLoading" @click="showPwd = true">
        <div class="flex items-center">
          {{ $t('提交') }}
        </div>
      </van-button>
    </div>
  </div>
</van-popup>

<PasswordDialog v-model="showPwd" @done="handleDone"/>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { navigateTo, preciseSub, preciseMul, smartToFixed } from '@/utils'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router"
import { useUserStore } from '@/store'
import PasswordDialog from '@/components/password-dialog/index.vue'
import { apiOrderStartData, apiOrderStartPre, apiOrderStartBrush, apiOrderStartPay  } from '@/api/task'

import avatarImg from '@/assets/images/user/headimg.png'
import { showSuccessToast, showConfirmDialog } from 'vant'

const { t } = useI18n();
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例

const infoData = ref({})
const orderInfo = ref({})
const showPwd = ref(false)
const showPop = ref(false)
const isLoading = ref(false)
const curVip = computed(() => {
  console.log('userStore.getCurVip', userStore.getCurVip)
  return userStore.getCurVip
})

// 已完成进度条
const currentRate = computed(() => {
  if(infoData.value?.totalCount == 0 ){
    return 0
  }
  return smartToFixed((infoData.value?.currentCount / infoData.value?.totalCount) * 100, 0) || 0
});

// 未完成进度条
const currentRate2 = computed(() => {
  if(infoData.value?.totalCount == 0 ){
    return 0
  }
  return 100 - currentRate.value
  // return (infoData.value?.currentCount / infoData.value?.totalCount) * 100
});

onMounted(() => {
  getInfoData()
})

function getInfoData() {
  apiOrderStartData({}).then(res => {
    infoData.value = { ...res }
  })
}

function handleSubmit() {
  // isLoading.value = true
  apiOrderStartPre({}).then(res1 => {
    // console.log('res1', res1)
    if(res1?.unfinishedId && Number(res1.unfinishedId) > 0) {
      showConfirmDialog({
        title: t('抢单失败，当前有未完成的订单'),
        confirmButtonText: t('查看'),
      }).then(() => {
        router.replace('/task?tab=0')
      }).catch(() => {
          // on cancel
      });
    } else {
      apiOrderStartBrush({}).then(res => {
        if(res?.orderId) {
          orderInfo.value = { ...res }
          showPop.value = true
        }
      }).finally(() => {
        // isLoading.value = false
      })
    }
  }).catch(() => {
    // isLoading.value = false
  })
  // apiOrderStartBrush({}).then(res => {
  //   if(res?.orderId) {
  //     orderInfo.value = { ...res }
  //     showPop.value = true
  //   }
  // }).finally(() => {
  //   isLoading.value = false
  // })
}

function handleDone(pwd) {
  const params = {
    orderId: orderInfo.value.orderId,
    safeWord: pwd
  }

  isLoading.value = true
  apiOrderStartPay(params).then(res => {
    showSuccessToast(t('支付成功'))
    getInfoData()
    // if(res?.orderId) {
      // orderInfo.value = { ...res }
      showPop.value = false
    // }
  }).finally(() => {
    isLoading.value = false
  })
}


</script>
<style lang="scss" scoped>
.start-container {
  transition: all 0.3s;

  .header-top {
    width: 100%;
    height: 90px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-image: var(--theme-header-top-bg-image);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 -2px;

    .page-navbar {
      background-color: transparent;

      &::after{
        border: 0;
      }
    }
  }

  .active-box {
    padding: 5px 20px 5px 5px;
    border-radius: 20px;

    background: var(--ex-primary-font-color4);

    .active-body {
      min-width: 0;
      flex: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 10px 10px 10px 0;

      .left-icon {
        // width: 85px;
        height: 70px;
      }

      .left-body {
        padding-left: 10px;
        flex: 1;
        min-width: 0;
        flex-shrink: 0;
        font-size: 18px;
      }
    }
  }

  .startingbox {
    padding: 30px 0;

    .circle-two {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .circlebox {
        color: var(--ex-primary-font-color4);
        padding-top: 20px;
        text-align: center;
        width: 48%;
        height: 200px;
        background-color: $primary-color;
        border-radius: 24px;
        border: 3px solid rgba(216, 206, 247, .5);

        :deep(.van-circle__text) {
          color: var(--ex-primary-font-color4);
          font-size: 20px;
        }

        &.box2 {
          color: $primary-color;
          background-color: $panel-color;

          :deep(.van-circle__text) {
            color: $primary-color;
            font-size: 20px;
          }
        }

        .tips {
          .text {
            font-size: 16px;
            padding-bottom: 4px;
          }
        }
      }
    }

    .start-detail {
      margin: 30px 0;
      padding: 30px 20px;
      background-color: $panel-color;
      box-shadow: 0 12px 22px #5a5a5a1a;
      border-radius: 20px;

      .detail-item {
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;


        .info {
          font-family: PingFang TC, PingFang TC;
          font-weight: 400;
          color: var(--ex-primary-font-color2);
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin: 20px 0;
        }
      }
    }

    .starting-hint {
      color: var(--ex-primary-font-color2);
      text-align: center;
      font-size: 12px;
    }
  }

  
} 

.popsub-box {
    // width: 80%;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .body {
      background-color: #f2f2f2;
      border-radius: 10px;
      margin: 20px 0;
      padding: 10px;

      .shop-info {
        display: flex;

        .head-img {
          border-radius: 10px;
          overflow: hidden;
        }

        .shop-body {
          flex: 1;
          min-width: 0;
          flex-shrink: 0;
          padding-left: 10px;

          .item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 3px 0;
          }
        }
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        color: var(--ex-primary-font-color2);

        &.pay-num {
          font-weight: bold;
          align-items: center;

          .money {
            color: $red;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>