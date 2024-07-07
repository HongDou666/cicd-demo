<template>
  <a-tabs v-model:activeKey="activeKey">
    <!-- @vue-office/pdf预览 和 docx的上传文件预览一样，获取文件的ArrayBuffer，传给组件的src属性-->
    <a-tab-pane key="1" tab="docx 线上地址预览 | 本地文件预览">
      <vue-office-docx :src="docxUrl" style="width: 100%; height: 500px" @rendered="renderedHandler" @error="errorHandler" />
    </a-tab-pane>

    <a-tab-pane key="2" tab="手动上传docx文件预览">
      <a-upload
        v-model:file-list="fileList"
        list-type="picture"
        name="file"
        :headers="{ authorization: 'authorization-text' }"
        :data="{ eventType: 'file_upload' }"
        :multiple="false"
        :max-count="1"
        :before-upload="beforeUpload"
        @change="handleChange">
        <a-button>
          <a-icon type="home" />
          <upload-outlined></upload-outlined>
          上传docx文件
        </a-button>
      </a-upload>
      <vue-office-docx :src="docxUploadUrl" style="margin: 20px 0; width: 100%; height: 500px" @rendered="renderedHandler" @error="errorHandler" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="DocxPreview">
import { transToBolb } from '@/views/VueFileFormat/hooks/index'
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式pdf
import { UploadOutlined } from '@ant-design/icons-vue'
import '@vue-office/docx/lib/index.css'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

const activeKey = ref('1')

// 1. 本地docx文件
const docxUrl = ref<string>('/src/assets/file/ZQC.docx')

// 2. 线上docx文件地址，可以是相对地址
// const docxUrl = ref('http://static.shanhuxueyuan.com/test6.docx')

const renderedHandler = () => {
  console.log('渲染完成')
}
const errorHandler = () => {
  console.log('渲染失败')
}

const docxUploadUrl = ref<ArrayBuffer | string | unknown>()

const fileList = ref<any[]>([])
const handleChange = async (info: UploadChangeParam) => {
  if (!info.fileList.length) {
    docxUploadUrl.value = ''
    return
  }
  const file: any = info.file
  console.log('文件', file)
  const blob = await transToBolb(file)
  console.log('blob', blob)

  /* 获取文件的ArrayBuffer对象 */
  // const fileReader = new FileReader()
  // fileReader.onload = async () => {
  //   console.log(fileReader.result)
  //   docxUploadUrl.value = fileReader.result
  // }
  // fileReader.readAsArrayBuffer(file)

  /* 获取blob的ArrayBuffer对象 */
  const fileReader1 = new FileReader()
  fileReader1.onload = () => {
    // 获取blob的ArrayBuffer对象
    console.log(fileReader1.result)
    docxUploadUrl.value = fileReader1.result
  }
  fileReader1.readAsArrayBuffer(blob)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...(fileList.value || []), file]
  return false
}
</script>

<style scoped lang="less"></style>
