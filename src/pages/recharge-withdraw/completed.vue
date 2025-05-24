<template>
<div class="page-container completed-container"> 
  <van-nav-bar class="page-navbar" :title="title" left-arrow  @click-left="navigateBack"></van-nav-bar>
  <div class="page-body completed-page-body page-scroll">
  <div class="SubmitCompleted">
    <div class="nr">
      <div class="icon">
        <van-icon name="checked" size="80" class="primary-color"/>
        <!-- <img class="icon-img" src="@/assets/image/public/chengong.png"> -->
      </div>
      <div class="t1">{{ content }}</div>
      <div class="t2">{{ $t('请注意查收到账信息，如有疑问请联系客服') }}</div>
      <div class="shouye" @click="shouye">{{ $t('返回首页') }}</div>
      <!-- <div class="dingdan" @click="dingdan">{{ $t('查看订单') }}</div> -->
    </div>
  </div>
  </div>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { navigateTo, navigateBack } from '@/utils'
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(); // 获取路由实例
const router = useRouter()

const { t } = useI18n();
const title = ref('')
const url = ref('')
const content = ref('')

onMounted(() => {
  if (route.query.path) {
      url.value = route.query.path
    }
    switch (route.query.path) {
      case 'MyInvestment':
        title.value = t('项目投资')
        content.value = t('购买成功')
        break;
      case 'PointsRedemptionRecord':
        title.value = t('积分兑换')
        content.value = t('兑换成功')
        break;
      case 'OTCExchangeList':
        title.value = t('OTC兑换')
        content.value = t('兑换成功')
        break;
      case 'rechargeRecord':
        title.value = t('充值')
        content.value = t('充值成功')
        break;
      case 'withdrawRecord':
        title.value = t('提现')
        content.value = t('提现成功')
        break;
      case 'YuEBaoTransferIn':
        title.value = t('转入')
        content.value = t('转入成功')
        break;
      case 'YuEBaoTransferOut':
        title.value = t('转出')
        content.value = t('转出成功')
        break;
      default:
        title.value = t('提交成功')
    }
})


function dingdan() {
  router.push('/' + url.value)
}
function shouye() {
  router.push('/')
}

</script>
<style lang="scss" scoped>
.completed-container {
  
.SubmitCompleted {
  width: 100%;
  min-height: 100%;

  .nr {
    padding: 0 15px;
    box-sizing: border-box;

    .icon {
      //width: 50px;
      //height: 50px;
      width: 100%;
      display: flex;
      margin-top: 74px;
      justify-content: center;
      margin-bottom: 15px;

      .icon-img {
        width: 50px;
        height: 50px;
        font-size: 50px;
      }
    }

    .t1 {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 14px;
      /* identical to box height, or 88% */

      text-align: center;

      color: #333333;
    }

    .t2 {
      margin-top: 15px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */

      text-align: center;

      color: #999999;
    }

    .shouye {
      margin-top: 30px;
      width: 100%;
      height: 44px;
      background: #FF843E;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      /* identical to box height, or 100% */
      text-align: center;
      color: #FFFFFF;
    }

    .dingdan {
      border: 1px solid #FF843E;
      border-radius: 4px;
      margin-top: 15px;
      width: 100%;
      height: 42px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 42px;
      /* identical to box height, or 100% */
      text-align: center;
      color: #FF843E;
    }
  }
}
}
</style>
