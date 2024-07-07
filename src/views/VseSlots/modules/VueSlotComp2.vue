<template>
  VueSlotComp2
  <ul>
    <li>{{ age }}-{{ myProp }}</li>
    <li>{{ age }}-{{ myProp }}</li>
    <li>{{ age }}-{{ myProp }}</li>
  </ul>
  <slot></slot>
</template>

<script setup lang="ts" name="VueSlotComp2">
let props = defineProps({
  age: {
    type: Number,
    default: 999,
    required: true
  },
  myProp: {
    type: String,
    default: '',
    required: true
  }
})
</script>
