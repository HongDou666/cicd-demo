<template>
  <div ref="bdRef" class="bd_map_container"></div>
</template>

<script setup lang="ts" name="BDMapContainer">
import hooks from '../hooks/index'
const bdRef = ref<HTMLElement>()
const map = ref()
const point = ref()

const initMap = (lng = 116.405725, lat = 39.935362) => {
  map.value = new BMap.Map(bdRef.value as HTMLElement, {
    coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
  })
  point.value = new BMap.Point(lng, lat)

  map.value.centerAndZoom(point.value, 8) // 初始化地图，设置中心点坐标和地图级别
  map.value.enableScrollWheelZoom(true) //滚轮缩放

  map.value.setMapStyleV2({
    //可以自己去百度地图中调整样式（方法在在一条）
    styleId: '54826394c035526043c18c08fe9a6e06'
  })

  const marker: any = new BMap.Marker(point.value) // 创建标注
  map.value.addOverlay(marker) // 将标注添加到地图中
  const icon = new BMap.Icon('/src/assets/img/test.jpg', new BMap.Size(32, 32))
  marker.setIcon(icon) // 设置自定义图标
  marker.enableDragging() // 图标可拖拽
  // marker.disableDragging(); // 图标不可拖拽
}
onMounted(async () => {
  await hooks.init()
  initMap()
})
</script>

<style scoped lang="less">
.bd_map_container {
  width: 100%;
  height: 80%;
}
</style>
