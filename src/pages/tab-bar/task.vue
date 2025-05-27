<template>
<div class="page-container task-container">
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
  <div class="page-body task-page-body page-scroll">

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      :error-text="$t('请求失败')"
      @load="getListData"
    >

    <div class="p-20 pb-50 pt-100">
      <van-row gutter="20">
        <van-col span="8">
          <van-button block :type="seltab == -1 ? 'primary' : 'default'" @click="handleTab(-1)">{{ $t('全部') }}</van-button>
        </van-col>
        <van-col span="8">
          <van-button block :type="seltab == 0 ? 'primary' : 'default'" @click="handleTab(0)">{{ $t('未完成') }}</van-button>
        </van-col>
        <van-col span="8">
          <van-button block :type="seltab == 1 ? 'primary' : 'default'" @click="handleTab(1)">{{ $t('已完成') }}</van-button>
        </van-col>
      </van-row>


      <div class="list-box">
        <div class="list-item" v-for="item in listData" :key="item.orderId">
          <div class="flex justify-between pb-10">
            <!-- <div class="item-name flex-shrink one-text pr-15">ibis Luzern Kriens</div> -->
             <div></div>
            <van-tag type="warning" v-if="item?.status == 0">{{ $t('未完成') }}</van-tag>
          </div>
          <div class="flex item-heard pb-16">
            <div class="item-img">
              <van-image
                width="90"
                height="90"
                :src="item.imgUrl"
              />
            </div>
            <div class="flex-shrink pl-10">
              <div class="item-num flex justify-between">
                <div>{{ $t('总金额') }}</div>
                <div class="money">${{ smartToFixed(item?.totalPrice) }}</div>
              </div>
              <div class="item-num flex justify-between">
                <div>{{ $t('利润') }}</div>
                <div class="money">${{ smartToFixed(item?.orderRate) }}</div>
              </div>
              <div class="item-num flex justify-between">
                <div>{{ $t('单价') }}</div>
                <div class="money">${{ smartToFixed(item?.productPrice) }}</div>
              </div>
              <div class="item-num flex justify-between">
                <div>{{ $t('数量') }}</div>
                <div class="money">x{{ item?.productNum }}</div>
              </div>
              <div class="item-num flex items-center font-12">
                <van-icon name="underway-o" />
                <span>{{ item?.createTime }}</span>
              </div>
              
            </div>
          </div>
          <div class="btn">
            <van-button block round type="primary" @click="handlePayOrder(item)">{{ $t('完成订单') }}</van-button>
          </div>
        </div>

        <EmptyComp v-if="listData?.length == 0"/>
      </div>
    </div>

  </van-list>
  </van-pull-refresh>
  </div>
</div>
<PasswordDialog v-model="showPwd" @done="handleDone"/>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { navigateTo, preciseMul, smartToFixed } from '@/utils'
import { apiOrderBrushList, apiOrderStartPay } from '@/api/task'
import { useI18n } from 'vue-i18n'
import PasswordDialog from '@/components/password-dialog/index.vue'
import EmptyComp from '@/components/empty/index.vue'
import { showToast, showSuccessToast, showLoadingToast, closeToast } from 'vant';
// const { theme, setTheme } = useTheme()
import { useRoute } from "vue-router"
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { t } = useI18n();
const route = useRoute()
// 判断首次加载哪一个tab
const seltab = ref(Number(route.query.tab) >= 0 ? route.query.tab : -1)
const showPwd = ref(false)
const orderInfo = ref({})

const listData = ref([])
const page = reactive({
  pageNum: 0,
  pageSize: 20,
})

const error = ref(false)
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

onMounted(() => {
  // getListData()
})

function onRefresh() {
  refreshing.value = true
  finished.value = false;
  getListData();
}

function getListData() {
  if (refreshing.value) {
    listData.value = [];
    page.pageNum = 0
  }
  
  page.pageNum += 1
  
  loading.value = true;
  apiOrderBrushList({
    page: page.pageNum,
    limit: page.pageSize,
    status: seltab.value >= 0 ? seltab.value : '',
  }).then(res => {
    if(res?.length) {
      listData.value = listData.value.concat(...res)
    }
    // console.log('listData', listData.value)
    if (res.length < page.pageSize) {
      finished.value = true;
    }
  }).catch(() => {
    error.value = true
    page.pageNum -= 1
  }).finally(() => {
    loading.value = false
    refreshing.value = false
  })
}

const handleTab = (tab) => {
  seltab.value = tab

  listData.value = [];
  page.pageNum = 0
  error.value = false

  getListData()
}

// 支付订单
function handlePayOrder(item) {
  if(item.orderId) {
    orderInfo.value = {...item}

    showPwd.value = true
  }
}

function handleDone(pwd) {
  const params = {
    orderId: orderInfo.value.orderId,
    safeWord: pwd
  }

  showLoadingToast({
    duration: 0,
  // message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  apiOrderStartPay(params).then(res => {
    showSuccessToast(t('支付成功'))
    onRefresh()
  }).finally(() => {
    closeToast()
  })
}

</script>
<style lang="scss" scoped>
.task-container {
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

  .list-box {
    padding-top: 20px;

    .list-item {
      background: $panel-color2;
      box-shadow: 0 12px 20px #5a5a5a1a;
      border-radius: 16px;
      padding: 16px;
      font-size: 16px;
      margin-bottom: 20px;

      .item-heard {
        .item-img {
          border-radius: 10px;
          border: 2px solid #fff;
          width: 94px;
          height: 94px;
          overflow: hidden;
        }

        .item-num {
          padding-bottom: 6px;

          .money {
            color: $primary-color;
          }
        }
      }

      .btn {
        padding-top: 12px;
        border-top: 1px solid #ddd;
      }
    }
  }

}  
</style>