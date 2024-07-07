<template>
  <Container v-if="typeof info.prop === 'function'" :render="info.prop" :data="info.data" />
</template>

<script setup lang="tsx">
import { Container } from './VueRenderComp6'
const info = ref({
  data: {
    name: '唐梧桐',
    image: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/008i3skNgy1gu9gco1hdbj605k05kgll02.webp'
  },
  prop: (data) => {
    return (
      <div
        style={{
          display: 'block'
        }}>
        <h1>{data.name}</h1>
        <img src={data.image} alt={data.name} title={data.name} />
      </div>
    )
  }
})
</script>
