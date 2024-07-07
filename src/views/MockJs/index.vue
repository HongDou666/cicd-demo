<template>
  <div>
    <a-button type="primary" @click="handleSend">以代理形式向服务器1发起请求</a-button>
    <a-button type="primary" @click="handleStop">终止未完成的网络请求</a-button>
    <br />
    <a-button type="primary" @click="handleCache">以代理形式向服务器1发起请求(使用网络缓存)</a-button>
    <a-button type="primary" @click="handleClearAllCache">清空网络缓存中的所有数据</a-button>
    <br />
    <a-button type="primary" @click="handleMock">使用Mock模拟网络请求</a-button>
    <br />
    <a-button type="primary" @click="handleDownloadPdf">发起网络请求-下载pdf文件</a-button>
    <a-button type="primary" @click="handleDownloadImg">发起网络请求-下载图片</a-button>
    <a-progress
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068'
      }"
      :percent="downloadProgress" />
    <br />
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
      <a-button type="primary">
        <a-icon type="home" />
        <upload-outlined></upload-outlined>
        发起网络请求-文件上传
      </a-button>
    </a-upload>
    <a-progress
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068'
      }"
      :percent="uploadProgress" />
  </div>
</template>

<script setup lang="ts" name="MockJs">
import { mockInfo, mockStatus, students, postCacheData, getDownloadPdf, getDownloadImg, postUpload } from '@/api/mock-js/index'
import { useCache } from '@/hooks/index'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

interface ControllerType {
  [key: string]: AbortController // 其他属性，定义变量可忽略
}

const error = ref(false)
const { setDataToCache, getDataFromCache, clearAllCache } = useCache()
const { proxy: th } = getCurrentInstance() as ComponentInternalInstance
// 缓存时间（20s）
const cacheTime = 20 * 1000
// 设置网络请求的时长
const time = ref(2)
// 声明请求中止控制器
const controller: ControllerType = {}
// 文件下载进度
const downloadProgress = ref(0)
// 文件列表
const fileList = ref<any[]>([])
// 文件上传进度
const uploadProgress = ref(0)

// mock数据请求
const getData = async () => {
  try {
    const param: Parameters<typeof mockInfo>[0] = {
      id: 3.1415926
    }
    const res: ReturnType<typeof mockInfo> = mockInfo(param)
    const result = await res
    console.log('mockInfo', result)
  } catch (error) {
  } finally {
  }
}

// mock数据请求
const postData = async () => {
  try {
    const param: Parameters<typeof mockStatus>[0] = {
      name: '玛奇朵'
    }
    const res: ReturnType<typeof mockStatus> = mockStatus(param)
    const result = await res
    console.log('mockStatus', result)
  } catch (error) {
  } finally {
  }
}

const handleMock = () => {
  getData()
  postData()
}

// 真实数据请求（终止网络请求）
const getStudents = async () => {
  try {
    const param: Parameters<typeof students>[0] = {
      time: 1000 * time.value
    }
    // 生成一个随机数(时间戳)，作为请求中止的key
    const key = Date.now()
    controller[key] = new AbortController()
    const config = {
      // 添加请求中止标识
      signal: (controller[key] as AbortController).signal,
      // 在请求头中额外加一些参数配置
      headers: {
        Zqc: '2024/04/13'
      }
    }
    const res: ReturnType<typeof students> = students(param, config)
    const result = await res
    console.log('students', result)
  } catch (error: any) {
    // 捕获错误代码
    console.error(error) // 只是在控制台打印一条红色消息，并不影响程序的运行
    throw new Error(error) //语句会在在控制台打印错误信息并停止程序的运行；
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}

// 终止网络请求
const handleStop = () => {
  if (Object.keys(controller).length) {
    // 中止之前未完成的网络请求
    for (const key in controller) {
      if (controller[key]) {
        controller[key].abort()
        delete controller[key]
      }
    }
  }
}

const handleSend = () => {
  getStudents()
  time.value++
}

// 网络缓存-数据请求
const cacheData = async () => {
  try {
    // 从缓存中获取用户信息
    const cachedInfo = getDataFromCache('postCacheDataKey')
    if (cachedInfo) {
      // 如果缓存中存在
      th?.$message.info('从缓存中拿数据')
      console.log('cachedInfo', cachedInfo)
    } else {
      // 如果缓存中不存在，调用接口获取数据信息
      const param: Parameters<typeof postCacheData>[0] = {
        parkId: 177
      }
      const res: ReturnType<typeof postCacheData> = postCacheData(param)
      const result = await res
      if (result.code === 200) {
        console.log('result', result)
        const data = result.data
        // 将数据信息存入缓存中，（带有唯一key值）设置缓存时间为 20s
        setDataToCache('postCacheDataKey', data, cacheTime)
        th?.$message.success('数据缓存成功')
      }
    }
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}

const handleCache = () => {
  cacheData()
}

// 清空浏览器中的网络缓存
const handleClearAllCache = () => {
  clearAllCache()
  th?.$message.warning('清空数据缓存成功')
}

// 网络请求（下载文件 pdf）
const handleDownloadPdf = async () => {
  try {
    const param: Parameters<typeof getDownloadPdf>[0] = {
      parkId: 177
    }
    const config = {
      responseType: 'blob'
    }
    const res: ReturnType<typeof getDownloadPdf> = getDownloadPdf(param, config)
    const blob = await res
    console.log('blob-pdf', blob)
    toFile(blob, 'pdf') // 调用下载文件方法
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}

// https://juejin.cn/post/7127547763679559693
// 网络请求（下载图片）（下载进度显示）
const handleDownloadImg = async () => {
  try {
    const param: Parameters<typeof getDownloadImg>[0] = {
      parkId: 177
    }
    const config = {
      responseType: 'blob',
      // 下载进度显示
      onDownloadProgress(e) {
        const event = e.event
        // console.log(e)
        if (event.lengthComputable) {
          downloadProgress.value = Math.round((event.loaded * 100) / event.total)
          if (event.loaded === event.total) {
            th?.$message.success('图片下载完成')
          }
        }
      }
    }
    const res: ReturnType<typeof getDownloadImg> = getDownloadImg(param, config)
    const blob = await res
    console.log('blob-img', blob)
    toFile(blob, 'jpg') // 调用下载文件方法
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}

// 下载文件
const toFile = (blob, suffix) => {
  // 创建Blob对象（参数已经为blob对象 无需再从文件file转换为blob）
  // const blob = new window.Blob([file], { type: file.type })
  let a = document.createElement('a') // 创建a标签
  a.innerHTML = '海贼王' // 链接名称
  a.download = `海贼王.${suffix}` // 指定生成的文件名
  a.href = URL.createObjectURL(blob) // 指定下载文件的链接地址
  document.body.appendChild(a) // 将a标签添加到body中
  let evt = document.createEvent('MouseEvents') // 创建事件对象
  evt.initEvent('click', false, false) // 初始化事件对象
  a.dispatchEvent(evt) // 触发事件
  document.body.removeChild(a) // 移除a标签
}

// https://apifox.com/apiskills/axios-upload-file/
// 网络请求（上传文件）（上传进度显示）
const handleChange = async (info: UploadChangeParam) => {
  if (!info.fileList.length) {
    return
  }
  const file: any = info.file
  console.log(file)
  try {
    let formData: FormData = new FormData()
    // 使用append方法来添加字段
    formData.append('file', file)
    formData.append('length', '1024KB')
    const config = {
      // 在请求头中额外加一些参数配置
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      },
      // 上传进度显示
      onUploadProgress: (e) => {
        const event = e.event
        // console.log(e)
        if (event.lengthComputable) {
          uploadProgress.value = Math.round((event.loaded * 100) / event.total)
          if (event.loaded === event.total) {
            th?.$message.success('文件上传完成')
          }
        }
      }
    }
    const res: ReturnType<typeof postUpload> = postUpload(formData, config)
    const result = await res
    console.log('postUpload', result)
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...(fileList.value || []), file]
  return false
}
</script>

<style scoped lang="less">
.ant-btn {
  margin: 5px;
}
</style>
