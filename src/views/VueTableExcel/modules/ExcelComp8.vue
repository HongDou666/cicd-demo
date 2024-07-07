<template>
  <div>
    <el-button type="warning" @click="handleExport">导出</el-button>
    <el-progress :style="{ margin: '10px 0' }" :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
  </div>
</template>

<script lang="ts">
import { ElMapExportTable } from 'table-excel'
export default {
  name: 'ExcelComp8',
  data() {
    return {
      percentage: 0
    }
  },
  methods: {
    handleExport() {
      const column = [
        { title: '日期', dataIndex: 'date' },
        { title: '姓名', dataIndex: 'name' },
        { title: '地址', dataIndex: 'address' }
      ]
      const data = [
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
      ]
      const instance = new ElMapExportTable(
        {
          column,
          data,
          /*
          提供 setCellStyle 函数

          该函数接收一个参数,参数格式为对象,包含 data (数据源)、rowIndex (当前行索引)、columnIndex (当前列索引)、type (标识当前是表头还是表体)

          返回值为对象,具体可写的所有样式参考https://github.com/exceljs/exceljs/blob/master/README_zh.md#%E6%A0%B7%E5%BC%8F
          */
          setCellStyle({ data, columnIndex, rowIndex, type }) {
            console.log({ data, columnIndex, rowIndex, type })
            if (type === 'main' && columnIndex === 2) {
              return {
                font: {
                  size: 16, // 字体大小
                  bold: true, // 字体加粗
                  italic: true, // 字体倾斜
                  color: { argb: 'FFA35E' }
                },
                fill: {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '409eff' } // 填充背景颜色
                }
              }
            }
          }
        },
        { progress: this.handlePercentage }
      )
      instance.download('设置Excel的单元格样式')
    },
    handlePercentage(percentage) {
      this.percentage = percentage
    }
  }
}
</script>
s
