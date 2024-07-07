<template>
  <div>
    <h1>中文输入法导致的高频事件</h1>

    <a-input
      v-model:value="value"
      placeholder="Basic usage"
      @compositionstart="handleCompositionstart"
      @compositionend="handleCompositionend"
      @change="handleChange" />
  </div>
</template>

<script setup lang="ts" name="ChineseInputMethod">
import { debounce } from '@/utils/index'

const value = ref('')

// 中文输入开始
const handleCompositionstart = () => {
  console.log('中文输入开始')
}

// 中文输入结束
const handleCompositionend = () => {
  console.log('中文输入结束')
}

const handleChange = () => {
  search()
}

const search = debounce(() => {
  console.log(value.value)
})
</script>

<style scoped></style>
