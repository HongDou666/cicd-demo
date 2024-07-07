<template>
  <div>VueTsComp7</div>
  <div>
    <div ref="mydiv"></div>
    <VcaComp1
      style="background: rgb(253 184 138)"
      title="首页"
      :item="{
        name: 'kerwin',
        age: 100,
        list: [1, 2, 3]
      }"
      @event="handleEvent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import VcaComp1 from './child/VcaComp1.vue'
import type { Ref } from 'vue' // 来自vue的ts类型引入
export default defineComponent({
  name: 'VueTsComp7',
  components: {
    VcaComp1
  },
  setup() {
    interface IState {
      myname: string
    }

    const myname = ref('kerwin') //隐式推导
    const myname1: Ref<string> = ref('kerwin')
    const myname2 = ref<string>('kerwin')
    const mydiv1 = ref<IState>({
      myname: 'kerwin'
    })
    const mydiv = ref<HTMLDivElement>()

    const state = reactive({
      myname: 'kerwin'
    }) // 隐式推导
    const states: IState = reactive({
      myname: '100'
    })
    const states1 = reactive<IState>({
      myname: 'kerwin'
    })

    const handleEvent = (data: string) => {
      console.log('父组件evnet', data.substring(0, 1))
    }

    const computedName = computed<string>(() => myname.value.substring(0, 1).toUpperCase() + myname.value.substring(1))

    return {
      myname1,
      myname2,
      mydiv,
      mydiv1,
      myname,
      state,
      states,
      states1,
      handleEvent,
      computedName
    }
  }
})
</script>

<style scoped lang="less"></style>
