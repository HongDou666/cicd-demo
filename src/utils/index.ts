import CryptoJS from 'crypto-js'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

/* 防抖功能 */
export function debounce(func, duration = 1000) {
  let timerId
  function _executor(...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      func.call(this, ...args)
    }, duration)
  }
  _executor.cancel = () => {
    clearTimeout(timerId)
  }
  return _executor
}

/* window.btoa-加密 */
export function encryptionData(data: any) {
  return window.btoa(unescape(encodeURIComponent(JSON.stringify(data))))
}

/* window.atob-解密 */
export function decryptionData(data: any) {
  return JSON.parse(decodeURIComponent(escape(window.atob(data))))
}

/* 随机生成指定数量的16进制key */
export function generatekey(num: number) {
  const library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < num; i++) {
    const randomPoz = Math.floor(Math.random() * library.length)
    key += library.substring(randomPoz, randomPoz + 1)
  }
  return key
}

/* AES加密 */
export function encrypt(word, keyStr?: string) {
  keyStr = keyStr ? keyStr : 'abcdsxyzhkj12345' //判断是否存在ksy，不存在就用定义好的key
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

/* AES解密 */
export function decrypt(word, keyStr?: string) {
  keyStr = keyStr ? keyStr : 'abcdsxyzhkj12345'
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

/* 文件下载 */
export function downloadFile(file) {
  try {
    const blob = new window.Blob([file], { type: file.type })
    const a = document.createElement('a')
    a.innerHTML = file.name || '自定义名称' // 设置a标签显示的文本
    // a.download = file.name // 指定下载文件生成的文件名
    a.setAttribute('download', file.name || '自定义名称') // 指定下载文件生成的文件名
    const url = URL.createObjectURL(blob) // 生成下载的链接
    a.href = url // 绑定a标签的href
    document.body.appendChild(a) // 添加a标签到body中
    const evt = document.createEvent('MouseEvents') // 创建事件
    evt.initEvent('click', false, false) // 初始化事件
    a.dispatchEvent(evt) // 触发事件
    document.body.removeChild(a) // 移除a标签
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('下载文件失败:', error)
  }
}

/* 自定义一个方法 用做单元测试 */
export const testArr = (value1: number, value2: number) => {
  return [value1, value2]
}

/* 自定义一个全局方法 */
export const globalFn = (val: any) => {
  console.log(val)
}

/* 自定义一个全局变量 */
export const globalVariate = '自定义全局变量'

/* 路由跳转之后关闭loading页面 */
export const useLoadingCheck = () => {
  const loading = document.querySelector('body > #loading-app')
  if (loading) {
    const body = document.querySelector('body')
    setTimeout(() => {
      body?.removeChild(loading)
      // 开启页面滚动
      Move()
    }, 100)
  }
}

/* 停止页面滚动 */
export const stopMove = () => {
  const m1 = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = 'hidden'
  // 禁止页面滑动
  document.addEventListener('touchmove', m1, { passive: false })
}

/* 开启页面滚动 */
export const Move = () => {
  const m2 = function (e) {
    e.preventDefault()
  }
  // 出现滚动条
  document.body.style.overflow = ''
  // 取消禁止页面滑动
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  document.removeEventListener('touchmove', m2, { passive: true })
}

/* 设置网站标题 */
export const useMetaTitle = (route: RouteRecordRaw | RouteLocationNormalizedLoaded) => {
  const { name } = route.meta ?? {}
  if (name) {
    useTitle(name)
  }
}

/* 将网页滚动卷起的高度设置为 0 */
export const useScrollToTop = () => {
  const app = document.getElementById('app')
  if (app) {
    setTimeout(() => {
      app.scrollTo({
        top: 0,
        left: 0
      })
    }, 300)
  }
}
