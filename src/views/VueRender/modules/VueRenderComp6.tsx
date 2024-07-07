import { Button } from 'ant-design-vue'
import { ref, defineComponent, resolveComponent } from 'vue'

export const Render5 = defineComponent({
  setup(props, { slots }) {
    const person = reactive({ name: '哈尔滨', address: '黑龙江' })
    const { left, default: _defaultSlot, right } = slots

    const leftSlot = left && left()

    const backDefaultSlot = <span>默认插槽内容</span>
    const defaultSlot = <Button type="primary">{(_defaultSlot && _defaultSlot({ person })) || backDefaultSlot}</Button>

    const rightSlot = right && right({ address: person.address })

    const children = [leftSlot, defaultSlot, rightSlot]

    /* 1. */
    // return () => <div>{children}</div>
    /* 2. */
    return () => h('div', null, children)
  }
})

export const Render6 = defineComponent({
  setup(props, { slots }) {
    const person = reactive({ name: '雏田', age: '鸣人' })
    return { person }
  },
  render() {
    const { left, default: _defaultSlot, right } = this.$slots

    const leftSlot = left && left()

    const backDefaultSlot = <span>默认插槽内容</span>
    const defaultSlot = <Button type="primary">{(_defaultSlot && _defaultSlot({ person: this.person })) || backDefaultSlot}</Button>

    const rightSlot = right && right({ age: this.person.age })

    const children = [leftSlot, defaultSlot, rightSlot]
    return <div>{children}</div>
  }
})

export const Render7 = defineComponent({
  inheritAttrs: false,
  props: ['propsText'],
  emits: ['custom-click'],
  setup(props, { slots, emit, attrs }) {
    const customButton = h(
      Button,
      {
        type: 'primary',
        onClick: () => {
          emit('custom-click', Math.random().toString(36))
        },
        ...attrs
      },
      () => props.propsText
    )
    // NOTE 在 h 函数内部调用插槽，父组件插槽内容变化，组件内部会更新，否则不更新。
    return () => h('div', null, [customButton, slots.default?.()])
  }
})

export const Render8 = defineComponent({
  setup() {
    /* 2. 全局注册的组件，可用解析函数引入 */
    const globalAsyncComp1 = resolveComponent('globalAsyncComp1')

    const test05Button = h(
      Render7,
      {
        propsText: '娜美',
        onCustomClick: (data) => {
          console.log('onCustomClick', data)
        },
        onProp: () => {},
        id: 'Render8-id',
        'data-key': 'custom-prop'
      },
      {
        // NOTE 默认插槽和 2.x 不同，要写在第三个参数
        default: () => {
          return h(
            'span',
            { title: 'default插槽' },
            [h(globalAsyncComp1)]
            // { default: () => 'Render8默认插槽' }
          )
        }
      }
    )
    return () => test05Button
  }
})

// render 函数和 react 的一样
export const Container = (props) => {
  return props.render(props.data)
}
