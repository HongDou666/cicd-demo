/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

import UnoCSS from 'unocss/vite' // 安装 UnoCSS 插件（预设css）

import VitePluginPreloadAll from '@mistjs/vite-plugin-preload' // 预加载能够提升页面的性能，加快页面加载速度

// vite启动快的原理，也导致了他在加载依赖项很多，很复杂的页面时，页面打开慢。因为他要进行一系列的动态分析/动态资源引入/动态编译（下列优化方案）
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'
// vite启动快的原理，也导致了他在加载依赖项很多，很复杂的页面时，页面打开慢。因为他要进行一系列的动态分析/动态资源引入/动态编译（下列优化方案）

import vueSetupExpand from 'vite-plugin-vue-setup-expand' // 对script标签身上支持name属性
import AutoImport from 'unplugin-auto-import/vite' // 自动导入包
import Components from 'unplugin-vue-components/vite' // 自动导入组件

// ElementPlus Icon 自动导入配置
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// ElementPlus Icon 自动导入配置

import {
  // AntDesignVueResolver,
  ElementPlusResolver
  // VantResolver
} from 'unplugin-vue-components/resolvers' // 内置了对一些流行UI库的解析器，例如Vuetify、Ant Design Vue和Element Plus，您可以通过以下方式启用它们
import AntdvResolver from 'antdv-component-resolver' // 使用 AntdvResolver() 解析器函数可以自动解析导入的 Ant Design Vue 组件并将其导入到应用程序中。

import svgLoader from 'vite-svg-loader' // 方式1： vue3-vite 引入svg 需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // 方式2： vue3-vite 引入svg 需要用到插件
import vueJsx from '@vitejs/plugin-vue-jsx' // 引入插件, 支持.jsx

// import eslintPlugin from 'vite-plugin-eslint' // 说明: 该包是用于配置vite运行的时候自动检测eslint规范 不符合页面会报错
const baseSrc = fileURLToPath(new URL('./src', import.meta.url))

// 判断字符串以什么结尾
function endsWith(str, searchString) {
  const index = str.length - searchString.length
  return index >= 0 && str.indexOf(searchString, index) === index
}
// https://vitejs.dev/config/
export default defineConfig({
  /* 插件使用 */
  plugins: [
    vue(),
    VitePluginPreloadAll(),
    // eslintPlugin({
    //   include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
    // }),
    vueSetupExpand(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'pinia'], // 自动导入包的名字
      // imports: ['vue', 'vue-router'],
      dirs: ['./src/api/function-ts'], // 针对自己写的模块完成自动导入
      dts: './src/auto-imports.d.ts', // 兼容ts不报错 默认情况下启用，如果安装了 `typescript`
      resolvers: [
        //  Element Plus 组件包按需导入
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './src/components.d.ts',
      dirs: 'src/components/global', // 按需加载的文件夹
      deep: true, // 搜索子目录
      resolvers: [
        // AntDesignVueResolver({
        //   importStyle: false,
        // }),
        // 自动导入 Antdv 组件
        AntdvResolver(),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册 Element Plus 图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    // 自动导入图标组件
    Icons({
      autoInstall: true
    }),
    svgLoader({
      defaultImport: 'url'
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
    vueJsx(), // 注册插件 支持jsx
    UnoCSS() // 注册插件-UnoCSS

    // PkgConfig(), // 优化初始加载页面缓慢问题(两者配合使用)
    // OptimizationPersist() // 优化初始加载页面缓慢问题(两者配合使用)
  ],
  /* css配置(less sacc 全局变量) */
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/less/global-variate.less')}";`
      }
    }
  },
  /* 打包结构控制 */
  build: {
    rollupOptions: {
      input: {
        main: './src/main.ts'
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        // assetFileNames: '[ext]/[name].[hash].[ext]',
        assetFileNames(assetInfo) {
          if (endsWith(assetInfo.name, 'css')) {
            return 'css/[name].[hash].[ext]'
          }
          if (endsWith(assetInfo.name, 'svg')) {
            return 'svg/[name].[hash].[ext]'
          }
          if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].some((ext) => endsWith(assetInfo.name, ext))) {
            return 'img/[name].[hash].[ext]'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
      /* vite 手动分包优化(打包时将所有第三方包打到一个ventor-zqc.js文件中) */
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'ventor-zqc'
        }
      }
    }
  },
  /* 路径配置 */
  resolve: {
    //   alias: {
    //     '@': resolve(__dirname, './src')
    //   }
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      },
      {
        find: /^~@\//,
        // find: '~@',
        replacement: '/src/'
        // replacement: resolve(__dirname, './src')
        // replacement: baseSrc
      },
      {
        find: '~',
        replacement: baseSrc
      }
    ]
  },
  /* 基础路径 */
  base: '/app-vite/',
  /* 代理跨域 */
  server: {
    port: 5012,
    open: true,
    proxy: {
      // 代理跨域(本地服务器)
      '/api/demo': {
        // 获取数据的服务器地址设置
        target: 'http://localhost:5000',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/demo/, '')
      },
      // 代理跨域(外地服务器-文件下载 Video)
      '/api/downloadVideo': {
        // 获取数据的服务器地址设置
        target: 'https://www.runoob.com',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/downloadVideo/, '')
      },
      // 代理跨域(外地服务器-文件下载pdf)
      '/api/downloadPdf': {
        // 获取数据的服务器地址设置
        target: 'http://storage.xuetangx.com',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/downloadPdf/, '')
      },
      // 代理跨域(外地服务器-文件下载pdf)
      '/api/download': {
        // 获取数据的服务器地址设置
        target: 'http://101.34.220.192:9000',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/download/, '')
      },
      // 代理跨域(外地服务器-图片下载)
      '/api/images': {
        // 获取数据的服务器地址设置
        target: 'https://fetch-progress.anthum.com',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/images/, '')
      },
      // 代理跨域(本地服务器-文件上传)
      '/api/upload': {
        // 获取数据的服务器地址设置
        target: 'http://localhost:5500',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api\/upload/, '/upload')
      },
      // 代理跨域(外地服务器-图片下载)
      '/api': {
        // 获取数据的服务器地址设置
        target: 'https://img-baofun.zhhainiao.com',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
