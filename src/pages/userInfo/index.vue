<template>
<div class="page-container userinfo-container">
  <van-nav-bar class="page-navbar" :title="$t('个人信息')" left-arrow  @click-left="navigateBack">
    <!-- <template #right>
      <van-icon name="filter-o" size="18" @click="show = true"/>
    </template> -->
  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="info-page">
      <van-cell-group>
        <van-cell :title="$t('头像')" center is-link >
          <!-- <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" reupload :deletable="false" preview-size="80px"> -->
          <van-uploader :after-read="afterRead" :max-count="1" reupload :deletable="false">
            <van-image class="head-img" round width="80px" height="80px" :src="upImg" />
          </van-uploader>
          
        </van-cell>
        <van-cell :title="$t('账号')" :value="userInfo?.username || '-'" />
        <van-cell :title="$t('手机号')" :value="userInfo?.phone || '-'" />
        <van-cell :title="$t('邮箱')" :value="userInfo?.email || '-'" />
        <!-- <van-cell title="Nickname" value="内容" is-link @click="showNickDialog"/> -->
        <van-cell :title="$t('信用评分')" :value="userInfo?.creditScore || '-'" />
        <van-cell :title="$t('邀请码')" :value="userInfo?.usercode || '-'" />
        <van-cell :title="$t('登录密码')" is-link @click="navigateTo('/changePassword')"/>
        <van-cell :title="$t('资金密码')" is-link @click="navigateTo('/changeTransPassword')"/>
        <van-cell :title="$t('身份认证')" is-link @click="navigateTo('/authEdit')">
          <van-tag type="success" size="medium" v-if="userInfo?.identityverif == 'true'">{{ $t('已认证') }}</van-tag>
          <!-- <van-tag type="danger" size="medium" v-else>已通过</van-tag> -->
        </van-cell>
        
      </van-cell-group>
    </div>
  </div>
  <!-- <van-dialog v-model:show="show" title="修改昵称" show-cancel-button cancel-button-text="取消" confirm-button-text="确认" :confirm-button-color="primaryColor" @confirm="confirmDialog">
    <div class="nickname-dialog">
    <van-field
      v-model="nickName"
      placeholder="请输入"
      clearable
    />
    </div>
  </van-dialog> -->
</div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n";
import { useTheme } from '@/utils/theme'
// const { theme, setTheme } = useTheme()
import {useRouter} from "vue-router"
import { navigateTo, navigateBack } from '@/utils';
import { primaryColor } from '@/utils/theme'
import { useUserStore } from '@/store'
import { uploadImg, apiUserRefreshAvatar } from '@/api/user'
import avatarImg from '@/assets/images/user/headimg.png'
import { showFailToast, showLoadingToast, showToast, closeToast } from 'vant';

const userStore = useUserStore()
const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const list = ref([]);
const fileList = ref([])
const show = ref(false)
const nickName = ref('')
const finished = ref(false);

const userInfo = computed(() => {
  return userStore.getUser
})

const upImg = ref(userInfo.value?.icon || avatarImg)

function confirmDialog() {
  if(nickName.value.trim() == '') {
    showToast('内容不能为空')
  }
  console.log('aaaa', nickName.value)
}

function afterRead(file) {
  console.log(file)
  file.status = 'uploading';
  // file.message = t('上传中...');
  showLoadingToast({
    duration: 0,
    message: t('上传中...'),
    forbidClick: true,
    loadingType: 'spinner',
  });
  uploadImg(file.file).then(res => {
    closeToast()
    if(res?.url) {
      upAvatar(res.url)
      // upImg.value = res.url || ''
      file.status = 'done';
      return
    }
    file.status = 'failed';
    // file.message = t('上传失败');
    showFailToast(t('上传失败'))
  }).catch((err) => {
    closeToast()
    file.status = 'failed';
    showFailToast(t('上传失败'))
    // file.message = t('上传失败');
    // this.fileList = []
  })
}

function upAvatar(url) {
  apiUserRefreshAvatar({iconUrl: url, idx: 0}).then(res => {
    upImg.value = url
    userStore.getUserInfo()
  }).finally(() => {
    closeToast()
  })
}
</script>
<style lang="scss" scoped>
.userinfo-container {

  .info-page {
    padding: 30px 20px;

    .van-cell-group {
      background-color: transparent;

      .van-cell {
        background-color: $panel-color2;
        border-radius: 14px;
        border: 1px solid #97979733;
        padding: 16px;
        margin-bottom: 12px;

        :deep(.van-cell__title) {
          font-size: 18px;
          color: var(--ex-primary-font-color2);
        }

        :deep(.van-cell__value) {
          font-size: 18px;
          color: var(--ex-primary-font-color);
        }
      }
    }
  }

  .nickname-dialog {
    padding: 20px;

    .van-cell {
      border: 1px solid #ddd;
    }
  }
}
</style>