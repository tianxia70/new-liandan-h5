import { createPinia } from "pinia";
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 实例化pinia
export const store = createPinia();

// 使用持久化存储插件
store.use(piniaPluginPersistedstate)



import { useUserStore } from './modules/user'
import { useWalletStore } from './modules/wallet'

export {
  useUserStore,
  useWalletStore
}