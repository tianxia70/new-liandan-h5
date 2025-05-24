<template>
  <div class="page-container home-container">
    <div class="page-body home-page-body page-scroll">
      <van-button 
        type="primary" 
        @click="setTheme(theme === 'default' ? 'red' : 'default')"
      >
        切换主题
      </van-button>
      
      <div class="content-box">
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
      </div>
    </div>
  </div>
  </template>
  <script setup>
  import { useTheme } from '@/utils/theme'
  // const { theme, setTheme } = useTheme()
  import {useRouter} from "vue-router"
  
  const router = useRouter(); // 获取路由实例
  
  
  const goLangFn = () => {
    router.push('/language')
  }
  </script>
  <style lang="scss" scoped>
  .home-container {
    transition: all 0.3s;
  
    .home-page-body {
    }
  
    .home-head {
      margin-bottom: 140px;
      padding: 30px 30px 120px;
      background: $primary-color;
      border-radius: 0 0 60px 60px;
      color: #fff;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
  
  
    }
  }
  
  .content-box {
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 8px;
  }
  </style>