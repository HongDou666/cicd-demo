<template>
  <h3>WebSocket</h3>
  <div>
    token:{{ token }}<br />
    <a-button type="primary" @click="handleClear">清空token</a-button>
    <a-input-group v-if="!token" compact>
      <a-input v-model:value="userName" style="width: 50%" enter-button placeholder="请输入用户名" @press-enter="handleClick">
        <template #prefix>
          <a-icon type="home" />
        </template>
      </a-input>
      <a-button type="primary" @click="handleClick">登录</a-button>
    </a-input-group>

    <div v-else>
      <a-input-search v-model:value="value" placeholder="input search text" enter-button @search="onSearch" />
      <a-list size="small" bordered :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <p>
              <span>{{ dayjs(item.dataTime).format('YYYY-MM-DD HH:mm:ss') }}</span
              >>
              <span>{{ item.user }}</span>
            </p>
            <p>消息：{{ item.msg }}</p>
          </a-list-item>
        </template>
        <template #header>
          <div>Header</div>
        </template>
        <template #footer>
          <div>Footer</div>
        </template>
      </a-list>
    </div>
  </div>
  <hr />

  <WebSocketComp1></WebSocketComp1>
</template>

<script setup lang="ts" name="WebSocket">
import WebSocketComp1 from './modules/WebSocketComp1.vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { STORAGE_AUTHORIZE_KEY } from '@/config'
import { useWebsocket } from '@/hooks'
import { webSocketPinia } from '@/store/web-socket/index'

const webSocket = webSocketPinia()
let token = webSocket.useAuthorization()
const router = useRouter()
const userName = ref<string>('')
const value = ref<string>('')
const data: any[] = reactive([])
const handleMessage = (e) => {
  console.log('message', JSON.parse(e.data))
  const _msgData = JSON.parse(e.data)
  data.push(_msgData)
}
const ws = useWebsocket(handleMessage)

const setValue = (value: string) => {
  return value.split(' ').join('')
}
const handleClear = () => {
  token.value = null
}
const handleClick = () => {
  const result = setValue(userName.value)
  if (!result.length) {
    message.warning('用户名不能为空')
    return
  }
  useStorage<null | string>(STORAGE_AUTHORIZE_KEY, result)
  router.go(0)
}
const onSearch = (searchValue: string) => {
  const msg = setValue(searchValue)
  value.value = ''
  if (!msg.length) {
    return message.warning('请输入消息好吗？')
  }
  ws.send(
    JSON.stringify({
      id: new Date().getTime(),
      dataTime: new Date().getTime(),
      user: token.value,
      msg
    })
  )
}
</script>

<style scoped lang="less"></style>
