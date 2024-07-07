<template>
  <a-table :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ text, column }">
      <span v-if="column.dataIndex === 'name'" :draggable="true" @dragstart="dragstart(text)">
        <span> 哈哈 - {{ text }} </span>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
export default {
  setup() {
    const dragstart = (name) => {
      console.log(name + '被拖动啦')
    }
    return {
      dragstart,
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        }
      ],

      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address'
        }
      ]
    }
  }
}
</script>

<style></style>
