<template>
  <div>RouterProps</div>

  <!-- <h1>{{ params.id }}</h1>
  <h1>{{ params.title }}</h1> -->

  <h1>{{ id }}</h1>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts" name="RouterProps">
import type { RouteLocationNormalized } from 'vue-router' // 来自vue的ts类型引入

const router = useRouter()
const route: RouteLocationNormalized = useRoute()
console.log(route)

// 获取路由列表 (结构为平铺的数组)
const routerList = router.getRoutes()
console.log(routerList)
const routerOptions = router.options
console.log(routerOptions)

// 1. 路由传参
// import { toRefs } from 'vue'
// import { useRoute } from 'vue-router'
// const route = useRoute()
// const { params } = toRefs(route)

// 2. 路由传参
//     {
//         name: "xxx",
//         path:"/xxx",
//         component: ()=>import('../views/xxx.vue'),
//         props: true // 第一种写法：将路由收到的所有params参数作为props传给路由组件
//     },
defineProps(['id', 'title'])

// 3. 路由传参
//     {
//         name: "xxx",
//         path:"/xxx",
//         component: ()=>import('../views/xxx.vue'),
//         props(route) { // 第二种写法：函数写法，可以自己决定将什么作为props给路由组件
//          return route.params
//          return route.query
//         }
//     },
// defineProps(['id', 'title'])

// 4. 路由传参
//     {
//         name: "xxx",
//         path:"/xxx",
//         component: ()=>import('../views/xxx.vue'),
//         props:{ // 第三种写法：对象写法，可以自己决定将什么作为props给路由组件
//           a:100,
//           b:200,
//         }
//     },
// defineProps(['a', 'b'])
</script>

<style scoped></style>
