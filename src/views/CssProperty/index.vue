<template>
  <div ref="CssProperty" :style="tabStyle" custom="custom-div">CssProperty</div>
  <a-button type="primary" @click="handleClick">尺寸变化</a-button>

  <div :data-unit="unit">
    <a-input />
  </div>
  <CssPropertyComp1></CssPropertyComp1>
</template>

<script setup lang="ts" name="CssProperty">
import CssPropertyComp1 from './modules/CssPropertyComp1.vue'
import { computed } from 'vue'
import type { CSSProperties } from 'vue' // 来自vue的ts类型引入

const tabStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: '50px'
  }
  style.backgroundColor = '#1989fa'
  return style
})

const unit = ref('（单位）')
let size = ref(18)
const fontW = computed(() => {
  return {
    fontSize: toRaw(size.value) + 'px',
    fontWeight: 900,
    display: 'flex',
    lineHeight: '50px'
  }
})

const handleClick = () => {
  size.value = size.value + 2
}

CSS.registerProperty({
  name: '--primary-width',
  syntax: '<percentage>',
  inherits: false,
  initialValue: '30%'
})

const CssProperty = ref<HTMLDivElement>()
onMounted(() => {
  /* 设置元素的自定义属性 */
  CssProperty.value?.setAttribute('zac', 'zhang')

  /* 设置元素的css (包括自定义) */
  CssProperty.value?.style.setProperty('--primary-border', '30px')
  CssProperty.value?.style.setProperty('height', '80px', 'important')

  /* 获取元素的所有的css */
  const boxCss = getComputedStyle(CssProperty.value as HTMLDivElement)
  console.log(boxCss['border-radius'])
  console.log(boxCss['color'])

  /* 获取元素的伪元素所有的css */
  let boxAfterCss = getComputedStyle(CssProperty.value as HTMLDivElement, ':after')
  console.log(boxAfterCss['width'])
  console.log(boxAfterCss['right']) // 打印的不是-50% 而是具体的像素px

  /* 获取元素的css (包括自定义) */
  const opacity = boxCss.getPropertyValue('--primary--opacity')
  console.log(opacity)
  const margin = boxCss.getPropertyValue('--primary-margin')
  console.log(margin)
})
</script>

<style scoped lang="less">
/* css变量可以放在layer里面 */
@layer {
  @property --primary-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #fff;
  }

  @property --primary-margin {
    syntax: '<length>';
    inherits: false;
    initial-value: 20px;
  }
}

@property --primary--opacity {
  syntax: '<number>';
  inherits: true;
  initial-value: 0.6;
}

div[custom='custom-div'] {
  position: relative;
  display: v-bind('fontW.display');
  justify-content: center;
  margin: var(--primary-margin) auto;
  width: calc(var(--primary-width) - 50px);
  font-size: v-bind('fontW.fontSize');
  color: var(--primary-color);
  border: 2px var(--primary-borderColor) solid;
  border-radius: var(--primary-border);
  opacity: var(--primary--opacity);
  font-weight: v-bind('fontW.fontWeight');
  line-height: v-bind('fontW.lineHeight');

  --primary-border: 100px;
  --primary-borderColor: #f60;

  &::after {
    position: absolute;
    top: 0;
    right: -50%;
    display: block;
    width: 60px;
    height: 60px;
    background-color: v-bind('tabStyle.backgroundColor');
    // --primary-border: 20px;
    border-radius: var(--primary-border);
    content: '';
    pointer-events: none;
  }
}

/* attr 获取属性值 */
div:has(.ant-input) {
  position: relative;
  margin: 0 auto;
  width: 50%;

  &::before {
    position: absolute;
    top: 50%;
    left: calc(100% - 0px);
    display: block;
    font-size: 12px;
    white-space: nowrap;
    color: #000;
    content: attr(data-unit);
    transform: translateY(-50%);
    font-weight: 400;
    line-height: 32px;
  }
}
</style>
