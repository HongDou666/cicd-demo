import ant_zhCN from 'ant-design-vue/es/locale/en_US'
import ele_zhCn from 'element-plus/dist/locale/en.mjs'
const enUSModules = import.meta.glob(['~/locales/lang/**/en-US.ts', '~/pages/**/locales/en-US.ts'], {
  eager: true
})

const messages = {}

for (const item in enUSModules) {
  const locale = (enUSModules[item] as any)?.default
  if (locale) Object.assign(messages, locale)
}
export default {
  ...messages,
  antd: ant_zhCN,
  ele: ele_zhCn
}
