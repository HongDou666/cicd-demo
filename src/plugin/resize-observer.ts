import { App, Plugin } from 'vue'

const map = new WeakMap()

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler) {
      handler({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        dom: entry.target
      })
    }
  }
})

const resizeObserverPlugin: Plugin = {
  install: (app: App) => {
    app.directive('eleOb', {
      mounted(el, binding) {
        if (binding.arg) {
          console.log(binding.arg)
        }
        map.set(el, binding.value)
        resizeObserver.observe(el)
      },
      beforeUnmount(el) {
        console.log('拜拜啦')
        resizeObserver.unobserve(el)
      }
    })
  }
}

export function installResizeObserverPlugin(app: App) {
  app.use(resizeObserverPlugin)
}
