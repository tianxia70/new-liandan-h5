<template lang="">
  <div>
    <van-empty
      :image="img || noDataImg"
      image-size="160"
      :description="text || $t('暂无数据')"
    />
  </div>
</template>
<script setup>
import noDataImg from '@/assets/images/icon/nodata.svg'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  }
})

</script>
<style >
  
</style>