<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts" name="VueuseComp2">
import { useProvideCounterStore } from '../hooks/index'
useProvideCounterStore(560) // 模板中设置初始值
</script>
