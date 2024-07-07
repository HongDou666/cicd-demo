<template>
  <div>
    VueSlotComp3
    <slot :def="'作用域默认插槽'"></slot>
    <slot name="Children_1" :youxi="games" :x="100" y="你好"></slot>
    <slot name="Children_2" :youxi="games" x="哈哈" y="你好"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, useSlots, defineSlots } from 'vue' // 来自vue的ts类型引入

defineOptions({
  name: 'VueSlotComp3'
})

interface GameType {
  id: string
  name: string
}

let games = reactive<GameType[]>([
  { id: 'asgytdfats01', name: '英雄联盟' },
  { id: 'asgytdfats02', name: '王者农药' },
  { id: 'asgytdfats03', name: '红色警戒' },
  { id: 'asgytdfats04', name: '斗罗大陆' }
])

defineSlots<{
  Children_1?: (props: { youxi: GameType[]; x: number; y: string }) => any
  Children_2?: (props: { youxi: GameType[]; x: string; y: string }) => any
  default: (props: { def: string }) => any
}>()

let slots: any = useSlots() // 结合插槽作用域
console.log(slots)
console.log(slots.Children_1)
console.log(slots.Children_1([]))
</script>

<style scoped></style>
