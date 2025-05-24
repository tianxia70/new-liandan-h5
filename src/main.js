import { createApp } from 'vue'
import '@/styles/init.scss'
import '@/styles/style.scss'
import '@/assets/iconfont/iconfont.css'
import App from './App.vue'

import Vant from 'vant';
// import 'vant/lib/index.css';
import router from '@/router/router'
import { store } from '@/store/index'
import { i18n, vantLocales } from './i18n';

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)
app.use(Vant)

vantLocales(i18n.locale); // 配置国际化

// app.use(Notify);
// app.config.globalProperties.$notify = Notify;
app.mount('#app')
