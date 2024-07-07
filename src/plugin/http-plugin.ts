import { Plugin, App } from 'vue'
import request from '@/http/request'

const axiosPlugin: Plugin = {
  install: (app, axiosInstance) => {
    app.config.globalProperties.$http = axiosInstance
  }
}

/**
 * 拓展`Vue.$http`，方便使用`axios`进行请求
 * @param app 应用实例
 */
function installHttpsPlugin(app: App) {
  app.use(axiosPlugin, request)
}

export { installHttpsPlugin }
