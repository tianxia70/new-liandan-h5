<template>
<div class="page-container login-container">
  <!-- <div class="page-navbar login-navbar">

  </div> -->
  <!-- <van-nav-bar class="page-navbar">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar> -->
  <div class="page-body page-scroll">
    <div class="login-navbar">
      <div></div>
      <div class="lang-icon iconfont icon-earth" @click="navigateTo('/language')"></div>
    </div>
    <div class="login-header">
      <img class="login-logo" src="../../assets/images/icon/logo.jpeg"/>
      <div class="login-title">{{ APP_NAME }}</div>
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
            <van-field v-model="formData.username" clearable :maxlength="30" :placeholder="$t('请输入正确的账号')">
            </van-field>
          </div>
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
          <div class="form-item" v-if="verifyPhone">
            <div class="form-label">{{ $t('验证码') }}</div>
            <van-field v-model="formData.verifCode" clearable :placeholder="$t('请输入验证码')" >
  
              <template #button>
                <van-button size="small" type="primary" :disabled="codePhoneLoading" @click="sendPhoneCode">{{ codePhoneLoading ? $t('倒计时', { s: phoneTime }) : $t('发送验证码') }}</van-button>
              </template>
            </van-field>
          </div>
        </van-cell-group>
        <van-cell-group inset v-else-if="selTab == 'email'">
          <div class="form-item">
            <div class="form-label">{{ $t('邮箱') }}</div>
            <van-field v-model="formData.email" clearable :placeholder="$t('请输入邮箱')">
            </van-field>
          </div>
          <div class="form-item" v-if="verifyEmail">
            <div class="form-label">{{ $t('验证码') }}</div>
            <van-field v-model="formData.verifEmailCode" clearable :placeholder="$t('请输入验证码')" >
              <template #button>
                <van-button size="small" type="primary" :disabled="codeEmailLoading" @click="sendEmailCode">{{ codeEmailLoading ? $t('倒计时', { s: emailTime }) : $t('发送验证码') }}</van-button>
              </template>
            </van-field>
          </div>
        </van-cell-group>

        <van-cell-group inset>
          <!-- <div class="form-item">
            <div class="form-label">{{ $t('密码') }}</div>
            <van-field v-model="formData.password" type="password" :placeholder="$t('请输入正确密码')" />
          </div> -->
          
          <div class="form-item">
            <div class="form-label">{{ $t('密码') }}</div>
            <van-field v-model="formData.password" :type="formData.eyePwd ? 'password' : 'text'" clearable :placeholder="$t('请输入正确密码')" >
              <template #right-icon>
                <van-icon class="iconfont" class-prefix='icon' :name="formData.eyePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyePwd = !formData.eyePwd"/>
              </template>
            </van-field>
          </div>
          <!-- <div class="form-item">
            <div class="form-label">{{ $t('确认密码') }}</div>
            <van-field v-model="formData.rePassword" type="password" :placeholder="$t('请再次输入密码')" />
          </div> -->
          <div class="form-item">
            <div class="form-label">{{ $t('确认密码') }}</div>
            <van-field v-model="formData.rePassword" :type="formData.eyeRePwd ? 'password' : 'text'" clearable :placeholder="$t('请再次输入密码')" >
              <template #right-icon>
                <van-icon class="iconfont" class-prefix='icon' :name="formData.eyeRePwd ? 'eyeclose-fill' : 'eye-fill'" size="20" @click="formData.eyeRePwd = !formData.eyeRePwd"/>
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">{{ $t('邀请码') }}</div>
            <van-field v-model="formData.agentCode" :placeholder="$t('请输入邀请码')" />
          </div>
        </van-cell-group>

      </div>
      
      <div class="check-item">
        <van-checkbox v-model="checked" shape="square" >
          {{ $t('我已阅读并同意') }} <span class="primary-color" @click.stop="handleProtocol(1)">《{{ $t('用户服务协议') }}》</span> {{ $t('和') }} <span class="primary-color" @click.stop="handleProtocol(2)">《{{ $t('隐私政策') }}》</span>
        </van-checkbox>
        <!-- <div></div> -->
        <div class="btn btn-link" @click="navigateTo('/customerService')">{{ $t('在线客服') }}</div>
      </div>
      <!-- <div class="login-btn">
        <van-button round block type="primary" :loading="btnLoading" @click="handleSubmit">
          {{ $t('注册') }}
        </van-button>
      </div> -->

      <div class="login-btn" @click="handleSubmit">
        {{ $t('注册') }}
      </div>
      <div class="login-bottom">
        {{ $t('已有账号？') }}<div class="btn btn-link" @click="goPage">{{ $t('去登录') }}</div>
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

  <Vcode :show="showImgCode" @success="onSuccess" :imgs="codeImgs" @close="showImgCode = false" :slider-text="$t('安全检测，向右滑动')" :fail-text="$t('验证失败，请重试')"  :success-text="$t('验证通过')"/>

</div>
</template>
<script setup>
import { APP_NAME } from '@/config'
import { ref, reactive, computed, onBeforeUnmount, onMounted } from 'vue'
import Vcode from "vue3-puzzle-vcode"

import { showLoadingToast, closeToast, showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from "vue-router"
import { validatePhone, validateEmail } from '@/utils/validate'
import { navigateTo } from '@/utils'
import { apiRegister, apiSendCodeNoneLogin, apiGetProtocol } from '@/api/login'
import { apiGetSyspara } from '@/api/app'
import { phoneCodeColumns } from '@/config/options'
import { useUserStore, useAppStore } from '@/store'

import img1 from "@/assets/images/public/1.jpeg"
import img2 from "@/assets/images/public/2.jpeg"
import img3 from "@/assets/images/public/3.jpeg"
import img4 from "@/assets/images/public/4.jpeg"
import img5 from "@/assets/images/public/5.jpeg"

const codeImgs = [
  img1, img2, img3, img4, img5
]
const showImgCode = ref(false)

const route = useRoute()
const router = useRouter(); // 获取路由实例
const userStore = useUserStore()
const appStore = useAppStore()

const { t, locale } = useI18n();
const selTab = ref('username')
const formOpt = {
  username: '',
  phone: '',
  verifCode: '',
  email: '',
  verifEmailCode: '',
  password: '',
  rePassword: '',
  eyePwd: true,
  eyeRePwd: true,
  agentCode: '',
  checkMode: '3',
}
const formData = reactive({
  ...formOpt
})
const checked = ref(false)

const codePhoneLoading = ref(false)
const codeEmailLoading = ref(false)
// const btnLoading = ref(false)
const showCodePicker = ref(false)
const pickerCodeValue = ref(['+1'])
const phoneTimer = ref(null)
const phoneTime = ref(60)
const emailTimer = ref(null)
const emailTime = ref(60)
const sysParaRes = ref([])

const codeColumns = computed(() => {
  return phoneCodeColumns.map(item => {
    return {
      ...item,
      text: item.value + ' ('+item.label+')'
    }
  })
})
// 注册时是否验证邮箱
const verifyEmail = computed(() => {
  const selItem = sysParaRes.value.find(item => item.code == 'register_verify_email') || []
  console.log('3333 ', selItem)
  return selItem?.modify || 0
})
const verifyPhone = computed(() => {
  const selItem = sysParaRes.value.find(item => item.code == 'register_verify_phone') || []
  return selItem?.modify || 0
})
const verifyCaptcha = computed(() => {
  const selItem = sysParaRes.value.find(item => item.code == 'register_verify_captcha') || []
  return selItem?.modify || 0
})

onMounted(() => {
  formData.agentCode = route.query?.userCode || ''
  // userCode.value = route.query?.userCode || ''
  getSysparaFn()
})

function getSysparaFn() {
  apiGetSyspara(['register_verify_email', 'register_verify_phone', 'register_verify_captcha']).then(res => {
    // console.log('sssss ', res)
    sysParaRes.value = res?.length ? [ ...res ] : []
  })

  // if(appStore.protocolList?.length == 0){
    // 获取协议内容
    apiGetProtocol({lang: locale.value == 'zh-CN' ? 'zh-CN' : 'en'}).then(res => {
      console.log('ddd', res)
      if(res?.length) {
        appStore.protocolList = [...res]
      }
    })
  // }
}

const onConfirmCode = ({ selectedValues, selectedOptions }) => {
  showCodePicker.value = false
  pickerCodeValue.value = selectedValues
}

const handleProtocol = (type) => {
  navigateTo('/protocol?type='+type)
}

const handleTab = (tab) => {
  selTab.value = tab
  formData.password = ''
  formData.rePassword = ''
  // formData.agentCode = ''
}

const sendPhoneCode = () => {
  if(!validatePhone(formData.phone)) {
    showToast(t('请输入正确格式的手机号'));
    return
  }

  clearInterval(phoneTimer.value)
  phoneTime.value = 60
  codePhoneLoading.value = true

  phoneTimer.value = setInterval(() => {
    phoneTime.value = phoneTime.value - 1
    if(phoneTime.value == 0) {
      codePhoneLoading.value = false
      clearInterval(phoneTimer.value)
    }
    // console.log('timer.value', phoneTime.value)
  }, 1000)

  const phoneCode = pickerCodeValue.value?.length ? pickerCodeValue.value[0] : ''
  // const phone = formData.phone
  const phone = phoneCode.substring(1) + ' ' + formData.phone
// return phoneCode.substring(1) + ' ' + 
  apiSendCodeNoneLogin({target: phone}).then(res => {
    showToast(t('发送成功'));
  }).catch(() => {
    codePhoneLoading.value = false
    clearInterval(phoneTimer.value)
  })
  
}

const sendEmailCode = () => {
  if(!validateEmail(formData.email)) {
    showToast(t('请输入正确的邮箱地址'));
    return
  }

  clearInterval(emailTimer.value)
  emailTime.value = 60
  codeEmailLoading.value = true

  emailTimer.value = setInterval(() => {
    emailTime.value = emailTime.value - 1
    if(emailTime.value == 0) {
      codeEmailLoading.value = false
      clearInterval(emailTimer.value)
    }
    // console.log('timer.value', emailTime.value)
  }, 1000)

  apiSendCodeNoneLogin({target: formData.email}).then(res => {
    showToast(t('发送成功'));
  }).catch(() => {
    codeEmailLoading.value = false
    clearInterval(emailTimer.value)
  })
  
}


onBeforeUnmount(() => {
  clearInterval(phoneTimer.value)
  clearInterval(emailTimer.value)
})

const goPage = () => {
  router.replace('/login')
  // router.push('/login')
}

const goLangFn = () => {
  router.replace('/language')
}


const params = ref({})
function handleSubmit() {
  if(selTab.value == 'username') {
    if(formData.username.trim() == '') {
      showToast(t('请输入账号'));
      return
    }
    if (formData.username.trim().length < 6) {
      showToast(t('请输入正确的账号'));
      return
    }

    params.value = {
      username: formData.username.trim(),
      password: formData.password.trim(),
      type: 3
    }
  }

  if(selTab.value == 'phone') {
    if(!validatePhone(formData.phone)) {
      showToast(t('请输入正确格式的手机号'));
      return
    }
    if(formData.verifCode.trim() == '' && verifyPhone.value) {
      showToast(t('请输入验证码'));
      return
    }
    const phoneCode = pickerCodeValue.value?.length ? pickerCodeValue.value[0] : ''

    params.value = {
      phone: phoneCode.substring(1) + ' ' + formData.phone,
      verifCode: formData.verifCode,
      type: 1,
      checkMode: verifyPhone.value ? '3' : '2'
    }
  }

  if(selTab.value == 'email') {
    if(!validateEmail(formData.email)) {
      showToast(t('请输入正确的邮箱地址'));
      return
    }
    if(formData.verifEmailCode.trim() == '' && verifyEmail.value) {
      showToast(t('请输入验证码'));
      return
    }
    params.value = {
      email: formData.email.trim(),
      verifCode: formData.verifEmailCode,
      type: 2,
      checkMode: verifyEmail.value ? '3' : '2'
    }
  }
  
  if(formData.password.trim() == '') {
    showToast(t('请输入登录密码'));
    return
  }
  if(formData.rePassword.trim() == '') {
    showToast(t('请再次输入登录密码'));
    return
  }
  if(formData.password.trim() !== formData.rePassword.trim()) {
    showToast(t('两次输入密码不一致'));
    return
  }
  if(formData.agentCode.trim() == '') {
    showToast(t('请输入邀请码'));
    return
  }

  if(!checked.value) {
    showToast(t('请同意相关协议'));
    return
  }
  params.value = {
    ...params.value,
    password: formData.password.trim(),
    rePassword: formData.rePassword.trim(),
    agentCode: formData.agentCode,
    // checkMode: formData.checkMode,
    // checkMode: '2'
  }

  // 是否开启图形验证码
  if(verifyCaptcha.value) {
    showImgCode.value = true
  } else {
    onSuccess()
  }
  // apiRegister(params).then(async res => {
  //   if(res?.token) {
  //     localStorage.setItem('token', res.token)
  //     const user = await userStore.getUserInfo(res.token)

  //     if(user?.usercode) {
  //       showToast(t('注册成功'))
  //       router.replace('/')
  //     }
  //   }
  // })
}


function onSuccess() {

  apiRegister({ ...params.value }).then(async res => {
    if(res?.token) {
      localStorage.setItem('token', res.token)
      const user = await userStore.getUserInfo(res.token)

      if(user?.usercode) {
        showToast(t('注册成功'))
        router.replace('/')
      }
    }
  }).finally(() => {
    showImgCode.value = false
  })
}

</script>
<style lang="scss" scoped>
@import url(./style.scss);
</style>