<template>
<div class="page-container transPassword-container">
  <van-nav-bar class="page-navbar" :title="userInfo?.safeword ? $t('重置资金密码') : $t('设置资金密码')" left-arrow  @click-left="navigateBack">
    <!-- <template #right>
      <van-icon name="filter-o" size="18" @click="show = true"/>
    </template> -->
  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="from-data" v-if="userInfo?.safeword">
      <div class="title">{{ $t('旧资金密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.password"
          name="password"
          :maxlength="6"
          :type="formData.eyePwd ? 'password' : 'text'"
          :placeholder="$t('请输入6位数字旧密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyePwd = !formData.eyePwd"/>
          </template>
        </van-field>
      </van-cell-group>
      <div class="title">{{ $t('新资金密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.newPassword"
          name="newPassword"
          :maxlength="6"
          :type="formData.eyeNewPwd ? 'password' : 'text'"
          :placeholder="$t('请输入6位数字新密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeNewPwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeNewPwd = !formData.eyeNewPwd"/>
          </template>
        </van-field>
      </van-cell-group>
      <div class="title">{{ $t('再次输入新资金密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.reNewPassword"
          name="reNewPassword"
          :maxlength="6"
          :type="formData.eyeReNewPwd ? 'password' : 'text'"
          :placeholder="$t('请再次输入6位数字新密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeReNewPwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeReNewPwd = !formData.eyeReNewPwd"/>
          </template>
        </van-field>
      </van-cell-group>

      <div class="btn">
        <van-button block type="primary" :loading="isLoading" @click="handleModify">
            {{ $t('提交') }}
        </van-button>
      </div>
    </div>

    <div class="from-data" v-else>
      <div class="title">{{ $t('资金密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.password"
          name="password"
          :maxlength="6"
          :type="formData.eyePwd ? 'password' : 'text'"
          :placeholder="$t('请输入6位数字密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyePwd = !formData.eyePwd"/>
          </template>
        </van-field>
      </van-cell-group>
      <div class="title">{{ $t('再次输入密码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.newPassword"
          name="newPassword"
          :maxlength="6"
          :type="formData.eyeNewPwd ? 'password' : 'text'"
          :placeholder="$t('请再次输入6位数字密码')"
          clearable
        >
          <template #right-icon>
            <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeNewPwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeNewPwd = !formData.eyeNewPwd"/>
          </template>
        </van-field>
      </van-cell-group>

      <div class="btn">
        <van-button block type="primary" :loading="isLoading" @click="handleSet">
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
import { useUserStore } from '@/store'
import { navigateTo, navigateBack, isNumeric } from '@/utils';
import { apiUserSetTransPwd, apiUserModifyTransPwd } from '@/api/login'
import { showSuccessToast, showToast } from 'vant';
const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const userStore = useUserStore()
const isLoading = ref(false)

const formData = reactive({
  password: '',
  eyePwd: true,
  newPassword: '',
  eyeNewPwd: true,
  reNewPassword: '',
  eyeReNewPwd: true,
})

const userInfo = computed(() => {
  return userStore.getUser
})


function handleSet() {
  if(!isNumeric(formData.password.trim()) || formData.password.trim().length != 6) {
    showToast(t('请输入6位数数字密码'))
    return
  }

  if(!isNumeric(formData.newPassword.trim()) || formData.newPassword.trim().length != 6) {
    showToast(t('请再次输入6位数字密码'))
    return
  }
  
  if(formData.newPassword.trim() != formData.password.trim()) {
    showToast(t('两次输入密码不一致'))
    return
  }

  isLoading.value = true
  apiUserSetTransPwd({securityCode: formData.password}).then(res => {
    showSuccessToast(t('提交成功'))
    userStore.getUserInfo()
    router.go(-1)
  }).finally(() => {
    isLoading.value = false
  })
}

function handleModify() {
  if(!isNumeric(formData.password.trim()) || formData.password.trim().length != 6) {
    showToast(t('请输入6位数字旧密码'))
    return
  }

  if(!isNumeric(formData.newPassword.trim())) {
    showToast(t('请输入新密码'))
    return
  }
  if(formData.newPassword.trim().length != 6) {
    showToast(t('请输入6位数字新密码'))
    return
  }
  if(!isNumeric(formData.reNewPassword.trim())) {
    showToast(t('请再次输入新密码'))
    return
  }
  
  if(formData.reNewPassword.trim().length != 6) {
    showToast(t('请再次输入6位数字新密码'))
    return
  }
  
  if(formData.newPassword.trim() == formData.password.trim()) {
    showToast(t('新密码与旧密码不能一致'))
    return
  }
  if(formData.newPassword.trim() != formData.reNewPassword.trim()) {
    showToast(t('两次输入密码不一致'))
    return
  }

  isLoading.value = true
  apiUserModifyTransPwd({
    password: formData.password.trim(),
    newPassword: formData.newPassword.trim()
  }).then(res => {
    showSuccessToast(t('修改成功'))
    userStore.getUserInfo()
    router.go(-1)
  }).finally(() => {
    isLoading.value = false
  })
}

</script>
<style lang="scss" scoped>
.transPassword-container {

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