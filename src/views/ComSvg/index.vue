<template>
  <div>ComSvg</div>
  <div>
    <img id="logos" src="/vite-icon.svg" class="logo" alt="Vite logo" />
    <img src="@/assets/icons/vue.svg" class="logo vue" alt="Vue logo" />
    <img src="../../assets/icons/yun.svg" class="logo vue" alt="Vue logo" />
    <img src="@/assets/img/test.jpg" class="logo vue" alt="Vue logo" />
    <img :src="logo1" class="logo vue" alt="Vue logo" />
    <img :src="logo2" class="logo vue" alt="Vue logo" />
    <img :src="logo3" class="logo vue" alt="Vue logo" />
    <img :src="logo4" class="logo vue" alt="Vue logo" />
    <img :src="logo5" class="logo vue" alt="Vue logo" />
  </div>

  <br />

  <!-- vite-plugin-svg-icons -->
  <svg-icon name="yun" width="200px" height="100px" color="#f60"></svg-icon>
  <svg-icon name="Building" width="200px" height="100px" color="#35c97f"></svg-icon>
  <svg-icon name="cdz" width="200px" height="100px" color="#229999"></svg-icon>
  <svg-icon name="vue" width="120px" height="100px" color="#229999"></svg-icon>
  <!-- vite-plugin-svg-icons -->

  <br />

  <!-- vite-svg-loader -->
  <cdz class="svg-loader" :fill="'#409EFF'"></cdz>
  <yun class="svg-loader" :fill="'#67C23A'"></yun>
  <!-- vite-svg-loader -->
</template>

<script setup lang="ts" name="ComSvg">
/* 静态资源引入 */
import logo1 from '@/assets/img/test.jpg'
console.log('logo1', logo1)

const logo2 = new URL('@/assets/img/test.jpg', import.meta.url) as any
console.log('logo2', logo2)

import logo3 from '@/assets/base-64/test01.js?raw'

const logo4Let = 'vue'
const logo4 = new URL(`/src/assets/icons/${logo4Let}.svg`, import.meta.url).href as any

const logo5 = new URL(`/src/assets/icons/${logo4Let}.svg`, import.meta.url) as any
/* 静态资源引入 */

/* 1. svg直接引入 (vite-plugin-svg-icons) */

// 1. yarn add vite-plugin-svg-icons

// 2. vite.config
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//  plugins: [createSvgIconsPlugin({
//   iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//   symbolId: 'icon-[dir]-[name]',
// })]

// 3. vue3-vite 引入svg 需要引入
// main.ts => import 'virtual:svg-icons-register'
// 注册组件 SvgIcon

/* 1. svg直接引入 (vite-plugin-svg-icons) */

/* 2. svg直接引入 (vite-svg-loader) */

// 1. pnpm install vite-svg-loader

// 2. vite.config
// import svgLoader from 'vite-svg-loader'
// export default defineConfig({
//   plugins: [vue(), svgLoader()]
// })
// svgLoader({
//       defaultImport: 'url'
//     })

// 3. vite-env.d.ts里配置。特别注意
// / <reference types="vite/client" />
// / <reference types="vite-svg-loader" />

/* svg直接引入 (vite-svg-loader) */
import cdz from '@/assets/icons/cdz.svg?component'
import yun from '@/assets/icons/yun.svg?component'
</script>

<style scoped lang="less">
.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}

.svg-loader {
  width: 50px;
}
</style>
