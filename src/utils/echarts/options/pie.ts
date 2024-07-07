import { PieECOption } from '../type'

const options: PieECOption = {
  title: {},
  // tooltip: {
  //   trigger: 'item'
  // },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left'
  // },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      label: {
        fontSize: 12
      },
      labelLine: {
        length: 18,
        length2: 0,
        maxSurfaceAngle: 80,
        lineStyle: {
          width: 2
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      // minAngle: 0,
      startAngle: 0,
      minShowLabelAngle: 0,
      data: [
        // { value: 1048, name: "Search Engine" },
        // { value: 735, name: "Direct" },
        // { value: 580, name: "Email" },
        // { value: 484, name: "Union Ads" },
        // { value: 300, name: "Video Ads" }
      ]
    }
  ]
}

export default options
