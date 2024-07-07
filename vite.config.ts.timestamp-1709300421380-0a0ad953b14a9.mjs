// vite.config.ts
import { defineConfig } from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/vite@4.5.1_@types+node@20.11.15_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/@vitejs+plugin-vue@4.6.0_vite@4.5.1_vue@3.3.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { resolve } from "path";
import { fileURLToPath } from "node:url";
import VitePluginPreloadAll from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/@mistjs+vite-plugin-preload@0.0.1_vite@4.5.1/node_modules/@mistjs/vite-plugin-preload/dist/index.mjs";
import PkgConfig from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/vite-plugin-package-config@0.1.1_vite@4.5.1/node_modules/vite-plugin-package-config/dist/index.js";
import vueSetupExpand from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/vite-plugin-vue-setup-expand@0.1.4/node_modules/vite-plugin-vue-setup-expand/dist/index.mjs";
import AutoImport from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.7.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/resolver.js";
import {
  ElementPlusResolver
} from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/resolvers.js";
import AntdvResolver from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/antdv-component-resolver@1.0.7_unplugin-vue-components@0.26.0/node_modules/antdv-component-resolver/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.5.1/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vueJsx from "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@4.5.1_vue@3.3.13/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\\u684C\u9762\\\u9AD8\u7EA7\u524D\u7AEF\\vue3\\vue3-vite\\vue3_vite";
var __vite_injected_original_import_meta_url = "file:///E:/%E6%A1%8C%E9%9D%A2/%E9%AB%98%E7%BA%A7%E5%89%8D%E7%AB%AF/vue3/vue3-vite/vue3_vite/vite.config.ts";
console.log(PkgConfig);
var baseSrc = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
function endsWith(str, searchString) {
  let index = str.length - searchString.length;
  return index >= 0 && str.indexOf(searchString, index) === index;
}
var vite_config_default = defineConfig({
  /* 插件使用 */
  plugins: [
    vue(),
    VitePluginPreloadAll(),
    vueSetupExpand(),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "@vueuse/core", "pinia"],
      // 自动导入包的名字
      // imports: ['vue', 'vue-router'],
      dirs: ["./src/api"],
      // 针对自己写的模块完成自动导入
      dts: "./src/auto-imports.d.ts",
      // 兼容ts不报错 默认情况下启用，如果安装了 `typescript`
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon"
        })
      ]
      // ElementPlus 组件按需导入
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "./src/components.d.ts",
      dirs: "src/components/Global",
      // 按需加载的文件夹
      deep: true,
      // 搜索子目录
      resolvers: [
        // AntDesignVueResolver({
        //   importStyle: false,
        // }),
        AntdvResolver(),
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        })
      ]
      // Antdv ElementPlus 组件按需注册
    }),
    Icons({
      autoInstall: true
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    vueJsx()
    // 注册插件 支持jsx
    // PkgConfig(), // 优化初始加载页面缓慢问题(配合使用)
    // OptimizationPersist() // 优化初始加载页面缓慢问题(配合使用)
  ],
  /* 打包结构控制 */
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        // assetFileNames: '[ext]/[name].[hash].[ext]',
        assetFileNames(assetInfo) {
          if (endsWith(assetInfo.name, "css")) {
            return "css/[name].[hash].[ext]";
          }
          if (endsWith(assetInfo.name, "svg")) {
            return "svg/[name].[hash].[ext]";
          }
          if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"].some(
            (ext) => endsWith(assetInfo.name, ext)
          )) {
            return "img/[name].[hash].[ext]";
          }
          return "assets/[name].[hash].[ext]";
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
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "./src")
      },
      {
        find: /^~@\//,
        // find: '~@',
        replacement: "/src/"
        // replacement: resolve(__dirname, './src')
        // replacement: baseSrc
      },
      {
        find: "~",
        replacement: baseSrc
      }
    ]
  },
  /* 代理跨域 */
  server: {
    port: 5012,
    proxy: {
      "/api": {
        // 获取数据的服务器地址设置
        target: "https://img-baofun.zhhainiao.com",
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTY4NENcdTk3NjJcXFxcXHU5QUQ4XHU3RUE3XHU1MjREXHU3QUVGXFxcXHZ1ZTNcXFxcdnVlMy12aXRlXFxcXHZ1ZTNfdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcXHU2ODRDXHU5NzYyXFxcXFx1OUFEOFx1N0VBN1x1NTI0RFx1N0FFRlxcXFx2dWUzXFxcXHZ1ZTMtdml0ZVxcXFx2dWUzX3ZpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LyVFNiVBMSU4QyVFOSU5RCVBMi8lRTklQUIlOTglRTclQkElQTclRTUlODklOEQlRTclQUIlQUYvdnVlMy92dWUzLXZpdGUvdnVlM192aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgVml0ZVBsdWdpblByZWxvYWRBbGwgZnJvbSAnQG1pc3Rqcy92aXRlLXBsdWdpbi1wcmVsb2FkJyAvLyBcdTk4ODRcdTUyQTBcdThGN0RcdTgwRkRcdTU5MUZcdTYzRDBcdTUzNDdcdTk4NzVcdTk3NjJcdTc2ODRcdTYwMjdcdTgwRkRcdUZGMENcdTUyQTBcdTVGRUJcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTZcblxuLy8gdml0ZVx1NTQyRlx1NTJBOFx1NUZFQlx1NzY4NFx1NTM5Rlx1NzQwNlx1RkYwQ1x1NEU1Rlx1NUJGQ1x1ODFGNFx1NEU4Nlx1NEVENlx1NTcyOFx1NTJBMFx1OEY3RFx1NEY5RFx1OEQ1Nlx1OTg3OVx1NUY4OFx1NTkxQVx1RkYwQ1x1NUY4OFx1NTkwRFx1Njc0Mlx1NzY4NFx1OTg3NVx1OTc2Mlx1NjVGNlx1RkYwQ1x1OTg3NVx1OTc2Mlx1NjI1M1x1NUYwMFx1NjE2Mlx1MzAwMlx1NTZFMFx1NEUzQVx1NEVENlx1ODk4MVx1OEZEQlx1ODg0Q1x1NEUwMFx1N0NGQlx1NTIxN1x1NzY4NFx1NTJBOFx1NjAwMVx1NTIwNlx1Njc5MC9cdTUyQThcdTYwMDFcdThENDRcdTZFOTBcdTVGMTVcdTUxNjUvXHU1MkE4XHU2MDAxXHU3RjE2XHU4QkQxXHVGRjA4XHU0RTBCXHU1MjE3XHU0RjE4XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjA5XG5pbXBvcnQgUGtnQ29uZmlnIGZyb20gJ3ZpdGUtcGx1Z2luLXBhY2thZ2UtY29uZmlnJ1xuY29uc29sZS5sb2coUGtnQ29uZmlnKVxuaW1wb3J0IE9wdGltaXphdGlvblBlcnNpc3QgZnJvbSAndml0ZS1wbHVnaW4tb3B0aW1pemUtcGVyc2lzdCdcbi8vIHZpdGVcdTU0MkZcdTUyQThcdTVGRUJcdTc2ODRcdTUzOUZcdTc0MDZcdUZGMENcdTRFNUZcdTVCRkNcdTgxRjRcdTRFODZcdTRFRDZcdTU3MjhcdTUyQTBcdThGN0RcdTRGOURcdThENTZcdTk4NzlcdTVGODhcdTU5MUFcdUZGMENcdTVGODhcdTU5MERcdTY3NDJcdTc2ODRcdTk4NzVcdTk3NjJcdTY1RjZcdUZGMENcdTk4NzVcdTk3NjJcdTYyNTNcdTVGMDBcdTYxNjJcdTMwMDJcdTU2RTBcdTRFM0FcdTRFRDZcdTg5ODFcdThGREJcdTg4NENcdTRFMDBcdTdDRkJcdTUyMTdcdTc2ODRcdTUyQThcdTYwMDFcdTUyMDZcdTY3OTAvXHU1MkE4XHU2MDAxXHU4RDQ0XHU2RTkwXHU1RjE1XHU1MTY1L1x1NTJBOFx1NjAwMVx1N0YxNlx1OEJEMVx1RkYwOFx1NEUwQlx1NTIxN1x1NEYxOFx1NTMxNlx1NjVCOVx1Njg0OFx1RkYwOVxuXG5pbXBvcnQgdnVlU2V0dXBFeHBhbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4cGFuZCcgLy8gXHU1QkY5c2NyaXB0XHU2ODA3XHU3QjdFXHU4RUFCXHU0RTBBXHU2NTJGXHU2MzAxbmFtZVx1NUM1RVx1NjAyN1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZScgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1MzA1XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJyAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTdFQzRcdTRFRjZcblxuLy8gRWxlbWVudFBsdXMgSWNvbiBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTkxNERcdTdGNkVcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG4vLyBFbGVtZW50UGx1cyBJY29uIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1OTE0RFx1N0Y2RVxuXG5pbXBvcnQge1xuICAvLyBBbnREZXNpZ25WdWVSZXNvbHZlcixcbiAgRWxlbWVudFBsdXNSZXNvbHZlclxuICAvLyBWYW50UmVzb2x2ZXJcbn0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJyAvLyBcdTUxODVcdTdGNkVcdTRFODZcdTVCRjlcdTRFMDBcdTRFOUJcdTZENDFcdTg4NENVSVx1NUU5M1x1NzY4NFx1ODlFM1x1Njc5MFx1NTY2OFx1RkYwQ1x1NEY4Qlx1NTk4MlZ1ZXRpZnlcdTMwMDFBbnQgRGVzaWduIFZ1ZVx1NTQ4Q0VsZW1lbnQgUGx1c1x1RkYwQ1x1NjBBOFx1NTNFRlx1NEVFNVx1OTAxQVx1OEZDN1x1NEVFNVx1NEUwQlx1NjVCOVx1NUYwRlx1NTQyRlx1NzUyOFx1NUI4M1x1NEVFQ1xuaW1wb3J0IEFudGR2UmVzb2x2ZXIgZnJvbSAnYW50ZHYtY29tcG9uZW50LXJlc29sdmVyJyAvLyBcdTRGN0ZcdTc1MjggQW50ZHZSZXNvbHZlcigpIFx1ODlFM1x1Njc5MFx1NTY2OFx1NTFGRFx1NjU3MFx1NTNFRlx1NEVFNVx1ODFFQVx1NTJBOFx1ODlFM1x1Njc5MFx1NUJGQ1x1NTE2NVx1NzY4NCBBbnQgRGVzaWduIFZ1ZSBcdTdFQzRcdTRFRjZcdTVFNzZcdTVDMDZcdTUxNzZcdTVCRkNcdTUxNjVcdTUyMzBcdTVFOTRcdTc1MjhcdTdBMEJcdTVFOEZcdTRFMkRcdTMwMDJcblxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnIC8vIHZ1ZTMtdml0ZSBcdTVGMTVcdTUxNjVzdmcgXHU5NzAwXHU4OTgxXHU3NTI4XHU1MjMwXHU2M0QyXHU0RUY2XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnIC8vIFx1NUYxNVx1NTE2NVx1NjNEMlx1NEVGNiwgXHU2NTJGXHU2MzAxLmpzeFxuXG5jb25zdCBiYXNlU3JjID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG5cbi8vIFx1NTIyNFx1NjVBRFx1NUI1N1x1N0IyNlx1NEUzMlx1NEVFNVx1NEVDMFx1NEU0OFx1N0VEM1x1NUMzRVxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2hTdHJpbmcpIHtcbiAgbGV0IGluZGV4ID0gc3RyLmxlbmd0aCAtIHNlYXJjaFN0cmluZy5sZW5ndGhcbiAgcmV0dXJuIGluZGV4ID49IDAgJiYgc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBpbmRleCkgPT09IGluZGV4XG59XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLyogXHU2M0QyXHU0RUY2XHU0RjdGXHU3NTI4ICovXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWaXRlUGx1Z2luUHJlbG9hZEFsbCgpLFxuICAgIHZ1ZVNldHVwRXhwYW5kKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3Z1ZS1pMThuJywgJ0B2dWV1c2UvY29yZScsICdwaW5pYSddLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTUzMDVcdTc2ODRcdTU0MERcdTVCNTdcbiAgICAgIC8vIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcbiAgICAgIGRpcnM6IFsnLi9zcmMvYXBpJ10sIC8vIFx1OTQ4OFx1NUJGOVx1ODFFQVx1NURGMVx1NTE5OVx1NzY4NFx1NkEyMVx1NTc1N1x1NUI4Q1x1NjIxMFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuICAgICAgZHRzOiAnLi9zcmMvYXV0by1pbXBvcnRzLmQudHMnLCAvLyBcdTUxN0NcdTVCQjl0c1x1NEUwRFx1NjJBNVx1OTUxOSBcdTlFRDhcdThCQTRcdTYwQzVcdTUxQjVcdTRFMEJcdTU0MkZcdTc1MjhcdUZGMENcdTU5ODJcdTY3OUNcdTVCODlcdTg4QzVcdTRFODYgYHR5cGVzY3JpcHRgXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgcHJlZml4OiAnSWNvbidcbiAgICAgICAgfSlcbiAgICAgIF0gLy8gRWxlbWVudFBsdXMgXHU3RUM0XHU0RUY2XHU2MzA5XHU5NzAwXHU1QkZDXHU1MTY1XG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJy4vc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICBkaXJzOiAnc3JjL2NvbXBvbmVudHMvR2xvYmFsJywgLy8gXHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBkZWVwOiB0cnVlLCAvLyBcdTY0MUNcdTdEMjJcdTVCNTBcdTc2RUVcdTVGNTVcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAvLyBBbnREZXNpZ25WdWVSZXNvbHZlcih7XG4gICAgICAgIC8vICAgaW1wb3J0U3R5bGU6IGZhbHNlLFxuICAgICAgICAvLyB9KSxcbiAgICAgICAgQW50ZHZSZXNvbHZlcigpLFxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXVxuICAgICAgICB9KVxuICAgICAgXSAvLyBBbnRkdiBFbGVtZW50UGx1cyBcdTdFQzRcdTRFRjZcdTYzMDlcdTk3MDBcdTZDRThcdTUxOENcbiAgICB9KSxcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZVxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcbiAgICB9KSxcbiAgICB2dWVKc3goKSAvLyBcdTZDRThcdTUxOENcdTYzRDJcdTRFRjYgXHU2NTJGXHU2MzAxanN4XG5cbiAgICAvLyBQa2dDb25maWcoKSwgLy8gXHU0RjE4XHU1MzE2XHU1MjFEXHU1OUNCXHU1MkEwXHU4RjdEXHU5ODc1XHU5NzYyXHU3RjEzXHU2MTYyXHU5NUVFXHU5ODk4KFx1OTE0RFx1NTQwOFx1NEY3Rlx1NzUyOClcbiAgICAvLyBPcHRpbWl6YXRpb25QZXJzaXN0KCkgLy8gXHU0RjE4XHU1MzE2XHU1MjFEXHU1OUNCXHU1MkEwXHU4RjdEXHU5ODc1XHU5NzYyXHU3RjEzXHU2MTYyXHU5NUVFXHU5ODk4KFx1OTE0RFx1NTQwOFx1NEY3Rlx1NzUyOClcbiAgXSxcbiAgLyogXHU2MjUzXHU1MzA1XHU3RUQzXHU2Nzg0XHU2M0E3XHU1MjM2ICovXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnanMvW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIC8vIGFzc2V0RmlsZU5hbWVzOiAnW2V4dF0vW25hbWVdLltoYXNoXS5bZXh0XScsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzKGFzc2V0SW5mbykge1xuICAgICAgICAgIGlmIChlbmRzV2l0aChhc3NldEluZm8ubmFtZSwgJ2NzcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Nzcy9bbmFtZV0uW2hhc2hdLltleHRdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW5kc1dpdGgoYXNzZXRJbmZvLm5hbWUsICdzdmcnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdzdmcvW25hbWVdLltoYXNoXS5bZXh0XSdcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgWycucG5nJywgJy5qcGcnLCAnLmpwZWcnLCAnLndlYnAnLCAnLnN2ZycsICcuZ2lmJ10uc29tZSgoZXh0KSA9PlxuICAgICAgICAgICAgICBlbmRzV2l0aChhc3NldEluZm8ubmFtZSwgZXh0KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuICdpbWcvW25hbWVdLltoYXNoXS5bZXh0XSdcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLltoYXNoXS5bZXh0XSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLyogXHU4REVGXHU1Rjg0XHU5MTREXHU3RjZFICovXG4gIHJlc29sdmU6IHtcbiAgICAvLyAgIGFsaWFzOiB7XG4gICAgLy8gICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgLy8gICB9XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAvXn5AXFwvLyxcbiAgICAgICAgLy8gZmluZDogJ35AJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICcvc3JjLydcbiAgICAgICAgLy8gcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxuICAgICAgICAvLyByZXBsYWNlbWVudDogYmFzZVNyY1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ34nLFxuICAgICAgICByZXBsYWNlbWVudDogYmFzZVNyY1xuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLyogXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGICovXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUwMTIsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTY1NzBcdTYzNkVcdTc2ODRcdTY3MERcdTUyQTFcdTU2NjhcdTU3MzBcdTU3NDBcdThCQkVcdTdGNkVcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9pbWctYmFvZnVuLnpoaGFpbmlhby5jb20nLFxuICAgICAgICAvLyBcdTk3MDBcdTg5ODFcdTRFRTNcdTc0MDZcdThERThcdTU3REZcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAvLyBcdThERUZcdTVGODRcdTkxQ0RcdTUxOTlcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxvQkFBb0I7QUFDcFgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTywwQkFBMEI7QUFHakMsT0FBTyxlQUFlO0FBS3RCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBR3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUcxQjtBQUFBLEVBRUU7QUFBQSxPQUVLO0FBQ1AsT0FBTyxtQkFBbUI7QUFFMUIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxZQUFZO0FBL0JuQixJQUFNLG1DQUFtQztBQUFnSixJQUFNLDJDQUEyQztBQVUxTyxRQUFRLElBQUksU0FBUztBQXVCckIsSUFBTSxVQUFVLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUcvRCxTQUFTLFNBQVMsS0FBSyxjQUFjO0FBQ25DLE1BQUksUUFBUSxJQUFJLFNBQVMsYUFBYTtBQUN0QyxTQUFPLFNBQVMsS0FBSyxJQUFJLFFBQVEsY0FBYyxLQUFLLE1BQU07QUFDNUQ7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLHFCQUFxQjtBQUFBLElBQ3JCLGVBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsWUFBWSxnQkFBZ0IsT0FBTztBQUFBO0FBQUE7QUFBQSxNQUVsRSxNQUFNLENBQUMsV0FBVztBQUFBO0FBQUEsTUFDbEIsS0FBSztBQUFBO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFDVCxvQkFBb0I7QUFBQTtBQUFBLFFBRXBCLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUE7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxNQUN6QyxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BQ04sV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBSVQsY0FBYztBQUFBLFFBQ2Qsb0JBQW9CO0FBQUE7QUFBQSxRQUVwQixjQUFjO0FBQUEsVUFDWixvQkFBb0IsQ0FBQyxJQUFJO0FBQUEsUUFDM0IsQ0FBQztBQUFBLE1BQ0g7QUFBQTtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLE1BQzFELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlUO0FBQUE7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsUUFFaEIsZUFBZSxXQUFXO0FBQ3hCLGNBQUksU0FBUyxVQUFVLE1BQU0sS0FBSyxHQUFHO0FBQ25DLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksU0FBUyxVQUFVLE1BQU0sS0FBSyxHQUFHO0FBQ25DLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQ0UsQ0FBQyxRQUFRLFFBQVEsU0FBUyxTQUFTLFFBQVEsTUFBTSxFQUFFO0FBQUEsWUFBSyxDQUFDLFFBQ3ZELFNBQVMsVUFBVSxNQUFNLEdBQUc7QUFBQSxVQUM5QixHQUNBO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3pDO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBO0FBQUEsUUFFTixhQUFhO0FBQUE7QUFBQTtBQUFBLE1BR2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBLFFBRU4sUUFBUTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUE7QUFBQSxRQUVkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
