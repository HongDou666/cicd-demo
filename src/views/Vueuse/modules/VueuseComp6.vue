<template>
  <div>ComB组件&nbsp;&nbsp; 鼠标 x：{{ x }}， 鼠标 y：{{ y }}</div>
  <button @click="ComData">数据+1</button>
  <button
    @click="
      () => {
        dataObj.deep.city = '河南'
      }
    ">
    改变地区（河南）
  </button>
  <h2>{{ data }} | {{ dataObj.name }}-{{ dataObj.deep.city }}</h2>
</template>

<script lang="ts" setup name="VueuseComp6">
import { useSharedMouse, useSharedFn } from '../hooks/index'
const { x, y } = useSharedMouse()
const { data, ComData, dataObj } = useSharedFn()
</script>
