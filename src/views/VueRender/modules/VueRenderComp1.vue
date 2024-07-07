<!-- <template>
  <div>VueRenderComp1</div>
</template> -->

<script lang="ts">
import VueRenderComp2 from './VueRenderComp2.vue'
import VueRenderComp3 from './VueRenderComp3.vue'
import { defineComponent, h, renderSlot, withModifiers } from 'vue'
import type { PropType } from 'vue' // 来自vue的ts类型引入

type Type1 = {
  name: string
}
type Type2 = {
  name: string
  list: Type1[]
}

export default defineComponent({
  name: 'VueRenderComp1',
  props: {
    propsValueNum: {
      type: Number as PropType<number>,
      required: true,
      default: 500
    },
    propsCarsInfo: {
      type: Object as PropType<Type2>,
      required: true,
      default: () => ({
        name: '米罗',
        list: [
          {
            name: '奔驰'
          }
        ]
      })
    }
  },
  setup(props, { slots }) {
    const { propsValueNum, propsCarsInfo } = props

    const handler = (val1: number, val2: Type2) => {
      console.log(val1, val2)
    }

    const createElementDom = (propsValueNum: number, propsCarsInfo: Type2) => {
      const valueNum = propsValueNum
      const carsInfo = propsCarsInfo // 共用同一个地址
      // const carsInfo = JSON.parse(JSON.stringify(propsCarsInfo))

      console.log(valueNum, carsInfo)

      return () =>
        h(
          'div',
          {
            /* class : 1   */
            class: {
              class_name1: true,
              class_name2: false
            },
            /* class : 2 */
            // class: ['class_name1', { class_name2: false }],

            /* style : 1  */
            style: {
              color: '#f60',
              fontSize: '30px'
            },
            /* style : 2  */
            // style: [{ color: '#f60' }, { fontSize: '#30px' }],

            id: 'customId',
            custom: 'custom',
            title: '提示性内容',
            // innerHTML: '<h2>你好呀!RenderDom</h2>', // 自定义div的内容

            /* 1. 事件绑定 */
            // onClick: () => {
            //   handler(valueNum, carsInfo)
            // },

            /* 2. 事件绑定 （等价于 v-on:click.stop.prevent）*/
            onClick: withModifiers(() => {
              handler(valueNum, carsInfo)
            }, ['stop', 'prevent'])
          },
          [
            '插槽内容-Render',
            h('span', slots.default?.()), // 来自VueRender的默认插槽
            h('span', slots.hello?.()), // 来自VueRender的具名插槽 写法1
            h('span', renderSlot(slots, 'hello')), // 来自VueRender的具名插槽 写法2
            h(VueRenderComp2, {
              propsValueNumComp2: valueNum,
              propsCarsInfoComp2: carsInfo
            }),
            h(
              VueRenderComp3,
              {
                // 1. 参数传递
                propsValueNumComp3: 800,
                propsCarsInfoComp3: carsInfo,

                // 2. 传递不了
                // props: {
                //   valueNumRender,
                //   carsRender
                // },
                onClick: (e: { stopPropagation: () => void }) => {
                  e.stopPropagation() // 阻止冒泡
                  console.log('VueRenderComp3组件-onClick')
                },
                onOk: (val: { event: Event; value: string }) => {
                  console.log(val.value) // 收到子组件的信息
                  val.event.stopPropagation() // 阻止冒泡
                }
              },
              {
                default: () => h('h6', null, ['VueRenderComp3-默认插槽内容']), // 默认插槽内容实现

                // 下行代码相当于生成以下写法
                // <template #hello>
                //   <h4>我是具名插槽hello</h4>
                // </template>
                hello: () => h('h4', null, ['VueRenderComp3-具名插槽hello']), // 具名插槽内容实现

                hi: (val: { renderParams: string[] }) =>
                  h(
                    'div',
                    null,
                    // 此处作用域插槽写法尽量返回一个数组 []
                    val.renderParams?.map((item) => {
                      return h(
                        'i',
                        {
                          style: {
                            color: '#229999'
                          }
                        },
                        item
                      )
                    })
                  )
              }
            )
          ]
        )
    }
    return createElementDom(propsValueNum as number, propsCarsInfo as Type2)
  }
})
</script>

<style scoped></style>
