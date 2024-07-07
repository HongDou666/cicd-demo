import { ref, computed } from 'vue'
import { createGlobalState } from '@vueuse/core'

/*
  createGlobalState:
  将状态保存全局作用域中，以便跨Vue实例复用
  该状态存储在内存中，刷新页面就丢失，如果希望刷新页面存在，可以与localstorage 一起用
*/

const useGlobalState = createGlobalState(() => {
  // state
  const count = ref(0)
  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }

  return {
    count,
    doubleCount,
    increment,
    decrement
  }
})

export default useGlobalState
