<template>
<van-popup v-model:show="showTop" position="top" teleport="body" @opened="openedFn" @click-overlay="closeHandle('')">
  <div class="pwd-popup-box" v-if="userInfo?.safeword">
    <van-password-input
      :value="pwdValue"
      :info="$t('请输入6位数字密码')"
      :error-info="errorInfo"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />

  </div>
  <div class="pwd-popup-box" v-else>
    <div class="p-30 flex justify-center ">{{ $t('您还没有设置资金密码') }}<div class="btn btn-link" @click="navigateTo('/changeTransPassword')">{{ $t('前往添加') }}</div> </div>
  </div>

  
  <van-number-keyboard
    v-model="pwdValue"
    :show="showKeyboard"
    @blur="showKeyboard = false"
  />
</van-popup>

    <!-- <view class="form-content">
      <view class="title">{{t('请输入您的支付密码(6位数字)')}}</view>
      <xt-verify-code v-model="passwordValue" :size="6" :isPassword="true" @confirm="closeHandle(true)"></xt-verify-code>
    </view> -->

</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/store'
import { navigateTo } from '@/utils'
const { t } = useI18n()
const emits = defineEmits(['update:modelValue', 'done']);

const userStore = useUserStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})
const userInfo = computed(() => {
  return userStore.getUser
})

const showTop = ref(false)
const pwdValue = ref('');
const errorInfo = ref('');
const showKeyboard = ref(false);
const timer = ref(null)

watch(pwdValue, (newVal) => {
  if (newVal.length === 6) {
    emits('update:modelValue', false)
    emits('done', pwdValue.value)
  }
});

watch(() => props.modelValue, (val) => {
  pwdValue.value = ''
  showTop.value = val
  if(!val) {
    showKeyboard.value = false
  }
})

const closeHandle = (flag) => {
  emits('update:modelValue', false)
  // emits('update:visible', false)
  // uni.hideKeyboard()
  // if (flag) {
  // 	emits('update:modelValue', passwordValue.value)
  // 	emits('done', passwordValue.value)
  // }
}


function openedFn() {
  showKeyboard.value = true
}
</script>

<style lang="scss" scoped>
.pwd-popup-box {
  background-color: $panel-color;
  padding: 60px 10px 30px;
}
</style>