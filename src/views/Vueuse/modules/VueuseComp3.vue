<template>
  <ul>
    <li>{{ count }}</li>
    <li>{{ double }}</li>
  </ul>
</template>

<script lang="ts" setup name="VueuseComp3">
import { useCounterStore } from '../hooks/index'
const { count, double } = useCounterStore()!
</script>
