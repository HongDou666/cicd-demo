import microApp from '@micro-zoe/micro-app'
import * as config from './config'

/**启用 micro */
microApp.start({
  preFetchApps: config.MICRO_APPS,
  globalAssets: config.GLOBAL_ASSETS,
  'disable-memory-router': true, // 关闭虚拟路由系统 (可使子应用 window.__MICRO_APP_BASE_ROUTE__ 对应主应用的 <micro-app /> 的 baseroute 属性)
  'disable-patch-request': true // 关闭对子应用请求的拦截
} as any)

export { microApp }
