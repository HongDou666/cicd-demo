<template>
  <div>
    <h1>ElementPlusUI</h1>

    <el-button :plain="true" @click="open">Success</el-button>
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary" :icon="EditPen">EditPen</el-button>

    <el-icon><Service /></el-icon>
    <el-icon><Connection /></el-icon>
    <el-icon><ElemeFilled /></el-icon>

    <!-- 或者独立使用它，不从父级获取属性 -->
    <Service :size="6" />
    <Connection :size="6" />
    <ElemeFilled :size="6" />

    <!-- 全局注册过 -->
    <el-icon><Tools /></el-icon>
    <el-icon><HomeFilled /></el-icon>
    <el-icon><UploadFilled /></el-icon>
    <el-icon><Histogram /></el-icon>

    <!-- 自动导入使用方法（vite.config.js配置） -->
    <i-ep-message-box />
    <i-ep-warn-triangle-filled />
    <i-ep-histogram />

    <h1>AntdesignUI</h1>

    <home-outlined />
    <setting-filled />
    <smile-outlined />
    <sync-outlined spin />
    <smile-outlined :rotate="180" />

    <a-button type="primary" :size="'large'">
      <template #icon>
        <DownloadOutlined />
      </template>
      DownloadOutlined
    </a-button>
    <a-button :icon="h(SearchOutlined)">Search</a-button>
    <icon>
      <template #component><HomeOutlined /></template>
    </icon>

    <!-- a-icon组件的封装及其使用 -->

    <!-- Ant-icon-v1写法支持使用 -->
    <a-icon type="home" />
    <a-icon type="sync" spin />
    <a-icon type="smile" :rotate="180" />
    <a-icon type="loading" />

    <el-button type="primary" @click="handleClick">切换图标状态</el-button>

    <a-icon
      :type="iconStatus ? 'wifi' : 'transaction'"
      :style="{
        color: iconStatus ? 'hotpink' : '#229999',
        fontSize: '30px'
      }" />

    <!-- 支持选择图标主题风格 -->
    <a-icon
      type="android"
      :style="{
        fontSize: '30px'
      }" />
    <a-icon
      :style="{
        color: iconStatus ? '#f60' : '#229999',
        fontSize: '30px'
      }"
      type="android"
      theme="filled" />
    <a-icon
      :style="{
        fontSize: '30px'
      }"
      type="account-book"
      theme="twoTone" />
    <!-- 支持选择图标主题风格 -->

    <!-- Ant-icon-v1写法支持使用 -->

    <!-- Ant-icon-v3写法支持使用 -->
    <a-icon type="down-circle-outlined" />
    <a-icon type="plus-square-filled" />
    <a-icon type="up-circle-two-tone" />

    <!-- Ant-icon-v3写法支持使用 -->

    <!-- a-icon组件的封装及其使用 -->

    <!-- 阿里巴巴图标库的使用 -->
    <h3>阿里巴巴图标库的使用</h3>
    <IconFont
      type="icon-tongjigongyi1"
      :style="{
        fontSize: '50px',
        color: '#229999'
      }"></IconFont>
    <IconFont
      type="icon-ziyongweiwang"
      :style="{
        fontSize: '40px',
        color: '#229999'
      }"></IconFont>
    <!-- 阿里巴巴图标库的使用 -->

    <hr />

    <!-- 基本拖拽事件 -->
    <ElementPlusUIDrop></ElementPlusUIDrop>
    <!-- 基本拖拽事件 -->

    <hr />

    <!-- 不同组件之间的拖拽事件 table-tree -->
    <AntDesignDrag></AntDesignDrag>
    <!-- 不同组件之间的拖拽事件 table-tree -->
  </div>
</template>

<script setup lang="ts" name="ElementPlusUI">
import { h } from 'vue'
// import { ElMessage } from 'element-plus' // 无需引入（vue.config.js已经自动引入）
import { Search, Service, EditPen, Connection, ElemeFilled } from '@element-plus/icons-vue'
import Icon, { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'

import AntDesignDrag from './modules/AntDesignDrag/index.vue'
import ElementPlusUIDrop from './modules/ElementPlusUIDrop.vue'

const iconStatus = ref<boolean>(true)
const handleClick = () => {
  iconStatus.value = !iconStatus.value
}

const open = () => {
  ElMessage({
    message: 'Congrats, this is a success message',
    type: 'success'
  })
}
</script>
<style scoped lang="less"></style>
