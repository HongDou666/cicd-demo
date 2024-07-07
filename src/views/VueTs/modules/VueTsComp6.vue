<template>
  <div>VueTsComp6</div>
  <PropsTsComp1
    :list="list"
    :number="num"
    :params="{
      name: '小明',
      age: 20,
      list: [200]
    }" />
</template>

<script setup lang="ts" name="VueTsComp6">
import PropsTsComp1 from './child/PropsTsComp1.vue'

// 定义一个接口，用于限制person对象的具体属性
interface PersonInter {
  id: string
  name: string
  age: number
}

// 一个自定义类型
// type Persons = Array<PersonInter>
type Persons = PersonInter[]

let num = ref(20)
let list = reactive<Persons>([
  { id: 'asudfysafd01', name: '张三', age: 18 },
  { id: 'asudfysafd02', name: '李四', age: 20 },
  { id: 'asudfysaf)d03', name: '王五', age: 22 }
])
</script>

<style scoped lang="less"></style>
