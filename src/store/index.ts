import { createPinia } from 'pinia' // 状态管理
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化插件

const pinia = createPinia() // 创建pinia
pinia.use(piniaPluginPersistedstate) // 使用pinia数据持久化插件

export default pinia
