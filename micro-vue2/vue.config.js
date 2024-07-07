module.exports = {
  outputDir: 'vue2',
  publicPath: '/child/vue2/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 9527,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      /**设置本地运行的跨域 */ 'Access-Control-Allow-Origin': '*'
    }
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {}
}
