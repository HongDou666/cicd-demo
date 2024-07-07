/* 引入vite默认自带的环境变量配置文件 */
import { fileURLToPath } from 'node:url'

/* 引入path模块 */
import path from 'path'

/* 引入Vue模板文件编译插件 */
import vue from '@vitejs/plugin-vue'

/* 预加载能够提升页面的性能，加快页面加载速度 */
import VitePluginPreloadAll from '@mistjs/vite-plugin-preload'

/* vite启动快的原理，也导致了他在加载依赖项很多，很复杂的页面时，页面打开慢。因为他要进行一系列的动态分析/动态资源引入/动态编译（下列优化方案 PkgConfig 与 OptimizationPersist 同时使用） */
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'

/* 说明: 该包是用于配置vite运行的时候自动检测eslint规范 =>不符合页面会报错 */
import eslintPlugin from 'vite-plugin-eslint'

/* 对script标签身上支持name属性 */
import vueSetupExpand from 'vite-plugin-vue-setup-expand'

/* 自动导入包工具 pnpm install unplugin-auto-import */
import AutoImport from 'unplugin-auto-import/vite'

/* 自动导入组件 */
import Components from 'unplugin-vue-components/vite'

/* 内置了对一些流行UI库的解析器，例如Vuetify、Ant Design Vue和Element Plus，您可以通过以下方式启用它们 */
import {
  ElementPlusResolver
  // AntDesignVueResolver,
  // VantResolver
} from 'unplugin-vue-components/resolvers'

/* 使用 AntdvResolver 解析器函数可以自动解析导入的 Ant Design Vue 组件并将其导入到应用程序中 */
import AntdvResolver from 'antdv-component-resolver'

/* 使用 AntdvResolver 解析器函数可以自动解析导入的 Vant 组件并将其导入到应用程序中 */
import { VantResolver } from '@vant/auto-import-resolver'

/* 
开启ElementPlus自动引入CSS（npm i unplugin-element-plus -D）
  当我们想要使用命令的方式创建element组件时，样式会无法自动引入
  import { ElMessage } from 'element-plus'
  import 'element-plus/es/components/button/style/css'（我们想要省略此处手动引入css, 导致样式会丢失）
  ElMessage.warning('warning')
*/
import ElementPlus from 'unplugin-element-plus/vite'

/* ElementPlus Icon 自动导入配置 */
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
/* ElementPlus Icon 自动导入配置 */

/* 方式1： vue3-vite 引入svg 需要用到插件 */
import svgLoader from 'vite-svg-loader'

/* 方式2： vue3-vite 引入svg 需要用到插件 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/* 引入插件, 支持.jsx */
import vueJsx from '@vitejs/plugin-vue-jsx'

/* 安装 UnoCSS 插件（预设css） */
import UnoCSS from 'unocss/vite'

/* 打包文件可视化 */
import { visualizer } from 'rollup-plugin-visualizer'

/* 自动在index.html页面添加CDN依赖引入,打包后可在index.html查看效果（一般配合rollup-plugin-external-globals使用） */
import { createHtmlPlugin } from 'vite-plugin-html'

/* 当前端资源过大时，服务器请求资源会比较慢。前端可以将资源通过Gzip压缩使文件体积减少大概60%左右，压缩后的文件，通过后端简单处理，浏览器可以将其正常解析出来 */
import ViteCompression from 'vite-plugin-compression'

/* Brotli 是谷歌推出的开源压缩算法，比常见的 Gzip 有着更高效的压缩网页中的各类文件大小，提高加载速度。Brotli 压缩只在 https 下生效，因为 在 http 请求中 request header 里的 Accept-Encoding 是没有 br 的，只有 gzip, deflate 。并且 Brotli 和 gzip 是可以并存的，因此无需关闭 gzip，客户端可以根据其能力选择最适合的压缩算法，比如知乎就用了 br 压缩，虽然 br 压缩目前不是主流，但是它确实很高效 */
import brotli from 'rollup-plugin-brotli'

/* 使业务模块文件打包支持 webpack 中的 webpackchunkname 
    前提: 需要在自动注册组件配置中Components 添加 include: [/\.vue$/, /\.vue\?/]
    写法形式 例如路由中配置的 component */
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'

/* 引入vite带有的ts配置文件 */
import type { PluginOption } from 'vite'

/* cdn外链引入 路径配置 */
const cdn = {
  css: [],
  js: [
    'https://unpkg.com/moment@2.30.1/moment.js',
    'https://unpkg.com/vue@3.4.30/dist/vue.global.js',
    'https://unpkg.com/pinia@2.1.7/dist/pinia.iife.js',
    'https://unpkg.com/axios@1.7.2/dist/axios.min.js',
    'https://unpkg.com/echarts@5.5.0/dist/echarts.js',
    'https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.mjs',
    'https://unpkg.com/sortablejs@1.15.2/Sortable.min.js',
    'https://unpkg.com/mockjs2@1.0.8/dist/mock.js'
  ]
}

export function createVitePlugins(env: Record<string, string>, pathSrc: string, isProduction: boolean) {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    /* Vue模板文件编译插件 */
    vue(),
    /* 预加载能够提升页面的性能，加快页面加载速度 */
    VitePluginPreloadAll(),
    /* 说明: 该包是用于配置vite运行的时候自动检测eslint规范 =>不符合页面会报错 */
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
    }),
    /* 对script标签身上支持name属性 */
    vueSetupExpand(),
    /* 开启ElementPlus自动引入CSS */
    ElementPlus({}),
    /* 配置自动导入 */
    AutoImport({
      /* 自动导入包的名字 */
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'pinia'],
      /* 处理eslint(直接用ref...不引入的话，会触发eslint校验提示 ref 不存在) */
      eslintrc: {
        enabled: true, // 开启eslint检测
        filepath: './.eslintrc-auto-import.json', // 配置文件路径
        globalsPropValue: true // 允许在模板中使用未声明的全局变量
      },
      /* 针对自己写的模块完成自动导入 */
      dirs: ['./src/api/function-ts'],
      /* 兼容ts不报错 默认情况下启用，如果安装了 `typescript` */
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'), // './src/auto-imports.d.ts',
      resolvers: [
        /* vant组件按需导入 */
        VantResolver(),
        /* Element Plus UI组件包按需导入 */
        ElementPlusResolver(),
        /* 自动导入图标组件 */
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    /* 配置自动注册组件 */
    Components({
      /* 组件的有效文件扩展名 */
      extensions: ['vue', 'md'],
      /* 用于转换目标的过滤器 */
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      /* 
        生成 `components.d.ts` 全局声明文件，也可以指定自定义文件名的路径。
        默认值：如果安装了 `typescript` 包，则为 `true`。
      */
      // 1. dts: './src/components.d.ts',
      // 2. dts: fileURLToPath(new URL(pathSrc, import.meta.url)),
      // 3. dts: path.resolve(pathSrc, 'components.d.ts'),
      dts: path.resolve(pathSrc, 'components.d.ts'),
      /* 相对路径，用于搜索组件的目录。(按需加载的文件夹 global文件下的组件会被自动导入为全局组件) */
      dirs: [fileURLToPath(new URL('./src/components/global', import.meta.url))], // 'src/components/global',

      /* 匹配文件名作为组件的Glob模式。当指定时，`dirs` 和 `extensions` 选项将被忽略。 */
      // globs: ['src/components/*.{vue}'],

      /* 允许子目录作为组件的命名空间前缀 */
      directoryAsNamespace: false,

      /* 折叠相同前缀（对大小写敏感）的文件夹和组件，以防止在命名空间组件名称中出现重复。当 `directoryAsNamespace: true` 时有效 */
      collapseSamePrefixes: false,

      /* 忽略命名空间前缀的子目录路径。当 `directoryAsNamespace: true` 时有效。 */
      globalNamespaces: [],

      /* 
        自动导入指令。
        默认值：对于Vue 3为 `true`，对于Vue 2为 `false`。
        针对Vue 2，为了性能考虑，默认情况下禁用了Babel转换。
        若要安装Babel，请运行：`npm install -D @babel/parser`
      */
      // directives: true,

      /* 解析前转换路径。 */
      // importPathTransform: v => v,

      /* 允许组件覆盖具有相同名称的其他组件 */
      allowOverrides: false,

      /* 项目的Vue版本。如果未指定，将自动检测。可接受的值：2 | 2.7 | 3 */
      // version: 3,

      /* 仅提供库中组件（全局注册）的类型。 */
      types: [],

      /* 是否搜索子目录 */
      deep: true,
      // 自定义组件的解析器
      resolvers: [
        /* 自动导入 vant 组件 */
        VantResolver(),
        // AntDesignVueResolver({
        //  importStyle?: boolean | 'css' | 'less'
        // }),
        /* 自动导入 Ant Design Vue UI 组件 */
        AntdvResolver(),
        /* 自动导入 Element Plus UI 组件 */
        ElementPlusResolver(),
        /* 自动注册 Element Plus icon 图标组件 */
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    /* 自动导入 Element Plus 图标组件 */
    Icons({
      autoInstall: true
    }),
    /* 注册 svg-sprite-loader 更方便在组件中使用svg */
    svgLoader({
      defaultImport: 'url'
    }),
    /* 可封装全局svg组件 */
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
    /* 注册插件 jsx文件编译插件 */
    vueJsx(),
    /* 注册插件-UnoCSS */
    UnoCSS(),
    /* 打包开启 gzip 压缩 */
    ViteCompression({
      threshold: 1024 * 10, // 对超过10kb的数据压缩
      ext: '.gz', // 压缩后缀
      algorithm: 'gzip' // 压缩算法(默认: gzip)
    }),
    /* 打包开启 br 压缩 */
    // brotli({}),
    /* 第三方依赖以外链cdn形式在index.html自动引入 */
    createHtmlPlugin({
      inject: {
        data: {
          // 1. cdn外链引入配置（形式1）
          // momentscript: '<script src="https://unpkg.com/moment@2.30.1/moment.js"></script>',
          // vuescript: '<script src="https://unpkg.com/vue@3.4.30/dist/vue.global.js"></script>',
          // piniascript: '<script src="https://unpkg.com/pinia@2.1.7/dist/pinia.iife.js"></script>',
          // axiosscript: '<script src="https://unpkg.com/axios@1.7.2/dist/axios.min.js"></script>',
          // echartsscript: '<script src="https://unpkg.com/echarts@5.5.0/dist/echarts.js"></script>',
          // pdfjsLibscript: '<script src="https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.mjs"></script>',
          // sortablejsscript: '<script src="https://unpkg.com/sortablejs@1.15.2/Sortable.min.js"></script>',
          // mockjs2script: '<script src="https://unpkg.com/mockjs2@1.0.8/dist/mock.js"></script>',

          // 2. cdn外链引入配置（形式2）
          cdnCss: isProduction ? cdn.css : [],
          cdnJs: isProduction ? cdn.js : []
        }
      }
    }),
    /* 支持 webpackchunkname 业务模块打包 */
    manualChunksPlugin(),
    /* 打包视图 */
    visualizer({
      gzipSize: true, // 搜集gzip压缩包的大小到图表
      brotliSize: true, // 搜集brotli压缩包的大小到图表
      emitFile: false, // 使用emitFile生成文件，为true时，打包后的分析文件会出现在打包好的文件包下，否则就会在项目目录下
      filename: 'test.html', //分析图生成的文件名
      open: true //如果存在本地服务端口，将在打包后自动展示
    }),
    /*
    vite启动快的原理，也导致了他在加载依赖项很多，很复杂的页面时，页面打开慢。
    因为他要进行一系列的动态分析/动态资源引入/动态编译 (优化方案)
    */
    PkgConfig(),
    OptimizationPersist()
  ]
  return vitePluginList
}
