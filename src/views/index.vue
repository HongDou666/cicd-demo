<template>
  <div>
    默认情况下 Node.js 默认将 .js 文件作为 CommonJS (CJS) 模块来处理。 当将 “type”: “module” 添加到 package.json 中，Node.js 会将 .js
    文件作为ECMAScript Modules (ESM) 来处理。
  </div>
</template>

<script setup lang="ts" name="index">
/* 1. lodash.pick 过滤对象中的某些属性 */
import pick from 'lodash.pick'
const res = {
  a: 100,
  b: 'pick',
  info: {
    arr: [
      {
        name: '晚风',
        age: 24
      }
    ]
  }
}
const mdl = pick(res, ['a', 'info']) //（浅拷贝）
mdl.a = 200
mdl.info.arr[0].name = '秋水'

/* 2. 挂载全局的方法与变量 */
import { inject } from 'vue'
interface handleGlobalFnType {
  // handleAdd: (a: number) => number
  // handleAdd(a: number): number
  (val: any): void
}
const handleGlobalFn = inject('globalFn') as handleGlobalFnType
handleGlobalFn('一花一世界,一叶一菩提')

const handleGlobalVariate = inject('globalVariate')
console.log(handleGlobalVariate)

console.log(import.meta)

/* 3. 环境变量和模式 */
/* 一些在所有情况下都可以使用的内建变量： */
// 1. {string} 应用运行的模式
console.log(import.meta.env.MODE) // development | test | staging | production

// 2. {string} 部署应用时的基本 URL。他由 vite.config.ts base 配置项决定。
console.log(import.meta.env.BASE_URL) // /app-vite/

// 3. {boolean} 应用是否运行在生产环境。（本地环境为false,线上环境为true）
console.log(import.meta.env.PROD) // false

// 4. {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。（本地环境为true,线上环境为false）
console.log(import.meta.env.DEV) // true

// 5. {boolean} 应用是否运行在 server 上
console.log(import.meta.env.SSR) // false

// 6. 对应.env.[mode]文件中的 NODE_ENV
console.log(import.meta.env.VITE_USER_NODE_ENV) // development

// 7. 在vite.config.ts中 配置 define （定义在全局）
const { _ISDEV_ } = process.env // {_ISDEV_: false}
console.log(__APP_VERSION__) // v1.0.0
console.log(__MY_GLOBAL_WIN__) // 499 （window.innerWidth）

// 8. process.env.NODE_ENV 与 import.meta.env.MODE(模式)
console.log(process.env.NODE_ENV) // development（必须指定模式才会主动更换）

/**不同命令如何影响 process.env.NODE_ENV 和 import.meta.env.MODE模式 和 import.meta.env.DEV
 *                         process.env.NODE_ENV	 import.meta.env.MODE  import.meta.env.DEV
pnpm serve                 development           development           true
pnpm dev                   development           development           true
pnpm test                  development           test                  true
pnpm staging               development           staging               true  
pnpm production            development           production            true

pnpm devEnv                development           development           true 
pnpm testEnv               test                  test                  true
pnpm stagingEnv            staging               staging               true
pnpm productionEnv         production            production            false

pnpm build                 production            production            false
pnpm build:dev             production            development           false
pnpm build:test            production            test                  false
pnpm build:staging         production            staging               false
pnpm build:production      production            production            false

pnpm build:devEnv          development           development           true
pnpm build:testEnv         test                  test                  true
pnpm build:stagingEnv      staging               staging               true
pnpm build:productionEnv   production            production            false
* / 

/* import.meta.env */

// BASE_URL:"/app-vite/",
// DEV:true,
// MODE:"development"
// PROD:false
// SSR:false
// VITE_APP_BASE_API:"/api"
// VITE_APP_TITLE:"晚风的运营平台.env.development"
// VITE_CUSTOM:"我是开发环境"
// VITE_FOTER:"我是合并因子"
// VITE_SERVE:"http://sph-api.atguigu.cn"
// VITE_USER_NODE_ENV:"development"

/* env文件 */
// .env                # 所有情况下都会加载
// .env.local          # 所有情况下都会加载，但会被 git 忽略
// .env.[mode]         # 只在指定模式下加载
// .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

/* 运行项目
"serve": "vite",
"local": "vite --mode local",
"dev": "vite --mode development",
"devtest": "vite --mode test",
"staging": "vite --mode staging",
"production": "vite --mode production",

默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式
  pnpm run serve === pnpm run dev （相同的环境变量）=> .env.development文件
  pnpm run test => .env.test文件
  pnpm run staging => .env.staging文件
  pnpm run production => .env.production文件

打包项目
"build": "vue-tsc && vite build",
"build:dev": "vue-tsc && vite build --mode development",
"build:test": "vue-tsc && vite build --mode test",
"build:staging": "vue-tsc && vite build --mode staging",
"build:production": "vue-tsc && vite build --mode production",

默认情况下，build 命令则运行在 production (生产) 模式。
  pnpm run build === pnpm run build:production（相同的环境变量） => .env.production文件
  pnpm run build:dev => .env.development文件
  pnpm run build:test => .env.test文件
  pnpm run build:staging => .env.staging文件
*/
</script>
