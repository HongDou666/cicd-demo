<template>
  <el-input id="searchInputId" v-model="positionInput" class="common-layout" placeholder="输入关键词搜索位置" style="margin: 10px; width: 500px" />
  <el-button>搜索</el-button>
  <div class="gdmap-container">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts" name="GDMapContainer">
import AMapLoader from '@amap/amap-jsapi-loader'

const map = ref<any>(null)
const positionInput = ref('')
const state = reactive<any>({
  path: [],
  current_position: []
})

const initMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: 'e49ae56da1f8603c0c2726aae1abd69d' // 密钥
  } // 重要！

  AMapLoader.load({
    key: '780f9c6b2eeb1b3eb4a6ecdc4156e3b3', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    map.value = new AMap.Map('container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      viewMode: '3D', // 是否为3D地图模式
      zoom: 6, // 初始化地图级别
      center: [118, 30] // 初始化地图中心点位置
    })

    /* 添加插件 */
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye'], function () {
      //异步同时加载多个插件
      map.value.addControl(new AMap.HawkEye()) //显示缩略图
      map.value.addControl(new AMap.Scale()) //显示当前地图中心的比例尺
    })

    /* 地图上单击 */
    map.value.on('click', (e: any) => {
      console.log(e)
      state.current_position = [e.lnglat.KL, e.lnglat.kT]
      state.path.push([e.lnglat.KL, e.lnglat.kT])

      addMarker()

      addPolyLine()

      // 地图按照适合展示图层内数据的缩放等级展示
      map.value.setFitView()
    })
    /* 地图上单击 */

    /* 实例化点标记 */
    function addMarker() {
      const marker = new AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: state.current_position,
        offset: new AMap.Pixel(-26, -54)
      })
      marker.setMap(map.value)
    }
    /* 实例化点标记 */

    /* 折线 */
    function addPolyLine() {
      const polyline = new AMap.Polyline({
        path: state.path,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 1,
        strokeColor: '#3366FF',
        strokeOpacity: 0.6,
        strokeWeight: 5,
        // 折线样式还支持 'dashed'
        strokeStyle: 'solid',
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50
      })
      map.value.add([polyline])
    }
    /* 折线 */

    /* 位置搜索 */
    let autoOptions = {
      input: 'searchInputId'
    }
    let auto = new AMap.AutoComplete(autoOptions)
    let placeSearch = new AMap.PlaceSearch({
      map: map.value
    })
    const select = (e) => {
      placeSearch.setCity(e.poi.adcode)
      placeSearch.search(e.poi.name) //关键字查询查询
    }
    auto.on('select', select)
    /* 位置搜索 */
  })
}

onMounted(() => {
  initMap()
})
onUnmounted(() => {
  map.value?.destroy()
})
</script>

<style scoped lang="less">
.gdmap-container {
  width: 100%;
  height: 80%;

  #container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    border: 1px solid @color-title;
  }
}
</style>
