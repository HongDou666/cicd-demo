<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Demo1">
        <CodeView />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="VueCodemirror">
import CodeView from './modules/CodeView.vue'

const activeKey = ref('1')
</script>
<style scoped lang="less"></style>
