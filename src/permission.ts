import router from '@/router/index' // 路由
import { cancelAllAxios } from '@/http/request' // 取消所有未完成的网络请求
import NProgress from '@/utils/progress'
import { useLoadingCheck, stopMove, useMetaTitle, useScrollToTop } from '@/utils/index'
import { RouteRecordRaw } from 'vue-router'
import { AxiosError } from 'axios'

const allowList = ['/login', '/error', '/401', '/404', '/403'] // 路由白名单
const loginPath = '/login' // 登录页路由路径

// 路由跳转前
router.beforeEach(async (to, from, next) => {
  console.log('路由即将改变：', from.fullPath, '->', to.fullPath)

  // 开启进度条动画
  NProgress.start()

  // 路由跳转前取消页面上的所有未完成的网络请求
  cancelAllAxios()

  // 路由跳转前取消页面滚动行为
  const loading = document.querySelector('body > #loading-app')
  if (loading) {
    stopMove()
  }

  /*

  // 1. 从仓库中（pinia）获取用户信息
  const userStore = {}

  // 2. 从本地 LocalStorage 获取 token
  const token = 'token'

  // 3. token 不存在
  if (!token) {
    // 3.1 如果token不存在 && 目标页面不在白名单内
    if (!allowList.includes(to.path)) {
      next({
        path: loginPath,
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      })
      return
    }
  } else {
    // 4. 如果token存在 && 用户信息不存在（登陆成功获取到token及跳转首页时 | 刷新页面时）&& 目标页面不在白名单内
    if (!userStore && !allowList.includes(to.path)) {
      try {
        // 5. 在pinia仓库中发起网络请求获取用户信息及其菜单权限 并 存储仓库
        // 6. 通过获取到的菜单权限在pinia仓库中 整合出路由信息 例如：
        const currentRoute: RouteRecordRaw[] = {
          // name: "rootPath",
          // path: "/",
          // redirect: "/dashboard",
          // meta: {},
          // component: () => import("/src/layouts/index.vue") 此处需要动态读取import.meta.glob
          // children: [{…},{…},{…}],
        }
        // 7. 动态添加路由中
        router.addRoute(currentRoute)
        next({
          ...to,
          replace: true
        })
        return
      } catch (e) {
        // 8. 获取用户信息失败 跳转到 error 页面
        if (e instanceof AxiosError && e?.response?.status === 401) {
          next({
            path: '/401'
          })
          return
        }
      }
    } else {
      // 9. token存在 && 目标页面登录页面转而跳转到首页
      if (to.path === loginPath) {
        next({
          path: '/'
        })
        return
      }
    }
  }

  */
  next()
})

// 路由跳转后
router.afterEach((to, from, next) => {
  // 关闭进度条动画
  NProgress.done()

  // 设置网站标题
  useMetaTitle(to)

  // 只有在页面刷新后 提示信息会显示（loading占位） 在页面路由跳转后立即销毁掉提示信息DOM && 开启页面滚动行为
  useLoadingCheck()

  // 跳转后置顶页面卷动高度=>0
  // useScrollToTop()
})
