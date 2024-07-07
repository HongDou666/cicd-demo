<template>
  <a-tabs v-model:activeKey="activeKey" tab-position="top">
    <!-- 1. iframe url:线上直接预览的链接地址（url 必须是线上直接预览的形式 ） -->
    <a-tab-pane key="1" tab="iframe url:线上直接预览的链接地址">
      <iframe
        id="iframe"
        class="custom-scrollbar"
        width="100%"
        height="500"
        frameborder="0"
        name="preview-name文件名称"
        loading="lazy"
        :allowfullscreen="true"
        scrolling="no"
        allowtransparency="true"
        :src="url1 + '#toolbar=0'"
        marginheight="100px"
        marginwidth="100px" />
    </a-tab-pane>

    <!-- 2. iframe 本地文件预览 -->
    <a-tab-pane key="2" tab="iframe 本地文件预览">
      <iframe width="100%" height="500" allowfullscreen frameborder="0" loading="lazy" :src="url2"></iframe>
    </a-tab-pane>

    <a-tab-pane key="3" tab="iframe Blob => 本地路径进行预览">
      <!-- 3. iframe Blob => 本地路径进行预览 （url 必须是线上直接预览的形式 ） -->
      <iframe width="100%" height="500" allowfullscreen frameborder="1" loading="lazy" :src="url3"></iframe>
    </a-tab-pane>

    <a-tab-pane key="4" tab="embed Blob => 本地路径进行预览">
      <!-- 4. embed Blob => 本地路径进行预览 （url 必须是线上直接预览的形式 ） -->
      <embed :src="url3" type="application/pdf" width="100%" height="500" />
    </a-tab-pane>

    <a-tab-pane key="5" tab="object Blob => 本地路径进行预览">
      <!-- 5.1 object url:线上直接预览的链接地址（url 必须是线上直接预览的形式 ） -->
      <object :toolbar="false" :data="url1" type="application/pdf" width="100%" height="500" border="0"></object>

      <!-- 5.2 object 本地文件预览 -->
      <object :toolbar="false" :data="url2" type="application/pdf" width="100%" height="500" border="0"></object>

      <!-- 5.3 object Blob => 本地路径进行预览 （url 必须是线上直接预览的形式 ） -->
      <object :toolbar="false" :data="url3" type="application/pdf" width="100%" height="500" border="0"></object>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="PdfPreview">
import { getDownloadPdf1 } from '@/api/mock-js/index'
import pdfFile from '@/assets/file/ZQC.pdf'

const error = ref()
const activeKey = ref('1')
const url1 = ref('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf') // 可线上直接预览
const url2 = ref(pdfFile) // 本地pdf文件的链接
const url3 = ref<any>(null) // pdf Blob对象=>本地路径

// 网络请求（获取文件 pdf blob）
const handleDownloadPdf = async () => {
  try {
    const param: Parameters<typeof getDownloadPdf1>[0] = {
      parkId: 177
    }
    const config = {
      responseType: 'blob'
    }
    const res: ReturnType<typeof getDownloadPdf1> = getDownloadPdf1(param, config)
    const blob = await res
    url3.value = URL.createObjectURL(blob as unknown as Blob)
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}
handleDownloadPdf()
</script>

<style scoped lang="less"></style>
