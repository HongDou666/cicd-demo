import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { useAppStoreI18n } from '@/store/I18n'
import { storeToRefs } from 'pinia'

const defaultLoadLang = 'zh-CN'

export let i18n: I18n

/**
 * 多语言可选项
 */
export enum Lang {
  zhCN = 'zh-CN',
  enUS = 'en-US'
}

async function createI18nOptions(): Promise<I18nOptions> {
  const appStore = useAppStoreI18n()
  const { locale } = storeToRefs(appStore)

  // 扩展可从服务器端获取语言翻译文件
  let defaultLocal
  try {
    defaultLocal = await import(`./lang/${locale.value}.ts`)
  } catch (e) {
    defaultLocal = await import(`./lang/${defaultLoadLang}.ts`)
  }
  /*  
  legacy: 是否启用传统模式。如果要支持 Composition API，则需要将该选项设置为 false，否则可以保持默认值或设置为 true。传统模式是指在 Vue 2.x 中的使用方式，Composition API 则是 Vue 3.x 中引入的新特性。

  locale: 设置当前的语言类型，比如 'zh-CN' 表示中文简体。这里使用了 locale.value 来动态设置当前语言类型。
  
  fallbackLocale: 设置一个默认的回退语言，当某个语言对应的翻译不存在时，会回退到此语言来显示。
  
  messages: 一个对象，包含了不同语言类型对应的翻译信息。在示例中，使用 defaultLocal.default 来设置当前语言类型对应的默认翻译信息。
  
  sync: 是否开启同步模式。当值为 true 时，将在组件实例中加入 $i18n 属性，用于在组件中访问国际化数据。
  
  silentTranslationWarn: 是否静默警告翻译。当值为 true 时，将禁用翻译警告。
  
  missingWarn: 是否在翻译缺失时显示警告。将其设置为 false 可以关闭缺失翻译的警告提示。
  
  silentFallbackWarn: 是否静默回退警告。当值为 true 时，将禁用回退警告提示。
  */
  return {
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    locale: locale.value,
    globalInjection: true, // 全局注册$t方法
    fallbackLocale: 'zh-CN',
    messages: {
      [locale.value]: defaultLocal.default
    },
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}

/**
 * 异步加载其他多语言
 * @param locale 语言类型
 * @returns 返回参数
 */
export async function loadLanguageAsync(locale: string) {
  const current = unref(i18n.global.locale)
  try {
    if (current === locale) return nextTick()
    let messages
    try {
      messages = await import(`./lang/${locale}.ts`)
    } catch (e) {
      messages = await import(`./lang/${defaultLoadLang}.ts`)
    }
    if (messages) i18n.global.setLocaleMessage(locale, messages.default)
  } catch (e) {
    console.warn('load language error', e)
  }
  return nextTick()
}
