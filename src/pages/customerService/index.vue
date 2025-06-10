<template>
<div class="page-container customer-container">
  <van-nav-bar class="page-navbar" :title="$t('客服')" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body page-scroll">
    <div class="customerServiceIndex">
      <div class="nr">
        <img class="nr-img" src="../../assets/images/public/kefu.png" />
        <div class="t1">{{ $t('客服24小时为您竭诚服务') }}</div>
        <div class="t2">{{ $t('如果遇到问题需要帮助，请联系线上客服') }}</div>

        <div  class="pt-50"></div>
        <van-button block type="primary" @click="handleStart">
          {{ $t('开始咨询') }}
        </van-button>
      </div>
    </div>
</div>
</div>
</template>
<script setup>
import { navigateTo, navigateBack } from '@/utils'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

function handleStart(){
  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  //https://chatlink.mstatik.com/widget/standalone.html?eid=868016f872a48af5e889858c85acdfe6
  // window.location.href = 'https://chatlink.mstatik.com/widget/standalone.html?eid=868016f872a48af5e889858c85acdfe6&language=en'
  console.log('user', user)
  // enterOnlineService(user)
  if(window?.im_create_iframe_client) {
    window.im_create_iframe_client.open()
  } else {
    showToast(t('客服信息加载中'))
  }
  // im_create_iframe_client && im_create_iframe_client.open()

}
</script>
<style scoped lang="scss">
.customerServiceIndex{
  width: 100%;
  min-height: 100%;
  .nr{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    //display: flex;
    //justify-content: center;
    .nr-img{
      margin-top: 15px;
      width: 100%;
    }
    .t1{
      margin-top: 30px;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      /* identical to box height */

      text-align: center;
    }
    .t2{
      margin-top: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      /* 全局主标题灰色 */
      color: #888CA1;
    }
    .b1{
      margin-top: 20px;
      width: 100%;
      height: 44px;
      background: #ec8a24;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      /* identical to box height, or 100% */

      text-align: center;
      color: #FFFFFF;
    }
  }
}
</style>