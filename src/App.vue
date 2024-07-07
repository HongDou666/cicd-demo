<template>
  <div class="root-app">
    <!-- 1. 升级为全局组件 -->
    <GlobalCmp></GlobalCmp>
    <!-- 1. 升级为全局组件 -->

    <!-- 2. 升级为全局组件 -->
    <globalAsyncComp1></globalAsyncComp1>
    <!-- 2. 升级为全局组件 -->

    <ul>
      <router-link
        v-for="(item, index) in routerLinkList"
        :key="index"
        v-slot="{ isActive, navigate }"
        custom
        :to="item.path !== '/RouterProps' ? item.path : `${item.path}/100/200`">
        <li :class="isActive ? 'kerwinactive' : ''" @click="navigate">
          {{ index + 1 }}.
          {{ item.name }}
        </li>
      </router-link>
    </ul>

    <router-view>
      <template #default="{ Component, route }">
        当前的路径为：{{ route.fullPath }}
        <!-- 缓存指定页面 -->
        <keep-alive :include="['setup-name-custom']">
          <component :is="Component" />
        </keep-alive>
        <!-- 缓存指定页面 -->
      </template>

      <!-- <keep-alive :include="['setup-name-custom']">
      <component :is="Component" />
    </keep-alive> -->
    </router-view>
  </div>
</template>

<!-- "Vue.volar", "Vue.vscode-typescript-vue-plugin" （如今以弃用）（Vue - Official）vscode需要安装的插件  -->

<!-- Vetur vscode禁用此插件 -->

<!-- 
  方式1. 
  settings.json
  "vue.autoInsert.dotValue": true （Vue3 - Ref声明的类型自动添加.value）

  方式2.安装Vue - Official
  进入扩展设置
  勾选Auto Insert（操作ref数据时，自动补全.value）
-->

<!-- git: 
  1. git config core.ignorecase false 可以跟踪到文件名的大小更改
-->
<!-- Ts配置:
  1. typescript.validate.enable 开启ts验证
  2. ctrl + shift + P => Volar: Select Typescript Version 使用工作区版本
-->

<!-- 搜索： 来自vue的ts类型引入 -->

<!--  vue 官方提供了一个 ESLint 插件 eslint-plugin-vue，它提供了 parser 和 rules。parser 为 vue-eslint-parser，rules 为 https://eslint.vuejs.org/rules/ -->
<!--  'vite-plugin-eslint' // 说明: 该包是用于配置vite运行的时候自动检测eslint规范 不符合页面会报错
      npm add -D eslint-config-prettier #eslint兼容的插件
      npm add -D eslint-plugin-prettier #eslint的prettier -->

<script setup lang="ts">
/* 生成路由目录list */
interface PersonInter {
  name: string
}
type Persons = Array<string | PersonInter | unknown>
const pages = import.meta.glob('./views/**/page.js', {
  eager: true,
  import: 'default'
})
const routes = Object.entries(pages).map((item: Persons) => {
  const path = (item[0] as string).replace('./views', '').replace('/page.js', '') || '/'
  return {
    name: (item[1] as PersonInter).name || '--',
    path
  }
})
const modules: Record<string, any> = import.meta.glob(['./router/modules/*.ts'], {
  eager: true,
  import: 'default'
})
Object.keys(modules).forEach((key) => {
  routes.push({ name: modules[key].meta.name || '--', path: modules[key].path || '/' })
})
const routerLinkList = reactive(routes)
/* 生成路由目录list */

/* Ts全局变量类型使用 */
const value = ref<typeof $NAME2>(2)
const value1: jqueryType = {
  data: '100',
  fn1: (param: string) => {
    console.log(param)
  },
  fn2: (param: boolean) => {
    console.log(param)
  }
}
/* Ts全局变量类型使用 */

/* Ts全局变量类型使用 - bus总线使用 */
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入
const { proxy: th } = getCurrentInstance() as ComponentInternalInstance

onMounted(() => {
  th?.$bus.on('testBus', (info: { name: string }): void => {
    console.log(info)
  })
  th?.$bus.emit('testBus', {
    name: '事件总线'
  })
})
/* Ts全局变量类型使用 - bus总线使用 */
</script>

<style scoped lang="less">
.root-app {
  padding: 2rem;
}

.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}

ul {
  list-style: none;

  li {
    padding: 0 0 0 20px;
    margin: 10px auto;
    text-align: left;
    color: #fff;
    background-color: #299;
    border-radius: 10px;
    cursor: pointer;
    line-height: 40px;

    &.kerwinactive {
      color: rgb(255 171 115);
    }
  }
}
</style>
