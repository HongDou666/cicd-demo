<template>
  <h3>树的拖拽</h3>
  <a-tree default-expand-all class="draggable-tree" draggable block-node :tree-data="gData" @dragstart="dragstart">
    <template #title="item">
      <div style="text-align: left" @drop.prevent.stop="customDrop(item)">
        {{ item.title }}
      </div>
    </template>
  </a-tree>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const gData = reactive([
  {
    title: '上海',
    key: '上海',
    children: [
      {
        title: '大连路',
        key: '大连路'
      },
      {
        title: '黄浦区',
        key: '黄浦区'
      }
    ]
  },
  {
    title: '江苏',
    key: '江苏',
    children: [
      {
        title: '南京',
        key: '南京'
      },
      {
        title: '无锡',
        key: '无锡'
      },
      {
        title: '苏州',
        key: '苏州',
        children: [
          {
            title: '姑苏区',
            key: '姑苏区'
          }
        ]
      }
    ]
  }
])

console.log(gData)

const dragstart = (info) => {
  console.log('开始拖拽啦 , 我是', info.node.title)
}

const customDrop = (item) => {
  console.log('有某个元素放在我这里啦 , 我是', item.title)
}
</script>
