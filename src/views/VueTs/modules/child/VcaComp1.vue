<template>
  <div>
    VcaComp1
    <ul>
      <li v-for="data in item?.list" :key="data">
        {{ data }}
      </li>
    </ul>
    <a-button @click="handleClick()">子传父</a-button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue' // 来自vue的ts类型引入

interface IProps {
  name: string
  age: number
  list: Array<number>
}

export default {
  name: 'VcaComp1',
  props: {
    title: String, // 未结合ts
    item: Object as PropType<IProps>
  },
  emits: ['event'],
  setup(_, context) {
    const handleClick = () => {
      context.emit('event', 'test数据01')
    }
    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped></style>
