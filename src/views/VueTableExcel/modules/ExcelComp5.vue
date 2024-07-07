<template>
  <div>
    <el-button type="warning" @click="handleExport">导出</el-button>
    <el-progress :style="{ margin: '10px 0' }" :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ElMapExportTable } from 'table-excel'
export default {
  name: 'ExcelComp5',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          /* 注意：注释mock模拟数据 */
          images: ['/src/assets/img/user.jpg', '/src/assets/img/test.jpg']
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
          address: '上海市普陀区金沙江路 1516 弄',
          /* 注意：注释mock模拟数据 */
          images: ['/src/assets/img/user.jpg']
        }
      ],
      percentage: 0
    }
  },
  methods: {
    handleExport() {
      const column = [
        { title: '日期', dataIndex: 'date' },
        { title: '姓名', dataIndex: 'name' },
        { title: '图片', dataIndex: 'images' },
        { title: '地址', dataIndex: 'address' }
      ]
      const instance = new ElMapExportTable(
        {
          column,
          data: this.tableData,
          setImageStyle: ({ data, rowIndex, columnIndex, type }) => {
            return {
              width: 100,
              height: 50
            }
          }
        },
        { progress: this.handlePercentage }
      )
      instance.download('导出图片到Excel案例')
    },
    handlePercentage(percentage) {
      this.percentage = percentage
    }
  }
}
</script>

<style scoped lang="less"></style>
