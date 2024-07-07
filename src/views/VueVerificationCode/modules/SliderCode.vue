<template>
  <div class="slider_code">
    <Vcode
      ref="vcodeRef"
      class-name="slider-code"
      type="typeMode"
      :show="isShow"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :puzzle-scale="puzzleScale"
      :slider-size="sliderSize"
      :range="range"
      :success-text="successText"
      :fail-text="failText"
      :slider-text="sliderText"
      :imgs="imgs"
      @success="success"
      @fail="fail"
      @close="close"
      @reset="reset" />
    <a-button type="primary" @click="submit">登录</a-button>
    <!-- 注意：(type="inside")内嵌形式才可以使用 -->
    <a-button type="primary" @click="refresh">手动刷新</a-button>
    <!-- 注意：(type="inside")内嵌形式才可以使用 -->
  </div>
</template>
<script setup lang="ts" name="SliderCode">
import Img1 from '~/assets/img/test.jpg'
import Img2 from '~/assets/img/user.jpg'
// vue2 => vue-puzzle-vcode
// vue3 => vue3-puzzle-vcode
import Vcode from 'vue3-puzzle-vcode'
import type { ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入
const { proxy: th } = getCurrentInstance() as ComponentInternalInstance

const vcodeRef = ref()
// 验证码模态框是否出现
const isShow = ref(false)
// "modal"模态框形式 / "inside"内嵌形式
const typeMode = ref('modal')
// 主图区域的宽度
const canvasWidth = ref(310)
// 主图区域的高度
const canvasHeight = ref(160)
// 拼图块(小的拼图)的大小比例，0.2 ～ 2 ，数字越大，拼图越大
const puzzleScale = ref(1)
// 左下角用户拖动的那个滑块的尺寸，单位 px
const sliderSize = ref(50)
// 判断成功的误差范围，单位 px, 滑动的距离和拼图的距离小于等于此值时，会判定重合
const range = ref(10)
// 自定义图片
const imgs = ref([Img1, Img2])
// 验证成功时的提示文字
const successText = ref('太棒啦！验证通过！')
// 验证失败时的提示文字
const failText = ref('验证失败，请重试哦')
// 下方滑动条里的文字
const sliderText = ref('拖动滑块完成拼图即可成功')

// 用户点击登录按钮
const submit = () => {
  isShow.value = true
}
// 用户点击刷新按钮
const refresh = () => {
  // 手动刷新内部状态
  vcodeRef.value.reset()
}
// 用户通过了验证
const success = () => {
  // 通过验证后，需要手动隐藏模态框
  isShow.value = false
  th?.$message.success('验证成功')
}
// 验证失败时会触发，返回值同上
const fail = () => {
  th?.$message.error('验证失败')
}
// 用户点击遮罩层，应该关闭模态框
const close = () => {
  isShow.value = false
}
// 用户手动点击右上角刷新按钮时的回调
const reset = () => {
  console.log('重置验证码')
}
</script>

<style scoped lang="less">
.slider_code {
  position: relative;
  width: 320px;
  height: auto;
}
</style>
