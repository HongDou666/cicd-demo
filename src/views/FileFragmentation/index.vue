<template>
  <div class="file_fragmentation">
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
        Click to Upload
      </a-button>
    </a-upload>
    <!-- :progress="progress" -->
  </div>
</template>
<script lang="ts" setup name="FileFragmentation">
import { postUpload } from '@/api/mock-js/index'
import { cutFile } from '@/utils/cut-file'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

interface ChunksType {
  blob?: Blob
  hash?: string
  index?: number
  start?: number
  end?: number
}

// const progress: UploadProps['progress'] = {
//   strokeColor: {
//     '0%': '#108ee9',
//     '100%': '#87d068'
//   },
//   strokeWidth: 3,
//   format: (percent) => {
//     return `${parseFloat(percent.toFixed(2))}%`
//   },
//   class: 'test'
// }

const fileList = ref<any[]>([])
const handleChange = async (info: UploadChangeParam) => {
  if (!info.fileList.length) {
    return
  }
  const file = info.file
  console.log('上传文件', file)
  console.time('cutFileTime')
  const chunks = await cutFile(file)
  console.timeEnd('cutFileTime')
  console.log('分片结果', chunks)
  await uploadPartFile(chunks as ChunksType[])
}

// 分片上传
const uploadPartFile = async (fileList: ChunksType[]) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  }
  let httpUpload = fileList?.map(async (chunks: ChunksType, index: number) => {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData()
      // 使用append方法来添加字段
      for (const key in chunks) {
        if (key === 'blob') {
          formData.append('file', chunks['blob']!)
        } else {
          formData.append(key, chunks[key])
        }
      }
      postUpload(formData, config)
        .then((res) => {
          if (res.code !== 200) {
            console.log(`第${index}片上传失败，请重传`)
            reject(formData)
          } else {
            console.log(`第${index}片上传成功啦！`)
            resolve(formData)
          }
        })
        .catch((err) => {
          console.log('【文件异步上传报错】', err)
        })
    })
  })

  // Promise.allSettled 不会因一个 Promise 失败而快速失败，而是等待所有的 Promise 都被处理（无论是 resolved 还是 rejected），然后返回一个描述每个 Promise 状态和值（或拒绝原因）的数组
  const lastGroupUpload = await Promise.allSettled(httpUpload)
    .then((res) => {
      res.forEach((item) => {
        console.log(`Promise 状态${item.status}`)
        // console.log('Promise 值', item)
      })
      return Promise.resolve(res)
    })
    .catch((err) => {
      return Promise.resolve(err)
    })

  // 将上传失败的分片文件存储在errorChunkList
  let errorChunkList = lastGroupUpload.filter((item) => item.status === 'rejected').map((item) => item.value)

  // 上传失败的分片再次上传
  if (errorChunkList.length > 0) {
    errorChunkList.forEach((item) => {
      errorChunkUpload(item)
    })
  }
}

/**
 * @description 针对上传失败的切片再次上传
 * @param {*}  chunk 文件上传formData参数
 * @return {*}
 */
const errorChunkUpload = async (chunk) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  }
  let res = await postUpload(chunk, config)
  if (res.code && res.code !== 200) {
    console.log(`上传失败，请重传`, res)
    errorChunkUpload(chunk) //失败则递归不断上传该片
  } else {
    console.log(`上传成功啦！`, res)
  }
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...(fileList.value || []), file]
  return false
}
</script>

<style scoped lang="less">
.file_fragmentation {
  margin: 20px auto;
  height: 150px;
}
</style>
