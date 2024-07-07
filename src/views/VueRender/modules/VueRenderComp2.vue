<script lang="ts">
import { defineComponent, h, getCurrentInstance } from 'vue'
import type { PropType, ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入

interface Type1 {
  name: string
}
type Type2 = {
  name: string
  list: Type1[]
}

export default defineComponent({
  name: 'VueRenderComp2',
  props: {
    propsValueNumComp2: {
      type: Number as PropType<number>,
      required: true,
      default: 999
    },
    propsCarsInfoComp2: {
      type: Object as PropType<Type2>,
      required: true,
      default: () => ({})
    }
  },
  setup(props) {
    const { propsValueNumComp2, propsCarsInfoComp2 } = props
    const current = getCurrentInstance() as ComponentInternalInstance
    // const { proxy: th } = getCurrentInstance() as ComponentInternalInstance

    const createElementDom = (valueNumRender: number, carsInfoRender: Type2) => {
      const carsInfo = carsInfoRender
      return () =>
        h(
          'div',
          {
            onClick: (e: Event) => {
              // 阻止冒泡
              e.stopPropagation()

              // 此处改变了propsCars,因为propsCars是最上层传递下来，没有深拷贝，所以最上层的propsCars也会改变
              carsInfo.list.push({
                name: '凯迪拉克'
              })

              // 强制刷新
              current?.proxy?.$forceUpdate()
            }
          },
          [
            h('p', null, 'VueRenderComp2-组件'),
            [...carsInfo.list]?.map((item: Type1) => {
              return h(
                'i',
                {
                  style: {
                    color: '#229999',
                    margin: '0 10px',
                    fontSize: '22px'
                  }
                },
                [`${item?.name}`]
              )
            })
          ]
        )
    }

    return createElementDom(propsValueNumComp2 as number, propsCarsInfoComp2 as Type2)
  }
})
</script>

<style scoped></style>
