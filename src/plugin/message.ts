import { Plugin, App } from 'vue'
import { message } from 'ant-design-vue'

const messagePlugin: Plugin = {
  install: (app, message) => {
    // 向原型身上追加$message全局提示
    app.config.globalProperties.$message = message
  }
}

function installMessagePlugin(app: App) {
  app.use(messagePlugin, message)
}

export { installMessagePlugin }
