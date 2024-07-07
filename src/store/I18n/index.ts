import { defineStore } from 'pinia'

export const useAppStoreI18n = defineStore(
  'I18n',
  () => {
    const locale = ref<string>('zh-CN') // 初始化设置为中文语言
    // const locale = ref<string>('en-US')
    return {
      locale
    }
  },
  {
    persist: {
      key: 'I18n', // key 用于引用存储中存储的反序列化数据的密钥
      storage: localStorage, // 存储类型 localStorage | sessionStorage
      paths: ['locale'] // paths 持久化属性数组。 [] 表示没有状态被持久化， undefined 或 null 表示整个状态被持久化。
    }
  }
)
