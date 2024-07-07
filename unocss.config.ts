/* unocss 配置文件 */
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unoCSS'

/* 因为这些函数已经被包含在 unoCSS 的核心包中，而不用作为单独的包进行依赖下载 */
// 1. pnpm i -D @unoCSS/preset-uno 默认预设 ( 添加 UnoCSS 的默认样式预设 )
// 2. pnpm i -D @unoCSS/preset-attributify 为其他规则启用属性化模式
// 3. pnpm i -D @unoCSS/preset-icons 由 Iconify 提供支持的纯 CSS 图标解决方案
/* 因为这些函数已经被包含在 unoCSS 的核心包中，而不用作为单独的包进行依赖下载 */

/* 图标使用 */
// pnpm i @iconify/json 使用图标（结合 - unoCSS）
// 例子: <div class="i-logos-autocode w-50 h-50"></div>
/* 图标使用 */

/* vscode安装插件 UnoCSS、Iconify IntelliSense、WindiCSS IntelliSense */
// 1. unocss插件: 不仅有输入提示，并且还可以鼠标悬浮显示编译后的css样式,但是合并的样式不提示
// 2. WindiCSS IntelliSense 插件: 合并样式会提示
// 3. Iconify IntelliSense 插件: 提示iconify的icon
/* vscode安装插件 UnoCSS、Iconify IntelliSense、WindiCSS IntelliSense */

const theme = {
  colors: {
    bgColor: 'var(--bg-color)', // class="text-bg-color" |  class="text-bgColor"
    veryCool: '#0000ff', // class="text-very-cool" |  class="text-veryCool"
    brand: {
      primary: 'rgb(167 255 99)' // class="text-brand-primary"
    }
  }
}

// 配置css原子化
export default defineConfig({
  presets: [
    presetUno(), // 添加 UnoCSS 的默认样式预设
    presetAttributify(), // 为其他规则启用属性化模式
    presetIcons() // 由 Iconify 提供支持的纯 CSS 图标解决方案
  ],
  rules: [
    ['flex', { display: 'flex' }],
    ['color-green', { color: 'green' }],
    ['font40', { 'font-size': '40px' }],
    ['font30', { 'font-size': '30px' }],
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
    [/^w-(\d+)$/, ([, d]: any) => ({ width: `${d / 4}rem` })],
    [/^h-(\d+)$/, ([, d]: any) => ({ height: `${d / 4}rem` })],
    [
      /^zqc-(.*)$/,
      ([, c], { theme }: any) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      }
    ]
  ],
  // 组合样式-自定义
  shortcuts: {
    fuck: ['color-green', 'font40', 'flex']
  },
  theme: theme
})
