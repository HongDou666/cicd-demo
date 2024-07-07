/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

/* 
vite-svg-loader 依赖需要添加 /// <reference types="vite-svg-loader" /> 
*/

/* 
  声明一个模块，用于匹配所有以 ".vue" 结尾的文件
  解决找不到模块“@/xxx/xxx.vue”或其相应的类型声明相关错误
*/
declare module '*.vue' {
  // import { ComponentOptions } from 'vue'
  // const componentOptions: ComponentOptions
  // export default componentOptions

  // 从 "vue" 中导入 DefineComponent 类型
  import { DefineComponent } from 'vue'

  // 定义一个类型为 DefineComponent 的变量 component
  // 它具有三个泛型参数，分别表示组件的 props、组件的 data 和其他的类型。
  // 在这里，我们使用空对象（{}）表示没有 props，使用空对象（{}）表示没有 data，使用 any 表示其他类型可以是任意值。
  const component: DefineComponent<{}, {}, any>

  // 导出 component 变量，这样其他地方在导入 ".vue" 文件时，TypeScript 编译器会将它识别为一个 Vue 组件
  export default component
}

/* 配置ts环境变量 类型提示(import.meta.env.???) */
interface ImportMetaEnv {
  // 我们每次添加完新的环境变量就在此添加一次ts类型
  // 这样我们就能在使用 import.meta.env 时获得ts语法提示
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_SERVE: string
  readonly VITE_CUSTOM: string
  readonly VITE_FOTER: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

/* Ts 对 jquery 依赖包进行类型扩展 */
declare module 'jquery' {
  export function jqueryFn1(url: string): void

  const jqueryFn2: (param: number) => string

  /* jqueryType类型来源于global.d.ts */
  const jqueryFn3: jqueryType

  const jqueryFn4: boolean

  namespace jqueryFn5 {
    function fn51(param?: string): void
    const fn52: jqueryType
    namespace fn53 {
      const fn54: jqueryType
    }
  }

  type jqueryType2 = boolean
  const jqueryFn6: jqueryType2

  interface jqueryFn7 {
    msg?: number
  }
  const code: jqueryFn7
}

/* Ts 对 moment 依赖包进行类型扩展 */
declare module 'moment' {
  export function foo(param: boolean): void
}

/* ts对vue原型进行类型扩展 */
import axios from 'axios'
import mitt, { Emitter } from 'mitt'
const mittBus: Emitter<Events> = mitt<Events>()
type MessageType = {
  success: (content: any, duration?: number) => void
  error: (content: any, duration?: number) => void
  info: (content: any, duration?: number) => void
  warning: (content: any, duration?: number) => void
  warn: (content: any, duration?: number) => void
  loading: (content: any, duration?: number) => void
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $bus: typeof mittBus
    $http: typeof axios
    $message: MessageType
  }
}
