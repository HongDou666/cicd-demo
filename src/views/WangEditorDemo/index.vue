<template>
  <div>
    <h1>1. 富文本编辑器（wangeditor-antd）</h1>
    <wang-editor-antd ref="WangeditorAnt" :content="htmlContent" @get-full-text="getFullText"></wang-editor-antd>

    <h1>2. 富文本编辑器（wangeditor）</h1>
    <wang-editor></wang-editor>
  </div>
</template>

<script setup lang="ts" name="WangEditorDemo">
import { onMounted, ref } from 'vue'
const getFullText = (conent) => {
  console.log('conent', conent)
}
const WangeditorAnt = ref<any>(null)
const htmlContent = `<h1 style="color: #f60">WangeditorAntd</h1>`
const htmlContent1 = `<h1 style="color: #229999">WangeditorAntd</h1>`

onMounted(() => {
  if (WangeditorAnt.value) {
    // WangeditorAnt.value.clearHtml()
    WangeditorAnt.value.appendHtml(htmlContent1)
    // WangeditorAnt.value.handleDisable()
    // WangeditorAnt.value.setHtml(htmlContent1)
    // WangeditorAnt.value.attr(false)
  }
})
</script>

<style scoped></style>
