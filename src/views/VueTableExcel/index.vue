<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="0" tab="0. 导出带有eCharts图表到Excel">
      <ExcelComp0 />
    </a-tab-pane>
    <a-tab-pane key="1" tab="1. 导出正常表格到Excel">
      <ExcelComp1 />
    </a-tab-pane>
    <a-tab-pane key="2" tab="2. 导出表头合并到Excel">
      <ExcelComp2 />
    </a-tab-pane>
    <a-tab-pane key="3" tab="3. 导出表体合并到Excel">
      <ExcelComp3 />
    </a-tab-pane>
    <a-tab-pane key="4" tab="4. 导出混合合并到Excel">
      <ExcelComp4 />
    </a-tab-pane>
    <a-tab-pane key="5" tab="5. 导出图片到Excel">
      <ExcelComp5 />
    </a-tab-pane>
    <a-tab-pane key="6" tab="6. 设置Excel的列样式">
      <ExcelComp6 />
    </a-tab-pane>
    <a-tab-pane key="7" tab="7. 设置Excel的行样式">
      <ExcelComp7 />
    </a-tab-pane>
    <a-tab-pane key="8" tab="8. 设置Execl的单元格样式">
      <ExcelComp8 />
    </a-tab-pane>
    <a-tab-pane key="9" tab="9. 设置Excel单元格格式">
      <ExcelComp9 />
    </a-tab-pane>
    <a-tab-pane key="10" tab="10. 设置Excel-Sheet样式">
      <ExcelComp10 />
    </a-tab-pane>
    <a-tab-pane key="11" tab="11. 临时插入Excel头部数据">
      <ExcelComp11 />
    </a-tab-pane>
    <a-tab-pane key="12" tab="12. 临时插入Excel尾部数据">
      <ExcelComp12 />
    </a-tab-pane>
    <a-tab-pane key="13" tab="13. 导出多个Sheet到Excel">
      <ExcelComp13 />
    </a-tab-pane>
    <a-tab-pane key="14" tab="14. 导出大数据量表格到Excel">
      <ExcelComp14 />
    </a-tab-pane>
    <a-tab-pane key="15" tab="15. 导出树形结构表格到Excel">
      <ExcelComp15 />
    </a-tab-pane>
    <a-tab-pane key="16" tab="16. 用户自定义设置worksheet">
      <ExcelComp16 />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="VueTableExcel">
/*
参考链接: https://github.com/Zheng-Changfu/table-exporter#7
*/
import ExcelComp0 from './modules/ExcelComp0.vue'
import ExcelComp1 from './modules/ExcelComp1.vue'
import ExcelComp2 from './modules/ExcelComp2.vue'
import ExcelComp3 from './modules/ExcelComp3.vue'
import ExcelComp4 from './modules/ExcelComp4.vue'
import ExcelComp5 from './modules/ExcelComp5.vue'
import ExcelComp6 from './modules/ExcelComp6.vue'
import ExcelComp7 from './modules/ExcelComp7.vue'
import ExcelComp8 from './modules/ExcelComp8.vue'
import ExcelComp9 from './modules/ExcelComp9.vue'
import ExcelComp10 from './modules/ExcelComp10.vue'
import ExcelComp11 from './modules/ExcelComp11.vue'
import ExcelComp12 from './modules/ExcelComp12.vue'
import ExcelComp13 from './modules/ExcelComp13.vue'
import ExcelComp14 from './modules/ExcelComp14.vue'
import ExcelComp15 from './modules/ExcelComp15.vue'
import ExcelComp16 from './modules/ExcelComp16.vue'
const activeKey = ref('0')
</script>

<style scoped lang="less"></style>
