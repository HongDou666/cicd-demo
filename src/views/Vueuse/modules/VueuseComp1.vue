<template>
  <div class="btn">
    <a-button @click="increment">增加</a-button>
    <a-button @click="decrement">减少</a-button>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalState } from '../hooks/index'

defineOptions({
  name: 'VueuseComp1'
})

const { increment, decrement } = useGlobalState()
</script>
