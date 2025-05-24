<template>
<div class="page-container password-container">
  <van-nav-bar class="page-navbar" :title="$t('重置密码')" left-arrow  @click-left="navigateBack">
    <!-- <template #right>
      <van-icon name="filter-o" size="18" @click="show = true"/>
    </template> -->
  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="from-data">
      <div class="title">{{ $t('旧密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.password"
          name="username"
          :type="formData.eyePwd ? 'password' : 'text'"
          :placeholder="$t('请输入旧密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyePwd = !formData.eyePwd"/>
          </template>
        </van-field>
      </van-cell-group>
      <div class="title">{{ $t('新密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.newPassword"
          name="newPassword"
          :type="formData.eyeNewPwd ? 'password' : 'text'"
          :placeholder="$t('请输入新密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeNewPwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeNewPwd = !formData.eyeNewPwd"/>
          </template>
        </van-field>
      </van-cell-group>
      <div class="title">{{ $t('再次输入新密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.reNewPassword"
          name="reNewPassword"
          :type="formData.eyeReNewPwd ? 'password' : 'text'"
          :placeholder="$t('请再次输入新密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeReNewPwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeReNewPwd = !formData.eyeReNewPwd"/>
          </template>
        </van-field>
      </van-cell-group>

      <div class="btn">
        <van-button block type="primary" :loading="isLoading" @click="handleSubmit">
            {{ $t('提交') }}
        </van-button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { computed, ref, reactive } from 'vue'
import { useI18n } from "vue-i18n"
import {useRouter} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { useUserStore } from '@/store'
import { apiUserModifyPwd } from '@/api/login'
import { showSuccessToast, showToast } from 'vant';

const { t } = useI18n();
const userStore = useUserStore()
const router = useRouter(); // 获取路由实例
const isLoading = ref(false)
const formData = reactive({
  password: '',
  eyePwd: true,
  newPassword: '',
  eyeNewPwd: true,
  reNewPassword: '',
  eyeReNewPwd: true,
})



function handleSubmit() {
  if(formData.password.trim() == '') {
    showToast('请输入旧密码')
    return
  }
  if(formData.newPassword.trim() == '') {
    showToast('请输入新密码')
    return
  }
  if(formData.reNewPassword.trim() == '') {
    showToast('请再次输入新密码')
    return
  }
  
  if(formData.newPassword.trim() == formData.password.trim()) {
    showToast('新密码与旧密码不能一致')
    return
  }
  if(formData.newPassword.trim() != formData.reNewPassword.trim()) {
    showToast('两次输入密码不一致')
    return
  }

  const params = {
    password: formData.password,
    newPassword: formData.newPassword
  }

  isLoading.value = true
  apiUserModifyPwd(params).then(res => {
    showSuccessToast('修改成功')
    userStore.layout()
    // setTimeout(() => {
    //   router.go(-1)
    // }, 1500)
  }).finally(() => {
    isLoading.value = false
  })
}

</script>
<style lang="scss" scoped>
.password-container {

  .from-data {
    padding: 0 20px 50px;

    .title {
      padding: 20px 0 10px;
      font-size: 16px;
      color: var(--ex-primary-font-color2);
    }

    .van-cell-group {
      background-color: transparent;

      .van-cell {
        background-color: $panel-color2;
        border-radius: 14px;
        border: 1px solid #97979733;
        padding: 16px;
        // margin-bottom: 12px;

        // :deep(.van-cell__title) {
        //   font-size: 18px;
        //   color: var(--ex-primary-font-color2);
        // }

        :deep(.van-cell__value) {
          font-size: 18px;
          color: var(--ex-primary-font-color);
        }
      }
    }

    .btn {
      padding-top: 100px;
    }
  }
}
</style>