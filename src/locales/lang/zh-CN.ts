import ant_zhCN from 'ant-design-vue/es/locale/zh_CN'
import ele_zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const zhCNModules = import.meta.glob(['~/locales/lang/**/zh-CN.ts', '~/pages/**/locales/zh-CN.ts'], {
  eager: true
})

const messages = {}

for (const item in zhCNModules) {
  const locale = (zhCNModules[item] as any)?.default
  if (locale) Object.assign(messages, locale)
}
export default {
  ...messages,
  antd: ant_zhCN,
  ele: ele_zhCn
}
