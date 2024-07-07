<template>
  <div>ServerSentEventsComp1</div>
</template>

<script setup lang="ts" name="ServerSentEventsComp1">
import { sseService } from '@/utils/SSE-service'
import type { SSEChatParams } from '@/utils/SSE-service'

const onopen = () => {
  console.log('ServerSentEventsComp1 SSE-连接成功')
}
// 建立连接
const sseChatParams: SSEChatParams = {
  onopen,
  // url: import.meta.env.VITE_GLOB_API_URL + 'sse/createConnect?clientId=' + userStore.getSseClientId(),
  url: 'http://127.0.0.1:8844/stream',
  onmessage: (event: MessageEvent) => {
    // 收到消息
    console.log('ServerSentEventsComp1-收到消息:', event.data)
  },
  finallyHandler: () => {
    console.log('关闭连接-最终操作')
  }
}
sseService.connect(sseChatParams)

// 当组件从 DOM 中卸载前执行的操作
onUnmounted(() => {
  sseService.disconnect()
})
</script>

<style scoped></style>
