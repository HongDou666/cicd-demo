<!-- 基于ant-design v3 风格重构的wangeditor富文本编辑器 -->
<template>
  <div :class="prefixCls">
    <section ref="WangeditorDom" class="editor-wrapper" />
  </div>
</template>

<script setup lang="ts" name="wangEditorAntd">
import E from 'wangeditor-antd'
import { onMounted, ref } from 'vue'
const props = withDefaults(
  defineProps<{
    content?: string
    prefixCls?: string
  }>(),
  {
    content: '',
    prefixCls: 'ant-editor-wang'
  }
)
const emit = defineEmits<{
  getFullText: [myvalue: any] // 具名元组语法
}>()

const WangeditorDom = ref(null)
let editor: any = ref(null)

const stopWatch = watch(
  computed(() => props.content),
  (newValue) => {
    editor && editor.value?.txt?.html(newValue)
  }
)
onUnmounted(() => {
  stopWatch()
})

// 获取内容(html)
const getHtml = () => {
  return editor && editor.value.txt.html()
}
// 获取内容(纯文本)
const getText = () => {
  return editor && editor.value.txt.text()
}
// 设置内容(html)
const setHtml = (text) => {
  return editor && editor.value.txt.html(text)
}
// 禁用解除编辑器
const attr = (disable) => {
  return editor && editor.value.$textElem.attr('contenteditable', disable)
}
// 追加内容
const appendHtml = (text) => {
  return editor && editor.value.txt.append(text)
}
// 清空内容
const clearHtml = () => {
  return editor && editor.value.txt.clear()
}

onMounted(() => {
  editor.value = new E(WangeditorDom.value)
  editor.value.customConfig.onchange = (html) => {
    emit('getFullText', html) //内容赋值
  }

  editor.value.customConfig.uploadImgServer = '你的上传地址'
  editor.value.customConfig.uploadFileName = 'file'

  editor.value.customConfig.zIndex = 100
  editor.value.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
  editor.value.customConfig.uploadImgMaxLength = 1

  // 工具条高度 默认 50px small为40px
  editor.value.customConfig.toolBarSize = 'small'

  // 最小高度 默认 100px
  editor.value.customConfig.minHeight = '200px'
  // 最大高度 默认 500px
  editor.value.customConfig.maxHeight = '500px'

  // editor.customConfig.menus = [
  //   'head', // 标题
  //   'bold', // 粗体
  //   'fontSize', // 字号
  //   'foreColor', // 文字颜色
  //   'backColor', // 背景颜色
  //   'link', // 插入链接
  //   'list', // 列表
  //   'image' // 插入图片
  // ]
  editor.value.customConfig.uploadImgParams = {
    from: 'editor'
  }
  editor.value.create()
  // 如果默认传递content值则渲染默认内容
  if (props.content) {
    editor.value.txt.html(props.content)
  }
  console.log(editor)
})

defineExpose({
  getHtml,
  getText,
  setHtml,
  attr,
  appendHtml,
  clearHtml
})
</script>

<style lang="less" scoped>
.ant-editor-wang {
  .editor-wrapper {
    text-align: left;
  }
}
</style>
