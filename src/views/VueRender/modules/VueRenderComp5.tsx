import { Button } from 'ant-design-vue'
import { ref, defineComponent } from 'vue'

// 无法声明组件内的属性状态值
export const Render1 = function (prop, { emit, slots }) {
  console.log(prop, slots)
  const { 'props-value-num': propsValueNum, 'props-cars-info': propsCarsInfo, ok } = prop
  const handlePush = (val, event: Event) => {
    console.log(event)
    ok(val)
    emit('emitOk', val)
  }
  return (
    <div>
      东北下雪了{propsValueNum}
      <ul style="display: flex; justify-content: center;">
        {propsCarsInfo.list.map((val, index) => {
          return <li key={index}>{val.name}</li>
        })}
      </ul>
      tsx内部定义的状态值
      <Button
        type="primary"
        onClick={(event: Event) =>
          handlePush(
            {
              name: '帕拉梅拉'
            },
            event
          )
        }>
        添加一辆车
      </Button>
      {/* 默认插槽 */}
      {slots.default?.()}
      {/* 具名插槽 */}
      {slots.hello?.()}
    </div>
  )
}

// 可以声明组件内的属性状态值(prop无法接受传参, 需要用到attrs, 且用到属性状态值时ref需要.value)
export const Render2 = defineComponent((prop, { emit, slots, attrs }: any) => {
  console.log(prop, attrs)
  const number = ref(666)
  const handlePush = (val) => {
    attrs.ok(val)
    emit('emitOk', val)
    number.value = number.value + 1
  }
  return () => {
    return (
      <div>
        <h4>{attrs['props-value-num']}</h4>
        <ul>
          {attrs['props-cars-info'].list.map((val, index) => {
            return <li key={index}>{val.name}</li>
          })}
        </ul>
        <Button
          type="primary"
          onClick={() =>
            handlePush({
              name: '帕拉梅拉'
            })
          }>
          添加一辆车
        </Button>
        {number.value}
        {/* 默认插槽 */}
        {slots.default?.()}
        {/* 具名插槽 */}
        {slots.hello?.()}
      </div>
    )
  }
})

// 可以声明组件内的属性状态值(模板写变量值时 都需要用到this)
export const Render3 = defineComponent({
  props: {
    propsValueNum: {
      type: Number,
      required: true,
      default: 500
    },
    propsCarsInfo: {
      type: Object,
      required: true,
      default: () => ({
        name: '小康',
        list: [
          {
            name: '奔驰'
          }
        ]
      })
    },
    ok: {
      type: Function
    }
  },
  emits: ['emitOk'],
  setup(prop, { emit, slots }) {
    const data = ref(960)
    // console.log(this) // undefined
    console.log(prop)
    const { ok } = prop
    const handlePush = (val) => {
      ok && ok(val)
      emit('emitOk', val)
      data.value = data.value + 1
    }
    return {
      data,
      ...prop,
      ...slots,
      handlePush
    }
  },
  render() {
    return (
      <div>
        {this.propsValueNum}
        <ul>
          {this.propsCarsInfo.list.map((val, index) => {
            return <li key={index}>{val.name}</li>
          })}
        </ul>
        <Button
          type="primary"
          onClick={() =>
            this.handlePush({
              name: '帕拉梅拉'
            })
          }>
          添加一辆车
        </Button>
        {this.data}
        {/* 默认插槽 */}
        {(this as any).default?.()}
        {/* 具名插槽 */}
        {(this as any).hello?.()}
      </div>
    )
  }
})

// 可以声明组件内的属性状态值(模板写变量值时 ref 需要.value)
export const Render4 = defineComponent({
  props: {
    propsValueNum: {
      type: Number,
      required: true,
      default: 500
    },
    propsCarsInfo: {
      type: Object,
      required: true,
      default: () => ({
        name: '小康',
        list: [
          {
            name: '奔驰'
          }
        ]
      })
    },
    ok: {
      type: Function
    }
  },
  emits: ['emitOk'],
  setup(prop, { emit, slots }) {
    const data = ref(960)
    // console.log(this) // undefined
    console.log(prop)
    const { ok } = prop
    const handlePush = (val) => {
      ok && ok(val)
      emit('emitOk', val)
      data.value = data.value + 1
    }
    return () => (
      <div>
        {prop.propsValueNum}
        <ul>
          {prop.propsCarsInfo.list.map((val, index) => {
            return <li key={index}>{val.name}</li>
          })}
        </ul>
        <Button
          type="primary"
          onClick={() =>
            handlePush({
              name: '帕拉梅拉'
            })
          }>
          添加一辆车
        </Button>
        {data.value}
        {/* 默认插槽 */}
        {slots.default?.()}
        {/* 具名插槽 */}
        {slots.hello?.()}
      </div>
    )
  }
})
