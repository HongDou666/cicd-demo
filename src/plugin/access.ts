import { App, Plugin, Directive } from 'vue'

const accessList = ['add', 'details'] // 权限保留

const accessDirective: Directive = (el, binding) => {
  if (!accessList.includes(binding.value)) {
    el.parentNode?.removeChild(el)
  }
}

const accessPlugin: Plugin = {
  install: (app) => {
    app.directive('access', accessDirective)
  }
}

export function installAccessPlugin(app: App) {
  app.use(accessPlugin)
}
