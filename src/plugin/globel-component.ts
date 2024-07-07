import { App, defineAsyncComponent, Plugin } from 'vue' // 来自vue的ts类型引入
// import SvgIcon from '@/components/global-comp1/svg-icon/index.vue' // 同步方式 引入项目中全部的全局组件
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

type CompType = {
  name: string
  [key: string]: string
}

const syncCom = {}
const comp: Record<string, CompType> = import.meta.glob('../components/global-comp1/**/index.vue', {
  eager: true,
  import: 'default'
})
for (const key in comp as Record<string, CompType>) {
  if ((comp[key] as any).name) {
    const name = (comp[key] as any).name
    syncCom[name] = comp[key]
  }
}

//全局组件对象
const allGloablComponent: any = {
  // SvgIcon, // 同步方式 引入项目中全部的全局组件
  ...syncCom, // 同步方式 引入项目中全部的全局组件
  globalAsyncComp1: defineAsyncComponent(() => import(/* @vite-ignore */ '@/components/global-async-comp1/index.vue')) // 异步方式 引入项目中全部的全局组件
}

//对外暴露插件对象
const gloalComponent: Plugin = {
  install(app: App) {
    // 注册全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })

    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}

export default gloalComponent
