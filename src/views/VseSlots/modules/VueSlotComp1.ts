// defineComponent函数,目的是定义一个组件,内部可以传入一个配置对象
import { defineComponent, h } from 'vue'
import VueSlotComp2 from './VueSlotComp2.vue'

// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字是App
  name: 'VueSlotComp1',
  // 注册组件
  components: {},
  props: {
    name1: {
      type: String,
      default: '帕克',
      required: true
    },
    name2: {
      type: String,
      default: '卢瑟',
      required: true
    }
  },
  // 测试代码 setup是组合API中第一个要使用的函数
  setup(props, { slots }) {
    console.log(props, slots)
    const { name1, name2 } = props
    return () =>
      h('div', {}, [
        h('h3', {}, [name1]),
        h('h3', {}, [name2]),
        h('main', {}, [
          slots?.default?.(), // 会把所有默认插槽都显示出来
          slots?.hello?.() // 会把所有具名插槽都显示出来
        ]),
        h(
          VueSlotComp2,
          {
            // 错误传参写法
            // props: {
            //   age: 100,
            //   myProp: 'bar'
            // }
            age: 100,
            myProp: '华山'
          },
          // 1. 写法1
          // () => ['hello, world! ', 'hi, vue3']
          // 2. 写法2
          {
            default: () => h('h6', null, ['hello, world! ', 'hi, vue3']) // 默认插槽内容实现
          }
        )
      ])
  }
})
