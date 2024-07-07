// 依赖: pnpm install -D stylelint stylelint-config-standard
// 依赖: pnpm install -D stylelint-config-prettier stylelint-config-html stylelint-order stylelint-less postcss-html postcss-less stylelint-config-standard-vue stylelint-config-recommended-less

/*
- stylelint-config-standard：StyleLint 推荐配置
- stylelint-config-prettier：关闭与 prettier 冲突的配置
- stylelint-config-standard-vue：StyleLint Vue 项目推荐配置
- postcss-html postcss-less：支持检查 less 与 html
- stylelint-order：支持 css 样式排序
*/
module.exports = {
  // 继承推荐规范配置
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
    'stylelint-config-recommended-less', // 配置 vue 中 less 样式格式化
    'stylelint-config-standard-vue' // StyleLint Vue 项目推荐配置
  ],
  // 添加规则插件
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  // 忽略检测文件
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml'],
  // 自定义配置规则
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式 | 指定类选择器的模式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许) | 便于配置变量 关闭未知属性检测
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask |  // 允许对应内核前缀
    'custom-property-pattern': null, // 关闭 自定义属性名校验 --custom-property
    // 允许 Vue 的 global
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'] // 忽略属性，修改element默认样式的时候能使用到
      }
    ],
    // 允许 Vue 的 v-deep
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    // 指定样式的排序 修复后会帮我们自动整理CSS样式的顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ],
    'font-family-no-duplicate-names': null,
    'no-duplicate-selectors': null
  }
}
