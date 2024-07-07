<template>
  <div>
    <el-button type="warning" @click="handleExport">导出</el-button>
    <el-progress :style="{ margin: '10px 0' }" :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
  </div>
  <div v-if="options.series" class="bar-chart">
    <v-charts ref="barCharts" type="bar" :options="options" @chart-click="handleChartClick" @legendselectchanged="legendselectchanged" />
  </div>
</template>

<script setup lang="ts" name="ExcelComp1">
import logo3 from '@/assets/base-64/test01.js?raw'
import { ElMapExportTable } from 'table-excel'
import { useStatisDeviceByUserObject } from '../hooks'
const { options, handleChartClick, legendselectchanged } = useStatisDeviceByUserObject()
const barCharts = ref()
const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
])
const percentage = ref(0)

const handleExport = () => {
  const echart = barCharts.value.$charts
  const base64Str = echart.getDataURL({
    type: 'png',
    //导出的图片分辨率比例，默认为 1
    pixelRatio: 2,
    // 导出的图片背景色，默认使用 option 里的 backgroundColor
    backgroundColor: '#fff'
    // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
    //  excludeComponents: Array.<string>
  })
  const column = [
    { title: '日期', dataIndex: 'date' },
    { title: '姓名', dataIndex: 'name' },
    { title: '地址', dataIndex: 'address' }
  ]
  const instance = new ElMapExportTable(
    {
      column: [{ title: '', dataIndex: '', children: column }],
      data: tableData.value,
      setWorkSheet: ({ worksheet }) => {
        const img = worksheet.workbook.addImage({
          base64: base64Str,
          // base64: logo3,
          extension: 'png'
        })
        worksheet.addImage(img, {
          tl: { col: 0, row: 0 },
          ext: {
            width: 340,
            height: 160
          },
          editAs: 'absolute'
        })
      },
      setRowStyle({ columnIndex, rowIndex, type }) {
        if (type === 'header' && rowIndex === 0 && columnIndex === 0) {
          return {
            height: 120
          }
        }
        if (type === 'header' && rowIndex === 1) {
          return {
            height: 40
          }
        }
        if (type === 'main') {
          return {
            height: 30
          }
        }
      }
    },
    { progress: handlePercentage }
  )
  instance.download('导出正常表格案例')
}
const handlePercentage = (value) => {
  percentage.value = value
}
</script>

<style scoped lang="less">
.bar-chart {
  height: 500px;
}
</style>
