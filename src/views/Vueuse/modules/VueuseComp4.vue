<template>
  <a-button @click="increment">增加</a-button>
  <a-button @click="decrement">减少</a-button>
</template>

<script lang="ts" setup name="VueuseComp4">
import { useCounterStore } from '../hooks/index'
const { increment, decrement } = useCounterStore()!
</script>
