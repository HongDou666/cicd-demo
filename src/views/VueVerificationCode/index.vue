<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="图形验证码">
      <IdentifyCode
        ref="identify"
        class="code-box"
        :content-width="contentWidth"
        :content-height="contentHeight"
        :identify-code="identifyCode"
        :font-size-min="fontSizeMin"
        :font-size-max="fontSizeMax"
        :background-color-min="backgroundColorMin"
        :background-color-max="backgroundColorMax"
        :color-min="colorMin"
        :color-max="colorMax"
        :line-color-min="lineColorMin"
        :line-color-max="lineColorMax"
        :dot-color-min="dotColorMin"
        :dot-color-max="dotColorMax"
        @update-identify-code="setIdentifyCode"></IdentifyCode>
      <h1>验证码：{{ curIdentifyCode }}</h1>
    </a-tab-pane>
    <a-tab-pane key="2" tab="滑块验证码">
      <SliderCode />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="VueVerificationCode">
import IdentifyCode from './modules/IdentifyCode.vue'
import SliderCode from './modules/SliderCode.vue'

const activeKey = ref('1')

// 验证码取值内容
let identifyCode = ref('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
// 验证码字体最小值
let fontSizeMin = ref(16)
// 验证码字体最大值
let fontSizeMax = ref(40)
// 验证码背景颜色rgb的最小值
let backgroundColorMin = ref(180)
// 验证码背景颜色rgb的最小值
let backgroundColorMax = ref(240)
// 字体颜色rgb的最小值
let colorMin = ref(50)
// 字体颜色rgb的最大值
let colorMax = ref(160)
// 干扰线颜色rgb的最小值
let lineColorMin = ref(0)
// 干扰线颜色rgb的最大值
let lineColorMax = ref(180)
// 干扰点颜色rgb的最小值
let dotColorMin = ref(0)
// 干扰点颜色rgb的最大值
let dotColorMax = ref(255)
// 画布宽度
let contentWidth = ref(120)
// 画布高度
let contentHeight = ref(60)
// 验证码
let curIdentifyCode = ref('')

// 获取验证码 | 点击更换验证码
const setIdentifyCode = (val) => {
  curIdentifyCode.value = val
}
</script>

<style scoped lang="less"></style>
