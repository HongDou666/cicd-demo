<template>
  <div>ElementPlusUIDrop</div>

  <div class="custom_carbon_emission_target_plan_curve">
    <div class="l">
      <div :draggable="true" class="drag s" @dragstart="dragstart" @drag="drag" @dragend="dragend"></div>
    </div>
    <div
      class="drag r"
      :draggable="true"
      @dragenter.prevent="dragenter"
      @dragover.prevent.stop="dragover"
      @dragleave="dragleave"
      @drop.prevent.stop="drop"></div>
  </div>
</template>

<script setup lang="ts" name="ElementPlusUIDrop">
// 拖动事件开始
const dragstart = () => {
  console.log('我开时被拖动啦')
}
// 元素正在拖动时触发
const drag = (e) => {
  e.stopPropagation()
  //   console.log('我正在被拖动啦')
}
// 用户完成元素拖动后触发
const dragend = () => {
  console.log('我被丢弃了啊')
}
// 当被鼠标拖动的对象进入其容器范围内时触发此事件
const dragenter = () => {
  console.log('有个拖动的元素进我这里啦')
}
// 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
const dragover = (e) => {
  e.stopPropagation()
  //   console.log('元素在我这里持续拖动')
}
// 当被鼠标拖动的对象离开其容器范围内时触发此事件
const dragleave = () => {
  console.log('有个拖动的元素从我这里出去啦')
}
// 在一个拖动过程中，释放鼠标键时触发此事件
const drop = (e) => {
  e.stopPropagation()
  console.log('有个拖动的元素释放在我这里啦', e)
}
</script>

<style scoped lang="less">
.custom_carbon_emission_target_plan_curve {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.l,
.r {
  width: 45%;
  height: 100px;
  border: 1px solid red;
}

.s {
  width: 70px;
  height: 70px;
  background: #f60;
}
</style>
