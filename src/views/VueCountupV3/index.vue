<template>
  <div>
    <el-button type="primary">
      <count-up
        :end-val="endVal"
        :start-val="startVal"
        :duration="duration"
        :decimal-places="decimalPlaces"
        :autoplay="autoplay"
        :loop="loop"
        :delay="delay"
        :options="options"
        @init="init"
        @finished="finished">
        <template #prefix>
          <span style="color: orange">￥❤️</span>
        </template>
        <template #suffix>
          <span style="color: red">❤️$</span>
        </template>
      </count-up>
    </el-button>
  </div>
</template>

<script setup lang="ts" name="VueCountupV3">
import CountUp from 'vue-countup-v3'
import type { CountUpOptions } from 'vue-countup-v3'

const endVal = ref(2000000) // 结束值
const startVal = ref(1000000) // 起始值
const duration = ref(3) // 动画时长，单位：秒
const decimalPlaces = ref(2) // 小数点位数
const autoplay = ref(false) // 是否自动计数
const loop = ref(false) // 循环次数，有限次数 / 无限循环
const delay = ref(2) // 循环次数，有限次数 / 无限循环
const options = reactive<CountUpOptions>({
  useGrouping: true, // 是否使用千位分隔符）显示
  useIndianSeparators: false, // 是否使用印度数位分隔符
  useEasing: true, // 是否开启数字增加过程中的缓动方式
  enableScrollSpy: true, // 在可视范围内才开始动画
  scrollSpyOnce: true, // 滚动到该元素时执行数字滚动动画是否执行一次
  separator: '^', // 千分位分隔符
  decimal: '*', // 小数点分隔符
  scrollSpyDelay: 1000 // 目标进入可视范围内后的延迟时间(毫秒)
})

const init = (ctx) => {
  console.log('CountUp 实例初始化完成触发', ctx)
}
const finished = () => {
  console.log('计数结束时触发')
}
</script>

<style scoped lang="less">
.el-button {
  width: 580px;
  height: 260px;
  font-size: 50px;
  font-weight: 900;
}
</style>
