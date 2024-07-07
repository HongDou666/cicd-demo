<template>
  <div id="large-screen" class="large-screen">
    <div class="main">
      迄今为止最易用的自适应工具, 理论上可以支持从你的设计稿以下的分辨率，
      只需一行代码。autofit.js是一个可以让你的PC项目自适应屏幕的工具，其原理非常简单，
      即在scale等比缩放的基础上，向右或向下增加了宽度或高度，以达到充满全屏的效果，使用autofit.js不会挤压、拉伸元素，它只是单纯的设置了容器的宽高。
    </div>
    <div class="gaodeMap">不受影响的元素</div>
  </div>
</template>
<!-- 核心: 无论怎样缩放，保证宽高比不变 -->
<script setup lang="ts" name="AutoFit">
import autofit from 'autofit.js'
onMounted(() => {
  //  * - el：渲染的dom，默认是 "body"，必须使用id选择器
  //  * - dw：设计稿的宽度，默认是 1920
  //  * - dh：设计稿的高度，默认是 1080
  //  * - resize：是否监听resize事件，默认是 true
  //  * - ignore：忽略缩放的元素（该元素将反向缩放），参数见readme.md
  //  * - transition：过渡时间，默认是 0
  //  * - delay：默认是 0
  autofit.init(
    {
      // el: 'body',
      el: '#large-screen',
      dw: 1920,
      dh: 1080,
      resize: true,
      ignore: [
        {
          el: '.gaodeMap' //必填
          // height: '300px', //可选，需注明单位
          // width: '80%', //可选，需注明单位
          // scale: 1.2, //可选：回放程度，基于主元素缩放后的大小
          // fontSize: 26 //可选，如果自定义缩放后文字大小不合适，可以在这里设置文字大小
        }
      ]
    },
    false
  )
})
onUnmounted(() => {
  autofit.off()
})
</script>

<style scoped lang="less">
@charset "UTF-8";

.large-screen {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #00a05d;

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 960px;
    height: 540px;
    font-size: 20px;
    border: 1px solid red;
  }

  .gaodeMap {
    width: 960px;
    height: 540px;
    font-size: 20px;
    border: 1px solid red;
  }
}
</style>
