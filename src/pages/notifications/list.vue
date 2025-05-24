<template>
<div class="page-container notifiy-container">
  <van-nav-bar class="page-navbar" :title="$t('站内信')" left-arrow  @click-left="navigateBack"></van-nav-bar>
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
        <div class="list-item" v-for="item in listData" :key="item.id" @click="goDetail(item)">
          <div class="flex justify-between item-center">
            <div class="list-time">{{ item?.sendTime }}</div  >
            <div class="dot" v-if="item.status == 1"></div>
          </div>
          <div class="list-text text-ellipsis">{{ item?.title || '' }}</div>
          <div class="line"></div>
          <div class="list-bottom flex justify-between items-center">
            <div class="detail">{{ $t('查看详情') }}</div>
            <div ><i class="van-badge__wrapper van-icon van-icon-arrow" style="color: rgb(151, 151, 151);"></i>
            </div>
          </div>
        </div>

        <EmptyComp v-if="listData?.length == 0"/>
      </div>
    </van-list>
  </van-pull-refresh>
  </div>
</div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useTheme } from '@/utils/theme'
// const { theme, setTheme } = useTheme()
import {useRouter} from "vue-router"
import { apiNotifiyList, apiNotifiyRead } from '@/api/user'
import { navigateTo, navigateBack } from '@/utils';
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
  apiNotifiyList({
    ...page
  }).then(res => {
    if(res?.list?.length) {
      listData.value = listData.value.concat(...res.list)
    }
    if (res?.list?.length < page.pageSize) {
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


function goDetail(item) {
  if(item.id) {
    item.status = 2
    apiNotifiyRead({ids: [item.id]})
    router.push('/notifiyDetail?detail=' + JSON.stringify(item))
  }
}

</script>
<style lang="scss" scoped>
.notifiy-container {
  

  .list-item {
    padding: 20px 16px;
    box-shadow: 0 0 14px #092c4c1a;
    border-radius: 14px;
    margin-bottom: 20px;

    .list-time {
      color: var(--ex-primary-font-color2);
    }

    .dot {
      width: 10px;
      height: 10px;
      background: #fe0202;
      border-radius: 50%;
    }

    .list-text {
      padding: 10px 0 20px;
      border-bottom: 1px solid #ddd;
    }

    .list-bottom {
      padding-top: 10px;
      color: $primary-color;
    }
  }
}
</style>