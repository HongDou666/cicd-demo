<template>
  <a-button @click="handleClick">增加</a-button>
  <h1>PiniaDemo: {{ info.number }}</h1>
  <PiniaDemoComp1></PiniaDemoComp1>

  <a-button @click="handleGetNumber">生成随机数</a-button>
  <h1>随机数1(带有缓存): {{ getNumber1 }}</h1>
  <h1>随机数2: {{ getNumber2 }}</h1>
</template>

<script setup lang="ts" name="PiniaDemo">
import PiniaDemoComp1 from './modules/PiniaDemoComp1.vue'
import { useTalkStore, useDataStore, persistUseUserStore } from '@/store/pinia-demo'
import { storeToRefs } from 'pinia'

// 使用useCountStore，得到一个专门保存count相关的store
const countStore = useTalkStore()
// storeToRefs只会关注sotre中数据，不会对方法进行ref包裹
const { info } = storeToRefs(countStore)
const handleClick = () => {
  countStore.setInfo()
}

// 1. const dataStore = useDataStore()
// 2. const dataStore = persistUseUserStore()
const dataStore = persistUseUserStore()
const { getNumber1, getNumber2 } = storeToRefs(dataStore)
const handleGetNumber = () => {
  const param = {
    data1: fullClose(600, 700),
    data2: fullClose(600, 700)
  }
  dataStore.StoreDemo2Number(param)
}

//取得[n,m]范围随机整数
const fullClose = (n, m) => {
  let result = Math.random() * (m + 1 - n) + n
  while (result > m) {
    result = Math.random() * (m + 1 - n) + n
  }
  return parseInt(result)
}
</script>

<style scoped></style>
