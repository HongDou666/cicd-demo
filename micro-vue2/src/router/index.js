import Vue from 'vue'
import VueRouter from 'vue-router'

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RouterViewVue2',
    redirect: { name: 'HomeVue2' }, // 重定向到第一个子应用
    component: () => import('../views/RouterViewVue2.vue'),
    children: [
      {
        path: 'home-vue2',
        name: 'HomeVue2',
        component: () => import('../views/HomeVue2.vue')
      },
      {
        path: 'about-vue2',
        name: 'AboutVue2',
        component: () => import('../views/AboutVue2.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL || '/', // 和 vue.config中 publicPath: '/child/vue2/' 对上
  routes
})

export default router
