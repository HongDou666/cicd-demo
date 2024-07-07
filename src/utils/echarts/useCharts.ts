import { ChartType } from './type'
import * as echarts from 'echarts/core'
import { ShallowRef, Ref } from 'vue'

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components'

import { BarChart, LineChart, PieChart, GaugeChart } from 'echarts/charts'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

const optionsModules = import.meta.glob<{ default: echarts.EChartsCoreOption }>('./options/**.ts')

interface ChartHookOption {
  type?: Ref<ChartType>
  el: ShallowRef<HTMLElement>
}

/**
 *  视口变化时echart图表自适应调整
 */
class ChartsResize {
  #charts = new Set<echarts.ECharts>() // 缓存已经创建的图表实例
  #timeId: ReturnType<typeof setTimeout> | null = null
  constructor() {
    window.addEventListener('resize', this.handleResize.bind(this)) // 视口变化时调整图表
  }
  getCharts() {
    return [...this.#charts]
  }
  handleResize() {
    clearTimeout(this.#timeId!)
    this.#timeId = setTimeout(() => {
      this.#charts.forEach((chart) => {
        chart.resize()
      })
    }, 500)
  }
  add(chart: echarts.ECharts) {
    this.#charts.add(chart)
  }
  remove(chart: echarts.ECharts) {
    this.#charts.delete(chart)
  }
  removeListener() {
    window.removeEventListener('resize', this.handleResize)
  }
}

export const chartsResize = new ChartsResize()

// 使用Charts （type：图标的类型 ，el:渲染图表的元素）
export const useCharts = ({ type, el }: ChartHookOption) => {
  // Charts注册必须的组件
  /*
  需要注意的是注意为了保证打包的体积是最小的，ECharts 按需引入的时候不再提供任何渲染器，所以需要选择引入CanvasRenderer或者SVGRenderer作为渲染器。这样的好处是假如你只需要使用 svg 渲染模式，打包的结果中就不会再包含无需使用的CanvasRenderer模块
  */
  echarts.use([
    BarChart,
    LineChart,
    BarChart,
    PieChart,
    GaugeChart,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])

  // 声明一个开关
  let initComplete = false

  // 声明echarts实例变量
  const charts = shallowRef<echarts.ECharts>()

  let options!: echarts.EChartsCoreOption
  const getOptions = async () => {
    const moduleKey = `./options/${type!.value}.ts`
    const { default: defaultOption } = await optionsModules[moduleKey]()
    return defaultOption
  }

  // 绘制图表
  const setOptions = (opt: echarts.EChartsCoreOption) => {
    console.log('绘制图表', opt)
    // opt => 绘制图表的配置信息(带有数据) 并且再次绘制图表
    initComplete && (charts.value as echarts.ECharts).setOption(opt)
  }

  // 初始化图表
  const initChart = async () => {
    // 初始化echarts实例 (el => 渲染的元素)
    charts.value = echarts.init(el.value)

    // 获取绘制图表的配置信息（配置信息为搭建图表的基本框架）
    options = await getOptions()

    // 绘制图表
    charts.value.setOption(options)

    // 将图表实例添加到缓存中
    chartsResize.add(charts.value)

    // 添加事件支持
    initEvent()

    // 开关打开
    initComplete = true
  }

  /**
   * 初始化事件
   */
  // attrs => 由 v-charts 组件的自定义事件传递过来
  const attrs = useAttrs()
  const initEvent = () => {
    console.log({ attrs })
    // ['onChartClick', 'onSelectchanged']
    Object.keys(attrs).forEach((attrKey) => {
      // 如果是以on开头
      if (/^on/.test(attrKey)) {
        // 获取自定义事件的函数体
        const cb = attrs[attrKey]

        // 把以on开头 或者以 onChart开头替换为空字符串
        attrKey = attrKey.replace(/^on(Chart)?/, '')
        console.log('attrKey', attrKey)

        // 开头字母小写
        attrKey = `${attrKey[0].toLowerCase()}${attrKey.substring(1)}`
        console.log('attrKey', attrKey)

        // 如果cb为函数的话，则绑定事件
        typeof cb === 'function' && charts.value?.on(attrKey, cb as () => void)
      }
    })
  }

  onBeforeUnmount(() => {
    chartsResize.remove(charts.value as echarts.ECharts) // 移除缓存
  })

  return {
    charts,
    setOptions,
    initChart,
    initEvent
  }
}

export const chartsOptions = <T extends echarts.EChartsCoreOption>(option: T) => shallowReactive<T>(option)

export * from './type.d'
