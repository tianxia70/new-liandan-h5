import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const srcPath = resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': `${srcPath}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局注入 SCSS 变量和 Vant 主题定制
        additionalData: `
          @use "vant/lib/index.css" as *;
          @use "@/styles/theme/vant-theme.scss" as *;
          @use "@/styles/variables.scss" as *;
        `
      }
    }
  }
})
