// createInjectionState
// 创建可以注入到组件中的全局状态
import { computed, ref } from 'vue'
import { createInjectionState } from '@vueuse/core'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // state
  const count = ref(initialValue)

  // getters
  const double = computed(() => count.value * 2)

  // actions
  const increment = () => count.value++
  const decrement = () => count.value--

  return {
    count,
    double,
    increment,
    decrement
  }
})

export { useProvideCounterStore, useCounterStore }
