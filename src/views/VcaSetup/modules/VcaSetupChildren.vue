<template>
  <section>
    VcaSetupChildren
    {{ props.title }}
    <ul
      v-bind="{
        ...$attrs
      }">
      <li v-for="data in item?.list" :key="data">
        {{ data }}
      </li>
    </ul>
    <a-button @click="handleClick()">子传父</a-button>
    <h1>{{ dataNumber }}</h1>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  name: string
  age: number
  list: Array<number>
}

defineOptions({
  name: 'VcaSetupChildren'
  // inheritAttrs: false // 透传 禁止所有属性添加在子组件的根标签身上
})

// 接受父组件传来的属性值，如果没有接受的值，则默认添加在子组件的根标签身上（根标签必须存在）(但是添加inheritAttrs: false 则不会出现根标签身上)
const props = defineProps<{
  custom?: string
  title?: string
  item?: IProps
  dataNumber?: number
}>()

// 1. 自定义事件绑定ts类型
// const emit = defineEmits<{
//   (e: 'event', myvalue: string): void
// }>()

// 2. 自定义事件绑定ts类型 vue 3.3+ (另一种更简洁的语法)
const emit = defineEmits<{
  event: [myvalue: string] // 具名元组语法
}>()

const handleClick = () => {
  emit('event', `秦时明月${props.dataNumber}`)
}

const dataTest = ref([
  {
    name: '花木兰'
  },
  {
    name: '芈月'
  }
])
const handleChange = () => {}

// 自定义方法暴露给父组件调用
defineExpose({
  dataTest,
  handleChange
})
</script>

<style lang="scss" scoped></style>
