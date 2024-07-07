<template>
  <h1>PiniaChildren: {{ info.number }}</h1>
</template>

<script setup lang="ts" name="PiniaChildren">
import { storeToRefs } from 'pinia'
import { useTalkStore } from '@/store/pinia-demo'

// 使用useCountStore，得到一个专门保存count相关的store
const countStore = useTalkStore()
// storeToRefs只会关注sotre中数据，不会对方法进行ref包裹
const { info } = storeToRefs(countStore)
</script>

<style scoped></style>
