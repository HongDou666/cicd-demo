<template>
  <div>ResizeObserver</div>
  <a-button
    type="primary"
    @click="
      () => {
        widthDom.w = widthDom.w + 50
      }
    "
    >点击元素</a-button
  >
  <div ref="element" class="demo">发生变化的元素test01</div>

  <br />

  <div v-eleOb:zqc="handleSize" class="demo">发生变化的元素test02</div>

  <div style="margin: 50px">
    <a-button v-access="'add'" type="primary">新增</a-button>
    <a-button v-access="'details'" type="primary">详情</a-button>
    <a-button v-access="'none'" type="primary">删除</a-button>
    <!-- :trigger="['click']" -->
    <a-dropdown :get-popup-container="popupContainer">
      <a class="ant-dropdown-link" @click.prevent>
        更多
        <a-icon type="down" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a v-access="'none'" href="javascript:;">我被删除了</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">😄</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">😀</a>
          </a-menu-item>
          <a-menu-item>
            <div v-access="'none'">
              <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No" @confirm="confirm" @cancel="cancel">
                <a href="#">删除</a>
              </a-popconfirm>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts" name="ResizeObserver">
import elementResizeDetectorMaker from 'element-resize-detector'
import { debounce } from '@/utils/index'
import type { ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入

const { proxy: th } = getCurrentInstance() as ComponentInternalInstance

/* 1. 监听元素尺寸的变化 */
// 获取需要监听尺寸变化的元素
const element = ref(null)
// 创建 element-resize-detector 实例
const erd = elementResizeDetectorMaker()
onMounted(() => {
  // 监听尺寸变化
  erd.listenTo(element.value, function (val) {
    // 在元素尺寸发生变化时执行这里的代码(防抖)
    getDom(val)
  })
})
const getDom = debounce(function (val) {
  console.log('元素test01变化后', val)
})
// 停止监听尺寸变化
onBeforeUnmount(() => {
  console.log('元素', element.value)
  erd.uninstall(element.value)
})
/* 1. 监听元素尺寸的变化 */

/* 2。监听元素尺寸的变化 */
const handleSize = debounce(function (size) {
  console.log('元素test02变化后', size)
})
/* 2。监听元素尺寸的变化 */

const widthDom = reactive({
  w: 200
})
const demoWidth = computed(() => {
  return widthDom.w + 'px'
})

const popupContainer = (triggerNode) => {
  return triggerNode || document.body
}
const confirm = (e: MouseEvent) => {
  // th!.$message.info('Click on Yes')
  th?.$message.info('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  th?.$message.error('Click on No', 3)
}

onUnmounted(() => {
  handleSize.cancel()
  getDom.cancel()
})
</script>
<style scoped lang="less">
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0;
  width: calc(100% - v-bind('demoWidth'));
  height: 200px;
  font-size: 30px;
  color: #fff;
  background-color: #299;
}
</style>
