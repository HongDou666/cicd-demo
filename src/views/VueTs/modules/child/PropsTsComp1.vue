<template>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">{{ p.name }} -- {{ p.age }}</li>
    </ul>
    <!-- 此时不用在 props. -->
    <h1>{{ number }}</h1>
    <h1>{{ params.name }}{{ params.age }}</h1>
  </div>
</template>

<script setup lang="ts" name="PropsTsChildren">
import { withDefaults } from 'vue'

interface IProps {
  name: string
  age?: number
  list?: Array<number>
}
interface PersonInter {
  id: string
  name: string
  age: number
}
// type Persons = Array<PersonInter>
type Persons = PersonInter[]

// 1. 只接收list
// defineProps(['list'])

// 2. 接收list + 限制类型
// defineProps<{list:Persons}>()

// 3.1 接收list,params,number + 限制类型 + 限制必要性 + 指定默认值
let props = withDefaults(
  defineProps<{
    list?: Persons
    params?: IProps
    number: number // 必传属性
  }>(),
  {
    // 复杂数据类型，需要通过一个箭头函数return出来
    list: () => [{ id: 'ausydgyu01', name: '康师傅·王麻子·特仑苏', age: 19 }],
    // 基础数据类型，直接赋值
    number: 100,
    params: () => ({
      name: '小明',
      age: 19,
      list: [100]
    })
  }
)

// 3.2 接收list,params,number + 限制类型 + 限制必要性 + 指定默认值
// import { type PropType } from 'vue' // 来自vue的ts类型引入
// let props = defineProps({
//   list: {
//     type: Array as PropType<Persons>,
//     default: () => [{ id: 'ausydgyu01', name: '康师傅·王麻子·特仑苏', age: 19 }],
//     required: false
//   },
//   number: {
//     type: Number,
//     default: 0,
//     required: true,
//     validator: (value: number) => {
//       console.log(value)
//       return value > 10
//     }
//   },
//   params: {
//     type: Object as PropType<IProps>,
//     required: false,
//     default: () => ({
//       name: '小明',
//       age: 19,
//       list: [100]
//     })
//   }
// })
</script>

<style scoped lang="less">
.person {
  padding: 20px;
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;

  li {
    font-size: 20px;
  }
}
</style>
