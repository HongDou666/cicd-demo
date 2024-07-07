import { defineStore } from 'pinia'
import pinia from '@/store'
import { UseDataStoreType } from './types'

// 函数式写法
export const useTalkStore = defineStore(
  'demo1',
  () => {
    // 内部代码指挥执行一次（除非刷新页面）
    const info = reactive({
      number: 2568
    })
    function setInfo() {
      info.number = info.number + 2
    }
    return {
      info,
      setInfo
    }
  },
  {
    persist: {
      key: 'demo', // key 用于引用存储中存储的反序列化数据的密钥
      storage: sessionStorage, // 存储类型 localStorage | sessionStorage
      paths: ['info'] // paths 持久化属性数组。 [] 表示没有状态被持久化， undefined 或 null 表示整个状态被持久化。
    }
  }
)

// 对象式写法
export const useDataStore = defineStore('demo2', {
  state: (): UseDataStoreType => {
    return {
      number1: 100,
      number2: 100
    }
  },
  getters: {
    getNumber1(state) {
      return state.number1
    },
    getNumber2(state) {
      return state.number2
    }
  },
  actions: {
    StoreDemo2Number({ data1, data2 }) {
      this.number1 = data1
      this.number2 = data2
    }
  },
  persist: {
    key: 'demo2',
    storage: sessionStorage,
    paths: ['number1']
  }
})

// 持久化数据 (可用可不用)
export const persistUseUserStore = () => {
  return useDataStore(pinia)
}
