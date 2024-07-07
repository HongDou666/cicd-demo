<template>
  <div class="mqtt-demo">
    <el-card>
      <h1>Configuration 服务器信息</h1>
      <el-form label-position="top" :model="connection">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="protocol" label="Protocol 协议">
              <el-select v-model="connection.protocol" @change="handleProtocolChange">
                <el-option label="ws://" value="ws"></el-option>
                <el-option label="wss://" value="wss"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="host" label="Host 主机">
              <el-input v-model="connection.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="port" label="Port 端口号">
              <el-input v-model.number="connection.port" type="number" placeholder="8083/8084"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="clientId" label="Client ID 客户端ID">
              <el-input v-model="connection.clientId"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="username" label="Username 用户名">
              <el-input v-model="connection.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="Password 用户密码">
              <el-input v-model="connection.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button type="primary" :disabled="client.connected" :loading="btnLoadingType === 'connect'" @click="createConnection">
              {{ client.connected ? 'Connected 已连接' : 'Connect 开启连接' }}
            </el-button>

            <el-button v-if="client.connected" type="danger" :loading="btnLoadingType === 'disconnect'" @click="destroyConnection">
              Disconnect 取消连接
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <h1>Subscribe 订阅</h1>
      <el-form label-position="top" :model="subscription">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic 主题">
              <el-input v-model="subscription.topic" :disabled="subscribedSuccess"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- QoS 0，最多交付一次。
                 QoS 1，至少交付一次。
                 QoS 2，只交付一次。 -->

            <!-- 其中，使用 QoS 0 可能丢失消息，使用 QoS 1 可以保证收到消息，但消息可能重复，使用 QoS 2 可以保证消息既不丢失也不重复。QoS 等级从低到高，不仅意味着消息可靠性的提升，也意味着传输复杂程度的提升  -->
            <el-form-item prop="qos" label="QoS 机制">
              <el-select v-model="subscription.qos" :disabled="subscribedSuccess">
                <el-option v-for="qos in qosList" :key="qos" :label="qos" :value="qos"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button
              type="primary"
              class="sub-btn"
              :loading="btnLoadingType === 'subscribe'"
              :disabled="!client.connected || subscribedSuccess"
              @click="doSubscribe">
              {{ subscribedSuccess ? 'Subscribed 已订阅' : 'Subscribe 订阅' }}
            </el-button>
            <el-button
              v-if="subscribedSuccess"
              type="primary"
              class="sub-btn"
              :loading="btnLoadingType === 'unsubscribe'"
              :disabled="!client.connected"
              @click="doUnSubscribe">
              Unsubscribe 取消订阅
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <h1>Publish 发布</h1>
      <el-form label-position="top" :model="publish">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic 主题">
              <el-input v-model="publish.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload 内容">
              <el-input v-model="publish.payload"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS 机制">
              <el-select v-model="publish.qos">
                <el-option v-for="qos in qosList" :key="qos" :label="qos" :value="qos"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24" class="text-right">
        <el-button type="primary" :loading="btnLoadingType === 'publish'" :disabled="!client.connected" @click="doPublish"> Publish 发送 </el-button>
      </el-col>
    </el-card>
    <el-card>
      <h1>Receive 所有消息</h1>
      <el-col :span="24">
        <el-input v-model="receivedMessages" type="textarea" :rows="10" readonly></el-input>
      </el-col>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 服务器客户端地址
// http://www.emqx.io/online-mqtt-client?__hstc=3614191.85b6862fcd1d0f4efa6aea472df69bb3.1710334862635.1710334862635.1710337372136.2&__hssc=3614191.1.1710337372136&__hsfp=1551375527#/recent_connections/bcc2ced5-1823-47f7-88e1-23d0ea23e325

// vue 3 + vite use MQTT.js refer to https://github.com/mqttjs/MQTT.js/issues/1269
import * as mqtt from 'mqtt/dist/mqtt.min'
import { reactive, ref } from 'vue'

// https://github.com/mqttjs/MQTT.js#qos
const qosList = [0, 1, 2]

/**
 * this demo uses EMQX Public MQTT Broker (https://www.emqx.com/en/mqtt/public-mqtt5-broker), here are the details:
 *
 * Broker host: broker.emqx.io
 * WebSocket port: 8083
 * WebSocket over TLS/SSL port: 8084
 */
const connection = reactive({
  // ws or wss
  protocol: 'ws',
  host: 'broker.emqx.io',
  // ws -> 8083; wss -> 8084
  port: 8083,
  clientId: 'emqx_vue3_' + Math.random().toString(16).substring(2, 8),
  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: 'emqx_test',
  password: 'emqx_test',
  clean: true, // 保留会话
  connectTimeout: 30 * 1000, // 超时时间
  reconnectPeriod: 4000 // 重连时间间
  // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
})

// topic & QoS for MQTT subscribing
const subscription = ref({
  topic: 'topic/mqttx',
  qos: 0 as mqtt.QoS
})

// topic, QoS & payload for publishing message
const publish = ref({
  topic: 'topic/browser',
  qos: 0 as mqtt.QoS,
  payload: '{ "msg": "Hello, I am browser." }'
})

let client = ref({
  connected: false
} as mqtt.MqttClient)
const receivedMessages = ref('')
const subscribedSuccess = ref(false)
const btnLoadingType = ref('')
const retryTimes = ref(0)

const initData = () => {
  client.value = {
    connected: false
  } as mqtt.MqttClient
  retryTimes.value = 0
  btnLoadingType.value = ''
  subscribedSuccess.value = false
}

const handleOnReConnect = () => {
  retryTimes.value += 1
  if (retryTimes.value > 5) {
    try {
      client.value.end()
      initData()
      console.log('连接maxReconnectTimes限制，停止重试')
    } catch (error) {
      console.log('handleOnReConnect catch error:', error)
    }
  }
}

// create MQTT connection
const createConnection = () => {
  try {
    btnLoadingType.value = 'connect'
    const { protocol, host, port, ...options } = connection
    const connectUrl = `${protocol}://${host}:${port}/mqtt`

    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    client.value = mqtt.connect(connectUrl, options)

    if (client.value.on) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.value.on('connect', () => {
        btnLoadingType.value = ''
        console.log('connection successful')
      })

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.value.on('reconnect', handleOnReConnect)

      // https://github.com/mqttjs/MQTT.js#event-error
      client.value.on('error', (error) => {
        console.log('connection error:', error)
      })

      // https://github.com/mqttjs/MQTT.js#event-message
      client.value.on('message', (topic: string, message) => {
        receivedMessages.value = receivedMessages.value.concat(message.toString())
        console.log(`received message: ${message} from topic: ${topic}`)
      })
    }
  } catch (error) {
    btnLoadingType.value = ''
    console.log('mqtt.connect error:', error)
  }
}

// subscribe topic
// https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
const doSubscribe = () => {
  btnLoadingType.value = 'subscribe'
  const { topic, qos } = subscription.value
  client.value.subscribe(topic, { qos }, (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
    btnLoadingType.value = ''
    if (error) {
      console.log('subscribe error:', error)
      return
    }
    subscribedSuccess.value = true
    console.log('subscribe successfully:', granted)
  })
}

// unsubscribe topic
// https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
const doUnSubscribe = () => {
  btnLoadingType.value = 'unsubscribe'
  const { topic, qos } = subscription.value
  client.value.unsubscribe(topic, { qos }, (error) => {
    btnLoadingType.value = ''
    subscribedSuccess.value = false
    if (error) {
      console.log('unsubscribe error:', error)
      return
    }
    console.log(`unsubscribed topic: ${topic}`)
  })
}

// publish message
// https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
const doPublish = () => {
  btnLoadingType.value = 'publish'
  const { topic, qos, payload } = publish.value
  client.value.publish(topic, payload, { qos }, (error) => {
    btnLoadingType.value = ''
    if (error) {
      console.log('publish error:', error)
      return
    }
    console.log(`published message: ${payload}`)
  })
}

// disconnect
// https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
const destroyConnection = () => {
  if (client.value.connected) {
    btnLoadingType.value = 'disconnect'
    try {
      client.value.end(false, () => {
        initData()
        console.log('disconnected successfully')
      })
    } catch (error) {
      btnLoadingType.value = ''
      console.log('disconnect error:', error)
    }
  }
}

const handleProtocolChange = (value: string) => {
  connection.port = value === 'wss' ? 8084 : 8083
}
</script>

<style>
.mqtt-demo {
  margin: 32px auto 0;
  max-width: 1200px;
}

h1 {
  margin-top: 0;
  font-size: 16px;
}

.el-card {
  margin-bottom: 32px;
}

.el-card__body {
  padding: 24px;
}

.el-select {
  width: 100%;
}

.text-right {
  text-align: right;
}

.sub-btn {
  margin-top: 30px;
}
</style>
