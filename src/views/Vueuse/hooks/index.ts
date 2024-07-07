// index.ts
import useGlobalState from './vue-use/createGlobalState'
import { useProvideCounterStore, useCounterStore } from './vue-use/createInjectionState'
import { useSharedMouse, useSharedFn } from './vue-use/createSharedComposable'

// useAsyncState
// 响应式获取异步状态。不会阻塞setup 函数，在promise完成后，将自动触发

// useRefHistory
// 跟踪 ref 的更改历史，提供撤消和回退功能

// useDebouncedRefHistory
// useRefHistory 的简写，带有防抖过滤器。

// useLastChanged
// 记录最后一次更改的时间戳

import {
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
} from '@vueuse/core'

export {
  useGlobalState,
  useProvideCounterStore,
  useCounterStore,
  useSharedMouse,
  useSharedFn,
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
}
