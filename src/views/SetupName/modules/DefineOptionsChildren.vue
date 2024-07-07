<template>
  <div>DefineOptionsChildren</div>
</template>

<script setup lang="ts">
import { defineOptions, onMounted } from 'vue'
defineOptions({
  name: 'DefineOptionsChildren',
  // inheritAttrs: false, // 阻止透传
  // customOptions: {}
  data() {
    return {
      message: 'Hello, Vue 3!'
    }
  },
  created() {
    console.log('2')
  },
  mounted() {
    console.log('4')
    console.log(this.message)
  }
})
const props = defineProps(['obj', 'class', 'custom'])

console.log('1', props)

onMounted(() => {
  console.log('3')
})
</script>

<style scoped></style>
