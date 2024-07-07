<template>
  <div class="interviewVideo_main">
    <!--此处根据pdf的页数动态生成相应数量的canvas画布-->
    <canvas v-for="pageIndex in pdfPages" :id="`pdf-canvas-` + pageIndex" :key="pageIndex" style="display: block"></canvas>
  </div>
</template>

<script setup lang="ts" name="PdfPreviewPdfjs">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs'
import pdfFile from '@/assets/file/ZQC.pdf'

// let pdfUrl = ref('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf') // 外网pdf文件的链接（打开路径可直接预览）

// let pdfUrl = ref('http://101.34.220.192:9000/emergency-response/integration/system_manual/RESOURCE1689663612812.pdf') // 外网pdf文件的链接（打开路径可直接下载）

let pdfUrl = ref(pdfFile) // 本地pdf文件的链接

let pdfDoc = reactive<any>({}) // 保存加载的pdf文件流
let pdfPages = ref(0) // pdf文件的页数
let pdfScale = ref(1.0) // 缩放比例

// 获取pdf文档流与pdf文件的页数
const loadFile = async (url) => {
  //注意我的pdfjs-dist的版本是3.9.179，其他的版本需要更换版本号，不然运行时会报版本不匹配的错

  // 1. 外部链接引入，存在安全性问题
  // pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

  // 2. 内部链接引入
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs'

  // 部分字体出现乱码或浏览器控制台出现警告
  // 解决方案：
  // 在 getDocument 方法中追加 cMapUrl 和 cMapPacked 参数
  // 注：cMapUrl 参数可指定为本地文件路径，可在路径 node_modules/pdfjs-dist/cmaps 中获取。通过测试发现，该警告即便不处理依然不影响页面展示，但是在后续的文本选中功能上可能会受影响。
  const param = {
    url
    // cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',(此处指定版本为 2.16.105)
    // cMapPacked: true,
  }
  pdfjsLib.getDocument(url).promise.then((pdf) => {
    console.log(pdf)
    pdfDoc = pdf // 保存加载的pdf文件流
    pdfPages.value = pdf.numPages // 获取pdf文件的总页数
    nextTick(() => {
      renderPage(1) // // 将pdf文件内容渲染到canvas
    })
  })
}

// 渲染pdf文件
const renderPage = (num) => {
  pdfDoc.getPage(num).then((page) => {
    const canvasId = 'pdf-canvas-' + num
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement // 获取页面中的canvas元素

    // 以下是canvas的使用过程
    const ctx: any = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1
    const ratio = dpr / bsr
    // 设置pdf文件显示比例
    const viewport = page.getViewport({ scale: pdfScale.value })
    canvas.width = viewport.width * ratio
    canvas.height = viewport.height * ratio
    canvas.style.width = viewport.width + 'px'
    canvas.style.height = viewport.height + 'px'
    // 设置当pdf文件处于缩小或放大状态时，可以拖动
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext)
    // 在第num页渲染完毕后，递归调用renderPage方法，去渲染下一页，直到所有页面渲染完毕为止
    if (num < pdfPages.value) {
      renderPage(num + 1)
    }
  })
}

//调用loadFile方法
onMounted(() => {
  loadFile(pdfUrl.value)
})
</script>

<style scoped lang="less">
.interviewVideo_main {
  overflow: hidden auto;
  width: 100%;
  height: 500px;

  canvas {
    margin: 0 auto;
  }
}
</style>
