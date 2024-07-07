<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="高德" :force-render="false">
        <div class="map_container">
          <GDMapContainer></GDMapContainer>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="百度"
        ><div class="map_container">
          <BDMapContainer></BDMapContainer></div
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="Map">
import GDMapContainer from './modules/GDMapContainer.vue'
import BDMapContainer from './modules/BDMapContainer.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less">
.map_container {
  height: 500px;
}
</style>
