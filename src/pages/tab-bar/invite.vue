<template>
<div class="page-container invite-container">
  <van-nav-bar class="page-navbar theme" :title="APP_NAME">
  <template #left>
    <van-icon class="iconfont" class-prefix='icon' name='more' size="18" @click="navigateTo('/me')"/>
  </template>
    <template #right>
      <van-icon class="iconfont" class-prefix='icon' name='notice' size="18" :badge="userStore?.unReadNum || ''" @click="navigateTo('/notifiy')"/>
      <!-- <van-icon name="search" size="18" /> -->
    </template>
  </van-nav-bar>
  <div class="page-body invite-page-body page-scroll">
    <div class="invite-head">
      <div class="left-head">
        <van-image class="head-img" width="60" height="60"
          :src="userInfo?.icon || avatarImg"
        />
        <div class="head-body">
          <div class="title">
            <div class="van-text-ellipsis name">{{ userInfo?.username || userInfo?.phone || userInfo?.email }}</div>
            <img class="vip" v-if="curVip?.level" :src="curVip?.iconImg" alt="" srcset="">
          </div>
          <div class="balance" @click="copyText(userInfo?.usercode)">{{ $t('邀请码') }}: {{ userInfo?.usercode }} </div>
          <div class="balance">{{ $t('信用评分') }}: {{ userInfo?.creditScore || 0 }}</div>
        </div>
      </div>

      <div class="balance-box">
        <div class="flex justify-around">
          <p class="text">{{ $t('下级人数') }}</p>
          <p class="text">{{ $t('昨日新增下级') }}</p>
        </div>

        <div class="flex justify-around items-center">
          <p class="text1">{{ infoData?.totalSub || 0 }}</p>
          <p class="text1">{{ infoData?.yesSub || 0 }}</p>
        </div>
        <div class="btns">
          <van-button round block type="primary" @click="handleInvite">
            {{ $t('邀请好友') }}
          </van-button>
        </div>
      </div>
    </div>
    <div class="p-20 pb-50">
      
      <div class="subordinates-box">
        <div class="subordinates-top flex-row justify-between items-center">
          <div class="title">{{ $t('累计佣金') }}</div>
          <!-- <div class="dialog-text">
            <div class="rule flex-row items-center">
              {{ $t('玩法规则') }} <van-icon name="question-o" />
            </div>
          </div> -->
        </div>

        <div class="subordinates-center">
          <div class="box1 flex justify-between">
            <div class="box-item">
              <div class="text">{{ $t('总佣金收益') }}</div>
              <div class="money">${{ totalRebate }}</div>
            </div>
            <div class="line"></div>
            <div class="box-item text-right">
              <div class="text text-right">{{ $t('昨日佣金收益') }}</div>
              <div class="money text-right">${{ infoData?.yesRebate || 0 }}</div>
            </div>
          </div>
          <div class="box2 flex justify-between items-center">
            <div class="item">
              <p class="text">{{ $t('一级代理佣金') }}</p>
              <p class="money">${{ infoData?.rebate1 || 0 }}</p>
            </div>
            <div class="item">
              <p class="text">{{ $t('二级代理佣金') }}</p>
              <p class="money">${{ infoData?.rebate2 || 0 }}</p>
            </div>
            <div class="item">
              <p class="text">{{ $t('三级代理佣金') }}</p>
              <p class="money">${{ infoData?.rebate3 || 0 }}</p>
            </div>
          </div>
          <p class="tips">{{ $t('佣金收益已实时发放在钱包余额中') }}</p>
        </div>
      </div>

      <div class="code-box flex justify-between items-center">
        <div class="code-body">
          {{ $t('邀请码') }}:{{ userInfo?.usercode }}
        </div>
        <div class="start-btn flex-row items-center">
          <van-button class="w-60" round size="small" type="primary" @click="copyText(userInfo?.usercode)">
            {{ $t('复制') }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { APP_NAME } from '@/config'
import { computed, ref, onMounted } from 'vue'
import { navigateTo, copyText, smartToFixed } from '@/utils'
import { useI18n } from 'vue-i18n'
import { apiUserFindUserInfo } from '@/api/user'
import { useUserStore } from '@/store'
import {useRouter} from "vue-router"

import avatarImg from '@/assets/images/user/headimg.png'
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例
const { t } = useI18n();
const infoData = ref({})

const totalRebate = computed(() => {
  let totaol = infoData.value?.rebate1 + infoData.value?.rebate2 + infoData.value?.rebate3
  totaol = totaol || 0
  return smartToFixed(totaol)
})

const userInfo = computed(() => {
  return userStore.getUser
})

const curVip = computed(() => {
  return userStore.getCurVip
})

onMounted(() => {
  apiUserFindUserInfo({}).then(res => {
    infoData.value = { ...res }
  })
})

function handleInvite() {
  const link = infoData.value.download + '?userCode=' + infoData.value.userCode
  copyText(link)
}
</script>
<style lang="scss" scoped>
.invite-container {
  transition: all 0.3s;

  .invite-page-body {
  }

  .invite-head {
    margin-bottom: 100px;
    padding: 30px 30px 120px;
    background: $primary-color;
    border-radius: 0 0 60px 60px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lang-icon {
      font-size: 28px;
      color: #fff;
    }

    .left-head {
      flex: 1;
      min-width: 0;
      flex-shrink: 0;
      display: flex;
      color: #fff;

      .head-img {
        border-radius: 20px;
        border: 1px solid #fff;
        overflow: hidden;
        margin-top: 10px;
      }

      .head-body {
        padding: 0 10px;
        color: #fff;

        .title {
          font-size: 22px;
          display: flex;
          align-items: center;

          .name {
            max-width: 180px;
          }

          .vip {
            // width: 28px;
            height: 28px;
          }
        }
      }
    }

    .balance-box {
      width: calc(100% - 60px);
      padding: 30px;
      border-radius: 30px;
      background-color: #fff;
      position: absolute;
      left: 30px;
      bottom: -100px;

      .text {
        margin-bottom: 6px;
        font-family: PingFang TC, PingFang TC;
        font-weight: 400;
        font-size: 16px;
        color: var(--ex-primary-font-color);
        line-height: 24px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .text1 {
        font-family: Montserrat, Montserrat;
        font-weight: 700;
        font-size: 32px;
        color: var(--ex-primary-color1);
        line-height: 36px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .tit {
        font-size: 16px;
      }

      .money {
        font-weight: 700;
        font-size: 32px;
        color: $primary-color;
        text-align: left;
        font-style: normal;
        text-transform: none;
        padding: 10px 0;
      }

      .btns {
        padding-top: 20px;
      }
    }
  }
  .code-box {
    margin: 20px 0;
    padding-right: 20px;
    border-radius: 20px;
    background: var(--ex-primary-font-color4);

    .code-body {
      min-width: 0;
      flex: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      font-size: 20px;
      font-weight: bold;
      color: $primary-color;
    }
  }

  .subordinates-box {

    .subordinates-top {
      padding-bottom: 10px;
      .title {
        font-family: PingFang TC, PingFang TC;
        font-weight: 600;
        font-size: 18px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
      .rule {
        font-family: PingFang TC, PingFang TC;
        font-weight: 400;
        font-size: 14px;
        color: #222b45cc;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .subordinates-center {
      padding: 16px;
      background-color: $panel-color;
      box-shadow: 0 10px 20px #5a5a5a1a;
      border-radius: 12px;

      .box1 {
        padding-bottom: 10px;
        .line {
          width: 1px;
          height: 40px;
          background: #ddd;
        }
        .box-item {
          width: 50%;

          .text {
            font-family: PingFang TC, PingFang TC;
            font-weight: 400;
            font-style: normal;
            text-transform: none;
            width: 100%;
            // font-size: 14px;
          }

          .money {
            font-family: Poppins, Poppins;
            font-weight: 700;
            font-size: 22px;
            color: $primary-color;
            // line-height: .853333rem;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

        }
      }

      .box2 {
        padding: 10px 0;
        border-top: 1px solid #ddd;

        .text {
          font-size: 12px;
          font-family: PingFang TC, PingFang TC;
          font-weight: 400;
          color: var(--ex-primary-font-color2);
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
        .money {
          text-align: center;
          font-family: Poppins, Poppins;
          font-weight: 700;
          font-size: 18px;
          font-style: normal;
          text-transform: none;
        }
      }

      .tips {
        font-family: PingFang TC, PingFang TC;
        font-weight: 400;
        color: var(--ex-primary-font-color2);
        font-size: 12px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        padding: 24px 0;
      }
    }
  }
  
}

</style>