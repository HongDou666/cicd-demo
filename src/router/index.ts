/*
 * @作者: Zhang QingChen
 */
// 引入配置路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router' // 来自vue的ts类型引入

interface MetaType {
  name: string
  [propName: string]: any // 其他属性，定义变量可忽略
}
type AllRole = Array<string | MetaType | unknown>

// 编译时态读取目录结构（page.js）
const pages: Record<string, any> = import.meta.glob('../views/**/page.js', {
  eager: true, // 默认以懒加载形式引入 取消为false
  import: 'default'
})

// 编译时态读取目录结构（index.vue）
const comps: Record<string, any> = import.meta.glob('../views/**/index.vue')

// 动态生成路由结构
const routes: Array<any> = Object.entries(pages).map(([path, meta]: AllRole) => {
  // 生成路由组件的导入路径
  const compPath = (path as string).replace('page.js', 'index.vue')
  // 生成路由组件的路径
  path = (path as string).replace('../views', '').replace('/page.js', '') || '/'
  // 生成路由组件的name
  const name = (path as string).split('/').filter(Boolean).join('-') || 'index'

  return {
    name,
    // path
    path: `${(meta as MetaType).params ? path + (meta as MetaType).params : path}`, // meta.params
    component: comps[compPath],
    meta,
    props: (meta as MetaType).params ? true : false,
    children: []
  }
})

// 普通页面添加至路由结构信息
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true,
  import: 'default'
})
Object.keys(modules).forEach((key) => {
  const module = modules[key]
  routes.push({ ...module })
})

console.log(routes)

// -----------------------------------------------------------------
/* 在 Vue Router v4 中为自定义元字段声明 TypeScript 类型接口 */
// declare module 'vue-router' {
//   interface RouteMeta {
//     // is optional
//     isAdmin?: boolean
//     // must be declared by every route
//     requiresAuth: boolean
//   }
// }
const routes1: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/views/Echarts/index.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
      customMate: (param) => param
    },
    children: []
  },
  {
    path: '/profile',
    component: () => import('@/views/ElementPlusUI/index.vue'),
    meta: {
      requiresAuth: true,
      customMate: (param) => param
    },
    children: []
  }
]
// -----------------------------------------------------------------

// const routes = [
//     {
//         name: "TypeTs",
//         path:"/typeTs",
//         component: ()=>import('../views/TypeTs.vue')
//     },
//     {
//         name: "FunctionTs",
//         path:"/functionTs",
//         component: ()=>import('../views/FunctionTs.vue')
//     },
//     {
//         name: "InterfaceTs",
//         path:"/interfaceTs",
//         component: ()=>import('../views/InterfaceTs.vue')
//     },
//     {
//         name: "ClassTs",
//         path:"/classTs",
//         component: ()=>import('../views/ClassTs.vue')
//     },
//     {
//         name: "GenericTs",
//         path:"/genericTs",
//         component: ()=>import('../views/GenericTs.vue')
//     },
//     {
//         name: "SpecialTs",
//         path:"/specialTs",
//         component: ()=>import('../views/SpecialTs.vue')
//     },
//     {
//         name: "Voa",
//         path:"/voa",
//         component: ()=>import('../views/Voa.vue')
//     },
//     {
//         name: "Vca",
//         path:"/vca",
//         component: ()=>import('../views/Vca.vue')
//     },
//     {
//         name: "VcaSetup",
//         path:"/vcaSetup",
//         component: ()=>import('../views/VcaSetup.vue')
//     },
//     {
//         name: "EnumTs", // 路由命名
//         path: "/enumTs", // 路径
//         alias:"/enumTs-custom", // 路径别名
//         component: ()=>import('../views/EnumTs.vue'),
//         redirect: "/enumTs/enumTsChildren", // 路由重定向
//         meta: { // 路由元信息
//             name:'TS - 枚举'
//         },
//         children:[
//             {
//                 path:"enumTsChildren",
//                 component: ()=>import('../views/EnumTsChildren.vue'),
//             }
//         ]
//     },
//     {
//         name: "SetupName",
//         path:"/setupName",
//         component: ()=>import('../views/SetupName.vue')
//     },
//     {
//         name: "RefValue",
//         path:"/refValue",
//         component: ()=>import('../views/RefValue.vue')
//     },
//     {
//         name: "ReactiveAssign",
//         path:"/reactiveAssign",
//         component: ()=>import('../views/ReactiveAssign.vue')
//     },
//     {
//         name: "WatchStop",
//         path:"/watchStop",
//         component: ()=>import('../views/WatchStop.vue')
//     },
//     {
//         name: "PropsTs",
//         path:"/propsTs",
//         component: ()=>import('../views/PropsTs.vue')
//     },
//     {
//         path: "/",
//         redirect:"/typeTs"
//     },
//     {
//         path: '/:pathMatch(.*)*',  // /aaa /bbb /ccc  /aaa/a1/a2
//         component: ()=>import('../views/NotFound.vue')
//     }
// ]
const router = createRouter({
  // history: createWebHashHistory(), // hash  #/film #/center
  // history: createWebHistory(), // history
  // import.meta.env.BASE_URL 对应 vite.config.ts base属性 /app-vite/
  history: createWebHistory(import.meta.env.BASE_URL || '/'), // http://127.0.0.1:5012/app-vite/xxx/xxx...
  routes,
  // 1. 路由跳转决定页面滚动行为 （跳转后置顶页面卷动高度=>0）
  // 2. 具体可见 router.afterEach((to) => { ... })
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
