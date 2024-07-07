import { chartsOptions, BarECOption, PieECOption, GaugeECOption, EChartsOption, ChartsEvents } from '@/utils/echarts/index'
/**
 * 设备使用分类统计
 */
export const useStatisDeviceByUserObject = () => {
  // 图表基本配置信息
  const options = chartsOptions<BarECOption>({
    yAxis: {},
    xAxis: {
      data: []
    },
    series: []
  })

  // 最终图表配置信息
  const init = async () => {
    // 接口请求数据
    Object.assign(options, {
      yAxis: {},
      xAxis: { data: ['人员', '车辆', '船舶', '飞机', '货物'] },
      series: [
        {
          name: '海贼王',
          data: [372, 180, 292, 201, 190]
        }
      ]
    })
  }

  const legendselectchanged = (params: ChartsEvents.Events['selectchanged']) => {
    console.log(params, '选中图例了')
  }

  // ECharts 支持常规的鼠标事件类型，包括 'click'、 'dblclick'、 'mousedown'、 'mousemove'、 'mouseup'、 'mouseover'、 'mouseout'、 'globalout'、 'contextmenu' 事件

  const handleChartClick = (params: any) => {
    console.log(params, '点击了图表')
  }

  onMounted(() => {
    init()
  })

  return {
    options,
    legendselectchanged,
    handleChartClick
  }
}
