<template>
<van-popup v-model:show="show" :style="{ width: '100%', padding: '20px', borderRadius: '10px' }" closeable teleport="body" @close="closedFn">
  <div class="popnotice-box">
    <div class="">
      <!-- <van-swipe ref="swipeRef" class="notice-swipe" :show-indicators="false">
        <van-swipe-item v-for="item in noticeList" :key="item.id">
          <div class="swipe-item">
            <div class="swipe-title" v-if="item?.title">{{ item?.title || '' }}</div>
            <div class="swipe-body" v-html="item?.content"></div>
          </div>
        </van-swipe-item>
      </van-swipe> -->
      <div class="swipe-item">
        <div class="swipe-title" v-if="noticeData?.title">{{ noticeData?.title || '' }}</div>
        <div class="swipe-body" v-html="noticeData?.content"></div>
      </div>

      <div class="swipe-bottom">
        <!-- <van-button icon="arrow-left" plain type="primary" v-if="noticeList?.length > 1" @click="handlePrev"></van-button> -->
        <div class="px-10 flex-shrink">
        <van-button block plain type="primary" @click="show = false">{{ $t('关闭') }}</van-button>
        </div>
        <!-- <van-button icon="arrow" plain type="primary" v-if="noticeList?.length > 1" @click="handleNext"></van-button> -->
      </div>
    </div>
  </div>
</van-popup>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore, useWalletStore } from '@/store'

const appStore = useAppStore()
const show = ref(false)
const swipeRef = ref(null)

// const noticeList = computed(() => {
//   return appStore.noticeList || []
// })

const noticeData = computed(() => {
  return appStore.noticeList?.length ? appStore.noticeList[0] : {}
})

const isShowNotice = computed(() => {
  return appStore.isShowNotice || false
})

onMounted(async () => {
  await appStore.getNoticeList()
  // console.log(12121, isShowNotice.value, noticeList.value?.length)
  if(isShowNotice.value && noticeData.value?.id) {
    show.value = true
  }
})


function handlePrev() {
  swipeRef.value?.prev()
}

function handleNext() {
  swipeRef.value?.next()
}

function closedFn() {
  console.log('sasas')
  appStore.isShowNotice = false
}

</script>
<style lang="scss" scoped>
.popnotice-box {
  .swipe-item {
    min-height: 40vh;
    overflow-y: auto;
    max-height: 70vh;

    .swipe-title {
      padding: 10px 20px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

  }

  .swipe-bottom {
    padding-top: 10px;
    display: flex;
    align-items: center;
  }
}
</style>