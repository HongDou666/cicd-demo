<template>
  <br />
  <!-- 本地视频 -->
  <a-button type="primary" @click="paly">播放</a-button>
  <a-button type="primary" @click="pause">暂停</a-button>
  <a-button type="primary" @click="load">重新播放</a-button>
  <a-button type="primary" @click="getCurrentTime">获取当前播放时间</a-button>
  <a-button type="primary" @click="setCurrentTime">跳转到指定时间</a-button>
  <a-button type="primary" @click="duration">获取视频的总时长</a-button>
  <a-button type="primary" @click="getVolume">获取音量</a-button>
  <a-button type="primary" @click="setVolume">设置音量</a-button>
  <a-button type="primary" @click="getPlaybackRate">获取播放速率</a-button>
  <a-button type="primary" @click="setPlaybackRate">设置播放速率</a-button>
  <video
    id="videoId"
    ref="videoRef"
    preload="metadata"
    :controls="true"
    width="350"
    height="auto"
    poster="/src/assets/img/test.jpg"
    :autoplay="false"
    :muted="false"
    :loop="false"
    crossorigin="anonymous"
    :playsinline="true"
    controlslist="nofullscreen"
    @playing="handlePlaying"
    @play="handlePlay"
    @pause="handlePause"
    @ended="handleEnded"
    @timeupdate="handleTimeupdate"
    @error="handleError"
    @ratechange="handleRatechange"
    @volumechange="handleVolumechange">
    <source :src="location" type="video/mp4" />
    <source :src="location" type="video/webm" />
    <source :src="location" type="video/ogg" />
    Your browser does not support HTML5 video.
  </video>
  <!-- 属性： -->
  <!--1. preload : 用于指定视频是否在页面加载时就开始下载，有三个值：none、auto、metadata
        none表示不预加载，
        auto表示预加载整个视频 (开启视频缓冲，页面加载完即加载视频)
        metadata表示只加载视频的元数据
      2. src 指定视频文件的 URL
      3. controls 当设置此属性时，浏览器会显示内置的播放控制（如播放/暂停按钮、音量控制、全屏切换等）
      4. width 和 height 设置视频播放器的宽高（以像素为单位）
      5. poster 指定视频加载时显示的封面图片 URL
      6. autoplay 自动播放 (如果浏览器禁止自动播放 则会失效 必须配合muted属性使用)
      7. muted 设置视频初始为静音状态（初始化为静音播放 不设置默认有声音）
      8. loop 循环播放
      9. crossorigin 指定视频是否应该以 CORS 方式加载。这对于需要访问视频帧数据的跨域视频至关重要。可选值有：
         anonymous：请求不包含凭据
         use-credentials：请求包含凭据（如 cookie、HTTP 认证等）
      10. controlslist 控制控件的显示方式，controlslist="nodownload noplaybackrate"
          nodownload: 阻止显示下载按钮，防止用户直接下载视频文件。这有助于保护视频内容的版权或限制离线访问
          nofullscreen :禁止全屏模式按钮的显示，防止用户将视频切换到全屏观看
          noremoteplayback :禁用远程播放选项，如在连接到同一网络的其他设备（如智能电视）上投射或播放视频。
          noplaybackrate: 移除播放速度控制器，用户将不能调整视频的播放速率（如快进、慢放或倒带）。
          nokeyboard:在某些浏览器中，可能用于隐藏键盘快捷键提示或禁止通过键盘操作视频控件。
      11. webkit-playsinline="true" 这个属性是ios 10中设置可以让视频在小窗内播放
      12. x5-playsinline="x5-playsinline" 微信内禁止全屏
      13. playsinline="true" ios微信浏览器支持小窗播放
      14. x-webkit-airplay="true" 支持Airplay的设备
    -->

  <!-- API 方法 -->
  <!-- 
      1. play() 播放视频
      2. pause() 暂停视频播放
      3. load() 重新加载视频源。通常在更改 src 属性或需要刷新视频状态时调用。
      4. currentTime 获取或设置当前视频播放的时间位置（以秒为单位）
      5. duration 获取视频的总时长（以秒为单位）
      6. volume 获取或设置视频的音量。取值范围为 0.0（静音）至 1.0（最大音量）
      7. playbackRate 获取或设置视频的播放速率。大于 1.0 表示加速播放，小于 1.0 表示慢速播放，1.0 为正常速度。
     -->

  <!-- 事件 -->
  <!-- 
      1. play 当视频开始或恢复播放时触发
      2. pause 当视频暂停时触发
      3. ended 当视频播放到达结尾时触发
      4. timeupdate 当前播放时间发生变化时频繁触发。
      5. error 当视频加载或播放过程中发生错误时触发。
      6. playing 由于缺乏数据而暂停或延迟后，播放准备开始
      7. ratechange 播放速率发生变化
      9. volumechange 音量发生变化
   -->

  <!-- 通过接口将视频Blob转化为 Base64 播放  -->
  <video
    :src="srcVideo"
    preload="metadata"
    :controls="true"
    width="350"
    height="auto"
    poster="/src/assets/img/test.jpg"
    :autoplay="false"
    :muted="false"
    :loop="false"
    crossorigin="anonymous"
    :playsinline="true">
    Your browser does not support HTML5 video.
  </video>
</template>

<script setup lang="ts" name="VueVideo">
// 参考文献：
// https://blog.csdn.net/Jackson_Mseven/article/details/131244922
// https://blog.csdn.net/yun_shuo/article/details/115185485
// https://blog.csdn.net/u012347650/article/details/137863919?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-5-137863919-blog-115185485.235^v43^control&spm=1001.2101.3001.4242.4&utm_relevant_index=8
// https://blog.csdn.net/lucky_Zeng/article/details/98073550

import { getDownloadVideo } from '@/api/mock-js/index'
import { fileToDataURL } from '@/views/VueFileFormat/hooks/index'

const error = ref()
const location = new URL(`/src/assets/file/ZQC.mp4`, import.meta.url).href
const videoRef = ref<HTMLVideoElement>()
const srcVideo = ref()

const handlePlaying = () => {
  console.log('播放准备开始')
}
const handlePlay = () => {
  console.log('视频 (开始 、恢复) 播放')
}
const handlePause = () => {
  console.log('暂停视频播放')
}
const handleEnded = () => {
  console.log('视频播放结束')
}
const handleTimeupdate = () => {
  // console.log('当前播放时间发生变化时频繁触发')
}
const handleError = () => {
  console.log('当视频加载或播放过程中发生错误时触发')
}
const handleRatechange = () => {
  console.log('播放速率发生变化')
}
const handleVolumechange = () => {
  console.log('音量发生变化')
}

const paly = () => {
  videoRef.value?.play()
}
const pause = () => {
  videoRef.value?.pause()
}
const load = () => {
  videoRef.value?.load()
  videoRef.value?.play()
}
const getCurrentTime = () => {
  console.log('当前播放时间', videoRef.value?.currentTime)
}
const setCurrentTime = () => {
  videoRef.value && (videoRef.value.currentTime = 30)
}
const duration = () => {
  console.log('获取视频的总时长', videoRef.value?.duration)
}
const getVolume = () => {
  console.log('获取音量', videoRef.value?.volume)
}
const setVolume = () => {
  videoRef.value && (videoRef.value.volume = 0.5)
}
const getPlaybackRate = () => {
  console.log('播放速率', videoRef.value?.playbackRate)
}
const setPlaybackRate = () => {
  videoRef.value && (videoRef.value.playbackRate = 1.5)
}

const init = async () => {
  try {
    const config = {
      responseType: 'blob'
    }
    const res: ReturnType<typeof getDownloadVideo> = getDownloadVideo({}, config)
    const blob = await res
    const fileBase64 = await fileToDataURL(blob)
    srcVideo.value = fileBase64
  } catch (error: any) {
    // 捕获错误代码
    error.value = true
  } finally {
    // 无论try和catch的结果如何，都正常执行的代码
  }
}
init()
</script>

<style scoped lang="less"></style>
