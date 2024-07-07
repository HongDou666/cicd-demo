import dayjs from 'dayjs'
import { i18n, Lang, loadLanguageAsync } from '@/locales'
import { createSharedComposable } from '@vueuse/core'
import 'dayjs/locale/zh-cn'

/**
 * 多语言相关的 `hook`，组件外或者 `setup` 上使用
 * @example
 * ```js
 * const { setLocale, locale, t } = useI18nLocale();
 * console.log(t('_Day'))
 * const switchLang = () => {
 * setLocale( Lang.zhCN);
 *
 *```
 */
export const useI18nLocale = createSharedComposable(() => {
  // 加载多语言的loading状态
  const loading = ref(false)

  // 多语言的信息
  const locale = computed<string>(() => {
    if (!i18n) return 'zh-CN'
    return unref(i18n.global.locale)
  })

  // 获取antd的多语言
  const antd = computed(() => {
    return (i18n?.global?.getLocaleMessage?.(unref(locale)) as any)?.antd || undefined
  })

  // 获取ele的多语言
  const ele = computed(() => {
    return (i18n?.global?.getLocaleMessage?.(unref(locale)) as any)?.ele || undefined
  })

  // 是否是中文
  const isZh = computed(() => {
    return locale.value === 'zh-CN'
  })

  // 切换多语言
  const setLocale = async (locale: Lang) => {
    if (!i18n) return
    if (loading.value) return

    loading.value = true
    try {
      // 加载多语言
      await loadLanguageAsync(locale)

      // 判断是否存在兼容模式
      if (i18n.mode === 'legacy') {
        i18n.global.locale = locale as any
      } else {
        ;(i18n.global.locale as any).value = locale as any
      }

      // 设置html标签的自定义属性
      ;(document.querySelector('html') as HTMLElement).setAttribute('lang', locale)

      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }

  watch(
    locale,
    () => {
      if (antd.value && antd.value.locale) {
        dayjs.locale(antd.value.locale)
      }
      if (ele.value && ele.value.name) {
        dayjs.locale(ele.value.name)
      }
      // 此处可以切换页面标题的语言
      // const route = router.currentRoute.value;
      // useMetaTitle(route);
    },
    {
      immediate: true
    }
  )

  /**
   * 翻译多语言
   * @param key 多语言对应的Key值
   * @param params 多语言文本的变量值
   * @param defaultMessage 未设置多语言时使用此默认值
   * @returns
   */
  const t = (key: string, params?: Record<string, string>, defaultMessage?: string) => {
    const message = (i18n?.global as any)?.t(key, params)
    if (message !== key) {
      return message
    } else {
      return defaultMessage ?? key
    }
  }

  return {
    locale,
    t,
    antd,
    ele,
    setLocale,
    isZh,
    loading
  }
})

/**
 * @deprecated 迭代原因，任保留此函数，但推荐使用 `useI18nLocale`
 * @description 根据当前`key`展示当前语言的文本
 * @param key 多语言K值
 * @returns
 */
export function i18nRender(key: string) {
  const { t } = useI18nLocale()
  return t(`${key}`)
}

export default i18n
