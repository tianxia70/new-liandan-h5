<template>
<div class="page-container login-container ">
  <div class="page-body ">
    <div class="welcome-box">
      <div class="login-header">
        <img class="login-logo" src="../../assets/images/icon/logo.jpeg"/>
        <div class="login-title">{{ APP_NAME }}</div>
        <div class="login-welcome">{{ $t('欢迎页文本') }}</div>
      </div>

      <div class="btn-box">
        <div class="login-btn mb-20" @click="redirectTo('/login')">
          {{ $t('登录') }}
        </div>
        <van-button plain block size="large" type="primary" @click="redirectTo('/register?userCode='+userCode)">
          {{ $t('注册') }}
        </van-button>
        <!-- <van-button plain block size="large" type="primary" @click="goRegister">
          {{ $t('注册') }}
        </van-button> -->
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { redirectTo } from '@/utils'
import { APP_NAME } from '@/config'
import {useRouter, useRoute} from "vue-router"

const route = useRoute()
const userCode = ref('')

onMounted(() => {
  userCode.value = route.query?.userCode || ''
  // console.log('route.query.conts', route.query, userCode.value )
})

// function goRegister() {
//   console.log('sss', '/register?userCode='+userCode.value)
//   return
//   redirectTo('/register?userCode='+userCode)
// }

</script>
<style lang="scss" scoped>
@import url(./style.scss);

.login-container{
  .welcome-box {
    background-image: var(--welcome-bg);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: 60px;
  }

  .btn-box {
    padding: 300px 20px;
  }
}
</style>