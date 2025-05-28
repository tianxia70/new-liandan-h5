<template>
<div class="page-container login-container">
  <!-- <div class="page-navbar login-navbar">

  </div> -->
  <!-- <van-nav-bar class="page-navbar">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar> -->
  <div class="page-body">
    <div class="login-navbar">
      <div></div>
      <div class="lang-icon iconfont icon-earth" @click="navigateTo('/language')"></div>
    </div>
    <div class="login-header">
      <img class="login-logo" src="../../assets/images/icon/logo.jpeg"/>
      <div class="login-title">DEV_TITLE</div>
      <div class="login-welcome">{{ $t('欢迎您') }}</div>
    </div>

    <div class="form-box">
      <div class="form-tab">
        <div :class="`tab-item ${selTab == 'username' && 'active'}`" @click="handleTab('username')">{{ $t('账号') }}</div>
        <div :class="`tab-item ${selTab == 'phone' && 'active'}`" @click="handleTab('phone')">{{ $t('手机号') }}</div>
        <div :class="`tab-item ${selTab == 'email' && 'active'}`" @click="handleTab('email')">{{ $t('邮箱') }}</div>
      </div>
      <!-- <van-form @failed="onFailed"> -->
      <div class="form-content">
        <van-cell-group inset v-if="selTab == 'username'">
          <div class="form-item">
            <div class="form-label">{{ $t('账号') }}</div>
            <van-field v-model="formData.username" :maxlength="30" clearable :placeholder="$t('请输入账号')">
            </van-field>
          </div>
          <!-- <div class="form-item">
            <div class="form-label">{{ $t('密码') }}</div>
            <van-field v-model="formData.password" type="password" clearable :placeholder="$t('请输入 6-12 位由数字或字母组成的密码')" />
          </div> -->
        </van-cell-group>
        <van-cell-group inset v-else-if="selTab == 'phone'">
          <div class="form-item">
            <div class="form-label">{{ $t('手机号') }}</div>
            <van-field v-model="formData.phone" clearable :placeholder="$t('请输入手机号')">
              <template #left-icon>
                <div class="code-picker" @click="showCodePicker = true">{{ pickerCodeValue[0] }} &nbsp;<van-icon name="arrow-down" /></div>
              </template>
            </van-field>
          </div>
          <!-- <div class="form-item">
            <div class="form-label">{{ $t('密码') }}</div>
            <van-field v-model="formData.password" type="password" clearable :placeholder="$t('请输入 6-12 位由数字或字母组成的密码')" />
          </div> -->
          <!-- <div class="form-item">
            <div class="form-label">{{ $t('验证码') }}</div>
            <van-field v-model="formData.code" clearable :placeholder="$t('请输入验证码')" >

              <template #button>
                <van-button size="small" type="primary">{{ $t('发送验证码') }}</van-button>
              </template>
            </van-field>
          </div> -->
        </van-cell-group>
        <van-cell-group inset v-else-if="selTab == 'email'">
          <div class="form-item">
            <div class="form-label">{{ $t('邮箱') }}</div>
            <van-field v-model="formData.email" clearable :placeholder="$t('请输入邮箱')">
            </van-field>
          </div>
        </van-cell-group>

        <van-cell-group>
          <div class="form-item">
            <div class="form-label">{{ $t('密码') }}</div>
            <van-field v-model="formData.password" :type="formData.eyePwd ? 'password' : 'text'" clearable :placeholder="$t('请输入 6-12 位由数字或字母组成的密码')" >
              <template #right-icon>
                <van-icon class="iconfont" class-prefix='icon' :name="formData.eyePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyePwd = !formData.eyePwd"/>
              </template>
            </van-field>
          </div>
        </van-cell-group>
      </div>

      <div class="check-item">
        <van-checkbox v-model="checked" shape="square" >{{ $t('记住我') }}</van-checkbox>
        
        <!-- <div class="btn btn-link" @click="goChat()">{{ $t('在线客服') }}</div> -->
        <div class="btn btn-link" @click="navigateTo('/customerService')">{{ $t('在线客服') }}</div>
      </div>
      <div class="login-btn" @click="handleSubmit">
        {{ $t('登录') }}
        <!-- <van-button round block type="primary" :loading="btnLoading" @click="handleSubmit">
          {{ $t('登录') }}
        </van-button> -->
      </div>
      <div class="login-bottom">
        {{ $t('还没有账号？') }}<div class="btn btn-link" @click="goPage">{{ $t('去注册') }}</div>
      </div>
    <!-- </van-form> -->
    </div>
  </div>

  <van-popup v-model:show="showCodePicker" destroy-on-close round position="bottom">
    <van-picker
      :model-value="pickerCodeValue"
      :columns="codeColumns"
      @cancel="showCodePicker = false"
      @confirm="onConfirmCode"
    />
  </van-popup>
</div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { closeToast, showLoadingToast, showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { validatePhone, validateEmail } from '@/utils/validate'
import { navigateTo } from '@/utils'
import {useRouter} from "vue-router"
import { apiLogin } from '@/api/login'
import { phoneCodeColumns } from '@/config/options'
import { useUserStore } from '@/store'
import { setStorage, getStorage } from '@/utils'

const router = useRouter(); // 获取路由实例
const userStore = useUserStore()

const { t } = useI18n();
const selTab = ref('username')
const formData = reactive({
  username: '',
  phone: '',
  code: '',
  email: '',
  password: '',
  eyePwd: true
})
const checked = ref(false)

// const btnLoading = ref(false)
const showCodePicker = ref(false)
const pickerCodeValue = ref(['+1'])

const codeColumns = computed(() => {
  return phoneCodeColumns.map(item => {
    return {
      ...item,
      text: item.value + ' ('+item.label+')'
    }
  })
})

function getRemember() {
  const reJson = getStorage('loginRemember') || {}
  return reJson[selTab.value] || {}
}

function setRemember() {
  const reJson = getRemember()
  console.log('reJson', reJson)
  if(!formData[selTab.value] && reJson?.name) {
    formData[selTab.value] = reJson?.name || ''
    formData.password = reJson?.password || ''
  }

}

onMounted(() => {
  setRemember()
})

const onConfirmCode = ({ selectedValues, selectedOptions }) => {
  showCodePicker.value = false
  pickerCodeValue.value = selectedValues
}

const handleTab = (tab) => {
  selTab.value = tab
  formData.password = ''
  setRemember()
}

const goPage = () => {
  router.replace('/register')
}

const goLangFn = () => {
  router.push('/language')
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};

function handleSubmit() {
  let params = {}
  if(selTab.value == 'username') {
    if(formData.username.trim() == '') {
      showToast(t('请输入账号'));
      return
    }
    if (formData.username.trim().length < 6) {
      showToast(t('请输入正确的账号'));
      return
    }
    // if(formData.password.trim() == '') {
    //   showToast(t('请输入密码'));
    //   return
    // }

    params = {
      userName: formData.username,
      loginType: 3
    }
  }

  if(selTab.value == 'phone') {
    if(!validatePhone(formData.phone)) {
      showToast(t('请输入正确格式的手机号'));
      return
    }
    // if(formData.code.trim() == '') {
    //   showToast(t('请输入验证码'));
    //   return
    // }

    const phoneCode = pickerCodeValue.value?.length ? pickerCodeValue.value[0] : ''

    params = {
      phone: phoneCode.substring(1) + ' ' + formData.phone,
      loginType: 1
    }
  }

  if(selTab.value == 'email') {
    if(!validateEmail(formData.email)) {
      showToast(t('请输入正确的邮箱地址'));
      return
    }
    // if(formData.code.trim() == '') {
    //   showToast(t('请输入验证码'));
    //   return
    // }

    params = {
      email: formData.email,
      loginType: 2
    }
  }

  if(formData.password.trim() == '') {
    showToast(t('请输入密码'));
    return
  }

  params = {
    ...params,
    password: formData.password.trim(),
  }
  // btnLoading.value = true
  showLoadingToast({
    duration: 0,
  // message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  apiLogin(params).then(async res => {
    if(res?.token) {
      localStorage.setItem('token', res.token)
      if(checked.value) {
        const reJson = getStorage('loginRemember') || {}
        reJson[selTab.value] = {
          name: formData[selTab.value] || '',
          // password: formData.password,
          password: '',
        }
        setStorage('loginRemember', reJson)
      }

      const user = await userStore.getUserInfo(res.token)
      
      if(user?.usercode) {
        showToast(t('登录成功'))
        router.replace('/')
      }
    }
  }).finally(() => {
    closeToast()
  })
}

function goChat(){
  im_create_iframe_client.open()
}

</script>
<style lang="scss" scoped>
@import url(./style.scss);
</style>