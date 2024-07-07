<template>
  <div>
    <vca-setup-children
      ref="vcaSetup"
      style="background: rgb(255 153 85)"
      :custom-type="'customType'"
      :item="{
        name: 'kerwin',
        age: 100,
        list: [1, 2, 3]
      }"
      :title="'123456789'"
      :custom="'custom'"
      :data-number="dataNumber"
      @event="handleEvent" />
  </div>
</template>

<script setup lang="ts" name="VcaSetup">
import VcaSetupChildren from './modules/VcaSetupChildren.vue'

const handleEvent = (value: string) => {
  console.log(value)
  dataNumber.value += 1
}

const dataNumber = ref(890)

// 1. const vcaSetup = ref() 没有组件上的ts类型提示
// 2. const vcaSetup = ref<InstanceType<typeof VcaSetupChildren>>() 会有组件上的ts类型提示

// typeof VcaSetupChildren => 获取类
// InstanceType<类>

// const vcaSetup = ref<InstanceType<typeof VcaSetupChildren>>()

// Ts函数封装 定义组件类型
const useCompRef = <T extends abstract new (...args: any) => any>() => {
  return ref<InstanceType<T>>()
}
const vcaSetup = useCompRef<typeof VcaSetupChildren>()

nextTick(() => {
  console.log(vcaSetup.value?.dataTest)
  console.log(vcaSetup.value?.handleChange)
})
</script>

<style lang="scss" scoped></style>
