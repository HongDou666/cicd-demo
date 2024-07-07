<template>
  <div>
    {{ num }}
    <a-button type="primary" @click="handleClick">add加一</a-button>

    <a-button type="primary" @click="handleClick1">watchEffect1_test</a-button>
    <a-button type="primary" @click="handleClick2">watchEffect2_test</a-button>
    <div v-for="(item, index) in arr" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts" name="WatchStop">
import { ref, watch, watchEffect, reactive } from 'vue'
let num = ref(100)
let obj = reactive({
  age: 10
})
let obj1 = reactive({
  age: 50,
  name: '雄安',
  data: {
    num: 80
  }
})

let arr = reactive([1, 2, 3, 4, 5])
const handleClick2 = () => {
  Object.assign(arr, [...arr, arr.length + 1])
}

const handleClick1 = () => {
  Object.assign(obj1, {
    data: {
      num: obj1.data.num + 2
    }
  })
}
const handleClick = () => {
  num.value++
  obj.age = obj.age + 1
}
const stopwatch = watch(
  num,
  (newValue: number | undefined, oldValue: number | undefined): void => {
    console.log('num发生变化1', newValue, oldValue)
    // 确保newValue存在
    if (newValue! >= 105) {
      stopwatch()
    }
  },
  {
    immediate: true
  }
)

watchEffect(() => {
  console.log('num发生变化', num.value)
})

watchEffect(() => {
  console.log('obj.age发生变化', obj.age) // 对象的其中一个属性
})

watchEffect(() => {
  // 1. watchEffect不能监听整个对象 或者 数组 , 因为他无法检测对象内部的变化, 初始时就执行一次
  // 2. 可检测对象里的某一个属性，无论此属性是否为对象，都可以实现监听
  // 3. 如果是数组的话，就要监听数组发生变化的某个索引的值
  console.log('obj1.data发生变化', obj1.data)
})

watchEffect(() => {
  console.log('arr发生变化', arr[arr.length - 1])
})
</script>

<style scoped></style>
