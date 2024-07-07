import './micro/index'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

/*
process.env.BASE_URL => /child/vue2/ (来自于vue.config publicPath)
window.__MICRO_APP_NAME__ => micro-vue2 (来自于基座 name)
window.__MICRO_APP_BASE_ROUTE__ => /child/vue2/ (来自于基座 baseroute)
*/

/* 与基座进行数据交互 */
function handleMicroData() {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('micro-vue2-主动获取基座下发的数据', window.microApp.getData())

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('micro-vue2-监听基座下发的数据变化', data)
    })

    // 监听基座下发的全局数据 和 自己发的全局数据
    window.microApp.addGlobalDataListener((data) => {
      console.log('micro-vue2-监听基座下发的全局数据 和 自己发的全局数据', data)
    })

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ msg: 'micro-vue2-独钓寒江雪' })
    }, 3000)
  }
}

let app = null
// 将渲染操作放入 mount 函数
function mount() {
  app = new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#micro-vue2')
  console.log('微应用micro-vue2渲染了')
  handleMicroData()
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
  console.log('微应用micro-vue2卸载了')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // 固定写法
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}
