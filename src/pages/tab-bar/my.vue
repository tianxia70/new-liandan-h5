<template>
<div class="page-container me-container">
  <div class="page-body me-page-body page-scroll">
  <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
    <div class="p-20 pb-40">
    <div class="user-info-box">
      <div class="avatar-box">
        <van-image class="head-img" round width="100%" height="100%"
          :src="userInfo?.icon || avatarImg"
        />
        <img class="vip" v-if="curVip?.level" :src="curVip?.iconImg" alt="" srcset="">
      </div>
      <div class="user-name">{{ userInfo?.username || userInfo?.phone || userInfo?.email }}</div>
      <div class="Invitation-code " @click="copyText(userInfo?.usercode)">
        {{ $t('邀请码') }}: {{ userInfo?.usercode || '' }}
        <van-icon class="iconfont primary-color" class-prefix='icon' name='copy' size="14"/>
      </div>
    </div>

    <div class="account-box flex justify-between">
      <div class="item">
        <div class="money">${{ smartToFixed(infoData?.profit || 0) }}</div>
        <div class="text">{{ $t('今日收入') }}</div>
      </div>
      <div class="line"></div>
      <div class="item">
        <div class="money">${{ smartToFixed(infoData?.balance || 0) }}</div>
        <div class="text">{{ $t('钱包余额') }}</div>
      </div>
    </div>

    <div class="list-four">
      <van-row gutter="10">
        <van-col span="6" @click="navigateTo('/recharge')">
          <img class="img" src="../../assets/images/user/recharge.jpeg" alt="">
          <div class="text">{{ $t('充值') }}</div>
        </van-col>
        <van-col span="6" @click="navigateTo('/withdraw')">
          <img class="img" src="../../assets/images/user/withdraw.jpeg" alt="">
          <div class="text">{{ $t('提现') }}</div>
        </van-col>
        <van-col span="6" @click="navigateTo('/transactionRecord')">
          <img class="img" src="../../assets/images/user/transactions.jpeg" alt="">
          <div class="text">{{ $t('资金记录') }}</div>
        </van-col>
        <van-col span="6" @click="navigateTo('/account')">
          <img class="img" src="../../assets/images/user/account.jpeg" alt="">
          <div class="text">{{ $t('我的账户') }}</div>
        </van-col>
      </van-row>
    </div>

    <div class="list-card">
      <van-cell-group inset size="large">
        <van-cell :title="$t('站内信')" is-link @click="navigateTo('/notifiy')">
          <template #icon>
            <van-icon class="iconfont mr-10" class-prefix='icon' name='notice' size="22"/>
          </template>
        </van-cell>
        <van-cell :title="$t('个人信息')" is-link @click="navigateTo('/userInfo')">
          <template #icon>
            <van-icon class="iconfont mr-10" class-prefix='icon' name='card' size="22"/>
          </template>
        </van-cell>
        <van-cell :title="$t('在线客服')" is-link @click="navigateTo('/customerService')">
          <template #icon>
            <van-icon class="iconfont mr-10" class-prefix='icon' name='kefu' size="22"/>
          </template>
        </van-cell>
        <van-cell :title="$t('邀请好友')" is-link replace to="/invite">
          <template #icon>
            <van-icon class="iconfont mr-10" class-prefix='icon' name='invite' size="22"/>
          </template>
        </van-cell>
        <van-cell :title="$t('语言设置')" is-link @click="navigateTo('/language')">
          <template #icon>
            <van-icon class="iconfont mr-10" class-prefix='icon' name='earth' size="22"/>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="p-20">

      <van-button block round type="primary" @click="handleLayout">
        {{ $t('退出') }}
      </van-button>
    </div>
    </div>
  <!-- </van-pull-refresh> -->
  </div>
</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { navigateTo, copyText, smartToFixed } from '@/utils'
import { useI18n } from 'vue-i18n'
import { apiUserFindUserInfo } from '@/api/user'
import { showConfirmDialog } from 'vant'
import { useUserStore, useWalletStore } from '@/store'
import avatarImg from '@/assets/images/user/headimg.png'

const walletStore = useWalletStore()
const userStore = useUserStore()

const { t } = useI18n();
const infoData = ref({})
const userInfo = computed(() => {
  return userStore.getUser
})

const curVip = computed(() => {
  return userStore.getCurVip
})

// const balance = computed(() => {
// 	return walletStore.balance || {}
// })

onMounted(() => {

  apiUserFindUserInfo({}).then(res => {
    infoData.value = { ...res }
  })
})

const handleLayout = () => {
  showConfirmDialog({
    title: t('是否退出登录'),
  }).then(() => {
    userStore.layout()
  }).catch(() => {
      // on cancel
  });
}

</script>
<style lang="scss" scoped>
.me-container {
  transition: all 0.3s;
  
  .user-info-box {
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar-box {
      width: 80px;
      height: 80px;
      border: 2px solid $primary-color;
      border-radius: 50%;
      position: relative;

      .vip {
        width: 30px;
        height: 24px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .user-name {
      font-size: 22px;
      font-weight: bold;
      padding: 10px 0;
    }

    .Invitation-code {
      color: var(--ex-primary-font-color2);
    }
  }

  .account-box {
    padding: 18px 0;
    background: $panel-color;
    border-radius: 14px;
    margin-bottom: 20px;

    .item {
      width: 50%;
      text-align: center;

      .money {
        font-size: 16px;
        font-family: Poppins, Poppins;
        font-weight: 700;
        color: $primary-color;
        margin-bottom: 10px;
      }

      .text {
        font-family: PingFang TC, PingFang TC;
        color: var(--ex-primary-font-color2);
      }
    }

    .line {
      margin: auto 16px;
      border-left: 1px solid #ddd;
      height: 40px;
    }
  }

  .list-four {
    text-align: center;
    padding: 16px;
    background: $panel-color2;
    box-shadow: 0 12px 22px #5a5a5a1a;
    border-radius:12px;
    margin-bottom: 20px;

    .img {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
  }

  .list-card {
    margin-bottom: 20px;

    .van-cell-group {
      margin: 0;
    }
  }
}  
</style>