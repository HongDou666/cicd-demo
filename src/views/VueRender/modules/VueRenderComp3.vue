<template>
  <div>
    <div>VueRenderComp3</div>
    <slot></slot>
    <slot name="hello"></slot>
    <slot name="hi" :render-params="['高铁', '绿皮', '动车']"></slot>
    <button @click="handleClick">子传父</button>
  </div>
</template>

<script setup lang="ts" name="VueRenderComp3">
interface Type1 {
  name: string
}
type Type2 = {
  name: string
  list: Type1[]
}

let prop = withDefaults(
  defineProps<{
    propsValueNumComp3?: number
    propsCarsInfoComp3?: Type2
  }>(),
  {
    propsValueNumComp3: 666,
    propsCarsInfoComp3: () => ({
      name: '小康',
      list: [
        {
          name: '奔驰'
        }
      ]
    })
  }
)

// 2. 自定义事件绑定ts类型 vue 3.3+ (另一种更简洁的语法)
const emit = defineEmits<{
  ok: [
    paramType: {
      event: Event
      value: string
    }
  ] // 具名元组语法
}>()

const handleClick = (e: Event) => {
  emit('ok', {
    event: e,
    value: '子组件信息'
  })
}
</script>

<style scoped></style>
