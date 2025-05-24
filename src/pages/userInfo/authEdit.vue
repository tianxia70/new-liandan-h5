<template>
<div class="page-container authEdit-container">
  <van-nav-bar class="page-navbar" :title="$t('身份认证')" left-arrow  @click-left="navigateBack">
    <!-- <template #right>
      <van-icon name="filter-o" size="18" @click="show = true"/>
    </template> -->
  </van-nav-bar>
  <div class="page-body page-scroll">
    <div class="from-data">
      <div class="title flex justify-between items-center ">
        <div>{{ $t('身份认证') }}</div>
        
        <!-- <div class="right-status flex justify-between items-center">
          <img v-if="authInfo.status==1" src="@/assets/image/auth/shenhe.png">
          <img v-if="authInfo.status==2" src="@/assets/image/auth/zhengque.png">
          <img v-if="authInfo.status==3" src="@/assets/image/auth/cuowu.png">
          <div v-if="authInfo.status==1" class="f2">{{ $t('审核中') }}</div>
          <div v-if="authInfo.status==2" class="f2">{{ $t('已认证') }}</div>
          <div v-if="authInfo.status==3" class="f2">{{ $t('认证失败') }}</div>
        </div> -->
        <van-tag v-if="authInfo.status==0" size="large" >{{ $t('未认证') }}</van-tag>
        <van-tag v-if="authInfo.status==1" type="warning" size="large" >{{ $t('审核中') }}</van-tag>
        <van-tag v-if="authInfo.status==2" type="success" size="large" >{{ $t('已认证') }}</van-tag>
        <van-tag v-if="authInfo.status==3" type="danger" size="large" >{{ $t('认证失败') }}</van-tag>
      </div>

      <div class="title text-warp" v-if="authInfo.status==3">
        <div>{{ $t('失败原因') }}: {{ authInfo.msg }}</div>
      </div>
      <div class="title">{{ $t('国籍') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.countryName"
          is-link
          readonly
          :disabled="authInfo.status==0 || authInfo.status==3 ? false : true"
          :placeholder="$t('请选择国家')"
          @click="openBtn"
        />
      </van-cell-group>
      <div class="title">{{ $t('真实姓名') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.name"
          :placeholder="$t('请输入真实姓名')"
          :disabled="authInfo.status==0 || authInfo.status==3 ? false : true"
          clearable
        ></van-field>
      </van-cell-group>
      <div class="title">{{ $t('证件/护照号码') }}</div>
      <van-cell-group >
        <van-field
          v-model="formData.idNumber"
          :disabled="authInfo.status==0 || authInfo.status==3 ? false : true"
          type="text"
          :placeholder="$t('请输入证件/护照号码')"
          clearable
        ></van-field>
      </van-cell-group>
      <div class="title">{{ $t('证件照/上传护照') }}</div>
      <div class="up-box">
        <van-row :gutter="[20, 20]">
          <van-col span="8">
            <div class="up-item">
              <van-uploader
                v-if="showUpLoader"
                v-model="fileList1"
                :readonly="!(authInfo.status==0 || authInfo.status==3)"
                :deletable="(authInfo.status==0 || authInfo.status==3)"
                :class="(authInfo.status==0 || authInfo.status==3)?'':'readonly-img'"
                :max-count="1"
                preview-size="100px"
                :after-read="afterRead1"
                :max-size="isOverSize"
                accept="image/png,image/jpg,image/jpeg"
                @oversize="onOversize"
                @delete="deleteImg(1)"
              />
              <div v-else style="height: 100px;width: 100px;" />
              <div>{{ $t('证件正面') }}</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="up-item">
              <van-uploader
                v-if="showUpLoader"
                v-model="fileList2"
                :readonly="!(authInfo.status==0 || authInfo.status==3)"
                :deletable="(authInfo.status==0 || authInfo.status==3)"
                :class="(authInfo.status==0 || authInfo.status==3)?'':'readonly-img'"
                :max-count="1"
                preview-size="100px"
                :after-read="afterRead2"
                :max-size="isOverSize"
                accept="image/png,image/jpg,image/jpeg"
                @oversize="onOversize"
                @delete="deleteImg(2)"
              />
              <div v-else style="height: 100px;width: 100px;" />
              <div>{{ $t('证件反面') }}</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="up-item">
              <van-uploader
                v-if="showUpLoader"
                v-model="fileList3"
                :readonly="!(authInfo.status==0 || authInfo.status==3)"
                :deletable="(authInfo.status==0 || authInfo.status==3)"
                :class="(authInfo.status==0 || authInfo.status==3)?'':'readonly-img'"
                :max-count="1"
                preview-size="100px"
                :after-read="afterRead3"
                :max-size="isOverSize"
                accept="image/png,image/jpg,image/jpeg"
                @oversize="onOversize"
                @delete="deleteImg(3)"
              />
              <div v-else style="height: 100px;width: 100px;" />
              <div>{{ $t('手持证件照') }}</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="btn" v-if="authInfo.status===0 || authInfo.status===3">
        <van-button block type="primary" :loading="isLoading" @click="handleSubmit">
          {{ $t('申请认证') }}
        </van-button>
      </div>
    </div>
  </div>
  <nationality-list v-show="!disabled()" ref="controlChild" @getName="getName" />
</div>
</template>
<script setup>
import { computed, ref, reactive, onMounted, nextTick } from 'vue'
import { useI18n } from "vue-i18n"
import {useRouter} from "vue-router"
import { navigateTo, navigateBack } from '@/utils'
import { apiUserKycInfo, apiUserKycApply } from '@/api/user'
import nationalityList from './components/nationalityList.vue'
import { showSuccessToast, showToast } from 'vant'
import { uploadImg } from '@/api/user'

const { t } = useI18n();
const router = useRouter(); // 获取路由实例
const showUpLoader = ref(true)
const controlChild = ref(null)

const isLoading = ref(false)
const authStatue = ref(0)
const authInfo = ref({})

const formData = reactive({
  password: '',
  name: '',
  idNumber: '',
  countryName: '',
  countryCode: '',
})

const isOverSize = computed(() => {
  return 10000 * 1024;
})

const fileList1 = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const imgUrl1 = ref('')
const imgUrl2 = ref('')
const imgUrl3 = ref('')

onMounted(() => {
  getInfo()
})

function getInfo() {
  apiUserKycInfo({}).then(res => {
    authInfo.value = { ...res }

    if (res.status !== 0) {
      nextTick(() => {
        setTimeout(() => {
          controlChild.value.getData(res.nationality)
        }, 300)
      })
      formData.name = res.name
      formData.idNumber = res.idnumber
      formData.countryCode = res.nationality

      fileList1.value = [{ url: res.idimg_1 }]
      fileList2.value = [{ url: res.idimg_2 }]
      fileList3.value = [{ url: res.idimg_3 }]
      imgUrl1.value = res.idimg_1 || ''
      imgUrl2.value = res.idimg_2 || ''
      imgUrl3.value = res.idimg_3 || ''
    }
  })
}

function onOversize(file) {
  // console.log(file);
  showToast(t('文件大小不能超过', { size: '10Mb' }));
}

// 获取到当前选中国家的code值
function getName(params) {
  // console.log("params",params)
  formData.countryName = params.name;
  formData.countryCode = params.dialCode;
}

function disabled() { // 是否禁用按钮
  return ![0, 3, ''].includes(authStatue.value)
}

function openBtn() {
  if (!disabled()) {
    controlChild.value.open()
  }
}

function deleteImg(index) {
  if (index === 1) {
    imgUrl1.value = ''
  } else if (index === 2) {
    imgUrl2.value = ''
  } else if (index === 3) {
    imgUrl3.value = ''
  }
}


function afterRead1(file) {
  console.log(file)
  file.status = 'uploading';
  file.message = t('上传中...');
  uploadImg(file.file).then(res => {
    if(res?.url) {
      imgUrl1.value = res.url || ''
      file.status = 'done';
      return
    }
    file.status = 'failed';
    file.message = t('上传失败');
  }).catch((err) => {
    file.status = 'failed';
    file.message = t('上传失败');
    // this.fileList = []
  })
}

function afterRead2(file) {
  console.log(file)
  file.status = 'uploading';
  file.message = t('上传中...');
  uploadImg(file.file).then(res => {
    if(res?.url) {
      imgUrl2.value = res.url || ''
      file.status = 'done';
      return
    }
    file.status = 'failed';
    file.message = t('上传失败');
  }).catch((err) => {
    file.status = 'failed';
    file.message = t('上传失败');
    // this.fileList = []
  })
}
function afterRead3(file) {
  console.log(file)
  file.status = 'uploading';
  file.message = t('上传中...');
  uploadImg(file.file).then(res => {
    if(res?.url) {
      imgUrl3.value = res.url || ''
      file.status = 'done';
      return
    }
    file.status = 'failed';
    file.message = t('上传失败');
  }).catch((err) => {
    file.status = 'failed';
    file.message = t('上传失败');
    // this.fileList = []
  })
}

function handleSubmit() {
  console.log('imgUrl1.value', imgUrl1.value, imgUrl2.value, imgUrl3.value)
  // return
  if (formData.countryCode === '') {
    showToast(t('请选择国家'))
    return
  }
  if (formData.name.trim() === '') {
    showToast(t('请输入真实姓名'))
    return
  }
  // 证件/护照号码
  if (formData.idNumber.trim() === '') {
    showToast(t('请输入证件/护照号码'))
    return
  }

  if (!imgUrl1.value || !imgUrl2.value || !imgUrl3.value) {
    showToast(t('请完善证件照片上传'))
    return
  }

  const params = {
    name: formData.name,
    idNumber: formData.idNumber,
    nationality: formData.countryCode,
    idimg_1: imgUrl1.value,
    idimg_2: imgUrl2.value,
    idimg_3: imgUrl3.value,
  }

  isLoading.value = true
  apiUserKycApply(params).then(res => {
    showSuccessToast(t('提交成功'))
    getInfo()
  }).finally(() => {
    isLoading.value = false
  })
}

</script>
<style lang="scss" scoped>
.authEdit-container {

  .from-data {
    padding: 0 20px 50px;

    .title {
      padding: 20px 0 10px;
      font-size: 16px;
      color: var(--ex-primary-font-color2);

      .right-status {
        
      }
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

    .up-box {

      .up-item {
        text-align: center;

        :deep(.van-uploader__upload) {
          border: 1px solid #ddd;
        }
      }
    }
    .btn {
      padding-top: 100px;
    }
  }
}
</style>