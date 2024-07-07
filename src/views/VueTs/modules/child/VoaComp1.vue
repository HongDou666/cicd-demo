<template>
  <section>
    VoaComp1
    <ul>
      <li v-for="data in item?.list" :key="data">
        {{ data }}
      </li>
    </ul>
    <a-button @click="handleClick()">子传父</a-button>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue' // 来自vue的ts类型引入

interface IProps {
  name: string
  age: number
  list: Array<number>
}

export default {
  name: 'VoaComp1',
  // inheritAttrs: false, // 阻止透传
  props: {
    // title: String, // 未结合ts (先不接受 就会加在section标签上 作为自定义属性)
    item: Object as PropType<IProps>
  },
  // 自定义事件（子传父）
  // emits: { 'event-ok': null }, 1. 方式1
  // emits: ['event-ok'], 2. 方式2
  // 3. 方式3
  emits: {
    // eventOk(param: string) {
    //   return param
    // }
    'event-ok': (param: string) => param
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit('event-ok', '子组件的信息')
    }
  }
}
</script>
