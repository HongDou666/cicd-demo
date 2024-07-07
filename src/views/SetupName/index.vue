<template>
  <div>NameSetup</div>
  <div>
    <define-options-children
      custom="customArrts"
      class="active"
      :obj="{
        name: 'kerwin',
        age: 100,
        list: [1, 2, 3]
      }" />
  </div>
</template>

<!-- 1. 第一种方法 -->
<!-- <script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'setup-name-custom',
  components: {},
  setup() {
    return {}
  }
})
</script> -->

<!-- 2. 第二种方法 -->
<!-- <script setup lang="ts" name="setup-name-custom">
// 1. yarn add vite-plugin-vue-setup-expand
// 2. vite.config 配置
// 3. import vueSetupExpand from 'vite-plugin-vue-setup-expand'
// 4. plugins: [vueSetupExpand()],
</script> -->

<!-- 3. 第三种方法 -->
<script setup lang="ts">
import DefineOptionsChildren from './modules/DefineOptionsChildren.vue'
import { defineOptions, onMounted } from 'vue'
defineOptions({
  name: 'SetupNameCustom',
  // inheritAttrs: false, // 阻止透传
  // customOptions: {}
  data() {
    return {
      message: 'Hello, Vue 3!'
    }
  },
  created() {
    console.log('2. created')
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
