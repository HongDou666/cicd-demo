<template>
  <div>
    <a-card title="Vite-主应用">
      <div class="text_color">样式隔离问题（Vite-主应用）</div>
      <a-button type="primary" @click="handleSend">基座向单个子应用发送数据</a-button>
      <a-button type="primary" @click="handleSendGlobal">基座向所有子应用发送全局数据</a-button>
    </a-card>

    <a-card title="Vue2-子应用">
      <micro-app
        v-if="microData.name && microData.url && microData.baseroute"
        :disable-scopecss="true"
        v-bind="microData"
        destory
        @created="created"
        @beforemount="beforemount"
        @mounted="mounted"
        @unmount="unmount"
        @error="error"
        @datachange="getMicroData" />
      <!-- 
    在微前端框架中，“disable-scopecss” 属性通常用于控制微应用中的样式隔离行为。
      1. 当 “disable-scopecss” 属性被设置为 true 时，它告知微前端框架不要对子应用中的样式进行隔离处理，使得子应用的样式可以影响到整个宿主页面的样式
      2. 当 “disable-scopecss” 属性被设置为 false 时，它告知微前端框架要对子应用中的样式进行隔离处理，使得子应用的样式完全不会影响到宿主页面的样式
    -->
    </a-card>
  </div>
</template>

<script setup lang="ts" name="MicroDemo">
import zqcMicroApp, { getActiveApps } from '@micro-zoe/micro-app'
import { MICRO_APPS } from '@/micro/config'
import { watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router' // 来自vue的ts类型引入

const route: RouteLocationNormalized = useRoute()

const microData = reactive({
  url: '' /**子模块地址 */,
  key: '' /**vue 标签的 key 值，用于不同子模块间的切换时，组件重新渲染 */,
  name: '' /**子模块名称，唯一 */,
  data: {} /**子模块数据 */,
  baseroute: '' /**子模块数据 */
})

/**子模块创建 */
const created = () => {}
/**子模块挂载之前 */
const beforemount = () => {}
/**子模块挂载 */
const mounted = () => {
  // 基座接受所有子应用发送的全局消息，包括本身发送的全局消息
  zqcMicroApp.addGlobalDataListener((data) => {
    console.log('基座接受所有子应用发送的全局消息，包括本身发送的全局消息', data)
  })

  // 用于获取正在运行的子应用
  const microChild = getActiveApps()
  console.log('micro-child', microChild)
}
/**子模块卸载 */
const unmount = () => {}
/**子模块异常 */
const error = () => {}

// 接受子应用传递的信息
const getMicroData = (event) => {
  console.log('来自子应用传递的信息', event.detail.data)
}

// 基座向单个子应用发送数据
const handleSend = () => {
  zqcMicroApp.setData(`${microData.name}`, {
    msg: '主应用向micro-vue2子应用发送数据',
    time: new Date()
  })
}

// 基座发送发送全局数据 (所有子应用可接收 自己也可接收)
const handleSendGlobal = () => {
  zqcMicroApp.setGlobalData({ msg: '主应用向所有子应用发送数据', time: new Date() })
}

const initMicroVue2 = (route: RouteLocationNormalized) => {
  // console.log('route', route)

  /* 获取子模块 url 和 name */
  /* { name: 'micro-vue2', url: `http://localhost:9527/child/vue2/` } */
  let app: any = MICRO_APPS.find((app) => app.name === 'micro-vue2') || {}

  Object.assign(microData, {
    ...app,
    key: `${app.name}`, // 用于子应用切换时，组件重新渲染 (唯一key)
    data: { name: route.name, token: 'base_token' }, // 传递给子应用的数据
    baseroute: `/child/vue2/` // 在子应用里面对应的是这个window.__MICRO_APP_BASE_ROUTE__
  })
  console.log('microData', microData)
}

const stopwatch = watch(
  route,
  (newValue): void => {
    if (newValue.path === '/MicroDemo') {
      initMicroVue2(newValue)
    }
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  stopwatch()
})
</script>

<style lang="less">
/*  
  1. 基座应用添加scoped： 
    基座应用样式权重多一级.text_color[data-v-b6d20295]
    基座应用样式不会影响到子应用的样式

  2. 基座应用不添加scoped： 
    主应用会影响到子应用的样式
*/
.text_color {
  color: blueviolet;
}

.first_child {
  color: rgb(255 102 102);
}

/* 直接添加到基座应用的样式，会全局生效 */
micro-app[name='micro-vue2'] .text_color {
  color: rgb(255 225 143);
  font-weight: 900;
}

micro-app[name='micro-vue2'] button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #42b983;
  border-radius: 5px;
}

/* 直接添加到基座应用的样式，会全局生效 */
</style>
