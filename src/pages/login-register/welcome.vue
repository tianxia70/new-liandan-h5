<template>
<div class="page-container login-container ">
  <div class="page-body page-scroll">
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
        <van-button plain block size="large" type="primary" @click="redirectTo('/register')">
          {{ $t('注册') }}
        </van-button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { redirectTo } from '@/utils'
import { APP_NAME } from '@/config'


</script>
<style lang="scss" scoped>
@import url(./style.scss);

.login-container{
  .welcome-box {
    background-image: var(--welcome-bg);
    background-repeat: no-repeat;
    background-size: 100%;
    min-height: 100%;
    padding-top: 60px;
  }

  .btn-box {
    padding: 300px 20px;
  }
}
</style>