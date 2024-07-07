// createSharedComposable
// 让一个钩子函数可用于多个Vue实例中
import { createSharedComposable, useMouse } from '@vueuse/core'

const useSharedMouse = createSharedComposable(useMouse)

const useSharedFn = createSharedComposable(() => {
  const data = ref(100)
  const dataObj = reactive({
    name: '中国',
    deep: {
      city: '河南'
    }
  })

  const ComData = () => {
    data.value = data.value + 1
  }

  return {
    data,
    ComData,
    dataObj
  }
})

export { useSharedMouse, useSharedFn }
