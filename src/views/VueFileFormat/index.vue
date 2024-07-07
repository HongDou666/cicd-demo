<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove" @change="handleChange">
      <a-button type="primary">
        <upload-outlined />
        选择文件
      </a-button>
    </a-upload>
  </div>

  <a-button type="primary" @click="handleBlobToJson">Blob转换Json</a-button>

  <VueFileFormatComp1 />
  <VueFileFormatComp2 />
</template>
<script setup lang="ts" name="VueFileFormat">
import { students } from '@/api/mock-js/index'
import {
  transToBolb,
  fileToDataURL,
  fileAndBlobToCanvas,
  canvasToDataURL,
  canvasToFile,
  base64ToBlob,
  blobToFile,
  base64ToFile,
  createObjectURL,
  blobToJson
} from './hooks/index'
import { downloadFile } from '@/utils/index'
import { UploadOutlined } from '@ant-design/icons-vue'
import VueFileFormatComp1 from './modules/VueFileFormatComp1.vue'
import VueFileFormatComp2 from './modules/VueFileFormatComp2.vue'
import type { UploadProps, UploadChangeParam } from 'ant-design-vue'

const fileList = ref<UploadProps['fileList']>([])

// 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...(fileList.value || []), file]
  return false
}

// 点击移除文件时的回调，返回值为 false 时不移除。
const handleRemove: UploadProps['onRemove'] = (file) => {
  const index = fileList.value!.indexOf(file)
  const newFileList = fileList.value!.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}

// 上传文件改变时的状态
const handleChange = async (info: UploadChangeParam) => {
  console.log(info.file)
  const file = info.file // 文件对象

  downloadFile(file) // 下载文件（参数为File对象）

  // 1. File ——> Bolb
  const blob = await transToBolb(file)
  // console.log(blob)

  downloadFile(blob) // 下载文件（参数为blob对象）

  // 2. File ——> Base64
  const fileBase64 = await fileToDataURL(file)
  // console.log(fileBase64)

  // 3. Blob ——> Base64
  const blobBase64 = await fileToDataURL(blob)
  // console.log(blobBase64)

  // 4. Base64 ——> Blob
  const base64Blob = await base64ToBlob(blobBase64)
  // console.log(base64Blob)

  // 5. Base64 ——> File
  const base64File = await base64ToFile(blobBase64, '文件名称zqc')
  // console.log(base64File)

  // 6. Blob ——> File
  const blobFile = await blobToFile(blob, '文件名称zqc')
  // console.log(blobFile)

  // 7. Blob、File → Object URL
  const blobUrl = createObjectURL(blob)
  const fileUrl = createObjectURL(file)
  // console.log(blobUrl, fileUrl)

  // 7.1 Object URL - (a标签 文件下载) | (img标签 图片预览)
  const a = document.createElement('a')
  a.setAttribute('href', fileUrl)
  a.setAttribute('download', '海贼王')
  a.click()

  // 8. 将文件数据绘制到 canvas(利用Base64)
  const canvasDom = await fileAndBlobToCanvas(blobBase64, document.querySelector('.clearfix') as HTMLElement)
  // console.log(canvasDom)

  // 9. canvas ——> Base64
  const canvasBase64 = canvasToDataURL(canvasDom)
  // console.log(canvasBase64)

  // 10. canvas ——> Blob、File
  const { canvasBlob, canvasFile }: any = await canvasToFile(canvasDom)
  // console.log(canvasBlob, canvasFile)
}

// Blob转换为Json格式
const handleBlobToJson = async () => {
  try {
    const param: Parameters<typeof students>[0] = {
      time: 1000 * 1
    }
    const config = {
      responseType: 'blob'
    }
    const res: ReturnType<typeof students> = students(param, config)
    const result = await res
    if ((result as unknown as Blob).type === 'application/json') {
      const res = await blobToJson(result)
      console.log('Json', res)
    }
  } catch (error: any) {
    // 捕获错误代码
    console.error(error) // 只是在控制台打印一条红色消息，并不影响程序的运行
    throw new Error(error) //语句会在在控制台打印错误信息并停止程序的运行；
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}
</script>

<style scoped lang="less">
.clearfix {
  margin: 10px auto;
}
</style>
