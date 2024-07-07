<template>
  <a-tabs v-model:activeKey="activeKey" :tab-position="'left'">
    <a-tab-pane key="1" tab="TS - 基础类型">
      <VueTsComp1 />
    </a-tab-pane>
    <a-tab-pane key="2" tab="TS - Enum枚举 "> <VueTsComp2 /></a-tab-pane>
    <a-tab-pane key="3" tab="TS - 类"> <VueTsComp3 /> </a-tab-pane>
    <a-tab-pane key="4" tab="TS - 函数"> <VueTsComp4 /></a-tab-pane>
    <a-tab-pane key="5" tab="TS - 泛型 (函数、类)"> <VueTsComp5 /> </a-tab-pane>
    <a-tab-pane key="6" tab="TS - Vue 组件传参(限制类型 + 限制必填 + 默认值)"> <VueTsComp6 /> </a-tab-pane>
    <a-tab-pane key="7" tab="TS - Vue 函数式API(Vca)"> <VueTsComp7 /> </a-tab-pane>
    <a-tab-pane key="8" tab="TS - Vue 组合式API(Voa)"> <VueTsComp8 /> </a-tab-pane>
    <a-tab-pane key="9" tab="TS - 类型封装"> <VueTsComp9 /> </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="VueTs">
import VueTsComp1 from '@/views/VueTs/modules/VueTsComp1.vue'
import VueTsComp2 from '@/views/VueTs/modules/VueTsComp2.vue'
import VueTsComp3 from '@/views/VueTs/modules/VueTsComp3.vue'
import VueTsComp4 from '@/views/VueTs/modules/VueTsComp4.vue'
import VueTsComp5 from '@/views/VueTs/modules/VueTsComp5.vue'
import VueTsComp6 from '@/views/VueTs/modules/VueTsComp6.vue'
import VueTsComp7 from '@/views/VueTs/modules/VueTsComp7.vue'
import VueTsComp8 from '@/views/VueTs/modules/VueTsComp8.vue'
import VueTsComp9 from '@/views/VueTs/modules/VueTsComp9.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
