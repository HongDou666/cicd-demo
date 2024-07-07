<template>
  <div>
    <el-button-group class="ml-4">
      <el-button type="primary">{{ time.year }}</el-button>
      <el-button type="primary">{{ time.month }}</el-button>
      <el-button type="primary">{{ time.day }}</el-button>
      <el-button type="primary"> : </el-button>
      <el-button type="primary">{{ time.hours }}</el-button>
      <el-button type="primary">{{ time.minutes }}</el-button>
      <el-button type="primary">{{ time.seconds }}</el-button>
    </el-button-group>
  </div>

  <!-- 封装 new EventSource -->
  <ServerSentEventsComp1></ServerSentEventsComp1>
  <!-- 封装 new EventSource -->
</template>

<script setup lang="ts" name="ServerSentEvents">
import ServerSentEventsComp1 from './modules/ServerSentEventsComp1.vue'
import { EventSourcePolyfill } from 'event-source-polyfill'

const time = reactive({
  year: '2023',
  month: '03',
  day: '19',
  hours: '21',
  minutes: '37',
  seconds: '50'
})
const source = ref<any>()

if (window.EventSource) {
  source.value = new EventSource('http://127.0.0.1:8844/stream')

  // 连接建立 触发open事件
  source.value.onopen = (event: any) => {
    console.log('连接建立', event)
  }

  // 通信错误（比如连接中断）
  source.value.onerror = (event: any) => {
    console.log('通信错误-连接中断', event)
  }

  // 默认情况下，服务器发来的数据，总是触发浏览器EventSource实例的message事件
  // 开发者还可以自定义 SSE 事件，这种情况下，发送回来的数据不会触发message事件
  source.value.addEventListener(
    'connecttime',
    function (event) {
      console.log('connecttime', event, event.data)
    },
    false
  )

  // 客户端收到服务器发来的数据
  source.value.onmessage = function (event) {
    const arr = event.data.split(':')[1].split('-')
    Object.assign(time, {
      year: arr[0],
      month: arr[1],
      day: arr[2],
      hours: arr[3],
      minutes: arr[4],
      seconds: arr[5]
    })
  }
}

// new EventSource 缺点: 不可以比如请求头中加token等
// 如果加自定义参数可以使用三方插件event-source-polyfill

const url = 'http://127.0.0.1:8845/event-source-poly-fill'
const es = new EventSourcePolyfill(url, {
  headers: {
    'Access-Token': 'Token-Token-zqc'
  }
})
es.onopen = function (event) {
  console.log('event-source-polyfill-连接成功', event)
}
es.onmessage = function (event) {
  console.log('event-source-polyfill-接收信息', event.data)
}
es.onerror = function (error) {
  console.log('event-source-polyfill-错误', error)
}

onUnmounted(() => {
  // event-source-polyfill 关闭连接
  es && es.close()
  // new EventSource 关闭连接
  source.value && source.value.close()
})
</script>

<style scoped lang="less"></style>
