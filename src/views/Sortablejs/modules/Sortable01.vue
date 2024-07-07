<template>
  <ul ref="sortable01" class="sortable">
    <li v-for="(item, index) in data01" :key="index" :class="data01.length - 1 === index ? 'filtered' : 'handle'">{{ item }}</li>
  </ul>

  <ul ref="sortable02" class="sortable">
    <li v-for="(item, index) in data02" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts" name="Sortable01">
import Sortable from 'sortablejs'
const data01: string[] = ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天(本身不可拖动)']
const data02: string[] = ['故人西辞黄鹤楼', '烟花三月下扬州', '孤帆远影碧空尽', '唯见长江天际流。']
const sortable01 = ref(null)
const sortable02 = ref(null)
onMounted(() => {
  const sortable_01 = new Sortable(sortable01.value, {
    // 动画效果
    animation: 150,
    // 拖拽时预览图样式
    ghostClass: 'background-class',
    group: {
      // 多组列表相互拖拽
      name: 'shared',
      // 多组列表拖拽克隆（向外组拖拽本身的数量不会减少）
      pull: 'clone'
    },
    // 允许外界项目向本身拖动
    put: true,
    // 是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
    sort: true,
    // 只对指定的 class 子元素上作用拖拽
    handle: '.handle',
    // 过滤不需要使用拖拽的列表单元。
    filter: '.filtered',
    // 列表单元被选中
    onChoose: (evt) => {
      console.log(`${evt.item.innerText}-列表单元被选中`)
    },
    // 列表单元拖动开始的回调函数
    onStart: (evt) => {
      console.log(`${evt.item.innerText}-列表单元拖动开始`)
    },
    // 容器列表单元，在拖放结束后的回调函数
    onEnd: (evt) => {
      console.log(`列表单元拖放结束后,原本在第${evt.oldIndex + 1}个位置,现在在第${evt.newIndex + 1}个位置`)
    },
    // 其他列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      console.log(`其他列表单元添加到本列表容器,${evt.item.innerText}拖动了过来,他在第${evt.newIndex + 1}个位置`)
    },
    // 列表单元在列表容器中的排序发生变化后的回调函数
    onUpdate: (evt) => {
      console.log('列表单元在列表容器中的排序发生啦', evt)
    },
    // 列表元素移到另一个列表容器成功后的回调函数
    onRemove: (evt) => {
      console.log(`列表元素移到另一个列表容器,${evt.item.innerText}移动到另一个容器中了,在另一个容器中的第${evt.newIndex + 1}个位置`, evt)
    },
    // 试图选中一个被 filter 过滤的列表单元的回调函数
    onFilter: (evt) => {
      console.log(`${evt.item.innerText}本身不允许被拖动`)
    },
    // 当移动列表单元在一个列表容器中或者多个列表容器中的回调函数
    onMove: (evt, originalEvt) => {
      console.log(`当前还在拖动过程中`)
    },
    // 当创建一个列表单元副本的时候的回调函数
    onClone: (evt) => {
      // 被克隆的对象
      let origEl = evt.item
      // 克隆后的对象
      let cloneEl = evt.clone
      cloneEl.innerHTML = `${evt.item.innerText}被克隆了`
    }
  })

  // to：HTMLElement--移动到的列表容器
  // from：HTMLElement--来源的列表容器
  // target：HTMLElement--来源的列表容器
  // item：HTMLElement--被移动的列表单元
  // clone：HTMLElement--副本的列表单元
  // oldIndex：number/undefined--在列表容器中的原序号
  // newIndex：number/undefined--在列表容器中的新序号
  // pullMode：默认是 undefined，当项目位于另一个可排序列表中时，如果操作克隆，值为 clone，如果是移动，只为 true。

  sortable_01.option('sort', true) // 设置可以排序
  const sort = sortable_01.option('sort') // 查看是否可以排序

  const sortable_02 = new Sortable(sortable02.value, {
    animation: 150,
    ghostClass: 'background-class',
    group: {
      name: 'shared'
    }
  })
})
</script>

<style scoped lang="less">
.sortable {
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 10px auto;
  min-height: 48px;
  max-height: 242px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  list-style: none;
  flex-direction: column;

  li {
    width: 100%;
    font-size: 14px;
    color: rgb(0 0 0 / 88%);
    line-height: 47px;
    padding-inline: 24px;
    border-block-end: 1px solid rgb(5 5 5 / 6%);
    cursor: pointer;
  }

  .background-class {
    color: #fff;
    background-color: #1677ff;
  }
}
</style>
