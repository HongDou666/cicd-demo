<template>
  <div>
    <VueSlotComp1 name1="鸣人" name2="佐助">
      <template #default>
        <h1>默认插槽</h1>
      </template>
      <template #hello>
        <h1>具名插槽</h1>
      </template>
    </VueSlotComp1>

    <hr />

    <vue-slot-comp3>
      <template #Children_1="params">
        <ul>
          <li v-for="y in params.youxi" :key="y.id">{{ y.name }}-{{ params.x }}-{{ params.y }}</li>
        </ul>
      </template>
      <template #Children_2="{ youxi, x, y }">
        <ol>
          <li v-for="item in youxi" :key="item.id">{{ item.name }}-{{ x }}-{{ y }}</li>
        </ol>
      </template>

      <!-- 1. -->
      <template #default="{ def }">
        {{ def }}
      </template>

      <!-- 2. -->
      <!-- <template #default="{ def }">
        {{ def }}
      </template> -->
    </vue-slot-comp3>
  </div>
</template>

<script setup lang="ts" name="UseSlots">
import VueSlotComp1 from './modules/VueSlotComp1'
import VueSlotComp3 from './modules/VueSlotComp3.vue'
</script>

<style lang="scss" scoped></style>
