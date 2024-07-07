<template>
  <div v-if="options.series" class="bar-chart">
    <v-charts type="bar" :options="options" @chart-click="handleChartClick" @legendselectchanged="legendselectchanged" />
  </div>
</template>

<script setup lang="ts" name="Echarts">
import { useStatisDeviceByUserObject } from './hooks'
const { options, handleChartClick, legendselectchanged } = useStatisDeviceByUserObject()
</script>

<style scoped lang="less">
.bar-chart {
  height: 500px;
}
</style>
