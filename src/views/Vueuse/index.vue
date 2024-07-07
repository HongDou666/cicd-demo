<template>
  <a-card title="createGlobalState">
    <div class="count">
      <p>{{ count }}</p>
      <p>{{ doubleCount }}</p>
      <VueuseComp1></VueuseComp1>
    </div>
  </a-card>

  <a-card title="createInjectionState">
    <div>
      <VueuseComp2>
        <VueuseComp3 />
        <VueuseComp4 />
      </VueuseComp2>
    </div>
  </a-card>

  <a-card title="createSharedComposable">
    <div>
      <VueuseComp5 />
      <VueuseComp6 />
    </div>
  </a-card>

  <a-card title="useAsyncState">
    <div class="use-async-state">
      <p>Ready:{{ ajaxData.isReady ? '待请求' : '请求中' }}</p>
      <p>Loading:{{ ajaxData.isLoading ? '加载中' : '未加载' }}</p>
      <p>数据:{{ ajaxData.state || '~~~' }}</p>
      <a-button @click="loadData">加载数据</a-button>
    </div>
  </a-card>

  <a-card title="useRefHistory">
    <div class="use-ref-history">
      count: {{ count1 }} <br />
      <a-button @click="increment">增加</a-button>
      <a-button @click="decrement">减少</a-button>
      <a-button @click="undo">回到上一步</a-button>
      <a-button @click="redo">回到下一步</a-button>
      <ul>
        <li v-for="item in history" :key="item.timestamp">{{ item.timestamp }}: {{ item.snapshot }}</li>
      </ul>
    </div>
  </a-card>

  <a-card title="useDebouncedRefHistory">
    <div class="use-debounced-ref-history">
      count: {{ count2 }} <br />
      <a-button @click="increment2">增加(自带防抖)</a-button>
      <a-button @click="decrement2">减少(自带防抖)</a-button>
      <a-button @click="undo2">回到上一步</a-button>
      <a-button @click="redo2">回到下一步</a-button>
      <ul>
        <li v-for="item in history2" :key="item.timestamp">{{ item.timestamp }}: {{ item.snapshot }}</li>
      </ul>
    </div>
  </a-card>

  <a-card title="useLastChanged">
    <div class="use-last-changed">
      <a-input v-model:value="input" />
      <p>时间戳: {{ lastChanged }}</p>
      <p>最后改变的时间: {{ lastChangedTime }}</p>
    </div>
  </a-card>

  <a-card title="useStorage">
    <div class="use-storage">
      <p>sessionStorageObj : {{ sessionStorageObj }}</p>
      <p>sessionStorage : {{ sessionStorageValue }}</p>
      <a-button @click="edit">修改浏览器会话存储的相关数据</a-button>
      <a-button @click="clear">清除浏览器（本地 会话）存储的相关数据</a-button>
      <a-button @click="look">查看浏览器（本地 会话）存储的相关数据</a-button>
    </div>
  </a-card>

  <a-card title="useToggle">
    <div>
      <p>开关: {{ isFlag ? 'ON' : 'OFF' }}</p>
      <a-button @click="setFlag()">Toggle</a-button>
      <a-button @click="isFlag = true">Set ON</a-button>
      <a-button @click="isFlag = false">Set OFF</a-button>
    </div>
  </a-card>

  <a-card title="useCssVar">
    <div class="useCssVar">
      <h1>useCssVar</h1>
      <a-button @click="handleColor">更改全局颜色变量</a-button>
    </div>
  </a-card>
</template>
<script lang="ts" setup name="Vueuse">
import { onMounted, reactive, ref } from 'vue'
import VueuseComp1 from './modules/VueuseComp1.vue'
import VueuseComp2 from './modules/VueuseComp2.vue'
import VueuseComp3 from './modules/VueuseComp3.vue'
import VueuseComp4 from './modules/VueuseComp4.vue'
import VueuseComp5 from './modules/VueuseComp5.vue'
import VueuseComp6 from './modules/VueuseComp6.vue'
import {
  useGlobalState,
  useAsyncState,
  useRefHistory,
  useDebouncedRefHistory,
  useLastChanged,
  useStorage,
  useSessionStorage,
  useLocalStorage,
  useToggle,
  useDark,
  useTitle,
  useCssVar
} from './hooks/index'

/* 1. createGlobalState */
const { count, doubleCount } = useGlobalState()
/* 1. createGlobalState */

/* 2. useAsyncState */
const ajaxData = reactive({
  state: '',
  isReady: false,
  isLoading: false
})
const fetchUser = async (id: number) => {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  return resp.json()
}
const loadData = () => {
  Object.assign(ajaxData, {
    state: '',
    isLoading: true,
    isReady: false
  })
  const { execute } = useAsyncState(fetchUser, null, {
    immediate: false,
    delay: 0,
    onSuccess: (data) => {
      Object.assign(ajaxData, {
        state: data,
        isLoading: false,
        isReady: true
      })
    }
  })
  // 3秒后执行fetchUser函数
  execute(3000, 1)
}
onMounted(() => {
  loadData()
})
/* 2. useAsyncState */

/* 3. useRefHistory */
const count1 = ref(0)
const { history, undo, redo } = useRefHistory(count1)
const increment = () => {
  count1.value++
}
const decrement = () => {
  count1.value--
}
/* 3. useRefHistory */

/* 4. useDebouncedRefHistory */
// 当count2的值发生变化时，产生的记录有防抖功能
// 扩展： (useThrottledRefHistory: 节流)
// 扩展： (useManualRefHistory: 必须调用了commit 方法才会产生记录) const { history, undo, redo, commit } = useRefHistory(count1)
const count2 = ref(0)
const {
  history: history2,
  undo: undo2,
  redo: redo2
} = useDebouncedRefHistory(count2, {
  deep: true,
  debounce: 2000
})
const increment2 = () => {
  count2.value++
  // commit()
}
const decrement2 = () => {
  count2.value--
  // commit()
}
/* 4. useDebouncedRefHistory */

/* 5. useLastChanged */
import dayjs from 'dayjs'
const input = ref(0)
const lastChanged = useLastChanged(input)
const lastChangedTime = computed(() => {
  if (lastChanged.value) {
    return dayjs(+lastChanged.value as unknown as string).format('YYYY-MM-DD HH:mm:ss') // 这里你可以根据需要选择日期格式
  }
  return '----'
})
/* 5. useLastChanged */

/* 6. useStorage */
// 响应式的 LocalStorage/SessionStorage
const localStorageValue = useStorage('my-localStorage', 'hello localStorage !', localStorage)
const sessionStorageValue = useStorage('my-sessionStorage', 'hello sessionStorage !', sessionStorage)
let sessionStorageObj: any = useStorage('my-sessionStorageObj', { a: 10, b: 15, c: 20 }, sessionStorage)
const options = { mergeDefaults: true } // 合并默认值,但是不会改变原来存储的数据(a: 1000 无效)
sessionStorageObj = useStorage('my-sessionStorageObj', { a: 1000, c: 30, d: 400, e: 500 }, sessionStorage, options)

const edit = () => {
  sessionStorageValue.value = 'Hi sessionStorage !'
}
const clear = () => {
  sessionStorageValue.value = null
  sessionStorageObj.value = null
  localStorageValue.value = null
  useLocalStorageValue.value = null
  useSessionStorageValue.value = null
}
const look = () => {
  console.log(localStorageValue)
  // console.log(useStorage('my-localStorage', null, localStorage))

  console.log(sessionStorageValue)
  // console.log(useStorage('my-sessionStorage', null, sessionStorage))

  console.log(sessionStorageObj)
  // console.log(useStorage('my-sessionStorageObj', null, sessionStorage))
}
/* 6. useStorage */

/* 7. useStorageAsync*/
// 支持异步的响应式Storage
/* 7. useStorageAsync*/

/* 8. useLocalStorage */
// 响应式的 LocalStorage，方法是基于useStorage,使用方式同useStorage。
const useLocalStorageValue = useLocalStorage('my-useLocalStorage', 'hello useLocalStorage !~~~')
console.log(useLocalStorageValue.value) // hello useLocalStorage
/* 8. useLocalStorage */

/* 9. useSessionStorage */
// 响应式的 SessionStorage，方法是基于useStorage,使用方式同useStorage。
const useSessionStorageValue = useSessionStorage('my-useSessionStorage', 'hello useSessionStorage !~~~')
console.log(useSessionStorageValue.value) // hello useSessionStorage
/* 9. useSessionStorage */

/* 10. useToggle */
// 该函数可以在两个状态之间切换
const [isFlag, setFlag] = useToggle(false)
watchEffect(() => {
  console.log('isFlag -> ', isFlag.value)
})
/* 10. useToggle */

/* 11. useDark */
// 该函数可以根据操作系统的Dark模式或用户自行设置的主题，切换我的网站到暗黑模式/浅色模式。
const isDark = useDark()
const toggleDark = useToggle(isDark)
toggleDark(true) // html标签会有class="dark"
/* 11. useDark */

/* 12. useTitle */
useTitle('标题名称 - Vueuse的使用') // 修改标题名称
/* 12. useTitle */

/* 13. useCssVar */
const colorMain = useCssVar('--color-main', null)
const handleColor = () => {
  colorMain.value = '#ff4d4f'
}
/* 13. useCssVar */
</script>

<style scoped lang="less">
.ant-card {
  margin-bottom: 20px;

  .useCssVar h1 {
    color: var(--color-main);
  }
}
</style>
