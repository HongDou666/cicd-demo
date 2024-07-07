<script lang="ts">
// import { h, withDirectives } from 'vue'
// 一个自定义指令
// const pin = {
//   mounted() {},
//   updated() {}
// }
// 相当于 => <div v-pin:top.animate="200"></div>
// const vnode = withDirectives(h('div'), [
//   [pin, 200, 'top', { animate: true }]
// ])
import { Input } from 'ant-design-vue'
import { defineComponent, h, withDirectives, resolveDirective } from 'vue'
import { debounce } from '@/utils/index'

export default defineComponent({
  name: 'VueRenderComp4',
  setup(props, { slots }) {
    // 解析注册好的自定义指令
    const observeDirective = resolveDirective('eleOb')

    // 自定义指令
    const focus = {
      created() {},
      beforeMount() {},
      mounted(el, binding, vnode, preVnode) {
        console.log({ el, binding, vnode, preVnode })
        el.focus()
      },
      beforeUpdate() {},
      updated() {},
      beforeUnmount() {},
      unmounted() {}
    }

    const observeSize = debounce(function (size) {
      console.log('元素变化后', size)
    })

    const createElementDom = () => {
      return () =>
        withDirectives(
          h(
            'div',
            {
              class: {
                vue_render: true
              }
            },
            [
              h('span', null, '南方的水'),
              withDirectives(
                h(Input, {
                  value: '北方的雪'
                }),
                [[focus, 9528, 'top', { animate: true }]]
              )
            ]
          ),
          [[observeDirective, observeSize, 'ZQC', { animate: true }]]
        )
    }
    return createElementDom()
  }
})
</script>

<style scoped lang="less">
.vue_render {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 60%;
  height: 100px;
  font-size: 26px;
  color: #f60;
  background-color: rgb(99 211 174);
  gap: 10px;

  .ant-input {
    width: 150px;
    height: 30px;
    font-size: 22px;
    color: #f60;
  }
}
</style>
