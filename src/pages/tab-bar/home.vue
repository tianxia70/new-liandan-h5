<template>
<div class="page-container home-container">
  <van-nav-bar class="page-navbar theme" :title="APP_NAME">
    <template #left>
      <van-icon class="iconfont" class-prefix='icon' name='more' size="18" @click="navigateTo('/me')"/>
    </template>
    <template #right>
      <van-icon class="iconfont" class-prefix='icon' name='notice' size="18" :badge="userStore?.unReadNum || ''" @click="navigateTo('/notifiy')"/>
      <!-- <van-icon name="search" size="18" /> -->
    </template>
  </van-nav-bar>
  <div class="page-body home-page-body page-scroll">
    <div class="home-head">
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
          <div class="balance">{{ $t('信用评分') }}: {{ userInfo?.creditScore || '-' }}</div>
        </div>
      </div>
      <div class="lang-icon iconfont icon-earth" @click="navigateTo('/language')"></div>

      <div class="balance-box">
        <div class="tit">{{ $t('钱包余额') }}</div>
        <div class="flex justify-between items-center">
          <div class="money" v-if="userStore.showBalance">
            ${{ smartToFixed(balance?.usdtMoney || 0) }}
          </div>
          <div class="money" v-else>
            $******
          </div>
          <div>
            <van-icon class="iconfont" class-prefix='icon' :name="userStore.showBalance ? 'eye-fill' : 'eyeclose-fill'" size="28" @click="userStore.showBalance = !userStore.showBalance"/>
            <!-- <img class="w-24" src="../../assets/images/icon/eye-o.jpg" alt="" srcset=""> -->
          </div>
        </div>
        <div class="btns flex justify-between items-center">
          <div class="btn" @click="navigateTo('/recharge')">
            <img class="w-16" src="@/assets/images/icon/up.png" alt="">&nbsp;
            {{ $t('充值') }}
          </div>
          <div class="btn" @click="navigateTo('/withdraw')">
            <img class="w-16" src="@/assets/images/icon/down.png" alt="">&nbsp;
            {{ $t('提现') }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-20 pb-50">
      <div class="active-box flex justify-between items-center">
        <div class="active-body">
          <img class="left-icon" src="../../assets/images/icon/active1.png" alt="">
          <div class="left-body">{{ $t('做任务获利') }}</div>
        </div>
        <div class="start-btn flex-row items-center">
          <van-button round size="small" plain type="primary" @click="switchTab('/start')">
            <!-- <template #icon><van-icon class="iconfont" class-prefix='icon' name='right' size="18"/></template> -->
            <div class="flex items-center">
            {{ $t('开始') }} <van-icon class="iconfont" class-prefix='icon' name='right' size="18"/>
          </div>
        </van-button>
        </div>
      </div>

      <div class="vip-box">
        <div class="vip-title">
          <div>{{ $t('VIP等级') }}</div>
          <div class="all-link font-14" @click="navigateTo('/vipLevel')">{{ $t('全部') }}</div>
        </div>
        <div class="vip-swipe">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in vipList" :key="item.id">
              <div :class="`levels-item vip-bg${index + 1}`"  @click="navigateTo('/vipLevel')">
                <img class="vip-img" v-if="item.iconImg" :src="item.iconImg" alt="" >
                <div class="level-header flex justify-between items-center">
                  <div class="header-body flex-shrink flex items-center">
                    <span class="vip-icon iconfont icon-vip"></span>
                    <div class="flex-shrink name">{{ item.title || '' }}</div>
                  </div>
                  <div class="right-btn">
                    <span class="iconfont icon-right"></span>
                  </div>
                </div>
                <div class="level-body">
                  <div class="item"> ・{{ $t('每日任务数') }} <span>{{ item.dailyTaskLimit || 0 }}</span></div>
                  <div class="item"> ・{{ $t('限制金额') }} <span>${{ smartToFixed(item.grabOrderLimitAmount || 0) }}</span></div>
                  <div class="item"> ・{{ $t('订单佣金比例') }} <span>{{ smartToFixed(item.commissionRation * 100) + '%'}}</span></div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="shop-box">
        <div class="shop-title">{{ $t('商品展示') }}</div>
        <div class="shop-body">
          <van-row :gutter="[20, 20]">
            <van-col span="12" v-for="item in shopList" :key="item.id">
              <div class="shop-item">
                <img class="shop-img" :src="item.imgUrl1" />
                <div class="item-body">
                  <div class="one-text title">{{ item?.goodsName || '' }}</div>
                  <div class="money"><span>$</span>{{ smartToFixed(item?.systemPrice || 0) }}</div>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="tools-box">
        <div class="tools-title">{{ $t('常用工具') }}</div>
        <div class="tools-body">
          <van-cell-group inset>
            <van-cell :title="$t('证书')" is-link @click="goPage(1)">
              <template #icon>
                <img class="w-20 h-20 mr-10" src="../../assets/images/icon/cert.jpeg" alt="">
              </template>
            </van-cell>
            <van-cell :title="$t('最新事件')" is-link @click="goPage(2)">
              <template #icon>
                <img class="w-20 h-20 mr-10" src="../../assets/images/icon/latest.jpeg" alt="">
              </template>
            </van-cell>
            <van-cell :title="$t('关于我们')" is-link @click="goPage(3)">
              <template #icon>
                <img class="w-20 h-20 mr-10" src="../../assets/images/icon/us.jpeg" alt="">
              </template>
            </van-cell>
            <van-cell :title="$t('服务条款')" is-link @click="goPage(4)">
              <template #icon>
                <img class="w-20 h-20 mr-10" src="../../assets/images/icon/terms.jpeg" alt="">
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>

      <div class="partner-box">
        <div class="partner-title">{{ $t('合作伙伴') }}</div>
        <div class="partner-body">
          <van-row :gutter="[10, 10]">
            <van-col span="12" v-for="item in pageList.filter(item => item.sectionType == 5)">
              <div class="partner-item">
                <img class="partner-img" :src="item.imageUrl" />
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
  <!-- <van-button 
      type="primary" 
      @click="setTheme(theme === 'default' ? 'red' : 'default')"
    >
      切换主题
    </van-button>
    
    <div class="content-box">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div> -->
</div>
<PopNotice />
</template>
<script setup>
import { APP_NAME } from '@/config'
import { computed, ref, onMounted } from 'vue'
import { navigateTo, switchTab, copyText, smartToFixed } from '@/utils'
import {useRouter} from "vue-router"
import { apiUserHomePageList, apiUserGoodsList } from '@/api/user'
import { useUserStore, useWalletStore } from '@/store'
import PopNotice from '@/components/pop-notice/index.vue'

import avatarImg from '@/assets/images/user/headimg.png'

const walletStore = useWalletStore()
const router = useRouter(); // 获取路由实例
const userStore = useUserStore()
// const showEye = ref(false)
const pageList = ref([])
const shopList = ref([])

const userInfo = computed(() => {
  return userStore.getUser
})
const balance = computed(() => {
	return walletStore.balance || {}
})

const vipList = computed(() => {
  return userStore.vipList || []
})

const curVip = computed(() => {
  return userStore.getCurVip
})

onMounted(() => {
  apiUserHomePageList({}).then(res => {
    if(res?.length) {
      pageList.value = [...res]
    }
  })
  
  // 商品列表
  apiUserGoodsList({pageNum: 1, pageSize: 4}).then(res => {
    if(res?.list?.length) {
      shopList.value = [...res.list]
    }
  })
})

function goPage(sectionType = '') {
  const selItems = pageList.value.filter(item => item.sectionType == sectionType)
  if(selItems?.length) {
    router.push('/webpage?conts='+JSON.stringify(selItems))
  }
}

</script>
<style lang="scss" scoped>
@import url(../vip/style.scss);
.home-container {
  transition: all 0.3s;

  .home-page-body {
  }

  .home-head {
    margin-bottom: 140px;
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

        .btn {
          width: 45%;
          display: flex;
          align-items: center;
          height: 40px;
          color: var(--ex-primary-font-color4);
          background: var(--ex-primary-color1);
          border-radius: 20px;
          padding: 5px 10px;
        }
      }
    }
  }
  .active-box {
    padding-right: 20px;
    border-radius: 20px;
    background: var(--ex-primary-font-color4);

    .active-body {
      min-width: 0;
      flex: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-right: 20px;

      .left-icon {
        width: 85px;
        height: 85px;
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

  .vip-box {
    padding-top: 20px;

    .vip-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;

      .all-link {
        color: var(--ex-primary-color1);
        font-weight: 500;
      }
    }
  }

  .shop-box {
    padding-top: 20px;

    .shop-title {
      font-size: 18px;
      padding-bottom: 10px;
    }

    .shop-body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .shop-item {
        border-radius: 10px;
        overflow: hidden;
        background: var(--ex-primary-font-color4);
        box-shadow: 0 5px 12px #0000001a;
        // border-radius: 0px 0px 10px 10px;

        .shop-img {
          width: 100%;
          height: 160px;
          border-radius: 10px;
        }
        .item-body {
          padding: 5px 10px 10px;
          height: 70px;

          .title {
            margin-bottom: 10px;
            font-weight: 500;
            font-size: 16px;
            // line-height: .533333rem;
            text-align: left;
            width: 100%;
          }
          
          .money {
            font-weight: 400;
            font-size: 18px;
            color: var(--ex-primary-color);
            line-height: 20px;
            font-style: normal;
            text-transform: none;

            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  .tools-box {
    padding-top: 20px;

    .tools-title {
      font-size: 18px;
      padding-bottom: 10px;
    }

    .tools-body {
      .van-list {
        margin: 0;
      }
    }
  }

  .partner-box {
    padding-top: 20px;

    .partner-title {
      font-size: 18px;
      padding-bottom: 10px;
    }

    .partner-body {

      .partner-item {
        width: 100%;
        height: 100px;

        .partner-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}

.content-box {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255,255,255,0.8);
  border-radius: 8px;
}
</style>