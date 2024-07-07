<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Pdf预览-原生标签属性 （iframe object embed）">
      <PdfPreview />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Pdf预览 （pdfjs-dist）">
      <PdfPreviewPdfjs />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Word预览（@vue-office/docx）">
      <DocxPreview />
    </a-tab-pane>
    <a-tab-pane key="4" tab="Excel预览（@vue-office/excel）">
      <ExcelPreview />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="VuePreview">
import PdfPreviewPdfjs from './modules/PdfPreviewPdfjs.vue'
import PdfPreview from './modules/PdfPreview.vue'
import DocxPreview from './modules/DocxPreview.vue'
import ExcelPreview from './modules/ExcelPreview.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
