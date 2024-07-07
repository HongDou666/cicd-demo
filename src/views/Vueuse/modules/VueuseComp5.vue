<template>
  <div>ComA组件&nbsp;&nbsp; 鼠标 x：{{ x }}， 鼠标 y：{{ y }}</div>
  <button @click="ComData">数据+1</button>
  <button
    @click="
      () => {
        dataObj.deep.city = '苏州'
      }
    ">
    改变地区（苏州）
  </button>
  <h2>{{ data }} | {{ dataObj.name }}-{{ dataObj.deep.city }}</h2>
</template>

<script lang="ts" setup name="VueuseComp5">
import { useSharedMouse, useSharedFn } from '../hooks/index'
const { x, y } = useSharedMouse()
const { data, ComData, dataObj } = useSharedFn()
</script>
