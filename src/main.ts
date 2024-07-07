import { createApp } from 'vue'
import type { App } from 'vue'
import Root from '@/App.vue'
import pinia from '@/store' // 状态管理
import router from '@/router/index' // 路由管理
import { installAccessPlugin } from '@/plugin/access' // 引入插件: 注册元素标签显示隐藏处理
import { installBusPlugin } from '@/plugin/bus' // 引入插件: 注册全局事件总线
import { installMessagePlugin } from '@/plugin/message' // 引入插件: 注册全局提示信息
import { installHttpsPlugin } from '@/plugin/http-plugin' // 引入插件: 注册axios
import { installResizeObserverPlugin } from '@/plugin/resize-observer' // 引入插件: 注册监听元素发生变化的指令
import gloalComponent from '@/plugin/globel-component' // 引入插件:注册整个项目的全局组件
import { globalFn, globalVariate } from '@/utils/index' // 自定义全局方法 | 自定义全局变量
import { setupI18n } from './locales' // 注册国际化
import '@/styles/index.less' // 样式初始定制化入口
import 'normalize.css' // 引入normalize.css（初始化样式-Normalize.css是一种现代的、为HTML5准备的优质替代方案）
import 'ant-design-vue/dist/reset.css' // 引入ant-design-vue Css样式
import 'virtual:uno.css' // 添加引入virtual:uno.css (使用unocss-原子化css)

import 'virtual:svg-icons-register' // vite-plugin-svg-icons 依赖使用svg

import './micro' // 微前端引用
import './mock/index' // mock模拟数据

import './permission' // router 路由拦截

import('./about.js') // js测试文件
// import './about.js' // js测试文件

// import('./about-test') // ts测试文件
import '@/about-test' // ts测试文件

async function start() {
  const app: App = createApp(Root)

  app.provide('globalFn', globalFn) // 挂载全局方法
  app.provide('globalVariate', globalVariate) // 挂载全局变量

  installAccessPlugin(app) // 注册元素标签显示隐藏处理的指令
  installResizeObserverPlugin(app) // 注册监听元素发生变化的指令
  installBusPlugin(app) // 注册全局事件总线的指令
  installMessagePlugin(app) // 注册全局提示信息的指令
  installHttpsPlugin(app) // 注册axios的指令
  app.use(gloalComponent) // 注册整个项目的全局组件的指令

  app.use(pinia) // 全局仓库状态
  await setupI18n(app) // 语言国际化
  app.use(router) // 注册路由
  app.mount('#app')
}
start()
