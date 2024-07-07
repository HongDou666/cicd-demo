import { defineStore } from 'pinia'
import { createGlobalState, useStorage } from '@vueuse/core'
import { STORAGE_AUTHORIZE_KEY } from '@/config'

export const webSocketPinia = defineStore('webSocket', () => {
  const useAuthorization = createGlobalState(() => useStorage<null | string>(STORAGE_AUTHORIZE_KEY, null))

  return {
    useAuthorization
  }
})
