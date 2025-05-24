<template>
<div class="page-container record-container">
  <van-nav-bar class="page-navbar" :title="$t('资金记录')" left-arrow  @click-left="navigateBack">
    <template #right>
      <van-icon name="filter-o" size="18" @click="show = true"/>
    </template>
  </van-nav-bar>
  <div class="page-body page-scroll">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      :error-text="$t('请求失败')"
      @load="getListData"
    >
      <div class="p-20">
        <BalanceCard />

        <div class="list-item" v-for="item in listData" :key="item.id">
          <div class="flex items-center flex-shrink">
            <img class="list-img" src="../../assets/images/icon/income.png" v-if="item.amount > 0">
            <img class="list-img" src="../../assets/images/icon/out.png" v-else>
            <div class="title">
              {{ item?.contentType ? $t(item?.contentType) : '' }}
            </div>
          </div>
          <div class="list-right align-right">
            <div class="acount" v-if="item.amount > 0">{{ item.amount || 0 }}</div>
            <div class="acount red" v-else>{{ item.amount || 0 }}</div>
            <div class="time">{{ item?.createTimeStr }}</div>
          </div>
        </div>


        <EmptyComp v-if="listData?.length == 0"/>
      </div>
    </van-list>
  </van-pull-refresh>
  </div>

  <van-action-sheet v-model:show="show" :actions="actionsOpt" @select="onSelect"/>
</div>
</template>
<script setup>
import { computed, ref, reactive } from 'vue'
import { useI18n } from "vue-i18n";
import {useRouter} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { primaryColor } from '@/utils/theme'
import { apiUserMoneyLogList } from '@/api/user'
import BalanceCard from '@/components/balance-card/index.vue'
import EmptyComp from '@/components/empty/index.vue'

const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const show = ref(false)

const listData = ref([])
const page = reactive({
  pageNum: 0,
  pageSize: 20,
})

const error = ref(false)
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const actions = [
  {name: t('全部'), key: ""},
  {name: t('recharge'), key: "recharge"},
  {name: t('withdraw'), key: "withdraw"},
  {name: t('brokerage'), key: "brokerage"},
  {name: t('sys-increment'), key: "sys-increment"},
  {name: t('sys-decrement'), key: "sys-decrement"},
  {name: t('galaxy_back'), key: "galaxy_back"},
  {name: t('vip-recharge'), key: "vip-recharge"},
  {name: t('freeze-order'), key: "freeze-order"},
  {name: t('unfreeze-order'), key: "unfreeze-order"},
  {name: t('pay-order'), key: "pay-order"},
  {name: t('jackpot'), key: "jackpot"},
]
const content_type = ref('')
const actionsOpt = computed(() => {
  return actions.map((item, index) => {
    return {
      ...item,
      color: (content_type.value == item.key || (content_type.value =='' && item.key == '')) ? primaryColor : ''
    }
  })
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
  apiUserMoneyLogList({ ...page, contentType: content_type.value }).then(res => {
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

function onSelect(event) {
  content_type.value = event.key
  show.value = false

  refreshing.value = true
  onRefresh()
}
</script>
<style lang="scss" scoped>
.record-container {
  

  .list-item {
    padding: 16px;
    box-shadow: 0 0 14px #092c4c1a;
    border-radius: 14px;
    margin-bottom: 20px;
    display: flex;

    .list-img {
      width: 42px;
      height: 42px;
    }

    .title {
      padding-left: 20px;
      font-size: 18px;
      font-weight: bold;
    }

    .list-right {
      width: 100px;
      text-align: right;

      .acount {
        color: $primary-color;
        font-size: 16px;

        &.red {
          color: $red;
        }
      }
      .time {
        color: var(--ex-primary-font-color2);
        font-size: 12px;
      }
    }
  }
}
</style>