<template>
  <div id="btn" ref="fullScreen" class="FullScreen">
    <button id="btn1" @click="handleEnter">进入全屏</button>
    <button id="btn2" @click="handleExit">退出全屏</button>
    <button id="btn3" @click="handleFullEle">当前处于全屏的元素</button>
    <button id="btn4" @click="handleIsFull">当前是否处于全屏</button>
    <button id="btn5" @click="handleToggle">进入/退出全屏</button>
    <div class="main">
      全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装, 全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装,
      全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装, 全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装,
      全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装, 全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装,
      全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装, 全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装,
      全屏功能封装,全屏功能封装,全屏功能封装,全屏功能封装,
    </div>
  </div>
  <div style="text-align: center">其他元素不会跟着全屏</div>
</template>

<script setup lang="ts" name="FullScreen">
import { enter, exit, fullEle, isFull, toggle } from '@/utils/full-screen'
const fullScreen = ref<HTMLDivElement>()

const handleEnter = () => {
  enter(fullScreen.value)
}

const handleExit = () => {
  exit()
}
const handleFullEle = () => {
  const ele = fullEle()
  console.log(ele)
}
const handleIsFull = () => {
  const isFullScreen = isFull()
  console.log(isFullScreen)
}
const handleToggle = () => {
  toggle(fullScreen.value)
}
</script>

<style scoped lang="less">
.FullScreen {
  overflow: hidden;
  text-align: center;
  background: #d9d8d871;

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 10px;
    min-width: 120px;
    height: 60px;
    font-size: 20px;
    color: #fff;
    background: #299;
    border: none;
    border-radius: 7px;
    font-weight: 600;
  }

  .main {
    padding: 10px;
    margin: 0 auto;
    width: 600px;
    height: 400px;
    color: #2e2e2e;
    background: #c2c2c2;
    border-radius: 10px;
    line-height: 26px;
  }
}
</style>
