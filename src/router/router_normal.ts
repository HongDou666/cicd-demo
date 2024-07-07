// 配置路由
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  //   {
  //     name: 'TypeTs',
  //     path: '/typeTs',
  //     component: () => import('../views/TypeTs.vue')
  //   },
  //   {
  //     name: 'FunctionTs',
  //     path: '/functionTs',
  //     component: () => import('../views/FunctionTs.vue')
  //   },
  //   {
  //     name: 'InterfaceTs',
  //     path: '/interfaceTs',
  //     component: () => import('../views/InterfaceTs.vue')
  //   },
  //   {
  //     name: 'ClassTs',
  //     path: '/classTs',
  //     component: () => import('../views/ClassTs.vue')
  //   },
  //   {
  //     name: 'GenericTs',
  //     path: '/genericTs',
  //     component: () => import('../views/GenericTs.vue')
  //   },
  //   {
  //     name: 'SpecialTs',
  //     path: '/specialTs',
  //     component: () => import('../views/SpecialTs.vue')
  //   },
  //   {
  //     name: 'Voa',
  //     path: '/voa',
  //     component: () => import('../views/Voa.vue')
  //   },
  //   {
  //     name: 'Vca',
  //     path: '/vca',
  //     component: () => import('../views/Vca.vue')
  //   },
  //   {
  //     name: 'VcaSetup',
  //     path: '/vcaSetup',
  //     component: () => import('../views/VcaSetup.vue')
  //   },
  //   {
  //     name: 'EnumTs', // 路由命名
  //     path: '/enumTs', // 路径
  //     alias: '/enumTs-custom', // 路径别名
  //     component: () => import('../views/EnumTs.vue'),
  //     redirect: '/enumTs/enumTsChildren', // 路由重定向
  //     meta: {
  //       // 路由元信息
  //       name: 'TS - 枚举'
  //     },
  //     children: [
  //       {
  //         path: 'enumTsChildren',
  //         component: () => import('../views/EnumTsChildren.vue')
  //       }
  //     ]
  //   },
  //   {
  //     name: 'SetupName',
  //     path: '/setupName',
  //     component: () => import('../views/SetupName.vue')
  //   },
  //   {
  //     name: 'RefValue',
  //     path: '/refValue',
  //     component: () => import('../views/RefValue.vue')
  //   },
  //   {
  //     name: 'ReactiveAssign',
  //     path: '/reactiveAssign',
  //     component: () => import('../views/ReactiveAssign.vue')
  //   },
  //   {
  //     name: 'WatchStop',
  //     path: '/watchStop',
  //     component: () => import('../views/WatchStop.vue')
  //   },
  //   {
  //     name: 'PropsTs',
  //     path: '/propsTs',
  //     component: () => import('../views/PropsTs.vue')
  //   },
  //   {
  //     path: '/',
  //     redirect: '/typeTs'
  //   },
  //   {
  //     path: '/:pathMatch(.*)*', // /aaa /bbb /ccc /aaa/a1/a2
  //     component: () => import('../views/NotFound.vue')
  //   }
]
const router: any = createRouter({
  //   history: createWebHashHistory(), // hash  #/film #/center
  history: createWebHistory(),
  routes
})

export default router
