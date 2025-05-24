<template>
<div class="withdraw-history"> 
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
<van-list
v-model:loading="loading"
v-model:error="error"
:finished="finished"
:error-text="$t('请求失败')"
@load="getListData"
>
<div class="list-item" v-for="item in listData" :key="item.id">
  <div class="item">
    <div class="left">{{ $t('订单号') }}</div>
    <div class="right">{{ item.order_no }}</div>
  </div>
  <div class="item">
    <div class="left">{{ $t('充值金额') }}</div>
    <div class="right">${{ smartToFixed(item.amount || 0) }}</div>
  </div>
  <div class="item">
    <div class="left">{{ $t('创建时间') }}</div>
    <div class="right">{{ item.createTime }}</div>
  </div>
  <div class="item">
    <div class="left">{{ $t('状态') }}</div>
    <div class="right">
      <van-tag type="warning" size="medium" v-if="item.state==0">{{ $t('处理中') }}</van-tag>
      <van-tag type="success" size="medium" v-if="item.state==1">{{ $t('成功') }}</van-tag>
      <van-tag type="danger" size="medium" v-if="item.state==2">{{ $t('失败') }}</van-tag>
    </div>
  </div>
  <div class="item border-t-grey pt-10" v-if="item.state == 2">
    <div class="left">{{ $t('失败原因') }}</div>
    <div class="right">{{ item.failure_msg }}</div>
  </div>
</div>

<EmptyComp v-if="listData?.length == 0"/>
</van-list>
</van-pull-refresh>
</div>
</template>
<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { navigateTo, navigateBack, smartToFixed } from '@/utils'
import {useRouter} from "vue-router"
import { apiWithdrawPagelist } from '@/api/wallet'
import EmptyComp from '@/components/empty/index.vue'
const router = useRouter(); // 获取路由实例

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
  apiWithdrawPagelist(page).then(res => {
    if(res?.length) {
      listData.value = listData.value.concat(...res)
    }
    console.log('listData', listData.value)
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
</script>
<style lang="scss" scoped>
.withdraw-history {
  transition: all 0.3s;

  .list-item {
    padding: 16px;
    box-shadow: 0 0 14px #092c4c1a;
    border-radius: 14px;
    margin-bottom: 20px;

    .item {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 10px;


      & > div {
        width: 50%;
        word-break: break-all;
        word-wrap: break-word;
      }

      .left {
        font-family: PingFang TC, PingFang TC;
        font-weight: 400;
        color: var(--ex-primary-font-color2);
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
      .right {
        font-family: PingFang TC, PingFang TC;
        font-weight: 400;
        font-size: 16px;
        font-style: normal;
        text-transform: none;
        text-align: right;
      }
    }
  }
}  
</style>