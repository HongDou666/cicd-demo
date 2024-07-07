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

<script setup lang="ts" name="ExcelComp1">
import { ElMapExportTable } from 'table-excel'
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
  const column = [
    { title: '日期', dataIndex: 'date' },
    { title: '姓名', dataIndex: 'name' },
    { title: '地址', dataIndex: 'address' }
  ]
  const instance = new ElMapExportTable({ column, data: tableData.value }, { progress: handlePercentage })
  instance.download('导出正常表格案例')
}
const handlePercentage = (value) => {
  percentage.value = value
}
</script>

<style scoped lang="less"></style>
